"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      alert("Por favor, completa los campos obligatorios.");
      return;
    }
    // Aquí puedes llamar a tu endpoint /api/contact si lo deseas.
    // De momento solo mostramos un feedback local.
    setSending(true);
    setTimeout(() => {
      setSending(false);
      alert("¡Gracias! Recibimos tu mensaje y te contactaremos pronto.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 800);
  };

  return (
    <>
      {/* Encabezado / breadcrumb */}
      <div className="px-[8%] lg:px-[12%] bg-[#E6F9EF] py-5">
        <div className="flex justify-between items-center">
          <h2 className="Unbounded text-2xl">Contacto</h2>
          <div className="flex">
            <Link href="/" className="text-2xl Unbounded hover:underline">
              Inicio
            </Link>
            <h2 className="Unbounded text-2xl text-[var(--prim-color)]">&nbsp;/ Contacto</h2>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="px-[8%] lg:px-[12%] py-10">
        <div className="flex flex-col lg:flex-row justify-between gap-5">
          {/* Formulario */}
          <div className="w-full border border-gray-300 px-5 py-8 rounded-lg hover:border-[var(--prim-color)] bg-white">
            <h2 className="Unbounded text-xl mb-6">Escríbenos</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label htmlFor="name" className="Unbounded mb-2">Nombre completo *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Tu nombre"
                  value={form.name}
                  onChange={handleChange}
                  className="rounded-md border border-gray-300 p-3 focus:outline-none focus:border-[var(--prim-color)]"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="Unbounded mb-2">Correo electrónico *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  value={form.email}
                  onChange={handleChange}
                  className="rounded-md border border-gray-300 p-3 focus:outline-none focus:border-[var(--prim-color)]"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="phone" className="Unbounded mb-2">Teléfono</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Opcional"
                  value={form.phone}
                  onChange={handleChange}
                  className="rounded-md border border-gray-300 p-3 focus:outline-none focus:border-[var(--prim-color)]"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="subject" className="Unbounded mb-2">Asunto *</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="¿Cómo podemos ayudarte?"
                  value={form.subject}
                  onChange={handleChange}
                  className="rounded-md border border-gray-300 p-3 focus:outline-none focus:border-[var(--prim-color)]"
                />
              </div>

              <div className="flex flex-col md:col-span-2">
                <label htmlFor="message" className="Unbounded mb-2">Mensaje *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Cuéntanos qué necesitas (ej. reportar un error de receta, proponer mejoras, etc.)."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:border-[var(--prim-color)]"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="px-6 py-2 rounded-md Unbounded font-normal text-sm tracking-wide text-white 
                    bg-[var(--prim-color)] shadow-sm hover:shadow-md 
                    hover:bg-[var(--prim-light)] hover:text-[var(--prim-color)] 
                    transition-all duration-300 ease-in-out disabled:opacity-60"
                >
                  {sending ? "Enviando..." : "Enviar mensaje"}
                </button>
              </div>
            </form>
          </div>

          {/* Información de contacto */}
          <div className="w-full lg:w-1/2 gap-3 sticky top-25 left-0 h-full transition-all duration-300">
            <div className="border border-gray-200 px-6 rounded-2xl py-8 shadow-sm hover:shadow-md bg-white">
              <h2 className="font-semibold text-2xl mb-8 text-gray-800 tracking-tight">
                Ponte en contacto
              </h2>
              <div className="flex flex-col gap-6 mt-4">
                <p className="flex items-center text-gray-700 text-base font-medium">
                  <i className="bi bi-telephone-fill mr-3 text-[var(--prim-color)] bg-[var(--prim-color-light)] px-3 py-2 rounded-full text-sm"></i>
                  +52 55 0000 0000
                </p>

                <p className="flex items-center text-gray-700 text-base font-medium">
                  <i className="bi bi-envelope-fill mr-3 text-[var(--prim-color)] bg-[var(--prim-color-light)] px-3 py-2 rounded-full text-sm"></i>
                  contacto@saborbot.dev
                </p>

                <p className="flex items-center text-gray-700 text-base font-medium">
                  <i className="bi bi-geo-alt-fill mr-3 text-[var(--prim-color)] bg-[var(--prim-color-light)] px-3 py-2 rounded-full text-sm"></i>
                  CDMX, México
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Beneficios (versión recetario, sin compras) */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5">
          <div className="flex justify-center items-center gap-3 px-3 py-5 rounded-lg bg-[var(--prim-light)]">
            <i className="bi bi-journal-text text-2xl rounded-full bg-[var(--prim-color)] px-3 py-2 text-white"></i>
            <div className="flex flex-col">
              <h2 className="font-semibold Unbounded">Recetas curadas</h2>
              <p className="text-gray-700">Contenido verificado y clasificado por categorías.</p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-3 px-3 py-5 rounded-lg bg-[var(--prim-light)]">
            <i className="bi bi-heart text-2xl rounded-full bg-[var(--prim-color)] px-3 py-2 text-white"></i>
            <div className="flex flex-col">
              <h2 className="font-semibold Unbounded">Favoritos</h2>
              <p className="text-gray-700">Guarda y organiza tus recetas preferidas.</p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-3 px-3 py-5 rounded-lg bg-[var(--prim-light)]">
            <i className="bi bi-search text-2xl rounded-full bg-[var(--prim-color)] px-3 py-2 text-white"></i>
            <div className="flex flex-col">
              <h2 className="font-semibold Unbounded">Búsqueda inteligente</h2>
              <p className="text-gray-700">Encuentra por ingredientes, etiquetas o país.</p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-3 px-3 py-5 rounded-lg bg-[var(--prim-light)]">
            <i className="bi bi-cloud-arrow-down text-2xl rounded-full bg-[var(--prim-color)] px-3 py-2 text-white"></i>
            <div className="flex flex-col">
              <h2 className="font-semibold Unbounded">Modo offline (próx.)</h2>
              <p className="text-gray-700">Consulta recetas sin conexión cuando lo actives.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
