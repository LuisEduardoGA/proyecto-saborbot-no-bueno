"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

// Tipos de tu API
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

type TagBucket = {
  name: string;
  count: number;
  recipes: Recipe[]; // para thumbnails
};

export default function Vendors() {
  const [items, setItems] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  // Paleta de fondos (reciclada del componente original)
  const bgColors = [
    "#F8EAE4",
    "#DEE6F3",
    "#DAF2DB",
    "#EBF1DA",
    "#FAF6E6",
    "#E6F6F6",
    "#F6E6F6",
    "#F8EAE4",
  ];

  useEffect(() => {
    let aborted = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/recipes?limit=9999", { cache: "no-store" });
        if (!res.ok) throw new Error("No se pudieron cargar los tags.");
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

  // Construye buckets de tags con conteo real y ejemplos de recetas
  const topTags: TagBucket[] = useMemo(() => {
    const map = new Map<string, Recipe[]>();
    items.forEach((r) => {
      (r.tags || []).forEach((t) => {
        const name = (t || "").trim();
        if (!name) return;
        if (!map.has(name)) map.set(name, []);
        // agrega la receta si aún no está y limita a algunas
        const arr = map.get(name)!;
        if (arr.length < 12) arr.push(r); // guarda algunas para elegir miniaturas
      });
    });

    const buckets: TagBucket[] = Array.from(map.entries()).map(([name, arr]) => ({
      name,
      count: arr.length,
      recipes: arr,
    }));

    // Ordena por conteo desc, luego alfabético; toma top 8 (ajustable)
    return buckets
      .sort((a, b) => (b.count - a.count) || a.name.localeCompare(b.name, "es"))
      .slice(0, 8);
  }, [items]);

  return (
    <div className="px-[8%] lg:px-[12%] py-10">
      <div className="title my-10 w-full flex flex-col lg:flex-row justify-between items-start gap-5">
        <h2 className="text-5xl Unbounded">Tags destacados</h2>
        <div className="flex gap-2">
          <Link
            href="/UI-Components/Shop"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border hover:bg-neutral-50"
          >
            Ver recetario <i className="bi bi-arrow-right" />
          </Link>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Cargando tags…</p>
      ) : topTags.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-16 mt-10">
          {topTags.map((tagBucket, index) => {
            const bg = bgColors[index % bgColors.length];
            const thumbs = tagBucket.recipes.slice(0, 3); // 3 miniaturas

            return (
              <div
                key={tagBucket.name}
                className="border border-gray-200 relative rounded-2xl p-5 shadow hover:shadow-lg hover:-translate-y-2 transition-all duration-300 bg-white"
                style={{ backgroundColor: bg }}
              >
                {/* “avatar” superior: icono de tag */}
                <div className="flex flex-col items-center mb-3">
                  <div
                    className="absolute -top-9 w-[120px] h-[120px] rounded-full border-t border-gray-300 p-4 flex items-center justify-center"
                    style={{ backgroundColor: bg }}
                    aria-hidden
                  >
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <i className="bi bi-hash text-4xl text-[var(--prim-color)]" />
                    </div>
                  </div>

                  <div className="mt-20 text-center">
                    <h3 className="text-2xl font-semibold hover:text-[var(--prim-color)] transition">
                      {tagBucket.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {tagBucket.count} {tagBucket.count === 1 ? "receta" : "recetas"}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <Link
                      href={`/UI-Components/Shop?tag=${encodeURIComponent(tagBucket.name)}`}
                      className="bg-[var(--prim-color)] px-4 text-white text-sm py-1 rounded inline-flex items-center gap-2"
                    >
                      Ver recetas <i className="bi bi-journal-text" />
                    </Link>
                  </div>
                </div>

                {/* Miniaturas de recetas del tag */}
                <div className="flex justify-between gap-2 mt-4">
                  {thumbs.map((r) => (
                    <Link
                      key={r.id}
                      href={`/UI-Components/Shop?id=${r.id}`}
                      className="w-[80px] h-[80px] flex justify-center items-center bg-white p-2 rounded-full hover:bg-gray-200 transition-all duration-300 overflow-hidden"
                      title={r.title}
                    >
                      <Image
                        src={r.image || "/placeholder-recipe.jpg"}
                        alt={r.title}
                        width={64}
                        height={64}
                        className="object-cover rounded-full"
                      />
                    </Link>
                  ))}
                  {/* Si hay menos de 3, rellena espacios vacíos para que no “salte” el layout */}
                  {thumbs.length < 3 &&
                    Array.from({ length: 3 - thumbs.length }).map((_, i) => (
                      <div
                        key={`empty-${i}`}
                        className="w-[80px] h-[80px] flex justify-center items-center bg-white/60 p-2 rounded-full"
                      />
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">No encontramos tags todavía.</p>
      )}
    </div>
  );
}
