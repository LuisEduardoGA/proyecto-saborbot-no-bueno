"use client";
import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

export default function MiddleNav() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Contadores (dejas tu lógica actual)
  const [cartCount, setCartCount] = useState(0);
  const [whishlistCount, setWishlistCount] = useState(0);

  // --- Buscador ---
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Recipe[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1); // navegación con teclado

  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sincroniza el placeholder del buscador con q de la URL (opcional)
  useEffect(() => {
    const q = searchParams.get("q") || "";
    if (!query) setQuery(q);
  }, [searchParams]); // eslint-disable-line

  // Debounce simple
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }
    const handle = setTimeout(async () => {
      try {
        setLoading(true);
        // Puedes enviar también categoria= y tag= si quieres “arrastrar” filtros actuales del contexto
        const cat = searchParams.get("categoria") || "";
        const tag = searchParams.get("tag") || "";
        const qs = new URLSearchParams({
          q: query.trim(),
          page: "1",
          limit: "8",
          ...(cat ? { categoria: cat } : {}),
          ...(tag ? { tag } : {}),
        });
        const res = await fetch(`/api/recipes?${qs.toString()}`, { cache: "no-store" });
        if (!res.ok) throw new Error();
        const data = (await res.json()) as ApiList;
        setResults(data.items || []);
        setOpen(true);
        setActiveIdx(-1);
      } catch {
        setResults([]);
        setOpen(false);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(handle);
  }, [query, searchParams]);

  // Cierre al hacer clic fuera
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // Accesibilidad / teclado
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min((results?.length ?? 0) - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(-1, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIdx >= 0 && results[activeIdx]) {
        router.push(`/UI-Components/Shop?id=${results[activeIdx].id}`);
        setOpen(false);
      } else {
        // Ir al listado con la búsqueda completa
        const qs = new URLSearchParams({ q: query.trim() });
        router.push(`/UI-Components/Shop?${qs.toString()}`);
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const submitSearch = () => {
    if (!query.trim()) return;
    const qs = new URLSearchParams({ q: query.trim() });
    router.push(`/UI-Components/Shop?${qs.toString()}`);
    setOpen(false);
  };

  // Contadores locales
  useEffect(() => {
    const loadCounts = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      const uniqueCart = new Set(cart.map((item: any) => item.Id ?? item.id));
      const uniqueWishlist = new Set(wishlist.map((item: any) => item.Id ?? item.id));
      setCartCount(uniqueCart.size);
      setWishlistCount(uniqueWishlist.size);
    };
    loadCounts();
    window.addEventListener("storageUpdate", loadCounts);
    return () => window.removeEventListener("storageUpdate", loadCounts);
  }, []);

  return (
    <div className="w-full bg-[var(--prim-light)] border-b border-gray-300 relative">
      <div className="flex items-center justify-between py-4 px-[8%] lg:px-[12%]">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold Merienda text-black">
          Sabor<span className="text-[var(--prim-color)]">Bot</span>
        </Link>

        {/* Buscador */}
        <div ref={boxRef} className="flex-1 max-w-2xl mx-4 relative">
          <div className="flex">
            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar: platillo, ingrediente o paso…"
              className="flex-1 border px-3 py-2 rounded-l-lg border-gray-400 outline-none bg-white"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => results.length && setOpen(true)}
              onKeyDown={onKeyDown}
              aria-label="Buscar recetas"
            />
            <button
              onClick={submitSearch}
              className="bg-[var(--prim-color)] text-white px-3 rounded-r-lg cursor-pointer hover:opacity-90"
              aria-label="Ejecutar búsqueda"
            >
              <i className="bi bi-search" />
            </button>
          </div>

          {/* Dropdown resultados */}
          {open && (
            <div
              role="listbox"
              className="absolute top-11 left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 p-2 max-h-[520px] overflow-y-auto"
            >
              {loading && (
                <div className="px-3 py-2 text-sm text-gray-500">Buscando…</div>
              )}

              {!loading && results.length === 0 && (
                <div className="px-3 py-2 text-sm text-gray-500">
                  Sin resultados. Presiona Enter para buscar en el recetario.
                </div>
              )}

              {!loading &&
                results.map((r, idx) => (
                  <Link
                    key={r.id}
                    href={`/UI-Components/Shop?id=${r.id}`}
                    className={`flex gap-3 p-2 rounded hover:bg-neutral-50 transition ${
                      idx === activeIdx ? "bg-neutral-50" : ""
                    }`}
                    onClick={() => setOpen(false)}
                    role="option"
                    aria-selected={idx === activeIdx}
                  >
                    <div className="relative w-16 h-16 rounded overflow-hidden bg-neutral-100 shrink-0">
                      <Image
                        src={r.image || "/placeholder-recipe.jpg"}
                        alt={r.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold line-clamp-1">{r.title}</h4>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {(r.category || []).slice(0, 3).join(" · ") || "Sin categoría"}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {(r.ingredients?.length ?? 0)} ingredientes
                      </p>
                    </div>
                  </Link>
                ))}

              {!loading && results.length > 0 && (
                <button
                  onClick={submitSearch}
                  className="w-full mt-1 px-3 py-2 text-sm rounded-md border hover:bg-neutral-50"
                >
                  Ver todos los resultados para “{query.trim()}”
                </button>
              )}
            </div>
          )}
        </div>

        {/* Wishlist (y/o otros íconos que ya tengas) */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link href="/UI-Components/Pages/wishlist" className="relative inline-flex">
            <i className="bi bi-heart text-gray-600 text-2xl leading-none hover:text-[var(--prim-color)] transition-all" />
            {whishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[var(--prim-color)] text-white text-[10px] w-5 h-5 rounded-full grid place-items-center">
                {whishlistCount}
              </span>
            )}
          </Link>
          {/* Si quieres mostrar el carrito, déjalo — o elimínalo si ya no aplica en el recetario */}
          <Link href="/UI-Components/Pages/cart" className="relative inline-flex">
            <i className="bi bi-bookmark text-gray-600 text-2xl leading-none hover:text-[var(--prim-color)] transition-all" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[var(--prim-color)] text-white text-[10px] w-5 h-5 rounded-full grid place-items-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
