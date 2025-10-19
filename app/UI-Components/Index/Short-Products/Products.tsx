"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

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

export default function ShortProducts() {
  const [all, setAll] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  // bloqueamos favoritos por ahora
  const isLoggedIn = false;
  const onFav = () =>
    toast("Inicia sesión para guardar tus recetas favoritas", {
      icon: "🔐",
      style: { border: "1px solid #e5e7eb", padding: 12, background: "#fff" },
    });

  useEffect(() => {
    let aborted = false;
    (async () => {
      try {
        setLoading(true);
        // Cargamos bastante para poblar las 4 listas
        const res = await fetch("/api/recipes?limit=9999", { cache: "no-store" });
        if (!res.ok) throw new Error("No se pudieron cargar las recetas.");
        const data = (await res.json()) as ApiList;
        if (aborted) return;
        setAll((data.items || []).slice(0, 40)); // tope razonable
      } catch {
        if (!aborted) setAll([]);
      } finally {
        if (!aborted) setLoading(false);
      }
    })();
    return () => {
      aborted = true;
    };
  }, []);

  // “Partimos” el arreglo en 4 grupos para usarlo en las columnas
  const groups = useMemo(() => {
    const g: [Recipe[], Recipe[], Recipe[], Recipe[]] = [[], [], [], []];
    all.forEach((r, i) => g[i % 4].push(r));
    return g;
  }, [all]);

  type ColumnDef = { title: string; items: Recipe[] };
  const columns: ColumnDef[] = [
    { title: "Destacadas",     items: groups[0] },
    { title: "Populares",      items: groups[1] },
    { title: "De temporada",   items: groups[2] },
    { title: "Mejor valoradas",items: groups[3] },
  ];

  return (
    <div className="px-[8%] lg:px-[12%] py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-3">
        {columns.map((col, idx) => (
          <div
            key={idx}
            className="flex flex-col rounded-2xl gap-2 p-3 border border-gray-300 hover:border-[var(--prim-color)]
                       transition-all duration-300"
          >
            <div className="short-product-title bg-[var(--prim-light)] py-2 px-4 rounded-md">
              <h2 className="Unbounded text-xl inline-block pb-2">{col.title}</h2>
            </div>

            <div className="w-full mt-4">
              {loading ? (
                <p className="text-gray-500 px-2 py-6">Cargando…</p>
              ) : col.items.length ? (
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  loop
                  speed={1200}
                  autoplay={{ delay: 1800, disableOnInteraction: false }}
                  modules={[Autoplay]}
                >
                  {/* Para dar más contenido, duplicamos en 2 slides el mismo set en distinto orden */}
                  {[col.items, [...col.items].reverse()].map((slideItems, s) => (
                    <SwiperSlide key={s}>
                      {slideItems.slice(0, 8).map((item) => (
                        <div key={item.id} className="short-product w-full flex justify-between items-center gap-3 mb-3">
                          <Link
                            href={{ pathname: "/UI-Components/Shop", query: { id: item.id } }}
                            className="flex gap-3 w-full"
                          >
                            <div className="w-1/3">
                              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-gray-300">
                                <Image
                                  src={item.image || "/placeholder-recipe.jpg"}
                                  alt={item.title}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 1024px) 30vw, 10vw"
                                />
                              </div>
                            </div>
                            <div className="flex-1 short-product-info flex flex-col">
                              <h5 className="flex gap-1 text-gray-400 text-[12px]">
                                <i className="bi bi-egg-fried text-[var(--prim-color)]" />
                                {(item.category || []).slice(0, 1).join(" · ") || "Receta"}
                              </h5>
                              <h3 className="Unbounded hover:text-[var(--prim-color)] transition-all duration-300 line-clamp-2">
                                {item.title}
                              </h3>
                              <p className="text-[12px] text-gray-500">{item.ingredients?.length || 0} ingredientes</p>
                            </div>
                          </Link>

                          <button
                            onClick={onFav}
                            className="w-10 h-10 rounded-full border border-gray-300 hover:border-[var(--prim-color)]
                                       text-[var(--prim-color)] flex items-center justify-center transition"
                            title={isLoggedIn ? "Guardar en favoritos" : "Inicia sesión para guardar"}
                          >
                            <i className="bi bi-heart" />
                          </button>
                        </div>
                      ))}
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <p className="text-gray-500 px-2 py-6">Sin recetas</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
