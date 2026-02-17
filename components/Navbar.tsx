"use client"
import React from 'react';
import Link from 'next/link';

interface Categoria {
  nome: string;
}

interface NavbarProps {
  categorias?: Categoria[];
  verticalAtiva?: string;
  onTrocarVertical?: (v: string) => void;
}

export default function Navbar({ categorias, verticalAtiva, onTrocarVertical }: NavbarProps) {
  const listaVerticais = ["ecommerce", "farmacia", "financeiro", "educacao"];

  return (
    <nav className="w-full bg-[#1e293b] py-3 border-b border-black/10 relative z-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* CATEGORIAS À ESQUERDA */}
        <div className="flex justify-center md:justify-start items-center gap-6 md:gap-12 overflow-x-auto no-scrollbar w-full md:w-auto">
          {categorias?.map((cat, idx) => (
            <Link 
              key={idx} 
              href={`/categoria/${cat.nome.toLowerCase()}`}
              className="text-white text-xs md:text-sm font-black uppercase italic tracking-tighter hover:text-[#FFD11D] transition-colors whitespace-nowrap"
            >
              {cat.nome}
            </Link>
          ))}
        </div>

        {/* SELETOR À DIREITA */}
        {onTrocarVertical && (
          <div className="flex items-center gap-2 bg-black/20 p-1 rounded-full border border-white/5 ml-auto">
            {listaVerticais.map((v) => (
              <button
                key={v}
                onClick={() => onTrocarVertical(v)}
                className={`text-[8px] font-black uppercase px-4 py-1.5 rounded-full transition-all border ${
                  verticalAtiva === v 
                    ? 'bg-[#FFD11D] text-black border-[#FFD11D] scale-105 shadow-md' 
                    : 'text-white/60 border-transparent hover:bg-white/5'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}