"use client"
import React, { useState } from 'react';
// Caminhos corrigidos para subir dois níveis
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import { useCart } from '../../context/CartContext';
import { ArrowRight, CreditCard, ShieldCheck, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { valorTotal, carrinho } = useCart();
  const [metodoPagamento, setMetodoPagamento] = useState('cartao');

  return (
    <main className="min-h-screen bg-white text-black font-sans pb-20">
      <Header />
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12">
        <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-10">
          CHECKOUT <span className="text-[#FFD11D]">/</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* COLUNA 1: FORMULÁRIO */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-black shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <MapPin className="text-[#FFD11D]" size={24} />
                <h2 className="text-xl font-black uppercase italic tracking-tighter">Informações de Entrega</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="NOME COMPLETO" className="w-full border-2 border-black rounded-full px-6 py-4 text-xs font-black uppercase italic outline-none focus:bg-gray-50 transition-all" />
                <input type="email" placeholder="E-MAIL PARA RASTREIO" className="w-full border-2 border-black rounded-full px-6 py-4 text-xs font-black uppercase italic outline-none focus:bg-gray-50 transition-all" />
                <input type="text" placeholder="CEP" className="w-full border-2 border-black rounded-full px-6 py-4 text-xs font-black uppercase italic outline-none focus:bg-gray-50 transition-all" />
                <input type="text" placeholder="ENDEREÇO E NÚMERO" className="w-full border-2 border-black rounded-full px-6 py-4 text-xs font-black uppercase italic outline-none focus:bg-gray-50 transition-all" />
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-black shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <CreditCard className="text-[#FFD11D]" size={24} />
                <h2 className="text-xl font-black uppercase italic tracking-tighter">Método de Pagamento</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['cartao', 'pix', 'boleto'].map((metodo) => (
                  <button
                    key={metodo}
                    onClick={() => setMetodoPagamento(metodo)}
                    className={`py-6 rounded-[1.5rem] border-2 font-black uppercase italic text-[10px] transition-all ${metodoPagamento === metodo ? 'border-black bg-black text-[#FFD11D] shadow-xl' : 'border-gray-100 bg-gray-50 text-gray-400'}`}
                  >
                    {metodo}
                  </button>
                ))}
              </div>

              {metodoPagamento === 'cartao' && (
                <div className="space-y-4 pt-4 animate-in fade-in duration-500">
                  <input type="text" placeholder="NÚMERO DO CARTÃO" className="w-full border-2 border-black rounded-full px-6 py-4 text-xs font-black uppercase italic outline-none" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="VALIDADE (MM/AA)" className="w-full border-2 border-black rounded-full px-6 py-4 text-xs font-black uppercase italic outline-none" />
                    <input type="text" placeholder="CVV" className="w-full border-2 border-black rounded-full px-6 py-4 text-xs font-black uppercase italic outline-none" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* COLUNA 2: RESUMO */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-[#FFD11D] p-8 rounded-[2.5rem] border border-black shadow-2xl space-y-8">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter border-b border-black/10 pb-4">Seu Pedido</h2>
              
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {carrinho.map(item => (
                  <div key={item.id} className="flex justify-between items-center gap-4">
                    <span className="text-[10px] font-black uppercase italic line-clamp-1 flex-1">{item.nome}</span>
                    <span className="text-xs font-black">R$ {item.preco}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t-2 border-black space-y-4">
                <div className="flex justify-between items-end">
                  <span className="font-black uppercase italic text-sm">Total Final</span>
                  <span className="text-4xl font-black tracking-tighter">R$ {valorTotal.toFixed(2).replace('.', ',')}</span>
                </div>
                
                <Link 
                  href="/sucesso"
                  className="w-full bg-black text-white py-5 rounded-full font-black uppercase italic text-sm flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl active:scale-95"
                >
                  Confirmar Pagamento <ArrowRight size={20} />
                </Link>
              </div>

              <div className="flex items-center justify-center gap-4 opacity-60">
                <ShieldCheck size={20} />
                <span className="text-[8px] font-black uppercase italic tracking-widest">Pagamento 100% Seguro</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* FOOTER REMOVIDO DAQUI PARA EVITAR DUPLICIDADE */}
    </main>
  );
}