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
    
    if (window.Evergage) {
      try {
        // 1. Liberação técnica (Essencial para o Salesforce aceitar os dados)
        window.Evergage.sendInstanceConsent({
          purpose: "Tracking",
          action: "OptIn"
        });

        // 2. PASSO 1: Enviar o evento de consentimento
        // Usamos um pequeno delay de 200ms para o SDK registrar o OptIn antes do evento
        setTimeout(() => {
          window.Evergage.sendEvent({
            action: "Consentimento de Cookies Aceito"
          });
          
          // 3. Força o Sitemap a rodar agora que tem permissão
          window.Evergage.reinit();
          
          console.log("MCP: Passo 1 Concluído - Consentimento enviado!");
        }, 200);

      } catch (err) {
        console.error("MCP Erro:", err);
      }
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-6 z-[9999] flex flex-col md:flex-row items-center justify-between border-t border-gray-700 shadow-2xl">
      <div className="mb-4 md:mb-0 md:mr-8 font-sans text-left">
        <h3 className="text-lg font-bold mb-1">Privacidade e Personalização</h3>
        <p className="text-sm text-gray-400">
          Utilizamos cookies para personalizar sua experiência em nossas verticais.
        </p>
      </div>
      <div className="flex gap-4 shrink-0">
        <button 
          onClick={handleAccept}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-bold transition-all active:scale-95"
        >
          Aceitar e Continuar
        </button>
      </div>
    </div>
  );
}