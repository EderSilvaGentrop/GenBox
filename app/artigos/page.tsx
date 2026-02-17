"use client"
import React, { useState, useEffect } from 'react';
// Caminhos corrigidos para subir dois níveis até a raiz
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

const VERTICAIS: Record<string, any> = {
  ecommerce: { id: "ecommerce", corDestaque: "#FFD11D", categorias: [{ nome: "TECNOLOGIA" }, { nome: "ACESSÓRIOS" }, { nome: "PAPELARIA" }, { nome: "LOOKS" }] },
  farmacia: { id: "farmacia", corDestaque: "#10B981", categorias: [{ nome: "MEDICAMENTOS" }, { nome: "DERMO" }, { nome: "SUPLEMENTOS" }, { nome: "HIGIENE" }] },
  financeiro: { id: "financeiro", corDestaque: "#3B82F6", categorias: [{ nome: "CARTÕES" }, { nome: "INVESTIMENTOS" }, { nome: "SEGUROS" }, { nome: "EMPRÉSTIMOS" }] },
  educacao: { id: "educacao", corDestaque: "#8B5CF6", categorias: [{ nome: "GRADUAÇÃO" }, { nome: "PÓS-GRADUAÇÃO" }, { nome: "CURSOS LIVRES" }, { nome: "EXTENSÃO" }] }
};

const ARTIGOS_LISTA = [
  { id: "1", titulo: "COMO ESCOLHER SEU SETUP TECH EM 2026?", data: "12 FEV 2026", cat: "PRODUTOS", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085" },
  { id: "2", titulo: "A JORNADA DE COMPRA PELO WHATSAPP", data: "10 FEV 2026", cat: "EMPRESA", img: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6" }
];

export default function ArtigosPrincipal() {
  const [vertical, setVertical] = useState('ecommerce');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Recupera a vertical e marca como montado para evitar Hydration Error
    const salva = localStorage.getItem('mcp_vertical_teste');
    if (salva && VERTICAIS[salva]) setVertical(salva);
    setMounted(true);
  }, []);

  // Evita Hydration Mismatch
  if (!mounted) return null;

  const config = VERTICAIS[vertical] || VERTICAIS.ecommerce;

  const trocarVertical = (v: string) => {
    localStorage.setItem('mcp_vertical_teste', v);
    window.location.reload(); 
  };

  return (
    <main className="min-h-screen bg-white text-black font-sans pb-20">
      <Header />
      {/* categorias passado corretamente para evitar erro de map */}
      <Navbar 
        categorias={config.categorias} 
        verticalAtiva={vertical} 
        onTrocarVertical={trocarVertical} 
      />

      <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-12">
        <div className="mb-16 border-b-4 border-black pb-8">
          <span className="bg-black text-[#FFD11D] px-4 py-1 rounded-full text-[10px] font-black uppercase italic tracking-widest">
            {vertical.toUpperCase()} JOURNAL / 2026
          </span>
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mt-4">
            ARTIGOS <span style={{ color: config.corDestaque }}>/</span> NEWS
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {ARTIGOS_LISTA.map((art) => (
            <Link key={art.id} href={`/artigos/${art.id}`} className="group space-y-4">
              <div className="aspect-[16/9] border-2 border-black rounded-[2rem] overflow-hidden shadow-lg group-hover:shadow-[8px_8px_0px_#000] transition-all">
                <img src={art.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={art.titulo} />
              </div>
              <div className="px-2">
                <span className="text-[9px] font-black uppercase italic opacity-40 flex items-center gap-2 mb-2">
                  <Calendar size={12} /> {art.data} | {art.cat}
                </span>
                <h3 className="text-2xl font-black uppercase italic leading-tight group-hover:text-[#FFD11D] transition-colors">
                  {art.titulo}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}