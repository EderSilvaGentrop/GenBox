// components/EvergageLoader.tsx
"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

// Adicione isso logo após os imports
declare global {
  interface Window {
    SalesforceInteractions: any;
    Evergage: any;
  }
}

const SDK_MAP: Record<string, string> = {
  ecommerce: "https://cdn.c360a.salesforce.com/beacon/c360a/6c94305f-8537-46c1-b8f3-38c07bf94d3b/scripts/c360a.min.js",
  farmacia: "https://cdn.evgnet.com/beacon/partnergentropbr/genboxfarmacia/scripts/evergage.min.js",
  financeiro: "https://cdn.evgnet.com/beacon/partnergentropbr/genboxfinanceiro/scripts/evergage.min.js",
  educacao: "https://cdn.evgnet.com/beacon/partnergentropbr/genboxeducacional/scripts/evergage.min.js",
};

export default function EvergageLoader() {
  const [vertical, setVertical] = useState<string | null>(null);

  useEffect(() => {
    // Busca a vertical no localStorage
    const activeVertical = localStorage.getItem('mcp_vertical_teste') || 'ecommerce';
    setVertical(activeVertical);
  }, []);

  if (!vertical) return null;

  const sdkUrl = SDK_MAP[vertical] || SDK_MAP.ecommerce;
  const isDataCloud = vertical === 'ecommerce';

  return (
    <>
      {/* 1. Inicialização do Namespace Global */}
      <Script id="mcp-init" strategy="afterInteractive">
        {`
          (function() {
            // Se for Data Cloud (ecommerce), priorizamos o SalesforceInteractions
            // Se forem as outras verticais, priorizamos o Evergage
            window.SalesforceInteractions = window.SalesforceInteractions || { queue: [] };
            window.Evergage = window.Evergage || { queue: [] };
            
            console.log("MCP: Namespaces inicializados para vertical: ${vertical}");
          })();
        `}
      </Script>

      {/* 2. Carregamento Dinâmico do SDK */}
      <Script 
        src={sdkUrl}
        strategy="afterInteractive"
        onLoad={() => {
          console.log(`MCP: SDK carregado com sucesso (${vertical})`);
          
          // Força o SDK a re-analisar a página, comum em SPAs como Next.js
          if (isDataCloud && window.SalesforceInteractions && typeof window.SalesforceInteractions.reindex === 'function') {
            window.SalesforceInteractions.reindex();
          } else if (window.Evergage && typeof window.Evergage.reindex === 'function') {
            window.Evergage.reindex();
          }
        }}
        onError={(e) => {
          console.error("MCP: Erro ao carregar o script do SDK", e);
        }}
      />
    </>
  );
}