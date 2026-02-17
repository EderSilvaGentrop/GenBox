"use client"
import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, CreditCard, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* COLUNA 1: LOGO SEM O BLOCO BRANCO */}
        <div className="space-y-6">
          <Link href="/" className="inline-block">
            <img 
              src="https://image.s7.sfmc-content.com/lib/fe3611717d64047a751771/m/1/a393fd36-a6dd-46db-a533-13000ee21ca1.png" 
              alt="Logo Rodapé" 
              className="h-12 w-auto object-contain" // Filtro removido para evitar o bloco branco
            />
          </Link>
          <p className="text-gray-400 text-xs font-bold uppercase italic leading-relaxed opacity-70">
            Tecnologia, estilo e inovação em um só lugar. Explore o futuro com a gente.
          </p>
          <div className="flex gap-4">
            <Instagram size={18} className="hover:text-[#FFD11D] cursor-pointer transition-colors" />
            <Facebook size={18} className="hover:text-[#FFD11D] cursor-pointer transition-colors" />
            <Twitter size={18} className="hover:text-[#FFD11D] cursor-pointer transition-colors" />
          </div>
        </div>

        {/* COLUNA 2: CATEGORIAS */}
        <div className="space-y-4">
          <h4 className="font-black uppercase italic text-[#FFD11D] tracking-widest text-[10px]">Categorias</h4>
          <ul className="space-y-2 text-[11px] text-gray-400 font-black uppercase italic">
            <li><Link href="/categoria/tecnologia" className="hover:text-white transition-colors">Tech & Inovação</Link></li>
            <li><Link href="/categoria/looks" className="hover:text-white transition-colors">Style & Atitude</Link></li>
            <li><Link href="/categoria/acessorios" className="hover:text-white transition-colors">Acessórios</Link></li>
            <li><Link href="/categoria/ofertas" className="hover:text-white transition-colors">Ofertas</Link></li>
          </ul>
        </div>

        {/* COLUNA 3: ATENDIMENTO */}
        <div className="space-y-4">
          <h4 className="font-black uppercase italic text-[#FFD11D] tracking-widest text-[10px]">Atendimento</h4>
          <ul className="space-y-2 text-[11px] text-gray-400 font-black uppercase italic">
            <li className="hover:text-white cursor-pointer">Meus Pedidos</li>
            <li className="hover:text-white cursor-pointer">Trocas e Devoluções</li>
            <li className="hover:text-white cursor-pointer">Termos de Uso</li>
            <li className="hover:text-white cursor-pointer">Privacidade</li>
          </ul>
        </div>

        {/* COLUNA 4: SEGURANÇA */}
        <div className="space-y-6">
          <h4 className="font-black uppercase italic text-[#FFD11D] tracking-widest text-[10px]">Certificados</h4>
          <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 group hover:border-[#FFD11D] transition-all">
            <ShieldCheck className="text-[#FFD11D]" size={28} />
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase italic leading-tight text-white">Ambiente Seguro</span>
              <span className="text-[8px] font-bold text-gray-500 uppercase">Criptografia SSL</span>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-[1400px] mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center">
        <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em]">
          © 2026 LOJA ONLINE - TODOS OS DIREITOS RESERVADOS
        </p>
      </div>
    </footer>
  );
}