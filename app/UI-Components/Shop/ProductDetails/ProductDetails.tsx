"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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

type Props = {
  id?: string; // llega por query param desde Shop/page
};

export default function ProductDetails({ id }: Props) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // relacionadas
  const [related, setRelated] = useState<Recipe[]>([]);

  useEffect(() => {
    let aborted = false;
    async function load() {
      try {
        if (!id) {
          setError("Falta el parámetro id");
          setLoading(false);
          return;
        }
        setLoading(true);
        setError(null);
        // receta principal
        const res = await fetch(`/api/recipes/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("No se pudo cargar la receta");
        const data = (await res.json()) as Recipe;
        if (aborted) return;
        setRecipe(data);

        // relacionadas por primera categoría, excluye la propia
        const primaryCat = data.category?.[0] || "";
        if (primaryCat) {
          const rs = await fetch(
            `/api/recipes?categoria=${encodeURIComponent(primaryCat)}&limit=6`,
            { cache: "no-store" }
          );
          if (rs.ok) {
            const list = await rs.json();
            const items: Recipe[] = list.items || [];
            const filtered = items.filter((r) => String(r.id) !== String(id));
            if (!aborted) setRelated(filtered);
          }
        } else {
          setRelated([]);
        }
      } catch (e: any) {
        if (!aborted) setError(e?.message ?? "Error desconocido");
      } finally {
        if (!aborted) setLoading(false);
      }
    }
    load();
    return () => {
      aborted = true;
    };
  }, [id]);

  const prettySteps = useMemo(() => {
    if (!recipe?.instructions) return [];
    // divide por saltos de línea o números tipo "1. "
    const raw = recipe.instructions
      .replace(/\r/g, "")
      .split(/\n+/)
      .map((s) => s.trim())
      .filter(Boolean)
      .join(" ");
    const parts = raw.split(/\s*(?:\d+[\.\)]|•|-)\s+/).filter(Boolean);
    // si no pudo dividir, regresa 1 solo paso
    return parts.length ? parts : [recipe.instructions];
  }, [recipe]);

  const copyIngredients = async () => {
    if (!recipe) return;
    const text = recipe.ingredients
      .map((i) => `${i.name}${i.measure ? ` — ${i.measure}` : ""}`)
      .join("\n");
    try {
      await navigator.clipboard.writeText(text);
      alert("Ingredientes copiados ✅");
    } catch {
      alert("No se pudieron copiar los ingredientes");
    }
  };

  if (!id) {
    return (
      <main className="px-[8%] lg:px-[12%] py-10">
        <h1 className="text-2xl font-bold">Falta id</h1>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="px-[8%] lg:px-[12%] py-10">
        <p className="text-gray-500">Cargando receta…</p>
      </main>
    );
  }

  if (error || !recipe) {
    return (
      <main className="px-[8%] lg:px-[12%] py-10">
        <p className="text-red-500">No se encontró la receta.</p>
        <Link
          href="/UI-Components/Shop"
          className="inline-flex mt-4 px-4 py-2 rounded-md border hover:bg-neutral-50"
        >
          ← Volver al recetario
        </Link>
      </main>
    );
  }

  return (
    <main className="px-[8%] lg:px-[12%] py-10">
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        {/* Imagen */}
        <div className="flex justify-center lg:w-[45%] border border-gray-300 rounded-2xl p-4 bg-white">
          <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-neutral-100">
            <Image
              src={recipe.image || "/placeholder-recipe.jpg"}
              alt={recipe.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col lg:w-[50%]">
          <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
            <Link href="/UI-Components/Shop" className="hover:underline">
              Recetas
            </Link>
            <span>›</span>
            <span className="truncate">{recipe.title}</span>
          </div>

          <h1 className="Unbounded text-3xl">{recipe.title}</h1>

          {/* Chips de categorías */}
          <div className="mt-3 flex flex-wrap gap-2">
            {(recipe.category || []).map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-[var(--prim-light)] text-[var(--prim-color)]"
              >
                <i className="bi bi-tag" />
                {c}
              </span>
            ))}
            {(recipe.tags || []).map((t) => (
              <span
                key={`t-${t}`}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-neutral-100"
              >
                <i className="bi bi-hash" />
                {t}
              </span>
            ))}
          </div>

          {/* Acciones */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={copyIngredients}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border hover:bg-neutral-50"
            >
              <i className="bi bi-clipboard-check" />
              Copiar ingredientes
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border hover:bg-neutral-50"
            >
              <i className="bi bi-printer" />
              Imprimir
            </button>
          </div>
        </div>
      </div>

      {/* Ingredientes + Preparación */}
      <section className="border border-gray-300 mt-10 rounded-lg p-5 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-4">
          <span className="bg-[var(--prim-color)] px-4 py-2 text-white font-semibold text-lg rounded-full">
            Detalles de la receta
          </span>
          <span className="px-4 py-2 text-[var(--prim-color)] font-semibold text-lg rounded-full flex gap-2 bg-[var(--prim-light)]">
            <i className="bi bi-egg-fried" /> SaborBot
          </span>
        </div>

        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="Unbounded text-xl mb-3 flex items-center gap-2">
              <i className="bi bi-basket" /> Ingredientes
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              {recipe.ingredients?.map((i, idx) => (
                <li key={idx} className="text-gray-700">
                  <span className="font-medium">{i.name}</span>
                  {i.measure ? ` — ${i.measure}` : ""}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="Unbounded text-xl mb-3 flex items-center gap-2">
              <i className="bi bi-journal-text" /> Preparación
            </h2>
            <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
              {prettySteps.map((s, idx) => (
                <li key={idx} className="text-gray-700">
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Relacionadas */}
      {related.length > 0 && (
        <section className="mt-10">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <i className="bi bi-stars" /> Recetas relacionadas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/UI-Components/Shop?id=${r.id}`}
                className="border border-gray-300 rounded-lg p-3 hover:shadow-md transition"
              >
                <div className="relative w-full aspect-video overflow-hidden rounded-md bg-neutral-100">
                  <Image
                    src={r.image || "/placeholder-recipe.jpg"}
                    alt={r.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <h4 className="mt-3 font-semibold">{r.title}</h4>
                <p className="text-sm text-neutral-500">
                  {(r.category || []).slice(0, 2).join(" · ") || "Sin categoría"}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Volver */}
      <div className="mt-8">
        <Link
          href="/UI-Components/Shop"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md border hover:bg-neutral-50"
        >
          <i className="bi bi-arrow-left" /> Volver al recetario
        </Link>
      </div>
    </main>
  );
}
