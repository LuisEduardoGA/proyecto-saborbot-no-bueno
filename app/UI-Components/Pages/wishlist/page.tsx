"use client";
import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

type SavedRecipe = {
  Id: string;
  title: string;
  image: string;
  // Puedes agregar opcionalmente: tags?: string[], area?: string, category?: string
};

export default function Wishlist() {
  const [saved, setSaved] = useState<SavedRecipe[]>([]);

  // Cargar recetas guardadas desde localStorage ("wishlist" por compatibilidad)
  useEffect(() => {
    const load = () => {
      try {
        const list: SavedRecipe[] = JSON.parse(
          localStorage.getItem("wishlist") || "[]"
        );
        setSaved(list);
      } catch (e) {
        console.error("Failed to load saved recipes", e);
        setSaved([]);
      }
    };
    load();
    window.addEventListener("storageUpdate", load);
    return () => window.removeEventListener("storageUpdate", load);
  }, []);

  // Quitar una receta
  const handleRemove = (id: string) => {
    const updated = saved.filter((r) => r.Id !== id);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("storageUpdate"));
    toast.success("Receta eliminada de guardadas");
  };

  // Vaciar todas
  const handleClearAll = () => {
    if (!saved.length) return;
    localStorage.setItem("wishlist", JSON.stringify([]));
    window.dispatchEvent(new Event("storageUpdate"));
    toast.success("Se vaciaron tus recetas guardadas");
  };

  // Navegar a detalle de receta (respetando tu patrón de Shop + query)
  const recipeHref = (id: string) => ({
    pathname: "/UI-Components/Shop",
    query: { id },
  });

  return (
    <>
      {/* Encabezado */}
      <div className="px-[8%] lg:px-[12%] bg-[#E6F9EF] py-5">
        <div className="flex justify-between items-center">
          <h1 className="Unbounded text-2xl">Recetas guardadas</h1>
          <nav className="flex items-center text-sm">
            <Link href="/" className="Unbounded hover:underline text-lg">
              Inicio
            </Link>
            <span className="mx-2 text-lg">/</span>
            <span className="Unbounded text-[var(--prim-color)] text-lg">
              Guardadas
            </span>
          </nav>
        </div>
      </div>

      <div className="px-[8%] lg:px-[12%] py-10">
        {/* Estado vacío */}
        {saved.length === 0 ? (
          <div className="rounded border border-dashed border-gray-300 p-6 bg-white">
            <p className="text-lg bg-yellow-100 text-yellow-900 px-5 py-2 rounded inline-block">
              Aún no tienes recetas guardadas.
            </p>
            <div className="mt-4">
              <Link
                href="/UI-Components/Shop"
                className="inline-flex items-center gap-2 bg-[var(--prim-color)] text-white px-4 py-2 rounded hover:opacity-90"
              >
                Explorar recetas <i className="bi bi-search" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600">
                {saved.length} {saved.length === 1 ? "receta" : "recetas"}
              </p>
              <button
                onClick={handleClearAll}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
                aria-label="Vaciar recetas guardadas"
              >
                Vaciar guardadas
              </button>
            </div>

            {/* Tabla desktop */}
            <table className="min-w-full border border-gray-300 rounded hidden md:table">
              <thead className="bg-[var(--prim-light)]">
                <tr>
                  <th className="py-3 px-4 Unbounded border-r border-gray-300 font-normal text-left">
                    Receta
                  </th>
                  <th className="py-3 px-4 Unbounded border-r border-gray-300 font-normal text-left">
                    Acciones
                  </th>
                  <th className="py-3 px-4 Unbounded text-left">Quitar</th>
                </tr>
              </thead>
              <tbody>
                {saved.map((item) => (
                  <tr key={item.Id} className="border-b border-gray-300">
                    <td className="py-3 px-4 flex items-center gap-3 border-r border-gray-300">
                      <div className="w-[100px] h-[100px] flex justify-center items-center overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain rounded"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-medium Unbounded text-lg">
                          {item.title}
                        </p>
                        {/* Si añades tags/categoría, muéstralas aquí */}
                        {/* <p className="text-xs text-gray-500 mt-1">Etiquetas: Sin gluten, Vegana</p> */}
                      </div>
                    </td>
                    <td className="py-3 px-4 Unbounded border-r border-gray-300">
                      <Link
                        href={recipeHref(item.Id)}
                        className="inline-flex items-center gap-2 px-4 py-2 my-2 text-base font-semibold text-white bg-[var(--prim-color)] rounded-md hover:opacity-90 transition"
                        aria-label={`Ver receta ${item.title}`}
                      >
                        Ver receta <i className="bi bi-journal-text" />
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        onClick={() => handleRemove(item.Id)}
                        aria-label={`Quitar ${item.title} de guardadas`}
                        title="Quitar"
                      >
                        ✕ Quitar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Lista móvil */}
            <div className="md:hidden space-y-4">
              {saved.map((item) => (
                <div
                  key={item.Id}
                  className="border border-gray-300 rounded p-4 bg-white"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-[100px] h-[100px] flex justify-center items-center overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain rounded"
                      />
                    </div>
                    <div>
                      <p className="font-medium Unbounded text-lg">
                        {item.title}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Link
                      href={recipeHref(item.Id)}
                      className="inline-flex items-center gap-2 px-4 py-2 my-2 font-semibold text-white bg-[var(--prim-color)] rounded-md hover:opacity-90 transition text-sm"
                      aria-label={`Ver receta ${item.title}`}
                    >
                      Ver receta <i className="bi bi-journal-text" />
                    </Link>
                    <button
                      className="text-red-500 hover:text-red-700 cursor-pointer text-sm"
                      onClick={() => handleRemove(item.Id)}
                      aria-label={`Quitar ${item.title} de guardadas`}
                    >
                      ✕ Quitar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
