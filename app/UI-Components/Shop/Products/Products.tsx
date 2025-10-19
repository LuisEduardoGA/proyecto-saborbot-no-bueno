"use client";
import Link from "next/link";
import Image from "next/image";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

// Tipos (alineados con tu API / normalizador)
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

export default function RecipesCatalog() {
  // Estado de datos (lista visible)
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtros UI
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [page, setPage] = useState(1);
  const limit = 12;

  // Datos auxiliares para sidebar
  const [allCats, setAllCats] = useState<string[]>([]);
  const [topTags, setTopTags] = useState<{ name: string; count: number }[]>([]);

  // URL sync
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Lee query params al montar / cambio de URL
  useEffect(() => {
    const qParam = searchParams.get("q") || "";
    const catParam = searchParams.get("categoria") || "";
    const tagParam = searchParams.get("tag") || "";
    const pageParam = parseInt(searchParams.get("page") || "1", 10) || 1;

    setSearch(qParam);
    setSelectedCat(catParam);
    setSelectedTag(tagParam);
    setPage(Math.max(1, pageParam));
  }, [searchParams]);

  // Carga lista visible (con filtros/paginación)
  useEffect(() => {
    let aborted = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const qs = new URLSearchParams({
          q: search,
          categoria: selectedCat,
          tag: selectedTag,
          page: String(page),
          limit: String(limit),
        });
        const res = await fetch(`/api/recipes?${qs.toString()}`, { cache: "no-store" });
        if (!res.ok) throw new Error("No se pudieron cargar las recetas.");
        const data = (await res.json()) as ApiList;
        if (aborted) return;
        setRecipes(data.items);
        setTotalPages(data.totalPages || 1);
      } catch (e: any) {
        if (!aborted) setError(e?.message ?? "Error desconocido");
      } finally {
        if (!aborted) setLoading(false);
      }
    })();
    return () => {
      aborted = true;
    };
  }, [search, selectedCat, selectedTag, page]);

  // Carga categorías y tags populares (desde todo el dataset)
  useEffect(() => {
    let aborted = false;
    (async () => {
      try {
        const res = await fetch(`/api/recipes?limit=9999`, { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as ApiList;
        if (aborted) return;

        // categorías únicas
        const setCats = new Set<string>();
        data.items.forEach((r) => (r.category || []).forEach((c) => setCats.add((c || "").trim())));
        const sortedCats = Array.from(setCats).sort((a, b) => a.localeCompare(b, "es"));
        setAllCats(sortedCats);

        // tags con conteo
        const counts = new Map<string, number>();
        data.items.forEach((r) => (r.tags || []).forEach((t) => {
          const name = (t || "").trim();
          if (!name) return;
          counts.set(name, (counts.get(name) || 0) + 1);
        }));
        const list = Array.from(counts.entries())
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => (b.count - a.count) || a.name.localeCompare(b.name, "es"))
          .slice(0, 12);
        setTopTags(list);
      } catch {
        // silencioso
      }
    })();
    return () => {
      aborted = true;
    };
  }, []);

  // Receta destacada (de la lista visible)
  const featured = useMemo(() => {
    if (!recipes.length) return null;
    return recipes[Math.floor(Math.random() * recipes.length)];
  }, [recipes]);

  // Helpers de URL
  const replaceUrl = (next: { q?: string; categoria?: string; tag?: string; page?: number }) => {
    const qs = new URLSearchParams();
    if (next.q) qs.set("q", next.q);
    if (next.categoria) qs.set("categoria", next.categoria);
    if (next.tag) qs.set("tag", next.tag);
    if (next.page && next.page > 1) qs.set("page", String(next.page));
    router.replace(`${pathname}?${qs.toString()}`);
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedCat("");
    setSelectedTag("");
    setPage(1);
    router.replace(pathname);
  };

  const selectCategory = (cat: string) => {
    setSelectedCat(cat);
    setPage(1);
    replaceUrl({ q: search, categoria: cat, tag: selectedTag, page: 1 });
  };

  const selectTag = (tag: string) => {
    setSelectedTag(tag);
    setPage(1);
    replaceUrl({ q: search, categoria: selectedCat, tag, page: 1 });
  };

  const onSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
    replaceUrl({ q: val, categoria: selectedCat, tag: selectedTag, page: 1 });
  };

  return (
    <div className="px-[8%] lg:px-[12%] py-10">
      <div className="my-10">
        <div className="flex flex-col md:flex-row justify-between gap-5">
          {/* Sidebar / Filtros */}
          <aside className="w-full md:w-1/2 lg:w-1/3 relative lg:sticky top-22 left-0 h-full">
            <div className="border border-gray-300 shadow rounded p-3 bg-white">
              <div className="border-b w-full border-gray-300 pb-3 flex items-center justify-between">
                <h2 className="text-xl Unbounded flex items-center gap-2">
                  <i className="bi bi-journal-text" /> Recetario — Filtros
                </h2>
                <button
                  onClick={resetFilters}
                  className="border border-gray-300 px-2 py-1 rounded cursor-pointer hover:border-gray-500 transition-all duration-300"
                >
                  Restablecer
                </button>
              </div>

              {/* Búsqueda */}
              <div className="mt-4">
                <label className="text-lg font-medium mb-2 block">Buscar</label>
                <input
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Platillo, ingrediente, paso…"
                  className="w-full rounded-xl border px-3 py-2 bg-white"
                />
              </div>

              {/* Categorías */}
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Categorías</h3>
                <div className="max-h-72 overflow-auto pr-1 space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="cat"
                      checked={selectedCat === ""}
                      onChange={() => selectCategory("")}
                      className="accent-[var(--prim-color)]"
                    />
                    <span>Todas</span>
                  </label>
                  {allCats.map((c) => (
                    <label key={c} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="cat"
                        checked={selectedCat.toLowerCase() === c.toLowerCase()}
                        onChange={() => selectCategory(c)}
                        className="accent-[var(--prim-color)]"
                      />
                      <span>{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tags populares */}
              {topTags.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Tags populares</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => selectTag("")}
                      className={`px-3 py-1 rounded-full border text-sm ${
                        !selectedTag
                          ? "bg-[var(--prim-color)] text-white border-[var(--prim-color)]"
                          : "bg-white text-[var(--prim-color)] border-[var(--prim-color)]"
                      }`}
                    >
                      Todos
                    </button>
                    {topTags.map((t) => (
                      <button
                        key={t.name}
                        onClick={() => selectTag(t.name)}
                        className={`px-3 py-1 rounded-full border text-sm hover:opacity-90 ${
                          selectedTag.toLowerCase() === t.name.toLowerCase()
                            ? "bg-[var(--prim-color)] text-white border-[var(--prim-color)]"
                            : "bg-white text-[var(--prim-color)] border-[var(--prim-color)]"
                        }`}
                        title={`${t.count} receta${t.count === 1 ? "" : "s"}`}
                      >
                        <i className="bi bi-hash" /> {t.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Receta destacada */}
            {featured && (
              <div className="mt-3 border border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all hover:border-[var(--prim-color)] duration-300">
                <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-neutral-300">
                  <Image
                    src={featured.image || "/placeholder-recipe.jpg"}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1 mt-5">
                  <h3 className="text-lg font-semibold Unbounded">{featured.title}</h3>
                  <p className="text-sm text-gray-500">
                    {featured.category?.length ? featured.category.join(" · ") : "Sin categoría"}
                  </p>
                </div>
                <Link
                  href={`/UI-Components/Shop?id=${featured.id}`}
                  className="w-full inline-flex px-4 py-2 mt-3 text-base font-medium text-[var(--prim-color)] bg-[var(--prim-light)]
                             rounded-md hover:bg-[var(--prim-color)] hover:text-white transition items-center justify-center gap-2"
                >
                  Ver preparación <i className="bi bi-journal-arrow-right text-lg" />
                </Link>
              </div>
            )}
          </aside>

          {/* Grid de recetas */}
          <section className="flex-1">
            <header className="mb-2">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <i className="bi bi-egg-fried" /> Recetas
              </h1>
              {/* Chips activos */}
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedCat && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-[var(--prim-light)] text-[var(--prim-color)]">
                    <i className="bi bi-tag" /> {selectedCat}
                    <button onClick={() => selectCategory("")} className="ml-1 hover:opacity-70">
                      <i className="bi bi-x-lg" />
                    </button>
                  </span>
                )}
                {selectedTag && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-neutral-100">
                    <i className="bi bi-hash" /> {selectedTag}
                    <button onClick={() => selectTag("")} className="ml-1 hover:opacity-70">
                      <i className="bi bi-x-lg" />
                    </button>
                  </span>
                )}
              </div>
            </header>

            {loading && <p className="text-gray-500 mt-6">Cargando recetas…</p>}
            {error && (
              <p className="text-red-500 mt-6">
                {error} — verifica que esté corriendo <code>/api/recipes</code>.
              </p>
            )}

            {!loading && !error && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:mt-0 mt-6">
                  {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                      <article
                        key={recipe.id}
                        className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all hover:border-[var(--prim-color)] duration-300"
                      >
                        <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-neutral-300">
                          <Image
                            src={recipe.image || "/placeholder-recipe.jpg"}
                            alt={recipe.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </div>

                        <div className="space-y-1 mt-5">
                          <h2 className="text-base font-semibold Unbounded my-1">{recipe.title}</h2>
                          <p className="text-sm text-gray-500">
                            {recipe.category?.length ? recipe.category.slice(0, 3).join(" · ") : "Sin categoría"}
                            {recipe.category?.length && recipe.category.length > 3 ? ` +${recipe.category.length - 3}` : ""}
                          </p>
                          <p className="text-sm text-gray-500">{recipe.ingredients?.length || 0} ingredientes</p>
                        </div>

                        <Link
                          href={`/UI-Components/Shop?id=${recipe.id}`}
                          className="w-full inline-flex px-4 py-2 mt-3 text-base font-medium text-[var(--prim-color)] bg-[var(--prim-light)] 
                                     rounded-md hover:bg-[var(--prim-color)] hover:text-white transition items-center justify-center gap-2"
                        >
                          Ver preparación <i className="bi bi-journal-arrow-right text-lg" />
                        </Link>
                      </article>
                    ))
                  ) : (
                    <p className="font-bold border-b h-7 text-gray-500">Sin recetas</p>
                  )}
                </div>

                {/* Paginación */}
                <div className="mt-6 flex items-center justify-center gap-2">
                  <button
                    disabled={page <= 1}
                    onClick={() => {
                      const newPage = Math.max(1, page - 1);
                      setPage(newPage);
                      const qs = new URLSearchParams(searchParams.toString());
                      if (newPage > 1) qs.set("page", String(newPage));
                      else qs.delete("page");
                      router.replace(`${pathname}?${qs.toString()}`);
                    }}
                    className="rounded-xl border px-4 py-2 hover:bg-neutral-50 disabled:opacity-50"
                  >
                    ← Anterior
                  </button>
                  <span className="text-sm text-neutral-500">Página {page}</span>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => {
                      const newPage = page + 1;
                      setPage(newPage);
                      const qs = new URLSearchParams(searchParams.toString());
                      qs.set("page", String(newPage));
                      router.replace(`${pathname}?${qs.toString()}`);
                    }}
                    className="rounded-xl border px-4 py-2 hover:bg-neutral-50 disabled:opacity-50"
                  >
                    Siguiente →
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
