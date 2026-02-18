'use client'; // Essencial para rodar no lado do cliente no Next.js

import { useState, useEffect } from 'react';

// 1. Definição Global para o TypeScript
// Isso evita o erro de 'Evergage does not exist on type Window'
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
    // 1. Salva a escolha do usuário no navegador
    localStorage.setItem('cookie-consent', 'true');
    
    // 2. Tenta avisar o MCP (Evergage) de forma segura
    const evg = typeof window !== "undefined" ? window.Evergage : null;

    if (evg) {
      try {
        // Verifica se as funções específicas já foram injetadas pelo SDK
        if (typeof evg.sendInstanceConsent === "function") {
          evg.sendInstanceConsent({
            purpose: "Tracking",
            action: "OptIn"
          });
        }

        // Força a re-análise da página agora com permissão
        if (typeof evg.reinit === "function") {
          evg.reinit();
        }
        
        console.log("MCP: Consentimento registrado e rastreio iniciado.");
      } catch (error) {
        console.error("MCP: Erro ao interagir com o SDK:", error);
      }
    } else {
      // Se o script ainda estiver carregando, o sitemap lerá o localStorage no próximo clique/página
      console.warn("MCP: SDK ainda não carregado. O consentimento foi salvo localmente.");
    }

    // Fecha o banner visualmente
    setIsVisible(false);
  };

  // Se o consentimento já existe, o banner não aparece
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