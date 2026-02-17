"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

type CartItem = { 
  id: number; 
  nome: string; 
  preco: any; 
  img: string; 
  quantidade: number; 
  categoria: string 
};

type CartContextType = {
  carrinho: CartItem[];
  adicionarAoCarrinho: (produto: any) => void;
  removerDoCarrinho: (id: number) => void;
  limparCarrinho: () => void;
  setItens: (itens: CartItem[]) => void;
  totalItens: number;
  valorTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const converterPreco = (preco: any): number => {
  if (typeof preco === 'number') return preco;
  const limpo = String(preco).replace('R$', '').replace('.', '').replace(',', '.').trim();
  const num = parseFloat(limpo);
  return isNaN(num) ? 0 : num;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [carrinho, setCarrinho] = useState<CartItem[]>([]);
  const [usuarioAtivo, setUsuarioAtivo] = useState<string | null>(null);

  useEffect(() => {
    const verificar = () => setUsuarioAtivo(localStorage.getItem('user_name'));
    verificar();
    window.addEventListener('storage', verificar);
    return () => window.removeEventListener('storage', verificar);
  }, []);

  // Carrega o carrinho específico do usuário
  useEffect(() => {
    const chave = usuarioAtivo ? `cart_${usuarioAtivo}` : 'cart_guest';
    const salvo = localStorage.getItem(chave);
    setCarrinho(salvo ? JSON.parse(salvo) : []);
  }, [usuarioAtivo]);

  // Salva o carrinho na chave do usuário atual
  useEffect(() => {
    const chave = usuarioAtivo ? `cart_${usuarioAtivo}` : 'cart_guest';
    localStorage.setItem(chave, JSON.stringify(carrinho));
  }, [carrinho, usuarioAtivo]);

  const adicionarAoCarrinho = (produto: any) => {
    setCarrinho(prev => {
      const existe = prev.find(item => String(item.id) === String(produto.id));
      if (existe) {
        return prev.map(item => 
          String(item.id) === String(produto.id) ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (id: number) => setCarrinho(prev => prev.filter(item => String(item.id) !== String(id)));
  const limparCarrinho = () => setCarrinho([]);
  const setItens = (itens: CartItem[]) => setCarrinho(itens);

  const totalItens = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
  const valorTotal = carrinho.reduce((sum, item) => sum + (converterPreco(item.preco) * item.quantidade), 0);

  return (
    <CartContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho, setItens, totalItens, valorTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de um CartProvider");
  return context;
};