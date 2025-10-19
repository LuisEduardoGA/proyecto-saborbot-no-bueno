"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import toast from "react-hot-toast";

import hotDealBanner from "@/public/hot-deals-img.png";

// Tipos base de tu API
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

export default function HotDeals() {
  const [items, setItems] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  // ⚠️ Placeholder de autenticación (más adelante lo conectamos)
  const isLoggedIn = false;

  useEffect(() => {
    let aborted = false;
    (async () => {
      try {
        setLoading(true);
        // Puedes cambiar el criterio (e.g. ?tag=Tendencia)
        const res = await fetch("/api/recipes?limit=12", { cache: "no-store" });
        if (!res.ok) throw new Error("No se pudieron cargar las recetas.");
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

  const handleWishlist = (recipe: Recipe) => {
    if (!isLoggedIn) {
      toast("Inicia sesión para guardar tus recetas favoritas", {
        icon: "🔐",
        style: {
          border: "1px solid #e5e7eb",
          padding: "12px",
          background: "#fff",
        },
      });
      return;
    }
    // Cuando haya login, aquí guardas en la wishlist real:
    // await addToWishlist(recipe)
  };

  return (
    <div className="px-[8%] lg:px-[12%] py-10">
      <div className="title my-10 w-full flex flex-col lg:flex-row justify-between items-start gap-5">
        <h1 className="text-5xl Unbounded">Recetas en tendencia.</h1>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-5">
        {/* Banner lateral */}
        <div className="w-full lg:w-1/3 p-10 rounded-2xl hot-deal-banner flex flex-col justify-center items-center">
          <Image src={hotDealBanner} alt="Recetas destacadas" />
          <h1 className="text-4xl text-white Merienda my-5">Sabores de temporada</h1>
          <p className="text-center text-white font-semibold mb-3">
            Descubre ideas para la semana: antojitos, sopas, guisos y postres.
          </p>
          <Link
            href="/UI-Components/Shop"
            className="px-6 py-3 my-2 text-base font-medium text-[var(--prim-color)] bg-[var(--prim-light)] 
                       rounded-md hover:bg-[var(--prim-color)] hover:text-white cursor-pointer transition flex items-center justify-center gap-2"
          >
            Ver recetario <i className="bi bi-journal-text"></i>
          </Link>
        </div>

        {/* Slider de recetas */}
        <div className="w-full lg:w-2/3">
          {loading ? (
            <p className="text-gray-500">Cargando recetas…</p>
          ) : (
            <Swiper
              spaceBetween={20}
              slidesPerView={3}
              loop
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              modules={[Autoplay]}
              breakpoints={{
                1200: { slidesPerView: 3 },
                991: { slidesPerView: 2.5 },
                575: { slidesPerView: 1 },
                0: { slidesPerView: 1 },
              }}
            >
              {items.map((r) => (
                <SwiperSlide key={r.id}>
                  {/* Tarjeta coherente y del mismo tamaño */}
                  <div className="group border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:border-[var(--prim-color)] overflow-hidden">
                    {/* Imagen con proporción fija */}
                    <div className="relative w-full aspect-[16/10] bg-neutral-100">
                      <Image
                        src={r.image || "/placeholder-recipe.jpg"}
                        alt={r.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                      {/* Wishlist */}
                      <button
                        onClick={() => handleWishlist(r)}
                        className="absolute top-2 right-2 w-10 h-10 rounded-full bg-white/90 backdrop-blur text-[var(--prim-color)] flex items-center justify-center shadow hover:bg-white transition"
                        title="Guardar en favoritos"
                      >
                        <i className="bi bi-heart-fill" />
                      </button>
                    </div>

                    {/* Contenido */}
                    <div className="p-4 flex flex-col">
                      {/* Título con altura mínima para alinear tarjetas */}
                      <h2 className="text-base font-semibold Unbounded min-h-[3rem] leading-snug">
                        {r.title}
                      </h2>

                      {/* Categorías */}
                      <p className="text-sm text-gray-500 mt-1 min-h-[1.25rem]">
                        {r.category?.length ? r.category.slice(0, 3).join(" · ") : "Sin categoría"}
                        {r.category?.length && r.category.length > 3 ? ` +${r.category.length - 3}` : ""}
                      </p>

                      {/* Meta: ingredientes / quizá primer tag */}
                      <div className="mt-2 flex items-center gap-3 text-sm text-gray-600">
                        <span className="inline-flex items-center gap-1">
                          <i className="bi bi-basket" /> {r.ingredients?.length || 0} ingredientes
                        </span>
                        {r.tags?.length ? (
                          <span className="inline-flex items-center gap-1">
                            <i className="bi bi-hash" /> {r.tags[0]}
                          </span>
                        ) : null}
                      </div>

                      {/* CTA */}
                      <Link
                        href={{ pathname: "/UI-Components/Shop", query: { id: r.id } }}
                        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--prim-light)] px-4 py-2 text-base font-medium text-[var(--prim-color)] transition hover:bg-[var(--prim-color)] hover:text-white"
                      >
                        Ver preparación <i className="bi bi-journal-arrow-right text-lg"></i>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
}
