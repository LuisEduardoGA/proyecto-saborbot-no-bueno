"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";

export default function BlogAbout() {
  return (
    <>
      {/* Encabezado / breadcrumb */}
      <div className="px-[8%] lg:px-[12%] bg-[#E6F9EF] py-5">
        <div className="flex justify-between items-center">
          <h1 className="Unbounded text-2xl">SaborBot — Blog & Acerca</h1>
          <div className="flex">
            <Link href="/" className="text-2xl Unbounded hover:underline">
              Inicio
            </Link>
            <h2 className="Unbounded text-2xl text-[var(--prim-color)]">&nbsp;/ Blog</h2>
          </div>
        </div>
      </div>

      {/* Intro */}
      <section className="px-[8%] lg:px-[12%] py-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 id="mision-vision" className="Unbounded text-xl mb-3">Misión</h2>
            <p className="text-gray-700 leading-relaxed">
              En <span className="font-semibold">SaborBot</span> (un proyecto de ZenithCorp) facilitamos
              el acceso a recetas de calidad mediante tecnología simple y accesible.
              Buscamos que cualquier persona, sin importar su experiencia, pueda cocinar
              platillos deliciosos con instrucciones claras y bien organizadas.
            </p>
            <h2 className="Unbounded text-xl mt-6 mb-3">Visión</h2>
            <p className="text-gray-700 leading-relaxed">
              Ser el recetario digital de referencia en español: confiable, rápido y
              personalizable; con búsqueda por ingredientes, filtros saludables y
              funcionalidades offline para acompañarte dentro y fuera de la cocina.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 id="valores" className="Unbounded text-xl mb-4">Valores</h2>
            <ul className="grid md:grid-cols-2 gap-3">
              <li className="flex items-start gap-3">
                <i className="bi bi-heart-fill text-[var(--prim-color)]"></i>
                <div>
                  <p className="font-semibold">Pasión por cocinar</p>
                  <p className="text-gray-700 text-sm">Amamos compartir conocimiento culinario útil.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <i className="bi bi-shield-check text-[var(--prim-color)]"></i>
                <div>
                  <p className="font-semibold">Calidad y claridad</p>
                  <p className="text-gray-700 text-sm">Recetas verificadas y pasos entendibles.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <i className="bi bi-people text-[var(--prim-color)]"></i>
                <div>
                  <p className="font-semibold">Comunidad</p>
                  <p className="text-gray-700 text-sm">Escuchamos sugerencias y mejoramos contigo.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <i className="bi bi-lightning-charge text-[var(--prim-color)]"></i>
                <div>
                  <p className="font-semibold">Simplicidad</p>
                  <p className="text-gray-700 text-sm">Rápido, limpio y fácil de usar.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Historia / Qué hay detrás */}
      <section className="px-[8%] lg:px-[12%] py-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="Unbounded text-xl mb-3">Nuestra historia</h2>
          <p className="text-gray-700 leading-relaxed">
            SaborBot nació como un proyecto académico que creció con el objetivo de
            centralizar y traducir recetas, agregar etiquetas (sin gluten, vegana,
            vegetariana, etc.), y proponer un buscador coherente con la vida real:
            “¿Qué cocino con lo que tengo?”. Hoy seguimos evolucionando con nuevas
            funciones como favoritos, colecciones y modo sin conexión.
          </p>
        </div>
      </section>

      {/* Sección de artículos/actualizaciones (mock) */}
      <section className="px-[8%] lg:px-[12%] py-6">
        <h2 className="Unbounded text-xl mb-4">Actualizaciones del proyecto</h2>
        <div className="grid md:grid-cols-3 gap-5">
          <article className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Nuevo buscador por ingredientes</h3>
            <p className="text-gray-700 text-sm">
              Filtra recetas por lo que tienes en casa y combina etiquetas saludables.
            </p>
            <Link href="/UI-Components/Shop" className="text-[var(--prim-color)] mt-3 inline-flex items-center gap-1">
              Probar ahora <i className="bi bi-arrow-right" />
            </Link>
          </article>

          <article className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Colecciones y favoritos</h3>
            <p className="text-gray-700 text-sm">
              Organiza tus recetas guardadas por temática, ocasión o dieta.
            </p>
            <Link href="/UI-Components/Pages/wishlist" className="text-[var(--prim-color)] mt-3 inline-flex items-center gap-1">
              Ver mis guardadas <i className="bi bi-arrow-right" />
            </Link>
          </article>

          <article className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Modo offline (próximamente)</h3>
            <p className="text-gray-700 text-sm">
              Descarga un paquete de recetas para consultarlas sin internet.
            </p>
            <span className="text-gray-500 text-sm mt-3 inline-flex items-center gap-1">
              En desarrollo <i className="bi bi-hourglass-split" />
            </span>
          </article>
        </div>
      </section>

      {/* CTA contacto */}
      <section className="px-[8%] lg:px-[12%] py-10">
        <div className="bg-[var(--prim-light)] rounded-2xl p-6 flex items-center justify-between flex-col md:flex-row gap-4">
          <div>
            <h3 className="Unbounded text-lg mb-1">¿Tienes ideas o detectaste un error?</h3>
            <p className="text-gray-700">Cuéntanos para mejorar SaborBot.</p>
          </div>
          <Link
            href="/UI-Components/Pages/contact"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-md text-white bg-[var(--prim-color)] hover:opacity-90"
          >
            Ir a contacto <i className="bi bi-chat-square-text" />
          </Link>
        </div>
      </section>
    </>
  );
}
