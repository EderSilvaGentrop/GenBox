"use client"
import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import { CheckCircle, Package, ArrowRight, Star } from 'lucide-react';

export default function SucessoPage() {
  const { limparCarrinho } = useCart();

  // Limpa o carrinho ao carregar a página
  useEffect(() => {
    limparCarrinho();
  }, []);

  const numeroPedido = Math.floor(100000 + Math.random() * 900000);

  return (
    <main className="min-h-screen bg-white text-black font-sans">
      <Header />
      <Navbar />

      <section className="max-w-[1400px] mx-auto px-4 md:px-6 py-10 md:py-16 flex justify-center">
        {/* CARD DE SUCESSO REDUZIDO: max-w-2xl e padding menor */}
        <div className="bg-[#FFD11D] w-full max-w-2xl rounded-[2.5rem] p-8 md:p-12 border border-black shadow-2xl relative overflow-hidden">
          
          {/* Estrela decorativa menor */}
          <div className="absolute -top-6 -right-6 text-white/20 rotate-12">
            <Star size={120} fill="currentColor" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            {/* ÍCONE DE CONFIRMAÇÃO MENOR */}
            <div className="bg-black text-[#FFD11D] p-4 rounded-full shadow-lg">
              <CheckCircle size={32} strokeWidth={2.5} />
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">
                PEDIDO <br/> CONFIRMADO<span className="text-white">.</span>
              </h1>
              <p className="text-[10px] md:text-xs font-bold uppercase italic opacity-70 max-w-xs mx-auto">
                Obrigado por escolher o futuro. Seu pedido já está sendo preparado.
              </p>
            </div>

            {/* BOX DE INFORMAÇÕES COMPACTO */}
            <div className="bg-white border border-black rounded-[1.5rem] p-4 md:p-6 w-full flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-xl">
                  <Package className="text-black" size={20} />
                </div>
                <div className="text-left">
                  <span className="text-[8px] font-black uppercase text-gray-400 block italic">Pedido</span>
                  <span className="text-lg font-black tracking-tighter"># {numeroPedido}</span>
                </div>
              </div>
              <div className="h-px md:h-10 w-full md:w-px bg-gray-200" />
              <div className="text-center md:text-right">
                <span className="text-[8px] font-black uppercase text-gray-400 block italic">Entrega</span>
                <span className="text-xs font-black uppercase italic">2-4 Dias</span>
              </div>
            </div>

            <div className="pt-4 w-full flex justify-center">
              <Link 
                href="/" 
                className="bg-black text-white px-8 py-4 rounded-full font-black uppercase italic text-[10px] md:text-xs hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl"
              >
                Voltar para a Home <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}