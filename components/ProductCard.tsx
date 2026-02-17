"use client"
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface ProductProps {
  id: string;
  name: string;
  price: string;
  image: string;
}

export default function ProductCard({ id, name, price, image }: ProductProps) {
  return (
    <Link href={`/produto/${id}`} className="block group">
      <div className="bg-white border-2 border-gray-100 p-2 rounded-2xl group-hover:border-brand-yellow transition-all duration-300 shadow-sm group-hover:shadow-xl h-full">
        <div className="aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 relative">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
        </div>
        <div className="mt-4 px-2 text-left">
          <h2 className="text-sm font-black text-black h-10 overflow-hidden leading-tight uppercase italic">{name}</h2>
          <div className="flex justify-between items-center mt-4 pb-2">
            <span className="text-lg font-black text-black">R$ {price}</span>
            <div className="bg-brand-yellow text-black p-2 rounded-xl group-hover:bg-black group-hover:text-brand-yellow transition-colors">
              <ShoppingCart size={18} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}