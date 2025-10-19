"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import brand1 from "@/public/brand-img1.png";
import brand2 from "@/public/brand-img2.png";
import brand3 from "@/public/brand-img3.png";
import brand4 from "@/public/brand-img4.png";
import brand5 from "@/public/brand-img5.png";
import brand6 from "@/public/brand-img6.png";
import brand7 from "@/public/brand-img7.png";
import brand8 from "@/public/brand-img8.png";

const brands = [
  { img: brand1, name: "Yucatán" },
  { img: brand2, name: "Puebla" },
  { img: brand3, name: "Jalisco" },
  { img: brand4, name: "CDMX" },
  { img: brand5, name: "Oaxaca" },
  { img: brand6, name: "Veracruz" },
  { img: brand7, name: "Michoacán" },
  { img: brand8, name: "Norte" },
];

export default function Brands() {
  return (
    <div className="px-[8%] lg:px-[12%] py-10">
      <div className="bg-[var(--prim-light)] p-3 rounded-2xl">
        <div className="title my-10 w-full flex flex-col justify-center items-center gap-3">
          <h2 className="text-4xl lg:text-5xl Unbounded text-[var(--prim-color)]">
            Cocinas regionales
          </h2>
          <p className="text-neutral-600 text-center px-4">
            Explora sabores típicos por región y deja que <strong>SaborBot</strong> te sugiera el menú.
          </p>
          <div className="flex gap-3">
            <Link
              href="/UI-Components/Shop"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-[var(--prim-color)] border hover:opacity-90"
            >
              <i className="bi bi-journal-text" /> Ver recetario
            </Link>
            <Link
              href="/SaborBot"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--prim-color)] text-white hover:opacity-90"
            >
              <i className="bi bi-robot" /> Habla con SaborBot
            </Link>
          </div>
        </div>

        <div className="w-full mt-5">
          <Swiper
            slidesPerView={7}
            spaceBetween={10}
            loop
            modules={[Autoplay]}
            autoplay={{ delay: 1500 }}
            speed={1500}
            breakpoints={{
              1200: { slidesPerView: 7 },
              991: { slidesPerView: 4 },
              767: { slidesPerView: 3 },
              575: { slidesPerView: 3 },
              0: { slidesPerView: 3 },
            }}
          >
            {brands.map((b, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col items-center gap-2">
                  <Image
                    src={b.img}
                    alt={b.name}
                    width={120}
                    height={120}
                    className="object-contain cursor-pointer hover:scale-95 transition-all duration-300"
                  />
                  <span className="text-sm text-neutral-700">{b.name}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
