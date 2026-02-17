'use client'; // Necessário para interações e uso do localStorage no Next.js

import { useState, useEffect } from 'react';

// 1. DECLARAÇÃO PARA O TYPESCRIPT:
// Isso impede que o compilador reclame que 'Evergage' não existe no window.
declare global {
  interface Window {
    Evergage: any;
  }
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já deu consentimento anteriormente
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    // 1. Salva a preferência localmente no navegador imediatamente
    localStorage.setItem('cookie-consent', 'true');
    
    // 2. Tenta avisar o MCP (Evergage)
    // Verificamos se window.Evergage existe E se a função específica existe
    if (typeof window !== "undefined" && window.Evergage) {
      try {
        // Verifica se a função de consentimento está disponível
        if (typeof window.Evergage.sendInstanceConsent === "function") {
          window.Evergage.sendInstanceConsent({
            purpose: "Tracking",
            action: "OptIn"
          });
        }

        // Verifica se a função de reinicialização está disponível
        if (typeof window.Evergage.reinit === "function") {
          window.Evergage.reinit();
        }
        
        console.log("MCP: Consentimento registrado e SDK reiniciado.");
      } catch (error) {
        // Silencia erros caso o SDK esteja em processo de carregamento
        console.error("MCP: Erro ao interagir com o SDK:", error);
      }
    } else {
      console.warn("MCP: SDK ainda não carregado. O consentimento foi salvo e será lido na próxima navegação.");
    }

    // Esconde o banner após o clique
    setIsVisible(false);
  };

  // Se o usuário já aceitou, não renderiza nada
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-6 z-[9999] flex flex-col md:flex-row items-center justify-between shadow-2xl border-t border-gray-700">
      <div className="mb-4 md:mb-0 md:mr-8">
        <h3 className="text-lg font-bold mb-1">Privacidade e Cookies</h3>
        <p className="text-sm text-gray-300">
          Utilizamos cookies e tecnologias de rastreamento para entender como você interage com nosso site e oferecer ofertas personalizadas através do MCP.
        </p>
      </div>
      <div className="flex gap-4 shrink-0">
        <button 
          onClick={handleAccept}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-bold transition-all transform active:scale-95 shadow-lg"
        >
          Aceitar e Continuar
        </button>
      </div>
    </div>
  );
}