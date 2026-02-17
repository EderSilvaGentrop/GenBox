"use client"
import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../../components/Header';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useParams } from 'next/navigation';
import { Clock, Calendar, Share2, ArrowLeft, Bookmark, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

// Configuração de Verticais para manter consistência visual
const VERTICAIS: Record<string, any> = {
  ecommerce: { id: "ecommerce", corDestaque: "#FFD11D", categorias: [{ nome: "TECNOLOGIA" }, { nome: "ACESSÓRIOS" }, { nome: "PAPELARIA" }, { nome: "LOOKS" }] },
  farmacia: { id: "farmacia", corDestaque: "#10B981", categorias: [{ nome: "MEDICAMENTOS" }, { nome: "DERMO" }, { nome: "SUPLEMENTOS" }, { nome: "HIGIENE" }] },
  financeiro: { id: "financeiro", corDestaque: "#3B82F6", categorias: [{ nome: "CARTÕES" }, { nome: "INVESTIMENTOS" }, { nome: "SEGUROS" }, { nome: "EMPRÉSTIMOS" }] },
  educacao: { id: "educacao", corDestaque: "#8B5CF6", categorias: [{ nome: "GRADUAÇÃO" }, { nome: "PÓS-GRADUAÇÃO" }, { nome: "CURSOS LIVRES" }, { nome: "EXTENSÃO" }] }
};

interface BlocoCorpo {
  tipo: 'p' | 'h2' | 'box';
  texto?: string;
  titulo?: string;
  itens?: string[];
}

interface Artigo {
  titulo: string;
  subtitulo: string;
  categoria: string;
  data: string;
  leitura: string;
  capa: string;
  corpo: BlocoCorpo[];
}

const CONTEUDO_ARTIGOS: Record<string, Artigo> = {
  "1": {
    titulo: "COMO ESCOLHER SEU PRIMEIRO SETUP TECH EM 2026?",
    subtitulo: "O guia definitivo para equilibrar performance, estética e o orçamento ideal para sua nova estação de trabalho.",
    categoria: "PRODUTOS",
    data: "12 FEV 2026",
    leitura: "8 MIN",
    capa: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072",
    corpo: [
      { tipo: 'p', texto: "Montar um setup em 2026 exige um olhar atento às novas tecnologias de integração. Não se trata apenas de velocidade, mas de como seus dispositivos conversam entre si para otimizar sua produtividade." },
      { tipo: 'h2', texto: "A IMPORTÂNCIA DA ERGONOMIA" },
      { tipo: 'p', texto: "Antes de olhar para a placa de vídeo, olhe para sua cadeira e altura do monitor. Um setup de alta performance começa na saúde do usuário." },
      { tipo: 'box', titulo: "Checklist Essencial:", itens: ["Monitor 4K com 144Hz", "Teclado Mecânico Silencioso", "Mouse Ergonômico Vertical", "Iluminação de Apoio (Lightbar)"] }
    ]
  },
  "2": {
    titulo: "A JORNADA DE COMPRA COMPLETA AGORA PELO WHATSAPP",
    subtitulo: "Nossa nova inteligência artificial agora gerencia todo o seu ciclo de consumo sem você precisar sair do chat.",
    categoria: "EMPRESA",
    data: "10 FEV 2026",
    leitura: "5 MIN",
    capa: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069",
    corpo: [
      { tipo: 'p', texto: "O comércio conversacional atingiu seu ápice. Agora, nossa IA entende contextos complexos e sugestiona produtos baseados na sua rotina real." },
      { tipo: 'h2', texto: "SEGURANÇA EM PRIMEIRO LUGAR" },
      { tipo: 'p', texto: "Todos os pagamentos realizados via chat utilizam criptografia de ponta a ponta e validação biométrica direto no seu smartphone." }
    ]
  }
};

export default function PaginaDoArtigo() {
  const params = useParams();
  const [vertical, setVertical] = useState('ecommerce');
  const [mounted, setMounted] = useState(false);

  // Recupera a vertical e evita erro de Hydration
  useEffect(() => {
    const salva = localStorage.getItem('mcp_vertical_teste');
    if (salva && VERTICAIS[salva]) setVertical(salva);
    setMounted(true);
  }, []);

  const config = VERTICAIS[vertical] || VERTICAIS.ecommerce;
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const artigo = useMemo(() => {
    if (!id || !CONTEUDO_ARTIGOS[id]) return CONTEUDO_ARTIGOS["1"];
    return CONTEUDO_ARTIGOS[id];
  }, [id]);

  const trocarVertical = (v: string) => {
    localStorage.setItem('mcp_vertical_teste', v);
    window.location.reload(); 
  };

  // Previne Mismatch entre Servidor e Cliente
  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-white text-black font-sans pb-20">
      <Header />
      {/* Navbar integrada com suporte a troca de vertical */}
      <Navbar 
        categorias={config.categorias} 
        verticalAtiva={vertical} 
        onTrocarVertical={trocarVertical} 
      />

      <article className="max-w-[1000px] mx-auto px-4 md:px-6 py-10 md:py-12">
        
        {/* VOLTAR E META */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <Link href="/artigos" className="inline-flex items-center gap-2 text-[9px] font-black uppercase italic border-b-2 border-black pb-1 hover:text-[#FFD11D] transition-all w-fit">
            <ArrowLeft size={14} /> Voltar para Artigos
          </Link>
          <div className="flex items-center gap-4 text-[9px] font-bold uppercase italic opacity-40 tracking-widest">
            <span className="flex items-center gap-1.5"><Calendar size={13} /> {artigo.data}</span>
            <span className="flex items-center gap-1.5"><Clock size={13} /> {artigo.leitura}</span>
          </div>
        </div>

        {/* CABEÇALHO DINÂMICO */}
        <header className="space-y-6 mb-12">
          <span 
            className="text-white px-4 py-1 rounded-full text-[9px] font-black uppercase italic border border-black inline-block"
            style={{ backgroundColor: config.corDestaque }}
          >
            {artigo.categoria}
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.95]">
            {artigo.titulo}
          </h1>
          <p className="text-lg md:text-xl font-bold text-gray-500 italic leading-tight max-w-3xl">
            {artigo.subtitulo}
          </p>
        </header>

        {/* IMAGEM HERO */}
        <div className="w-full aspect-[21/9] rounded-[2.5rem] border-2 border-black overflow-hidden shadow-xl mb-12">
          <img src={artigo.capa} className="w-full h-full object-cover" alt="Capa do Artigo" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* BARRA LATERAL */}
          <aside className="lg:col-span-1 flex lg:flex-col gap-4 order-2 lg:order-1 border-t lg:border-t-0 pt-8 lg:pt-0">
            <div className="p-3 bg-gray-50 rounded-2xl border border-black hover:bg-[#FFD11D] cursor-pointer transition-all flex items-center justify-center shadow-sm">
              <Share2 size={18} />
            </div>
            <div className="p-3 bg-gray-50 rounded-2xl border border-black hover:bg-[#FFD11D] cursor-pointer transition-all flex items-center justify-center shadow-sm">
              <Bookmark size={18} />
            </div>
          </aside>

          {/* CORPO DO TEXTO */}
          <div className="lg:col-span-11 space-y-8 order-1 lg:order-2">
            {artigo.corpo.map((bloco, idx) => {
              if (bloco.tipo === 'p') return (
                <p key={idx} className="text-base md:text-lg leading-relaxed font-medium text-gray-700">
                  {bloco.texto}
                </p>
              );
              if (bloco.tipo === 'h2') return (
                <h2 key={idx} className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter pt-4">
                  {bloco.texto}
                </h2>
              );
              if (bloco.tipo === 'box') return (
                <div 
                  className="border-2 border-black rounded-[2rem] p-6 md:p-10 shadow-lg"
                  style={{ backgroundColor: `${config.corDestaque}15` }} // Cor de fundo suave baseada na vertical
                  key={idx}
                >
                  <h3 className="text-lg font-black uppercase italic mb-4 border-b border-black/10 pb-2">{bloco.titulo}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bloco.itens?.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="text-black" size={18} />
                        <span className="text-[11px] font-black uppercase italic">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
              return null;
            })}
          </div>
        </div>

        {/* NEWSLETTER */}
        <section className="mt-24 bg-black text-white rounded-[2.5rem] p-8 md:p-16 text-center space-y-6 border border-black shadow-[12px_12px_0px_#FFD11D]">
          <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">CONTEÚDO EXCLUSIVO</h3>
          <p className="text-gray-400 font-bold uppercase italic max-w-md mx-auto text-[10px] md:text-xs">
            Assine nossa newsletter e receba guias de {vertical} diretamente no seu e-mail.
          </p>
          <div className="flex flex-col md:flex-row gap-3 justify-center pt-4">
            <input type="email" placeholder="SEU E-MAIL" className="bg-white text-black px-6 py-3 rounded-full font-black uppercase italic text-[10px] outline-none w-full md:w-64" />
            <button 
              className="px-8 py-3 rounded-full font-black uppercase italic text-[10px] hover:scale-105 transition-all text-black"
              style={{ backgroundColor: config.corDestaque }}
            >
              Assinar
            </button>
          </div>
        </section>

      </article>
      <Footer />
    </main>
  );
}