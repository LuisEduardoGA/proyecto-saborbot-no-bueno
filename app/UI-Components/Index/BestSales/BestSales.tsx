"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

// Opcional: si quieres carrusel, puedes usar Swiper; aquí lo dejo en grid para simpleza.

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

export default function BestSales() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let aborted = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/recipes?limit=8", { cache: "no-store" });
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
    return () => {
      aborted = true;
    };
  }, []);

  return (
    <div className="px-[8%] lg:px-[12%] py-10">
      <div className="title my-10 w-full flex flex-col lg:flex-row justify-between items-start gap-5">
        <h2 className="text-4xl Unbounded">Recetas destacadas</h2>
        <Link
          href="/UI-Components/Shop"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md border hover:bg-neutral-50"
        >
          Ver todas <i className="bi bi-arrow-right" />
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-5">
        {/* Grid de recetas */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {loading ? (
              <p className="text-gray-500">Cargando…</p>
            ) : recipes.length ? (
              recipes.map((r) => (
                <article
                  key={r.id}
                  className="product-wrap border border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all hover:border-[var(--prim-color)] cursor-pointer duration-300"
                >
                  <div className="lg:flex lg:items-center lg:gap-6">
                    <div className="relative w-full lg:w-2/5 aspect-video rounded-md overflow-hidden bg-neutral-100">
                      <Image
                        src={r.image || "/placeholder-recipe.jpg"}
                        alt={r.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-2 mt-5 lg:mt-0 w-full lg:w-3/5">
                      <h3 className="text-lg font-semibold Unbounded hover:text-[var(--prim-color)] transition">
                        {r.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {(r.category || []).slice(0, 3).join(" · ") || "Sin categoría"}
                      </p>
                      <p className="text-sm text-gray-500">{r.ingredients?.length || 0} ingredientes</p>

                      <div className="flex gap-2 mt-3">
                        <Link
                          href={`/UI-Components/Shop?id=${r.id}`}
                          className="px-4 py-2 text-sm font-medium text-[var(--prim-color)] bg-[var(--prim-light)]
                                     rounded-md hover:bg-[var(--prim-color)] hover:text-white transition flex items-center gap-2"
                        >
                          Ver preparación <i className="bi bi-journal-arrow-right" />
                        </Link>
                        <Link
                          href="/SaborBot"         // ← ajusta si tu chatbot vive en otra ruta
                          className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-neutral-50 flex items-center gap-2"
                        >
                          Preguntar a SaborBot <i className="bi bi-robot" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <p className="text-gray-500">No hay recetas destacadas por ahora.</p>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          {/* Banner lateral temático (opcional) */}
          <aside className="w-full p-8 rounded-2xl border border-gray-200 bg-[var(--prim-light)]">
            <div className="flex flex-col items-start">
              <span className="inline-flex items-center gap-2 text-[var(--prim-color)] font-semibold bg-white px-3 py-1 rounded-full">
                <i className="bi bi-magic" /> Tip del día
              </span>
              <h3 className="text-3xl Merienda my-4 text-[var(--prim-color)]">Explora por categorías</h3>
              <p className="font-medium text-gray-700 mb-4">
                ¿Vegana, Sin gluten o con antojito rápido? Usa los filtros y encuentra lo que necesitas.
              </p>
              <Link
                href="/UI-Components/Shop"
                className="px-6 py-3 text-base font-medium text-[var(--prim-color)] bg-white 
                         rounded-md hover:opacity-90 transition flex items-center gap-2"
              >
                Abrir recetario <i className="bi bi-journal-text" />
              </Link>
            </div>
          </aside>

          <aside className="w-full p-8 rounded-2xl border border-gray-200 bg-[var(--prim-light)]">
            <div className="flex flex-col items-start">
              <span className="inline-flex items-center gap-2 text-[var(--prim-color)] font-semibold bg-white px-3 py-1 rounded-full">
                <i className="bi bi-stars" /> Consejo
              </span>
              <h3 className="text-2xl Merienda my-4">¡Genera imágenes con SaborBot!</h3>
              <p className="font-medium text-gray-700 mb-4">
                Si inicias sesión, podrás pedirle al chatbot imágenes de platillos, ideas para plating
                y mucho más.
              </p>
              <Link
                href="/SaborBot"
                className="mt-3 px-6 py-3 text-base font-medium border border-[var(--prim-color)] text-[var(--prim-color)] 
                         rounded-md hover:bg-[var(--prim-color)] hover:text-white transition flex items-center gap-2"
              >
                Habla con SaborBot <i className="bi bi-robot" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
