"use client"
import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, ShoppingCart, ChevronDown, LogOut } from 'lucide-react';
import produtos from '../produtos.json';
import { useCart } from '../context/CartContext';

function HeaderContent() {
  const [busca, setBusca] = useState('');
  const [sugestoes, setSugestoes] = useState<any[]>([]);
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  
  // Adicionado 'setItens' para zerar o estado global do carrinho no logout
  const { totalItens, setItens } = useCart(); 
  const router = useRouter();
  const searchParams = useSearchParams();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nomeSalvo = localStorage.getItem('user_name');
    if (nomeSalvo) setUserName(nomeSalvo);
  }, []);

  // Lógica de Sair atualizada para limpar dados por usuário
  const handleSair = () => {
    localStorage.removeItem('user_name');
    // Limpa o carrinho atual do localStorage para evitar que o próximo usuário o veja
    localStorage.removeItem('cart_items'); 
    
    // Zera o estado global para que o contador (totalItens) volte a 0 imediatamente
    if (setItens) setItens([]); 
    
    setUserName(null);
    router.push('/');
  };

  useEffect(() => {
    const query = searchParams.get('search') || '';
    setBusca(query);
  }, [searchParams]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setMostrarSugestoes(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const aoDigitar = (texto: string) => {
    setBusca(texto);
    if (texto.trim().length > 0) {
      const filtrados = produtos.filter(p => 
        p.nome.toLowerCase().includes(texto.toLowerCase()) ||
        p.categoria.toLowerCase().includes(texto.toLowerCase())
      ).slice(0, 6);
      
      setSugestoes(filtrados);
      setMostrarSugestoes(true);
      router.replace(`/?search=${encodeURIComponent(texto)}`, { scroll: false });
    } else {
      setSugestoes([]);
      setMostrarSugestoes(false);
      router.replace('/', { scroll: false });
    }
  };

  const irParaProduto = (e: React.FormEvent) => {
    e.preventDefault();
    const termo = busca.toLowerCase().trim();
    const encontrado = produtos.find(p => p.nome.toLowerCase().includes(termo));
    if (encontrado) {
      setMostrarSugestoes(false);
      router.push(`/produto/${encontrado.id}`);
    }
  };

  return (
    <header className="w-full bg-[#FFD11D] text-black py-2 px-4 md:px-10 flex items-center gap-6 shadow-md sticky top-0 z-50">
      
      {/* LOGO OFICIAL */}
      <Link href="/" className="p-2 transition-all cursor-pointer flex-shrink-0">
        <img 
          src="https://image.s7.sfmc-content.com/lib/fe3611717d64047a751771/m/1/a393fd36-a6dd-46db-a533-13000ee21ca1.png" 
          alt="Logo Oficial" 
          className="h-10 md:h-12 w-auto object-contain"
        />
      </Link>

      {/* BARRA DE PESQUISA */}
      <div ref={wrapperRef} className="flex-1 relative">
        <form 
          onSubmit={irParaProduto} 
          className={`flex h-11 rounded-lg overflow-hidden border-2 transition-all bg-white shadow-inner ${mostrarSugestoes ? 'border-black rounded-b-none' : 'border-transparent focus-within:border-black'}`}
        >
          <input 
            type="text" 
            value={busca}
            onFocus={() => busca.length > 0 && setMostrarSugestoes(true)}
            onChange={(e) => aoDigitar(e.target.value)}
            placeholder="O que você está procurando hoje?" 
            className="flex-1 px-4 text-sm outline-none text-black font-medium"
          />
          <button type="submit" className="bg-black text-[#FFD11D] px-6 hover:bg-gray-800 transition-colors">
            <Search size={22} strokeWidth={3} />
          </button>
        </form>

        {mostrarSugestoes && sugestoes.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white border-x-2 border-b-2 border-black rounded-b-lg shadow-2xl z-[60] overflow-hidden">
            {sugestoes.map((produto) => (
              <Link
                key={produto.id}
                href={`/produto/${produto.id}`}
                onClick={() => {
                  setMostrarSugestoes(false);
                  setBusca(produto.nome);
                }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 border-b border-gray-100 last:border-none transition-colors group"
              >
                <Search size={14} className="text-gray-400 group-hover:text-black" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800 line-clamp-1">{produto.nome}</span>
                  <span className="text-[10px] text-gray-400 uppercase font-bold">{produto.categoria}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden md:flex items-center gap-3 border-r border-black/10 pr-4">
          <Link href="/cadastro" className="flex flex-col p-2 cursor-pointer leading-tight group">
            <span className="text-[10px] font-bold uppercase opacity-60 italic">
              {userName ? 'Bem Vindo,' : 'Olá, Visitante'}
            </span>
            <div className="flex items-center">
              <span className="text-[13px] font-black uppercase group-hover:underline tracking-tighter italic">
                {userName ? userName : 'Minha Conta'}
              </span>
              {!userName && <ChevronDown size={14} className="ml-1" />}
            </div>
          </Link>

          {userName && (
            <button 
              onClick={handleSair}
              className="flex items-center gap-1 bg-black text-white px-3 py-1.5 rounded-full hover:bg-red-600 transition-colors group"
            >
              <LogOut size={14} />
              <span className="text-[10px] font-black uppercase italic">Sair</span>
            </button>
          )}
        </div>

        <Link href="/carrinho" className="flex items-end gap-1 p-2 cursor-pointer relative group">
          <div className="relative">
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-black text-[#FFD11D] text-[10px] font-black px-1.5 rounded-full shadow-sm">
              {totalItens}
            </span>
            <ShoppingCart size={28} />
          </div>
          <span className="font-black text-[12px] uppercase mb-1 hidden lg:block group-hover:underline italic tracking-tighter">
            Carrinho
          </span>
        </Link>
      </div>
    </header>
  );
}

export default function Header() {
  return (
    <Suspense fallback={<div className="h-16 bg-[#FFD11D] w-full" />}>
      <HeaderContent />
    </Suspense>
  );
}