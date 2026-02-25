'use client';

import { useState, useEffect } from 'react';

declare global {
  interface Window {
    Evergage: any;
  }
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    
    const evg = typeof window !== "undefined" ? window.Evergage : null;

    if (evg) {
      try {
        // A. Primeiro, o Opt-In técnico (destrava o rastreio)
        if (typeof evg.sendInstanceConsent === "function") {
          evg.sendInstanceConsent({
            purpose: "Tracking",
            action: "OptIn"
          });
        }

        // B. PASSO 1: Enviar o evento de consentimento para o MCP
        // Usamos um pequeno timeout de 300ms para garantir que o Opt-In acima 
        // já foi processado pelo servidor da Salesforce antes deste evento chegar.
        setTimeout(() => {
          if (typeof evg.sendEvent === "function") {
            const userName = localStorage.getItem('user_name');
            
            evg.sendEvent({
              action: "Consentimento de Cookies Aceito",
              user: userName ? { id: userName, attributes: { userName: userName } } : undefined
            });

            // C. Reinicia o Sitemap para capturar a página atual (Home ou Produto)
            if (typeof evg.reinit === "function") {
              evg.reinit();
            }
          }
          console.log("MCP: Evento de Consentimento enviado com sucesso.");
        }, 300);
        
      } catch (error) {
        console.error("MCP: Erro ao processar consentimento:", error);
      }
    }

    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-6 z-[9999] flex flex-col md:flex-row items-center justify-between shadow-2xl border-t border-gray-700">
      <div className="mb-4 md:mb-0 md:mr-8">
        <h3 className="text-lg font-bold mb-1 font-sans">Privacidade e Personalização</h3>
        <p className="text-sm text-gray-400 font-sans">
          Utilizamos cookies para entender sua navegação e oferecer ofertas personalizadas através do nosso sistema de inteligência (MCP).
        </p>
      </div>
      <div className="flex gap-4 shrink-0">
        <button 
          onClick={handleAccept}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-bold transition-all transform active:scale-95 shadow-md font-sans"
        >
          Aceitar e Continuar
        </button>
      </div>
    </div>
  );
}