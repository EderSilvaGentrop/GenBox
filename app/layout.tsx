import "./globals.css"; 
import type { Metadata } from "next";
import { CartProvider } from '../context/CartContext'; 
import Footer from '../components/Footer'; // 1. IMPORTAÇÃO DO FOOTER

export const metadata: Metadata = {
  title: "Loja Online | Preços Baixos",
  description: "E-commerce realista",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <CartProvider>
          {/* O conteúdo da página (Home, Produto, etc) entra aqui */}
          {children} 
          
          {/* 2. O FOOTER APARECE ABAIXO DE TUDO EM TODAS AS PÁGINAS */}
          <Footer /> 
        </CartProvider>
      </body>
    </html>
  );
}