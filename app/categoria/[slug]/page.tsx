"use client"
import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../../components/Header';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useParams, useRouter } from 'next/navigation';
import produtos from '../../../produtos.json';
import Link from 'next/link';

// Interface atualizada para suportar IDs alfanuméricos (Ecom-01)
interface Produto {
  id: string | number;
  nome: string;
  preco: string;
  img: string;
  categoria: string;
}

const CONFIG_VERTICAIS: Record<string, any> = {
  ecommerce: { cor: "#FFD11D", categorias: [{ nome: "TECNOLOGIA" }, { nome: "ACESSÓRIOS" }, { nome: "PAPELARIA" }, { nome: "LOOKS" }] },
  farmacia: { cor: "#10B981", categorias: [{ nome: "MEDICAMENTOS" }, { nome: "DERMO" }, { nome: "SUPLEMENTOS" }, { nome: "HIGIENE" }] },
  financeiro: { cor: "#2563EB", categorias: [{ nome: "CARTÕES" }, { nome: "INVESTIMENTOS" }, { nome: "SEGUROS" }, { nome: "EMPRÉSTIMOS" }] },
  educacao: { cor: "#8B5CF6", categorias: [{ nome: "GRADUAÇÃO" }, { nome: "PÓS-GRADUAÇÃO" }, { nome: "CURSOS LIVRES" }, { nome: "EXTENSÃO" }] }
};

export default function CategoriaPage() {
  const params = useParams();
  const router = useRouter();
  const [verticalAtiva, setVerticalAtiva] = useState('ecommerce');
  const [mounted, setMounted] = useState(false);

  // Recupera a vertical e evita erro de Hydration
  useEffect(() => {
    const salva = localStorage.getItem('mcp_vertical_teste');
    if (salva) setVerticalAtiva(salva);
    setMounted(true);
  }, []);

  const config = CONFIG_VERTICAIS[verticalAtiva] || CONFIG_VERTICAIS.ecommerce;

  // Decodifica o slug para tratar "pós-graduação" e acentos
  const slug = useMemo(() => {
    const rawSlug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
    return rawSlug ? decodeURIComponent(rawSlug) : "";
  }, [params?.slug]);

  // Filtra produtos ignorando maiúsculas/minúsculas
  const produtosFiltrados = useMemo(() => {
    if (!slug) return [];
    return (produtos as Produto[]).filter(p => 
      p.categoria.toLowerCase() === slug.toLowerCase()
    );
  }, [slug]);

  const formatarTitulo = (texto: string) => {
    if (!texto) return "Categoria";
    return texto.toUpperCase();
  };

  // Previne Hydration Mismatch renderizando apenas após o cliente estar pronto
  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-white text-black font-sans pb-20">
      <Header />
      {/* Passa as categorias da vertical ativa para a Navbar */}
      <Navbar categorias={config.categorias} />

      <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-12">
        {/* CABEÇALHO DA CATEGORIA */}
        <div className="mb-16 border-b-2 border-black pb-8">
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
            {formatarTitulo(slug)} 
            <span style={{ color: config.cor }}> /</span>
          </h1>
          <p className="text-[10px] font-bold uppercase italic opacity-40 mt-4 tracking-widest">
            MODO: {verticalAtiva.toUpperCase()} / {produtosFiltrados.length} PRODUTOS ENCONTRADOS
          </p>
        </div>

        {/* GRID DE PRODUTOS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16 justify-items-center">
          {produtosFiltrados.map((produto, idx) => (
            <Link 
              // SOLUÇÃO PARA DUPLICATE KEY: ID + INDEX
              key={`${produto.id}-${idx}`} 
              href={`/produto/${produto.id}`} 
              className="group flex flex-col items-center w-full"
            >
              <div className="bg-white rounded-full aspect-square flex items-center justify-center border-2 border-black p-10 md:p-14 overflow-hidden shadow-sm group-hover:shadow-[12px_12px_0px_#000] group-hover:-translate-y-2 transition-all w-full max-w-[300px] relative">
                <span 
                  className="absolute top-6 right-6 text-[8px] font-black px-2 py-0.5 rounded-full text-white uppercase italic"
                  style={{ backgroundColor: config.cor }}
                >
                  
                </span>
                <img 
                  src={produto.img} 
                  alt={produto.nome} 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <div className="mt-6 text-center space-y-1 px-4">
                <h4 className="text-[10px] md:text-xs font-black uppercase italic leading-tight tracking-tighter h-8 flex items-center justify-center">
                  {produto.nome}
                </h4>
                <p className="text-lg md:text-xl font-black tracking-tighter">
                  R$ {produto.preco}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* ESTADO VAZIO */}
        {produtosFiltrados.length === 0 && slug && (
          <div className="py-40 text-center font-black uppercase italic opacity-20 text-4xl tracking-tighter">
            Nenhum produto em {slug}
          </div>
        )}
      </div>

      
    </main>
  );
}