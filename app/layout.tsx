import "./globals.css"; 
import type { Metadata } from "next";
import { CartProvider } from '../context/CartContext'; 
import Footer from '../components/Footer';
import Script from "next/script"; // Importação necessária para scripts externos

export const metadata: Metadata = {
  title: "Loja Online | Preços Baixos",
  description: "E-commerce realista",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        {/* SDK Evergage para captura do site inteiro */}
        <Script 
          src="https://cdn.evgnet.com/beacon/partnergentropbr/genboxecommerce/scripts/evergage.min.js"
          strategy="afterInteractive" 
        />

        <CartProvider>
          {/* O conteúdo da página (Home, Produto, etc) entra aqui */}
          {children} 
          
          {/* O FOOTER APARECE ABAIXO DE TUDO EM TODAS AS PÁGINAS */}
          <Footer /> 
        </CartProvider>
      </body>
    </html>
  );
}