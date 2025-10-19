"use client";
import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";
import Image, { StaticImageData } from "next/image";
import { useEffect, useMemo, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// Imágenes disponibles (puedes ajustarlas libremente)
import Category1 from "@/public/Category1.png";
import Category2 from "@/public/Category2.png";
import Category3 from "@/public/Category3.png";
import Category4 from "@/public/Category4.png";
import Category5 from "@/public/Category5.png";
import Category6 from "@/public/Category6.png";
import Category7 from "@/public/Category7.png";
import Category8 from "@/public/Category8.png";
import Category9 from "@/public/Category9.png";
import Category10 from "@/public/Category10.png";

// Map opcional de categoría → imagen
const IMAGE_MAP: Record<string, StaticImageData> = {
  Desayunos: Category1,
  Postres: Category2,
  Platillos: Category3,
  Ensaladas: Category4,
  Bebidas: Category5,
  Snacks: Category6,
  Sopas: Category7,
  Pastas: Category8,
  Veganas: Category9,
  Rápidas: Category10,
};

type Ingredient = { name: string; measure: string };
type Recipe = {
  id: string | number;
  title: string;
  image?: string;
  ingredients: Ingredient[];
  instructions: string;
  category: string[];
};

type ApiList = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  items: Recipe[];
};

type CatCard = {
  name: string;
  count: number;
  image: StaticImageData;
};

export default function Category() {
  const [items, setItems] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let aborted = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/recipes?limit=9999`, { cache: "no-store" });
        if (!res.ok) throw new Error("No se pudieron cargar las categorías.");
        const data = (await res.json()) as ApiList;
        if (aborted) return;
        setItems(data.items || []);
      } catch {
        if (!aborted) setItems([]);
      } finally {
        if (!aborted) setLoading(false);
      }
    })();
    return () => {
      aborted = true;
    };
  }, []);

  // Construye categorías únicas + conteo real
  const categories: CatCard[] = useMemo(() => {
    const counts = new Map<string, number>();
    items.forEach((r) => {
      (r.category || []).forEach((c) => {
        const name = (c || "").trim();
        if (!name) return;
        counts.set(name, (counts.get(name) || 0) + 1);
      });
    });

    // Orden alfabético (locale es)
    const names = Array.from(counts.keys()).sort((a, b) => a.localeCompare(b, "es"));

    return names.map((name) => ({
      name,
      count: counts.get(name) || 0,
      image: IMAGE_MAP[name] || Category1, // fallback
    }));
  }, [items]);

  return (
    <div className="px-[8%] lg:px-[12%] py-10">
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-3xl Unbounded">Explora por categoría</h2>
        <Link href="/UI-Components/Shop" className="text-[var(--prim-color)] hover:underline">
          Ver todas →
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Cargando categorías…</p>
      ) : categories.length ? (
        <Swiper
          slidesPerView={8}
          spaceBetween={20}
          loop
          modules={[Autoplay]}
          autoplay={{ delay: 1500 }}
          speed={1500}
          breakpoints={{
            1200: { slidesPerView: 8 },
            991:  { slidesPerView: 5 },
            767:  { slidesPerView: 4 },
            575:  { slidesPerView: 3 },
            0:    { slidesPerView: 3 },
          }}
        >
          {categories.map((cat) => (
            <SwiperSlide key={cat.name}>
              <Link
                href={`/UI-Components/Shop?categoria=${encodeURIComponent(cat.name)}`}
                className="category-wrap flex flex-col justify-center items-center cursor-pointer"
              >
                <div className="category-image">
                  <Image src={cat.image} alt={cat.name} className="transition-all duration-300" />
                </div>
                <div className="category-info my-2 flex flex-col justify-center text-center">
                  <h3 className="text-lg Unbounded hover:text-[var(--prim-color)] transition-all duration-300">
                    {cat.name}
                  </h3>
                  <p className="text-gray-500">{cat.count} recetas</p> {/* ← conteo exacto */}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-gray-500">No hay categorías disponibles.</p>
      )}
    </div>
  );
}
