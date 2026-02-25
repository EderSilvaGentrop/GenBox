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
        // A. Primeiro, o Opt-In técnico (essencial para destravar o rastreio)
        if (typeof evg.sendInstanceConsent === "function") {
          evg.sendInstanceConsent({
            purpose: "Tracking",
            action: "OptIn"
          });
        }

        // B. Envia o evento de consentimento da forma mais simples possível
        // Sem objetos complexos para evitar erros de validação
        setTimeout(() => {
          if (typeof evg.sendEvent === "function") {
            evg.sendEvent({
              action: "Consentimento de Cookies Aceito"
            });
            
            // C. Avisa o Sitemap para começar a rastrear a página
            if (typeof evg.reinit === "function") {
              evg.reinit();
            }
          }
          console.log("MCP: Evento de Consentimento enviado.");
        }, 500); // Aumentamos um pouco o tempo para estabilidade
        
      } catch (error) {
        console.error("MCP: Erro no banner:", error);
      }
    }

    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-6 z-[9999] flex flex-col md:flex-row items-center justify-between border-t border-gray-700">
      <div className="mb-4 md:mb-0 md:mr-8 font-sans">
        <h3 className="text-lg font-bold mb-1">Privacidade e Personalização</h3>
        <p className="text-sm text-gray-400">
          Utilizamos cookies para personalizar sua experiência.
        </p>
      </div>
      <div className="flex gap-4 shrink-0">
        <button 
          onClick={handleAccept}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-bold transition-all font-sans"
        >
          Aceitar e Continuar
        </button>
      </div>
    </div>
  );
}