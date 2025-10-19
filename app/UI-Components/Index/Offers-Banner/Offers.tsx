"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

import Deal1 from "@/public/offer-img1.png";
import Deal2 from "@/public/offer-img1.png";

type DealItem = {
  image: StaticImageData;
  title: string;
  description: string;
  href: string;            // ← adónde llevar el CTA
  className?: string;
};

const dealData: DealItem[] = [
  {
    image: Deal1,
    title: "Nueva receta del día",
    description: "Lista en 20 minutos",
    href: "/UI-Components/Shop?tag=Rápidas",
  },
  {
    image: Deal2,
    title: "Postre fácil y rápido",
    description: "Listo en 15 minutos",
    href: "/UI-Components/Shop?tag=Postres",
  },
];

export default function Offers() {
  return (
    <div className="px-[8%] lg:px-[12%] mb-10">
      <div className="flex flex-col lg:flex-row gap-5">
        {dealData.map((deal, index) => (
          <div
            key={index}
            className={`offer-wrap px-6 py-8 rounded-2xl flex flex-col md:flex-row justify-between items-center ${deal.className || ""}`}
          >
            <div className="w-full lg:w-1/2 deal-image">
              <Image src={deal.image} alt={deal.title} className="w-full h-auto object-contain" />
            </div>

            <div className="w-full lg:w-1/2 deal-info lg:pl-6 mt-4 lg:mt-0">
              <h2 className="Merienda font-bold text-white text-4xl leading-[2.8rem] whitespace-pre-line">
                {deal.title}
              </h2>
              <p className="my-2 text-lg text-white font-normal">
                {deal.description} <span className="text-yellow-400 font-normal">nueva publicación</span>
              </p>

              <Link
                href={deal.href}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-white font-bold mt-5 bg-[var(--black)] hover:bg-white hover:text-[var(--prim-color)] transition-all duration-300"
              >
                Ver recetas <i className="bi bi-arrow-right" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
