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

  // 1. Injeta o script logo na montagem da página se ele não existir
  useEffect(() => {
    const salva = localStorage.getItem('mcp_vertical_teste');
    if (salva && VERTICAIS[salva]) setVertical(salva);

    const scriptExistente = document.querySelector('script[src*="c360a.min.js"]');
    if (!scriptExistente && typeof window !== "undefined") {
      const script = document.createElement('script');
      script.src = "https://sitegenbox.vercel.app/c360a.min.js"; 
      script.id = "sf-interactions-sdk";
      script.async = true;
      document.head.appendChild(script);
    }
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

  // Executa os passos de transição visível e redirecionamento do e-commerce
  const finalizarProcessoCadastro = () => {
    setEnviado(true);
    setTimeout(() => {
      router.push('/');
    }, 3000);
  };

  // 2. Função isolada para disparar o evento retornando a Promise do SDK
  const despacharDadosSalesforce = (SI: any, callbackFinalizar: () => void) => {
    const partesDoNome = nome.trim().split(/\s+/);
    const primeiroNome = partesDoNome[0] || "Usuário";
    const sobrenome = partesDoNome.slice(1).join(' ') || "";

    // Certifica o envio aguardando a Promise do sendEvent resolver
    SI.sendEvent({
      interaction: {
        name: "User Register", 
      },
      userProfileAttr: {
        id: email.trim(),               
        firstName: primeiroNome,        
        lastName: sobrenome,            
        emailAddress: email.trim(),     
        cpf: cpf.replace(/\D/g, "")     
      }
    })
    .then(() => {
      console.log("Salesforce Debug: Cadastro transmitido com sucesso via SDK!", email);
      callbackFinalizar(); 
    })
    .catch((err: any) => {
      console.error("Salesforce Erro no processamento do evento:", err);
      // Avança de qualquer forma para não quebrar o fluxo do usuário caso o servidor demore a responder
      callbackFinalizar(); 
    });
  };

  const handleCadastro = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!nome.trim() || !email.trim() || !cpf.trim()) return;
  
    localStorage.setItem('user_name', nome);
    localStorage.setItem('user_email', email);
    localStorage.setItem('user_cpf', cpf);
  
    // 3. ESTRATÉGIA RESILIENTE DE POLLING (INTERVALO) SEM TRAVAMENTO
    if (typeof window !== "undefined") {
      const SI = (window as any).SalesforceInteractions || (window as any).SI || (window as any).Evergage;
  
      if (SI && typeof SI.sendEvent === "function") {
        // Cenário A: O script já está totalmente pronto no escopo global
        despacharDadosSalesforce(SI, finalizarProcessoCadastro);
      } else {
        // Cenário B: O script está injetado mas o objeto do window está terminando de iniciar
        console.log("Salesforce Debug: Aguardando inicialização do escopo global...");
        
        let tentativas = 0;
        const checarSDK = setInterval(() => {
          tentativas++;
          const SI_REAVALIADO = (window as any).SalesforceInteractions || (window as any).SI || (window as any).Evergage;
          
          if (SI_REAVALIADO && typeof SI_REAVALIADO.sendEvent === "function") {
            clearInterval(checarSDK);
            despacharDadosSalesforce(SI_REAVALIADO, finalizarProcessoCadastro);
          } 
          // Limite de segurança (Timeout): Após 2 segundos (20 tentativas), libera o usuário para evitar o congelamento da tela
          else if (tentativas >= 20) {
            clearInterval(checarSDK);
            console.warn("Salesforce Timeout: Avançando cadastro sem rastreamento para evitar travamento da UI.");
            finalizarProcessoCadastro();
          }
        }, 100); // Executa a checagem a cada 100 milissegundos
      }
    } else {
      finalizarProcessoCadastro();
    }
  };

  return (
    <main className="min-h-screen bg-white text-black font-sans pb-20">
      <Header />
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