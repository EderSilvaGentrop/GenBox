'use client';

import { useState, useEffect } from 'react';

// 1. Definição Global para o TypeScript
declare global {
  interface Window {
    Evergage: any;
  }
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já tomou uma decisão anteriormente
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    // 1. Salva a escolha do usuário no navegador imediatamente
    localStorage.setItem('cookie-consent', 'true');
    
    const evg = typeof window !== "undefined" ? window.Evergage : null;

    if (evg) {
      try {
        // A. Consentimento técnico: Destrava o envio de dados no servidor da Salesforce
        if (typeof evg.sendInstanceConsent === "function") {
          evg.sendInstanceConsent({
            purpose: "Tracking",
            action: "OptIn"
          });
        }

        // B. Delay de segurança (300ms): 
        // Em vez de enviar um evento manual que gera conflito de tempo, 
        // apenas reiniciamos o Sitemap. Ele enviará automaticamente o evento 
        // da página atual (Home ou Produto) agora que tem permissão.
        setTimeout(() => {
          if (typeof evg.reinit === "function") {
            evg.reinit();
            console.log("MCP: Rastreio ativado e Sitemap reinicializado.");
          }
        }, 300);
        
      } catch (error) {
        console.error("MCP: Erro ao ativar o SDK:", error);
      }
    } else {
      console.warn("MCP: SDK do Evergage não detectado no momento do clique.");
    }

    // Fecha o banner visualmente
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-6 z-[9999] flex flex-col md:flex-row items-center justify-between shadow-2xl border-t border-gray-700">
      <div className="mb-4 md:mb-0 md:mr-8">
        <h3 className="text-lg font-bold mb-1">Privacidade e Personalização</h3>
        <p className="text-sm text-gray-400">
          Utilizamos cookies para entender sua navegação e oferecer ofertas personalizadas através do nosso sistema de inteligência (MCP).
        </p>
      </div>
      <div className="flex gap-4 shrink-0">
        <button 
          onClick={handleAccept}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-bold transition-all transform active:scale-95 shadow-md"
        >
          Aceitar e Continuar
        </button>
      </div>
    </div>
  );
}