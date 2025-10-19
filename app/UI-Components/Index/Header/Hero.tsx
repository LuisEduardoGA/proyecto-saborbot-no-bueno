"use client";
import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";
import Image from "next/image";

import Hero1 from "@/public/hero-img1.png";
import Hero2 from "@/public/hero-img2.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useEffect } from "react";

export default function Hero() {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || !prevRef.current || !nextRef.current) return;

    swiper.params.navigation = {
      ...(swiper.params.navigation || {}),
      prevEl: prevRef.current,
      nextEl: nextRef.current,
    };
    swiper.navigation.destroy();
    swiper.navigation.init();
    swiper.navigation.update();
  }, []);

  return (
    <div className="px-[8%] lg:px-[12%] py-5">
      <div className="relative p-10 px-20 Hero flex items-center gap-5">
        <Swiper
          slidesPerView={1}
          loop
          modules={[Navigation]}
          navigation={false}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="hero-wrap w-full flex flex-col lg:flex-row items-center justify-between">
              <div className="w-full lg:w-1/1">
                <h1 className="Merienda text-2xl lg:text-[3.6rem] font-bold">
                  Recetario mexicano: fácil, casero y con mucho sabor
                </h1>
                <p className="w-[80%] my-3">
                  Explora platillos tradicionales y contemporáneos con pasos claros,
                  ingredientes accesibles y tips prácticos. ¡Cocina como en casa!
                </p>
                <Link
                  href="/UI-Components/Shop"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-white font-bold mt-5 bg-[var(--prim-color)] hover:bg-white hover:text-[var(--prim-color)] transition-all duration-300"
                >
                  Explorar recetas <i className="bi bi-journal-text"></i>
                </Link>
              </div>
              <div className="hero-image w-full lg:w-1/2">
                <Image src={Hero1} alt="Recetario portada 1" className="Hero-image" />
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="hero-wrap w-full flex flex-col lg:flex-row items-center justify-between">
              <div className="w-full lg:w-1/1">
                <h1 className="Merienda text-2xl lg:text-[3.6rem] font-bold">
                  Nuevas recetas cada semana: postres, sopas y platos fuertes
                </h1>
                <p className="w-[80%] my-3">
                  Usa filtros por categoría o tag y encuentra la receta perfecta: desde antojitos
                  hasta moles y bebidas tradicionales.
                </p>
                <Link
                  href="/UI-Components/Shop?tag=Postre"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-white font-bold mt-5 bg-[var(--prim-color)] hover:bg-white hover:text-[var(--prim-color)] transition-all duration-300"
                >
                  Ver postres <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
              <div className="hero-image w-full lg:w-1/2">
                <Image src={Hero2} alt="Recetario portada 2" className="Hero-image" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Controles */}
        <div
          ref={prevRef}
          className="swiper-button-prev-custom absolute left-5 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 px-3 py-2 shadow hover:bg-white"
        >
          <i className="ri-arrow-left-s-line text-2xl text-gray-800"></i>
        </div>

        <div
          ref={nextRef}
          className="swiper-button-next-custom absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 px-3 py-2 shadow hover:bg-white"
        >
          <i className="ri-arrow-right-s-line text-2xl text-gray-800"></i>
        </div>
      </div>
    </div>
  );
}
