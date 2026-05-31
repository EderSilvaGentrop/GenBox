"use client"
import React, { useMemo, useState, useEffect } from 'react';
import Header from '../../../components/Header';
import Navbar from '../../../components/Navbar';
import { useParams, useRouter } from 'next/navigation';
import produtos from '../../../produtos.json';
import { useCart } from '../../../context/CartContext';
import { ArrowLeft, ShoppingBag, ShieldCheck, Truck, RefreshCcw, CheckCircle } from 'lucide-react';

// Interface atualizada para suportar os novos IDs de texto
interface Produto {
  id: string | number;
  nome: string;
  preco: string;
  img: string;
  categoria: string;
  descricao?: string; 
}

const CONFIG_ESTILO: Record<string, any> = {
  ecommerce: { 
    cor: "#FFD11D", 
    categorias: [{ nome: "TECNOLOGIA" }, { nome: "ACESSÓRIOS" }, { nome: "PAPELARIA" }, { nome: "LOOKS" }] 
  },
  farmacia: { 
    cor: "#10B981", 
    categorias: [{ nome: "MEDICAMENTOS" }, { nome: "DERMO" }, { nome: "SUPLEMENTOS" }, { nome: "HIGIENE" }] 
  }
};

export default function ProdutoDetalhe() {
  const params = useParams();
  const router = useRouter();
  const { adicionarAoCarrinho } = useCart();
  const [verticalAtiva, setVerticalAtiva] = useState('ecommerce');
  
  // NOVO: Estado para controlar a exibição do alerta de sucesso
  const [mensagemVisivel, setMensagemVisivel] = useState(false);

  // Recupera a vertical salva para manter a cor correta
  useEffect(() => {
    const salva = localStorage.getItem('mcp_vertical_teste');
    if (salva) setVerticalAtiva(salva);
  }, []);

  const idParam = Array.isArray(params?.id) ? params.id[0] : params?.id;

  // BUSCA CORRIGIDA: Comparação de strings insensível a maiúsculas
  const produto = useMemo(() => {
    if (!idParam) return null;
    return (produtos as Produto[]).find(p => 
      String(p.id).toLowerCase() === String(idParam).toLowerCase()
    );
  }, [idParam]);

  // Define o estilo baseado no prefixo do ID
  const estilo = useMemo(() => {
    const isFarm = String(idParam).toLowerCase().startsWith('farm-');
    return isFarm ? CONFIG_ESTILO.farmacia : CONFIG_ESTILO.ecommerce;
  }, [idParam]);

  // NOVO: Função para adicionar ao carrinho e disparar o alerta flutuante
  const handleAdicionarAoCarrinho = () => {
    if (!produto) return;
    
    // Adiciona o produto usando o context existente
    adicionarAoCarrinho(produto as any);
    
    // Mostra o feedback visual na tela
    setMensagemVisivel(true);
    
    // Esconde automaticamente o aviso após 3 segundos
    setTimeout(() => {
      setMensagemVisivel(false);
    }, 3000);
  };

  if (!produto) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center font-black uppercase italic gap-4">
        <p className="opacity-20 text-2xl">Produto {idParam} não encontrado</p>
        <button 
          onClick={() => router.push('/')} 
          className="bg-black text-white px-8 py-3 rounded-full text-xs hover:scale-105 transition-all"
        >
          Voltar para Home
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black font-sans pb-20 relative">
      <Header />
      <Navbar categorias={estilo.categorias} />

      {/* --- MENSAGEM FLUTUANTE (TOAST DE SUCESSO) --- */}
      {mensagemVisivel && (
        <div 
          className="fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl font-black uppercase italic text-xs shadow-2xl border-2 border-black animate-in fade-in slide-in-from-top-4 duration-300 text-black"
          style={{ backgroundColor: estilo.cor }}
        >
          <CheckCircle size={18} />
          Produto adicionado ao carrinho!
        </div>
      )}

      <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-12">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[10px] font-black uppercase italic mb-10 hover:opacity-50 transition-all group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Voltar para {produto.categoria}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="flex justify-center">
            <div className="bg-white rounded-full aspect-square flex items-center justify-center border-[3px] border-black p-16 md:p-24 shadow-2xl w-full max-w-[500px] overflow-hidden relative">
               <span 
                className="absolute top-10 right-10 text-[9px] font-black px-4 py-1 rounded-full text-white uppercase italic"
                style={{ backgroundColor: estilo.cor }}
              >
              </span>
              <img 
                src={produto.img} 
                alt={produto.nome} 
                className="w-full h-full object-contain animate-in zoom-in duration-700" 
              />
            </div>
          </div>

          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-2">
              <span 
                className="px-4 py-1 rounded-full text-[10px] font-black uppercase italic text-white"
                style={{ backgroundColor: estilo.cor }}
              >
                {produto.categoria}
              </span>
              <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.9]">
                {produto.nome}
              </h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase italic">ID: {produto.id}</p>
            </div>

            <p className="text-lg md:text-xl font-medium text-gray-500 italic leading-relaxed max-w-md mx-auto lg:mx-0">
              {produto.descricao || "Item exclusivo da curadoria GenBox, selecionado para garantir a melhor experiência na vertical " + verticalAtiva + "."}
            </p>

            <div className="pt-4">
              <span className="text-5xl md:text-7xl font-black tracking-tighter">
                R$ {produto.preco}
              </span>
              <p className="text-[10px] font-bold uppercase italic opacity-40 mt-2">
                ou em até 10x sem juros no cartão
              </p>
            </div>

            {/* BOTÃO ALTERADO: Agora chama a função handleAdicionarAoCarrinho */}
            <button 
              onClick={handleAdicionarAoCarrinho}
              className="w-full text-white py-6 rounded-full font-black uppercase italic text-sm flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl active:scale-95"
              style={{ backgroundColor: estilo.cor }}
            >
              <ShoppingBag size={20} /> Adicionar ao Carrinho
            </button>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-black/5">
              <div className="flex flex-col items-center gap-1 opacity-30">
                <Truck size={22} />
                <span className="text-[8px] font-black uppercase italic text-center">Frete Grátis</span>
              </div>
              <div className="flex flex-col items-center gap-1 opacity-30">
                <ShieldCheck size={22} />
                <span className="text-[8px] font-black uppercase italic text-center">Seguro</span>
              </div>
              <div className="flex flex-col items-center gap-1 opacity-30">
                <RefreshCcw size={22} />
                <span className="text-[8px] font-black uppercase italic text-center">Garantia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}