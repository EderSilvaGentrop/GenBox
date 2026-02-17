// app/layout.tsx
import "./globals.css"; 
import { CartProvider } from '../context/CartContext'; 
import Footer from '../components/Footer'; 
import Script from "next/script";
import CookieBanner from "../components/CookieBanner"; // Importe o banner aqui

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        {/* SDK do Evergage */}
        <Script 
          src="https://cdn.evgnet.com/beacon/partnergentropbr/genboxecommerce/scripts/evergage.min.js"
          strategy="afterInteractive" 
        />

        <CartProvider>
          {children} 
          {/* Banner de Consentimento */}
          <CookieBanner />
          <Footer /> 
        </CartProvider>
      </body>
    </html>
  );
}