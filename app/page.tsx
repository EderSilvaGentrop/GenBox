"use client"
import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import produtos from '../produtos.json';
import { useCart } from '../context/CartContext';
import {
  Zap, ShoppingCart, Star, Newspaper, MoveRight,
  CreditCard, Pill, Landmark, GraduationCap, ShieldCheck, BookOpen,
  Instagram, Facebook, Twitter, Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VERTICAIS: Record<string, any> = {
  ecommerce: {
    id: "ecommerce",
    corBanner: "#FEF9C3",
    corDestaque: "#FFD11D",
    prefixoId: "Ecom-",
    bannerImg: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070",
    urlBotao: "/categoria/looks",
    titulo: "SEU ESTILO,",
    destaque: "SEM LIMITES.",
    subtitulo: "Antecipe tendências com nossa seleção premium de tecnologia e moda feita para quem não aceita o comum.",
    categorias: [{ nome: "TECNOLOGIA", icon: Zap }, { nome: "ACESSÓRIOS", icon: Star }, { nome: "PAPELARIA", icon: ShoppingCart }, { nome: "LOOKS", icon: Zap }]
  },
  farmacia: {
    id: "farmacia",
    corBanner: "#F0FDF4",
    corDestaque: "#10B981",
    prefixoId: "Farm-",
    bannerImg: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=2070",
    urlBotao: "/categoria/medicamentos",
    titulo: "SUA SAÚDE,",
    destaque: "NOSSA PRIORIDADE.",
    subtitulo: "Encontre o melhor em medicamentos, dermocosméticos e cuidados com a saúde em um só lugar.",
    categorias: [{ nome: "MEDICAMENTOS", icon: Pill }, { nome: "DERMO", icon: Star }, { nome: "SUPLEMENTOS", icon: Zap }, { nome: "HIGIENE", icon: ShoppingCart }]
  },
  financeiro: {
    id: "financeiro",
    corBanner: "#EFF6FF",
    corDestaque: "#3B82F6",
    prefixoId: "Ecom-",
    bannerImg: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070",
    urlBotao: "/categoria/investimentos",
    titulo: "SEU DINHEIRO,",
    destaque: "RENDENDO MAIS.",
    subtitulo: "Soluções inteligentes para investimentos e seguros feitos para o seu futuro.",
    categorias: [{ nome: "CARTÕES", icon: CreditCard }, { nome: "INVESTIMENTOS", icon: Landmark }, { nome: "SEGUROS", icon: ShieldCheck }, { nome: "EMPRÉSTIMOS", icon: Zap }]
  },
  educacao: {
    id: "educacao",
    corBanner: "#FAF5FF",
    corDestaque: "#8B5CF6",
    prefixoId: "Ecom-",
    bannerImg: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071",
    urlBotao: "/categoria/graduação",
    titulo: "SEU FUTURO,",
    destaque: "COMEÇA AGORA.",
    subtitulo: "Explore graduações e cursos livres com a melhor metodologia do mercado.",
    categorias: [{ nome: "GRADUAÇÃO", icon: GraduationCap }, { nome: "PÓS-GRADUAÇÃO", icon: Star }, { nome: "CURSOS LIVRES", icon: Zap }, { nome: "EXTENSÃO", icon: BookOpen }]
  }
};

export default function Home() {
  const [pagina, setPagina] = useState(1);
  const [vertical, setVertical] = useState('ecommerce');
  const [mounted, setMounted] = useState(false);
  const { limparCarrinho } = useCart();

  useEffect(() => {
    const salva = localStorage.getItem('mcp_vertical_teste');
    if (salva && VERTICAIS[salva]) {
      setVertical(salva);
    }
    setMounted(true);
  }, []);

  const config = VERTICAIS[vertical] || VERTICAIS.ecommerce;

  const produtosFiltrados = useMemo(() => {
    return produtos.filter(p => String(p.id).startsWith(config.prefixoId));
  }, [vertical, config.prefixoId]);

  const produtosExibidos = pagina === 1
    ? produtosFiltrados.slice(0, 6)
    : produtosFiltrados.slice(6, 12);

  const trocarVertical = (v: string) => {
    limparCarrinho();
    localStorage.removeItem('user_name');
    localStorage.removeItem('mcp_user_id');
    localStorage.setItem('mcp_vertical_teste', v);
    setVertical(v);
    window.dispatchEvent(new Event('storage'));
    window.location.reload();
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-white text-black font-sans overflow-x-hidden relative">
      <Header />
      <Navbar
        categorias={config.categorias}
        verticalAtiva={vertical}
        onTrocarVertical={trocarVertical}
      />

      {/* HERO BANNER - Banners coloridos */}
      <section className="relative w-full py-12 overflow-hidden border-b-2 border-black mb-4 transition-all duration-700" style={{ backgroundColor: config.corBanner }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-start space-y-3 md:w-1/2">
            <span className="bg-black text-[#FFD11D] px-4 py-1 rounded-full text-[10px] font-black uppercase italic">
              {vertical.toUpperCase()} MODE / 2026
            </span>
            <h1 className="text-black text-4xl md:text-6xl font-black uppercase italic leading-[0.85] tracking-tighter">
              {config.titulo} <br />
              <span style={{ color: config.corDestaque }}>{config.destaque}</span>
            </h1>
            <p className="text-gray-700 max-w-xl font-bold uppercase italic text-xs md:text-sm leading-tight">
              {config.subtitulo}
            </p>
            <Link
              href={config.urlBotao}
              className="bg-black text-white px-8 py-3 rounded-full font-black uppercase italic text-[10px] flex items-center gap-4 hover:bg-[#FFD11D] hover:text-black transition-all shadow-xl"
            >
              Explorar Novidades <MoveRight size={18} />
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src={config.bannerImg} alt="Banner" className="rounded-[2rem] border-2 border-black shadow-[8px_8px_0px_#000] max-h-[300px] w-full object-cover transition-all duration-700" />
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 md:px-10">
        <section className="py-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          {config.categorias.map((cat: any, idx: number) => (
            <Link key={idx} href={`/categoria/${cat.nome.toLowerCase()}`} className="group border-2 border-black p-6 rounded-[2rem] hover:rotate-1 transition-all h-[240px] flex flex-col justify-between shadow-[4px_4px_0px_#000] bg-white">
              <h3 className="text-2xl font-black uppercase italic">{cat.nome}</h3>
              <cat.icon size={32} fill="black" />
            </Link>
          ))}
        </section>

        {/* VITRINE DROPS / DESTAQUES */}
        <section className="py-10 overflow-hidden">
          <div className="mb-6 border-b-2 border-black pb-4">
            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
              DROPS <span className="text-[#FFD11D]">/</span> DESTAQUES
            </h2>
          </div>
          <div className="relative min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${pagina}-${vertical}`}
                initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-6 gap-6 mb-6"
              >
                {produtosExibidos.map((p, idx) => (
                  <Link
                    key={`${p.id}-${idx}`}
                    href={`/produto/${p.id}`}
                    className="group flex flex-col items-center text-center"
                  >
                    <div className="bg-white rounded-full aspect-square flex items-center justify-center border-2 border-black p-4 overflow-hidden w-full relative shadow-md">
                      {/* CORREÇÃO: A etiqueta agora mostra a categoria do produto */}
                      <span
                        className="absolute top-2 text-[7px] font-black px-2 py-0.5 border border-black rounded-full z-10 uppercase italic text-white truncate max-w-[80%]"
                        style={{ backgroundColor: config.corDestaque }}
                      >
                        {p.categoria}
                      </span>
                      <img src={p.img} alt={p.nome} className="w-full h-full object-contain group-hover:scale-110 transition-all duration-500" />
                    </div>
                    <h4 className="mt-2 text-[8px] font-black uppercase opacity-30 italic">{p.categoria}</h4>
                    <h3 className="text-[10px] font-black uppercase h-8 flex items-center italic leading-tight">{p.nome}</h3>
                    <p className="text-sm font-bold tracking-tighter">R$ {p.preco}</p>
                  </Link>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-4 flex justify-center items-center gap-4">
            <button onClick={() => setPagina(1)} className={`w-3 h-3 rounded-full border-2 border-black transition-all ${pagina === 1 ? 'bg-black scale-125' : 'bg-transparent'}`} />
            <button onClick={() => setPagina(2)} className={`w-3 h-3 rounded-full border-2 border-black transition-all ${pagina === 2 ? 'bg-black scale-125' : 'bg-transparent'}`} />
          </div>
        </section>

        {/* JOURNAL */}
        <section className="py-10 border-t-2 border-black">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter flex items-center gap-3"><Newspaper size={28} /> JOURNAL /</h2>
            <Link
              href="/artigos"
              className="bg-black text-[#FFD11D] px-6 py-2 rounded-full font-black uppercase italic text-[10px] flex items-center gap-2 hover:scale-105 transition-all shadow-lg active:scale-95"
            >
              Mais Artigos <Plus size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/artigos/1" className="group space-y-3 block relative z-10">
              <div className="aspect-[21/9] border-2 border-black rounded-[1.5rem] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" alt="Journal 1" />
              </div>
              <h3 className="text-xl font-black uppercase italic leading-tight group-hover:text-[#FFD11D] transition-colors">Como escolher seu primeiro setup tech em 2026?</h3>
            </Link>
            <Link href="/artigos/2" className="group space-y-3 block relative z-10">
              <div className="aspect-[21/9] border-2 border-black rounded-[1.5rem] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" alt="Journal 2" />
              </div>
              <h3 className="text-xl font-black uppercase italic leading-tight group-hover:text-[#FFD11D] transition-colors">A jornada de compra via WhatsApp</h3>
            </Link>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="mt-10 mb-20 bg-[#FFD11D] text-black rounded-[1.5rem] py-6 px-6 md:px-10 text-center border-2 border-black shadow-[8px_8px_0px_#000]">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10">
            <h2 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter">ASSINE A NEWS</h2>
            <div className="flex w-full max-w-2xl gap-3">
              <input type="email" placeholder="E-MAIL" className="flex-1 bg-white text-black px-5 py-2 rounded-full font-black uppercase italic text-xs outline-none border border-black/20" />
              <button className="bg-black text-[#FFD11D] px-8 py-2 rounded-full font-black uppercase italic text-xs hover:scale-105 transition-all">OK</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}