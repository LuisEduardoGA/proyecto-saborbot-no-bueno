"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
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

export default function Recommend() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  // Por ahora sin auth: bloqueamos favoritos
  const isLoggedIn = false;

  useEffect(() => {
    let aborted = false;
    (async () => {
      try {
        setLoading(true);
        // “Recomendadas”: tomamos 8 cualquiera (puedes cambiar por algún criterio server-side)
        const res = await fetch("/api/recipes?limit=8", { cache: "no-store" });
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
    return () => {
      aborted = true;
    };
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
        <h2 className="text-5xl Unbounded">Recomendadas para ti</h2>
        <Link
          href="/UI-Components/Shop"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md border hover:bg-neutral-50"
        >
          Ver todas <i className="bi bi-arrow-right" />
        </Link>
      </div>

      <div className="my-10">
        {loading ? (
          <p className="text-gray-500">Cargando…</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {recipes.map((r) => (
              <article
                key={r.id}
                className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all hover:border-[var(--prim-color)]"
              >
                <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-neutral-100">
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
                    title={isLoggedIn ? "Guardar en favoritos" : "Inicia sesión para guardar"}
                  >
                    <i className="bi bi-heart-fill" />
                  </button>
                </div>

                <div className="space-y-1 mt-5">
                  <h3 className="text-base font-semibold Unbounded my-1 line-clamp-2">{r.title}</h3>
                  <p className="text-sm text-gray-500">
                    {(r.category || []).slice(0, 3).join(" · ") || "Sin categoría"}
                  </p>
                  <p className="text-sm text-gray-500">{r.ingredients?.length || 0} ingredientes</p>
                </div>

                <Link
                  href={`/UI-Components/Shop?id=${r.id}`}
                  className="w-full inline-flex px-4 py-2 mt-3 text-base font-medium text-[var(--prim-color)] bg-[var(--prim-light)]
                             rounded-md hover:bg-[var(--prim-color)] hover:text-white transition items-center justify-center gap-2"
                >
                  Ver preparación <i className="bi bi-journal-arrow-right" />
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
