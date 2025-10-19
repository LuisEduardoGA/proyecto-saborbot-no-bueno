"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import toast from "react-hot-toast";

import Deal1 from "@/public/Deals-img1.png";
import Deal2 from "@/public/Deals-img2.png";

type DealItem = {
  image: StaticImageData;
  title: string;
  description: string;
  className?: string;
};

const dealsData: DealItem[] = [
  { image: Deal1, title: "Sabores de México",       description: "Explora el recetario completo" },
  { image: Deal2, title: "¿Qué cocino hoy?",        description: "Pregunta a SaborBot" },
  { image: Deal1, title: "Clásicos imperdibles",    description: "Encuentra tus favoritos" },
];

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

export default function Deals() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  // ⚠️ Placeholder de autenticación (deshabilita wishlist hasta que tengamos login real)
  const isLoggedIn = false;

  useEffect(() => {
    let aborted = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/recipes?limit=10", { cache: "no-store" });
        if (!res.ok) throw new Error("No se pudieron cargar las recetas destacadas.");
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

  const handleWishlist = (recipe: Recipe) => {
    if (!isLoggedIn) {
      toast("Inicia sesión para guardar tus recetas favoritas", {
        icon: "🔐",
        style: { border: "1px solid #e5e7eb", padding: "12px", background: "#fff" },
      });
      return;
    }
    // Cuando haya login real, aquí guardas en la wishlist.
  };

  return (
    <div className="px-[8%] lg:px-[12%] py-10">
      <div className="title my-10 w-full flex flex-col lg:flex-row justify-between items-start gap-5">
        <h2 className="text-5xl Unbounded">Recetas destacadas de hoy</h2>
        <div className="flex gap-3">
          <Link href="/UI-Components/Shop" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border hover:bg-neutral-50">
            Ver recetario <i className="bi bi-arrow-right" />
          </Link>
        </div>
      </div>

      {/* Banners / promos */}
      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        loop
        modules={[Autoplay]}
        autoplay={{ delay: 1500 }}
        speed={1500}
        breakpoints={{
          1200: { slidesPerView: 2 },
          991:  { slidesPerView: 2 },
          767:  { slidesPerView: 2 },
          575:  { slidesPerView: 1 },
          0:    { slidesPerView: 1 },
        }}
      >
        {dealsData.map((deal, index) => (
          <SwiperSlide key={index}>
            <div className="deals-wrap px-5 py-6 rounded-2xl flex flex-col lg:flex-row justify-between items-center gap-x-12 bg-[var(--prim-light)]">
              <div className="w-full lg:w-1/2 deal-image">
                <Image src={deal.image} alt={deal.title} />
              </div>
              <div className="w-full lg:w-1/2 deal-info">
                <h3 className="Merienda font-bold text-4xl leading-11 whitespace-pre-line text-[var(--prim-color)]">
                  {deal.title}
                </h3>
                <p className="my-2 text-gray-800 font-normal">{deal.description}</p>
                <div className="flex gap-2 mt-3">
                  <Link
                    href="/UI-Components/Shop"
                    className="px-5 py-3 rounded-full text-white font-bold bg-[var(--prim-color)] hover:bg-white
                               hover:text-[var(--prim-color)] border border-[var(--prim-color)] transition"
                  >
                    Ver recetas
                  </Link>
                  <Link
                    href="/SaborBot"
                    className="px-5 py-3 rounded-full font-bold border border-[var(--prim-color)] text-[var(--prim-color)]
                               hover:bg-[var(--prim-color)] hover:text-white transition"
                  >
                    SaborBot
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Grid de recetas destacadas (coherente + wishlist deshabilitado) */}
      <div className="my-10">
        {loading ? (
          <p className="text-gray-500">Cargando…</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {recipes.map((r) => (
              <article
                key={r.id}
                className="border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition hover:border-[var(--prim-color)] overflow-hidden"
              >
                <div className="relative w-full aspect-[16/10] bg-neutral-100">
                  <Image
                    src={r.image || "/placeholder-recipe.jpg"}
                    alt={r.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 20vw"
                    className="object-cover"
                  />
                  <button
                    onClick={() => handleWishlist(r)}
                    className="absolute top-2 right-2 w-10 h-10 rounded-full bg-white/90 backdrop-blur text-[var(--prim-color)]
                               flex items-center justify-center shadow hover:bg-white transition"
                    title="Guardar en favoritos"
                  >
                    <i className="bi bi-heart-fill" />
                  </button>
                </div>

                <div className="p-4 flex flex-col">
                  <h4 className="font-semibold Unbounded min-h-[3rem] leading-snug">
                    {r.title}
                  </h4>
                  <p className="text-sm text-neutral-500 min-h-[1.25rem]">
                    {(r.category || []).slice(0, 3).join(" · ") || "Sin categoría"}
                    {r.category?.length && r.category.length > 3 ? ` +${r.category.length - 3}` : ""}
                  </p>
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

                  <Link
                    href={`/UI-Components/Shop?id=${r.id}`}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--prim-light)]
                               px-4 py-2 text-base font-medium text-[var(--prim-color)] transition hover:bg-[var(--prim-color)] hover:text-white"
                  >
                    Ver preparación <i className="bi bi-journal-arrow-right" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
