// components/EvergageLoader.tsx
"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const SDK_MAP: Record<string, string> = {
  ecommerce: "https://cdn.c360a.salesforce.com/beacon/c360a/6c94305f-8537-46c1-b8f3-38c07bf94d3b/scripts/c360a.min.js",
  farmacia: "https://cdn.evgnet.com/beacon/partnergentropbr/genboxfarmacia/scripts/evergage.min.js",
  financeiro: "https://cdn.evgnet.com/beacon/partnergentropbr/genboxfinanceiro/scripts/evergage.min.js",
  educacao: "https://cdn.evgnet.com/beacon/partnergentropbr/genboxeducacional/scripts/evergage.min.js",
};

export default function EvergageLoader() {
  const [vertical, setVertical] = useState<string | null>(null);

  useEffect(() => {
    const activeVertical = localStorage.getItem('mcp_vertical_teste') || 'ecommerce';
    setVertical(activeVertical);
  }, []);

  if (!vertical) return null;

  const isDataCloud = vertical === 'ecommerce';
  const sdkUrl = SDK_MAP[vertical];

  return (
    <>
      <Script id="mcp-init" strategy="afterInteractive">
        {isDataCloud 
          ? `window.SalesforceInteractions = window.SalesforceInteractions || { queue: [] };`
          : `window.Evergage = window.Evergage || { queue: [] };`
        }
      </Script>

      <Script 
        src={sdkUrl}
        strategy="afterInteractive"
        onLoad={() => {
          console.log(`MCP SDK (${vertical}) loaded:`, sdkUrl);
        }}
      />
    </>
  );
}