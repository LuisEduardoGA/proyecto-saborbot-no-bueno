"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

type Ingredient = { name: string; measure: string };
type Recipe = {
  id: string | number;
  title: string;
  image?: string;
  ingredients: Ingredient[];
  instructions: string;
  category: string[];
  tags?: string[];
};
type ApiList = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  items: Recipe[];
};

export default function OrganicFood() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  // Placeholder: aún no hay login real, bloqueamos favoritos
  const isLoggedIn = false;

  useEffect(() => {
    let aborted = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/recipes?limit=12", { cache: "no-store" });
        if (!res.ok) throw new Error("No se pudieron cargar las recetas.");
        const data = (await res.json()) as ApiList;
        if (aborted) return;
        setRecipes(data.items || []);
      } catch {
        if (!aborted) setRecipes([]);
      } finally {
        if (!aborted) setLoading(false);
      }
    })();
    return () => { aborted = true; };
  }, []);

  const onFav = () => {
    toast("Inicia sesión para guardar tus recetas favoritas", {
      icon: "🔐",
      style: { border: "1px solid #e5e7eb", padding: 12, background: "#fff" },
    });
  };

  return (
    <div className="px-[8%] lg:px-[12%] py-10">
      <div className="title my-10 w-full flex flex-col lg:flex-row justify-between items-start gap-5">
        <h2 className="text-5xl Unbounded">Hecho en casa • Selección</h2>
        <Link href="/UI-Components/Shop" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border hover:bg-neutral-50">
          Ver recetario <i className="bi bi-arrow-right" />
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Cargando…</p>
      ) : (
        <Swiper
          spaceBetween={20}
          slidesPerView={4}
          loop
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          modules={[Autoplay]}
          breakpoints={{
            1200: { slidesPerView: 4 },
            991:  { slidesPerView: 2.5 },
            575:  { slidesPerView: 1 },
            0:    { slidesPerView: 1 },
          }}
        >
          {recipes.map((r) => (
            <SwiperSlide key={r.id}>
              <article className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm hover:shadow-md transition hover:border-[var(--prim-color)]">
                <div className="relative w-full aspect-[16/10] rounded-md overflow-hidden bg-neutral-100">
                  <Image
                    src={r.image || "/placeholder-recipe.jpg"}
                    alt={r.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    className="object-cover"
                  />
                  <button
                    onClick={onFav}
                    className="absolute top-2 right-2 w-10 h-10 rounded-full bg-white/90 backdrop-blur text-[var(--prim-color)]
                               flex items-center justify-center shadow hover:bg-white transition"
                    title="Guardar en favoritos"
                  >
                    <i className="bi bi-heart-fill" />
                  </button>
                </div>

                <div className="space-y-1 mt-4">
                  <h3 className="text-base font-semibold Unbounded line-clamp-2">{r.title}</h3>
                  <p className="text-sm text-gray-500">
                    {(r.category || []).slice(0, 3).join(" · ") || "Sin categoría"}
                  </p>
                  <p className="text-sm text-gray-500">{r.ingredients?.length || 0} ingredientes</p>
                </div>

                <Link
                  href={`/UI-Components/Shop?id=${r.id}`}
                  className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-base font-medium text-[var(--prim-color)] bg-[var(--prim-light)]
                             rounded-md hover:bg-[var(--prim-color)] hover:text-white transition"
                >
                  Ver preparación <i className="bi bi-journal-arrow-right" />
                </Link>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
