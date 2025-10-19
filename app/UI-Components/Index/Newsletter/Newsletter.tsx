"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import Image from "next/image";
import newsletter from "@/public/newsletter-img.png";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes integrar tu endpoint de newsletter.
    // Por ahora, solo feedback básico:
    if (!email.trim()) {
      alert("Por favor, escribe tu correo.");
      return;
    }
    alert("¡Gracias por suscribirte! Pronto recibirás nuevas recetas 🍽️");
    setEmail("");
  };

  return (
    <>
      <div className="px-[8%] lg:px-[12%] py-10">
        <div className="p-10 newsletter-wrap text-white rounded-2xl flex flex-col lg:flex-row justify-between items-center gap-5">
          <div className="w-full lg:w-1/2">
            <h1 className="Unbounded text-2xl lg:text-4xl">
              No te pierdas nuevas recetas
            </h1>
            <h3 className="text-sm lg:text-xl my-2 Unbounded">
              SUSCRÍBETE AL BOLETÍN SEMANAL
            </h3>
            <form
              onSubmit={onSubmit}
              className="mt-7 border border-gray-300 rounded-2xl p-2 flex justify-between items-center bg-white"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 outline-none px-3 text-black"
                placeholder="Tu correo electrónico…"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 my-2 text-lg font-semibold text-white bg-[var(--prim-color)] rounded-md hover:bg-green-600 transition-all duration-300"
              >
                Suscribirme
              </button>
            </form>
            <p className="mt-2 text-white/90 text-sm">
              Recibe ideas, tips y selecciones del recetario mexicano directo en tu bandeja.
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <Image src={newsletter} alt="newsletter" />
          </div>
        </div>
      </div>
    </>
  );
}
