"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import ProductCard from './ProductCard';

// Importação dos estilos essenciais do Swiper
import 'swiper/css';
import 'swiper/css/pagination';

export default function ProductSlider({ produtos }: { produtos: any[] }) {
  if (!produtos) return null;

  return (
    <div className="w-full pb-12 relative">
      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        pagination={{ 
          clickable: true,
          bulletClass: 'swiper-pagination-bullet custom-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active'
        }}
        className="pb-12"
      >
        {produtos.map((p) => (
          <SwiperSlide key={p.id}>
            {/* AGORA PASSANDO O ID CORRETAMENTE */}
            <ProductCard 
              id={p.id} 
              name={p.nome} 
              price={p.preco} 
              image={p.img} 
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}