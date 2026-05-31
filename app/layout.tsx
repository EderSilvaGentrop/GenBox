// app/layout.tsx
import "./globals.css"; 
import { CartProvider } from '../context/CartContext'; 
import Footer from '../components/Footer'; 
import EvergageLoader from "../components/EvergageLoader"; 
import CookieBanner from "../components/CookieBanner";
import Script from "next/script"; // 1. Importa o componente de Script do Next.js

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <head>
        {/* 2. Injeta o arquivo principal do SDK com prioridade máxima */}
        <Script 
          src="https://sitegenbox.vercel.app/c360a.min.js" // URL do seu script baseado nos logs anteriores
          strategy="beforeInteractive"
        />
      </head>
      <body>
        {/* Mantém o Loader se ele carregar as regras de negócio/sitemap dinâmico */}
        <EvergageLoader />

        <CartProvider>
          {children} 
          <CookieBanner />
          <Footer /> 
        </CartProvider>
      </body>
    </html>
  );
}