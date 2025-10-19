"use client";
import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";

import BestDeals from "@/app/JsonData/BeastDeals.json";
import BestSales from "@/app/JsonData/BestSales.json";
import HotDeals from "@/app/JsonData/HotDeals.json";
import OrganicFood from "@/app/JsonData/OrganicFood.json";
import Recommend from "@/app/JsonData/Recommend.json";
import ShortProducts from "@/app/JsonData/ShortProducts.json";

import { useMemo, useState, useEffect } from "react";

interface ProductType {
  Id: string;
  title?: string;
  Name?: string;
  ProductImage?: string;
  image?: string;
  price?: string;
  Price?: string;
}

export default function MiddleNav() {
  const [cartCount, setCartCount] = useState(0);
  const [whishlistCount, setWishlistCount] = useState(0);

  // Búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<ProductType[]>([]);

  const allProducts: ProductType[] = useMemo(
    () => [
      ...BestDeals,
      ...BestSales,
      ...HotDeals,
      ...OrganicFood,
      ...Recommend,
      ...(ShortProducts?.Featured?.map((p) => ({ ...p, Id: `Featured-${p.Id}` })) || []),
      ...(ShortProducts?.TopSelling?.map((p) => ({ ...p, Id: `TopSelling-${p.Id}` })) || []),
      ...(ShortProducts?.OnSale?.map((p) => ({ ...p, Id: `OnSale-${p.Id}` })) || []),
      ...(ShortProducts?.TopRated?.map((p) => ({ ...p, Id: `TopRated-${p.Id}` })) || []),
    ],
    []
  );

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }
    const filtered = allProducts.filter((p) =>
      (p.Name || p.title || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filtered);
  }, [searchTerm, allProducts]);

  useEffect(() => {
    const loadCounts = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      const uniqueCart = new Set(cart.map((item: any) => item.Id));
      const uniqueWishlist = new Set(wishlist.map((item: any) => item.Id));
      setCartCount(uniqueCart.size);
      setWishlistCount(uniqueWishlist.size);
    };
    loadCounts();
    window.addEventListener("storageUpdate", loadCounts);
    return () => window.removeEventListener("storageUpdate", loadCounts);
  }, []);

  return (
    <div className="w-full bg-[var(--prim-light)] border-b border-gray-300 relative">
      <div className="flex items-center justify-between py-5 px-[8%] lg:px-[12%]">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold Merienda text-black">
          Sabor<span className="text-[var(--prim-color)]">Bot</span>
        </Link>

        {/* Buscar */}
        <div className="flex flex-1 ms-6 lg:mx-0 max-w-xl relative">
          <input
            type="text"
            placeholder="Buscar receta"
            className="flex-1 border px-3 py-2 rounded-l-lg border-gray-400 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Buscar receta"
          />
          <button
            className="bg-[var(--prim-color)] text-white px-3 rounded-r-lg cursor-pointer"
            aria-label="Ejecutar búsqueda"
          >
            <i className="bi bi-search" />
          </button>

          {/* Resultados de búsqueda */}
          {results.length > 0 && (
            <div className="search-result absolute top-12 left-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 p-2 grid grid-cols-1 lg:grid-cols-3 gap-3 max-h-[500px] overflow-y-auto">
              {results.map((item, index) => (
                <Link
                  key={`${item.Id}-${index}`}
                  href={{ pathname: "/UI-Components/Shop", query: { id: item.Id } }}
                  onClick={() => setSearchTerm("")}
                  className="flex flex-col items-center p-2 border border-gray-300 rounded hover:shadow-lg transition-all"
                >
                  <img
                    src={(item.ProductImage || item.image) ?? "/placeholder.png"}
                    alt={(item.Name || item.title) ?? "Producto"}
                    className="w-full object-cover rounded"
                  />
                  <h3 className="font-semibold text-sm text-center mt-2">
                    {item.Name || item.title}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">
                    ${item.Price || item.price}
                  </p>
                </Link>
              ))}
            </div>
          )}

          {/* Ubicación (opcional) */}
          <div className="hidden lg:flex text-sm ms-5 bg-white items-center pl-4 rounded-lg border border-gray-400 shrink-0">
            <i className="bi bi-geo-alt text-lg text-[var(--prim-color)]"></i>
            <select
              name="location"
              className="px-3 rounded-lg text-[var(--prim-color)] font-semibold appearance-none cursor-pointer outline-none bg-transparent"
              defaultValue="CDMX"
              aria-label="Seleccionar ubicación"
            >
              <option>CDMX</option>
              <option>Estado de México</option>
              <option>Tabasco</option>
            </select>
          </div>
        </div>

        {/* Wishlist & cart */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link href="/UI-Components/Pages/wishlist" className="relative inline-flex">
            <i className="bi bi-heart text-gray-600 text-2xl leading-none hover:text-[var(--prim-color)] transition-all"></i>
            {whishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[var(--prim-color)] text-white text-[10px] w-5 h-5 rounded-full grid place-items-center z-10 pointer-events-none">
                {whishlistCount}
              </span>
            )}
          </Link>

        </div>

      </div>
    </div>
  );
}
