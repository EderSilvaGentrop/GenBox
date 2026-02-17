'use client'; // Necessário para interações e uso do localStorage no Next.js

import { useState, useEffect } from 'react';

// 1. DECLARAÇÃO PARA O TYPESCRIPT:
// Isso remove o erro de "propriedade não existe no objeto window"
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
    // 1. Salva a preferência localmente no navegador
    localStorage.setItem('cookie-consent', 'true');
    
    // 2. Avisa o SDK do Evergage (MCP) que o consentimento foi dado
    // Usamos uma verificação segura para garantir que o script já carregou
    if (typeof window !== "undefined" && window.Evergage) {
      try {
        window.Evergage.sendInstanceConsent({
          purpose: "Tracking",
          action: "OptIn"
        });

        // Força o sitemap a re-inicializar e capturar a página atual
        window.Evergage.reinit();
        
        console.log("MCP: Consentimento registrado com sucesso.");
      } catch (error) {
        console.error("MCP: Erro ao enviar sinal de consentimento:", error);
      }
    } else {
      // Caso o script ainda não tenha carregado, o Sitemap lerá o localStorage no próximo refresh
      console.warn("MCP: SDK ainda não carregado. O consentimento foi salvo localmente.");
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
          Utilizamos cookies e tecnologias de rastreamento para entender como você interage com nosso site e oferecer ofertas personalizadas.
        </p>
      </div>
      <div className="flex gap-4 shrink-0">
        <button 
          onClick={handleAccept}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-bold transition-all transform active:scale-95"
        >
          Aceitar e Continuar
        </button>
      </div>
    </div>
  );
}