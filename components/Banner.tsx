"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Importação dos estilos do Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Banner() {
  return (
    <section className="w-full h-[400px] md:h-[500px] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="h-full w-full"
      >
        {[...Array(10)].map((_, i) => (
          <SwiperSlide key={i}>
            <div className={`w-full h-full flex items-center justify-center ${i % 2 === 0 ? 'bg-[#FFD11D]' : 'bg-black'}`}>
              <div className="text-center px-4">
                <h2 className={`text-4xl md:text-6xl font-black uppercase ${i % 2 === 0 ? 'text-black' : 'text-[#FFD11D]'}`}>
                  PROMOÇÃO {i + 1}
                </h2>
                <p className={`mt-4 text-lg md:text-xl font-bold ${i % 2 === 0 ? 'text-black' : 'text-white'}`}>
                  Aproveite os testes exclusivos do MCP no seu e-commerce.
                </p>
                <button className={`mt-8 px-8 py-3 rounded-full font-black transition-transform hover:scale-105 ${i % 2 === 0 ? 'bg-black text-[#FFD11D]' : 'bg-[#FFD11D] text-black'}`}>
                  SAIBA MAIS
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}