"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";
import Image from "next/image";

export default function Banner() {
  return (
    <div className="px-[8%] lg:px-[12%] py-10">
      <div className="relative rounded-2xl flex flex-col md:flex-row items-center justify-between overflow-hidden bg-[var(--prim-color)] text-white">
        {/* Texto */}
        <div className="p-8 md:p-12 max-w-2xl">
          <h1 className="text-3xl md:text-5xl leading-tight Merienda">
            Recetario de Comida Mexicana
          </h1>
          <p className="mt-3 text-white/90">
            Explora recetas auténticas, filtra por categorías y deja que{" "}
            <strong>SaborBot</strong> te guíe paso a paso en tu cocina.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/SaborBot"           // ← ajusta si tu chatbot vive en otra ruta
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white text-[var(--prim-color)] font-semibold hover:opacity-90 transition"
            >
              <i className="bi bi-robot" /> Habla con SaborBot
            </Link>
            <Link
              href="/UI-Components/Shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[var(--prim-light)] text-[var(--prim-color)] font-semibold hover:bg-white hover:text-[var(--prim-color)] transition"
            >
              <i className="bi bi-journal-text" /> Explorar recetas
            </Link>
          </div>
        </div>

        {/* Imagen decorativa (elige una receta que tengas en /public/recetas/) */}
        <div className="relative w-full md:w-[40%] aspect-video md:aspect-auto md:h-[320px]">
          <Image
            src="/recetas/guacamole-clasico.jpg"  // ← puedes cambiarla por otra
            alt="Guacamole clásico"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover md:rounded-l-2xl"
            priority
          />
        </div>
      </div>
    </div>
  );
}
