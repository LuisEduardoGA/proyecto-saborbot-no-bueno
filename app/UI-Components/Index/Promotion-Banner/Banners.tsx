"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import promotionBanner1 from "@/public/promotional-banner-img1.png";
import promotionBanner2 from "@/public/promotional-banner-img2.png";
import promotionBanner3 from "@/public/promotional-banner-img3.png";
import promotionBanner4 from "@/public/promotional-banner-img4.png";

type BannerType = {
  image: StaticImageData;
  heading: string;
  href: string;   // adónde dirigir
};

const banners: BannerType[] = [
  { image: promotionBanner1, heading: "Recetas\nSaludables", href: "/UI-Components/Shop?categoria=Vegetariana" },
  { image: promotionBanner2, heading: "Cocina\nCasera",      href: "/UI-Components/Shop?tag=Entrada" },
  { image: promotionBanner3, heading: "Postres\nFáciles",    href: "/UI-Components/Shop?tag=Postre" },
  { image: promotionBanner4, heading: "Platos\nRápidos",     href: "/UI-Components/Shop?tag=Tacos" },
];

export default function Banners() {
  return (
    <div className="px-[8%] lg:px-[12%] py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {banners.map((banner, index) => (
          <div key={index} className="relative overflow-hidden rounded-2xl">
            <Image src={banner.image} alt={`Banner ${index + 1}`} className="w-full h-auto" />
            <div className="banner-content absolute bottom-[5%] left-[5%]">
              <h2 className="Merienda font-bold text-3xl leading-11 whitespace-pre-line text-white drop-shadow">
                {banner.heading}
              </h2>
              <Link
                href={banner.href}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-white font-bold mt-5 bg-[var(--prim-color)] hover:bg-white hover:text-[var(--prim-color)] transition"
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
