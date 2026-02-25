// components/EvergageLoader.tsx
"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const SDK_MAP: Record<string, string> = {
  ecommerce: "https://cdn.evgnet.com/beacon/partnergentropbr/genboxecommerce/scripts/evergage.min.js",
  farmacia: "https://cdn.evgnet.com/beacon/partnergentropbr/genboxfarmacia/scripts/evergage.min.js",
  financeiro: "https://cdn.evgnet.com/beacon/partnergentropbr/genboxfinanceiro/scripts/evergage.min.js",
  educacao: "https://cdn.evgnet.com/beacon/partnergentropbr/genboxeducacional/scripts/evergage.min.js",
};

export default function EvergageLoader() {
  const [sdkUrl, setSdkUrl] = useState<string | null>(null);

  useEffect(() => {
    // Busca a vertical no localStorage (mesma chave do seu page.tsx)
    const activeVertical = localStorage.getItem('mcp_vertical_teste') || 'ecommerce';
    
    // Define a URL baseada no mapeamento
    setSdkUrl(SDK_MAP[activeVertical] || SDK_MAP.ecommerce);
  }, []);

  if (!sdkUrl) return null;

  return (
    <Script 
      src={sdkUrl}
      strategy="afterInteractive" 
    />
  );
}