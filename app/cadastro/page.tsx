"use client"
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useRouter } from 'next/navigation';
import { User, Mail, Fingerprint, ArrowRight, CheckCircle } from 'lucide-react';

// Configuração local das verticais para alimentar o menu
const VERTICAIS: Record<string, any> = {
  ecommerce: { categorias: [{ nome: "TECNOLOGIA" }, { nome: "ACESSÓRIOS" }, { nome: "PAPELARIA" }, { nome: "LOOKS" }] },
  farmacia: { categorias: [{ nome: "MEDICAMENTOS" }, { nome: "DERMO" }, { nome: "SUPLEMENTOS" }, { nome: "HIGIENE" }] },
  financeiro: { categorias: [{ nome: "CARTÕES" }, { nome: "INVESTIMENTOS" }, { nome: "SEGUROS" }, { nome: "EMPRÉSTIMOS" }] },
  educacao: { categorias: [{ nome: "GRADUAÇÃO" }, { nome: "PÓS-GRADUAÇÃO" }, { nome: "CURSOS LIVRES" }, { nome: "EXTENSÃO" }] }
};

export default function CadastroPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [vertical, setVertical] = useState('ecommerce');
  const router = useRouter();

  // Recupera a vertical ativa para manter a identidade visual
  useEffect(() => {
    const salva = localStorage.getItem('mcp_vertical_teste');
    if (salva && VERTICAIS[salva]) setVertical(salva);
  }, []);

  const config = VERTICAIS[vertical] || VERTICAIS.ecommerce;

  const mascaraCPF = (value: string) => {
    return value
      .replace(/\D/g, '') 
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1'); 
  };

  const handleCadastro = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome.trim()) {
      localStorage.setItem('user_name', nome);
      setEnviado(true);
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black font-sans pb-20">
      <Header />
      {/* Navbar agora recebe as categorias dinâmicas */}
      <Navbar categorias={config.categorias} />

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12 md:py-24 flex justify-center">
        <div className="w-full max-w-xl bg-white rounded-[3rem] p-8 md:p-16 border border-black shadow-2xl space-y-10 min-h-[500px] flex flex-col justify-center">
          {!enviado ? (
            <>
              <div className="text-center space-y-2">
                <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                  CADASTRO <span className="text-[#FFD11D]">/</span>
                </h1>
                <p className="text-[10px] md:text-xs font-bold uppercase italic opacity-60">
                  Crie sua conta para a vertical {vertical}
                </p>
              </div>

              <form onSubmit={handleCadastro} className="space-y-6">
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors">
                    <User size={20} />
                  </div>
                  <input 
                    type="text" 
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="NOME COMPLETO" 
                    className="w-full border-2 border-black rounded-full pl-16 pr-8 py-5 text-xs font-black uppercase italic outline-none focus:bg-[#FFD11D]/10 transition-all shadow-inner"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors">
                    <Mail size={20} />
                  </div>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="SEU MELHOR E-MAIL" 
                    className="w-full border-2 border-black rounded-full pl-16 pr-8 py-5 text-xs font-black uppercase italic outline-none focus:bg-[#FFD11D]/10 transition-all shadow-inner"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors">
                    <Fingerprint size={20} />
                  </div>
                  <input 
                    type="text" 
                    required
                    maxLength={14}
                    value={cpf}
                    onChange={(e) => setCpf(mascaraCPF(e.target.value))}
                    placeholder="000.000.000-00" 
                    className="w-full border-2 border-black rounded-full pl-16 pr-8 py-5 text-xs font-black uppercase italic outline-none focus:bg-[#FFD11D]/10 transition-all shadow-inner"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-black text-[#FFD11D] py-6 rounded-full font-black uppercase italic text-sm hover:scale-[1.02] transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95"
                >
                  CRIAR MINHA CONTA <ArrowRight size={20} />
                </button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-6 animate-in zoom-in duration-500">
              <div className="flex justify-center">
                <div className="bg-[#FFD11D] p-5 rounded-full border border-black shadow-lg">
                  <CheckCircle size={60} className="text-black" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">
                  CADASTRO EFETUADO <br/> COM SUCESSO<span className="text-[#FFD11D]">.</span>
                </h2>
                <p className="text-xs font-bold uppercase italic opacity-60">
                  Bem-vindo ao clube, {nome.split(' ')[0]}! Redirecionando...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}