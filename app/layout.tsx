// app/layout.tsx
import "./globals.css"; 
import { CartProvider } from '../context/CartContext'; 
import Footer from '../components/Footer'; 
import EvergageLoader from "../components/EvergageLoader"; // Novo Loader Dinâmico
import CookieBanner from "../components/CookieBanner";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        {/* Agora o carregamento é dinâmico baseado na vertical ativa */}
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