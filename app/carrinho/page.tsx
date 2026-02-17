"use client"
import React from 'react';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import { useCart } from '../../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Função de segurança para evitar o erro "NaN" na exibição
const converterPreco = (preco: any): number => {
  if (typeof preco === 'number') return preco;
  const limpo = String(preco).replace('R$', '').replace('.', '').replace(',', '.').trim();
  const num = parseFloat(limpo);
  return isNaN(num) ? 0 : num;
};

export default function CarrinhoPage() {
  const { carrinho, removerDoCarrinho, valorTotal, totalItens } = useCart();

  return (
    <main className="min-h-screen bg-white text-black font-sans pb-20">
      <Header />
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        {/* TÍTULO COM ESTILO DE MARCA */}
        <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-10 border-b-2 border-black pb-6">
          SEU CARRINHO <span className="text-[#FFD11D]">/</span> 
          <span className="text-gray-400 text-2xl ml-4">({totalItens} ITENS)</span>
        </h1>

        {carrinho.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* LISTAGEM DE PRODUTOS COM BORDAS PRETAS */}
            <div className="lg:col-span-8 space-y-4">
              {carrinho.map((item) => {
                const precoUnitario = converterPreco(item.preco);
                return (
                  <div key={item.id} className="bg-white p-6 rounded-[2rem] border border-black flex items-center gap-6 group hover:shadow-md transition-all">
                    <div className="w-24 h-24 md:w-28 md:h-28 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                      <img src={item.img} alt={item.nome} className="w-full h-full object-contain" />
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest italic">{item.categoria}</span>
                      <h3 className="text-lg md:text-xl font-black uppercase italic tracking-tighter leading-tight line-clamp-1">{item.nome}</h3>
                      <p className="text-xs font-bold uppercase text-gray-500 mt-2">Qtd: {item.quantidade}</p>
                    </div>

                    <div className="text-right flex flex-col items-end gap-3">
                      <span className="text-xl md:text-2xl font-black tracking-tighter block">
                        R$ {(precoUnitario * item.quantidade).toFixed(2).replace('.', ',')}
                      </span>
                      <button 
                        onClick={() => removerDoCarrinho(item.id)} 
                        className="text-gray-300 hover:text-red-500 p-2 transition-colors"
                        title="Remover item"
                      >
                        <Trash2 size={22} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RESUMO DO PEDIDO: ESTILO PREMIUM */}
            <div className="lg:col-span-4 sticky top-24">
              <div className="bg-white p-8 rounded-[2.5rem] border border-black shadow-2xl space-y-8">
                <h2 className="text-2xl font-black uppercase italic tracking-tighter border-b border-gray-100 pb-4">Resumo</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between font-bold text-gray-400 uppercase text-[10px]">
                    <span>Subtotal</span>
                    <span className="text-black font-black">R$ {valorTotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between font-bold text-green-600 uppercase text-[10px]">
                    <span>Frete</span>
                    <span className="font-black">Grátis</span>
                  </div>
                  <div className="pt-6 border-t-2 border-black">
                    <div className="flex justify-between items-end">
                      <span className="font-black uppercase italic text-sm">Total Final</span>
                      <span className="text-4xl md:text-5xl font-black tracking-tighter">
                        R$ {valorTotal.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* BOTÃO QUE LEVA PARA O CHECKOUT */}
                <Link 
                  href="/checkout" 
                  className="w-full bg-[#FFD11D] hover:bg-black hover:text-white text-black py-5 rounded-full font-black uppercase italic text-sm transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95"
                >
                  Finalizar Compra <ArrowRight size={20} />
                </Link>
              </div>
            </div>

          </div>
        ) : (
          /* ESTADO VAZIO: ESTILO BANNER */
          <div className="bg-white rounded-[2.5rem] p-16 md:p-24 text-center border border-black flex flex-col items-center">
            <ShoppingBag size={80} strokeWidth={1} className="text-gray-100 mb-8" />
            <h2 className="text-3xl md:text-4xl font-black uppercase italic mb-10">Seu carrinho está vazio</h2>
            <Link href="/" className="bg-black text-[#FFD11D] px-12 py-5 rounded-full font-black uppercase italic text-sm hover:scale-105 transition-all shadow-lg">
              Explorar Produtos
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}