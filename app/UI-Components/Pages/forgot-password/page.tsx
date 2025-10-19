"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Solo UI: simulamos envío
    setSent(true);
  };

  return (
    <>
      {/* Encabezado con el mismo diseño */}
      <div className="px-[8%] lg:px-[12%] bg-[#E6F9EF] py-5">
        <div className="flex justify-between items-center">
          <h2 className="Unbounded text-2xl">Recuperar contraseña</h2>
          <div className="flex">
            <Link href="/" className="text-2xl Unbounded">
              Inicio &nbsp; :
            </Link>
            <h2 className="Unbounded text-2xl text-[var(--prim-color)]">
              &nbsp; Recuperar contraseña
            </h2>
          </div>
        </div>
      </div>

      {/* Contenido central mimetizando las tarjetas */}
      <div className="px-[8%] lg:px-[12%] py-5">
        <div className="flex flex-col lg:flex-row justify-between gap-5">
          <div className="w-full lg:w-1/2 gap-3 border border-gray-300 px-5 py-8 rounded-lg hover:border-[var(--prim-color)]">
            <h2 className="Unbounded text-xl mb-3">Recuperar contraseña</h2>
            <p className="text-gray-700 mb-8">
              Ingresa el correo asociado a tu cuenta y te enviaremos las
              instrucciones para restablecer tu contraseña.
            </p>

            {!sent ? (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-5">
                  <label className="Unbounded mb-2">Correo electrónico *</label>
                  <input
                    type="email"
                    required
                    placeholder="tu@correo.com"
                    className="rounded-md border border-gray-300 p-3 focus:outline-none focus:border-[var(--prim-color)]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2 rounded-md Unbounded font-normal text-sm tracking-wide text-white 
                  bg-[var(--prim-color)] shadow-sm hover:shadow-md 
                  hover:bg-[var(--prim-light)] hover:text-[var(--prim-color)] 
                  transition-all duration-300 ease-in-out cursor-pointer"
                >
                  Enviar instrucciones
                </button>

                <div className="mt-6">
                  <Link
                    href="/UI-Components/Pages/account"
                    className="text-sm text-[var(--prim-color)] hover:underline Unbounded"
                  >
                    <i className="bi bi-arrow-left mr-1" />
                    Volver a iniciar sesión
                  </Link>
                </div>
              </form>
            ) : (
              <div className="rounded-md border border-green-200 bg-green-50 p-4">
                <div className="flex items-start gap-3">
                  <i className="bi bi-check-circle text-xl text-green-600" />
                  <div>
                    <p className="Unbounded mb-1">Correo enviado</p>
                    <p className="text-gray-700">
                      Si <span className="font-medium">{email}</span> está
                      registrado, recibirás un enlace para restablecer tu
                      contraseña en unos minutos.
                    </p>
                    <div className="mt-6">
                      <Link
                        href="/UI-Components/Pages/account"
                        className="text-sm text-[var(--prim-color)] hover:underline Unbounded"
                      >
                        <i className="bi bi-box-arrow-in-right mr-1" />
                        Volver al login
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Lado derecho opcional */}
          <div className="w-full lg:w-1/2 gap-3 border border-gray-300 px-5 py-8 rounded-lg hover:border-[var(--prim-color)]">
            <h2 className="Unbounded text-xl mb-3">¿No tienes cuenta?</h2>
            <p className="text-gray-700 mb-6">
              Crea una cuenta para disfrutar de la experiencia completa en SaborBot.
            </p>
            <Link
              href="/UI-Components/Pages/account"
              className="inline-flex items-center gap-2 px-6 py-2 rounded-md Unbounded font-normal text-sm tracking-wide text-white 
              bg-[var(--prim-color)] shadow-sm hover:shadow-md 
              hover:bg-[var(--prim-light)] hover:text-[var(--prim-color)] 
              transition-all duration-300 ease-in-out"
            >
              <i className="bi bi-person-plus" />
              Ir a registro
            </Link>
          </div>
        </div>
      </div>

      {/* Cards inferiores */}
      <div className="px-[8%] lg:px-[12%] py-5">
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5">
          <div className="flex justify-center items-center gap-3 px-3 py-5 rounded-lg bg-[var(--prim-light)]">
            <i className="bi bi-chat-square-text text-2xl rounded-full bg-[var(--prim-color)] px-3 py-2 text-white"></i>
            <div className="flex flex-col">
              <h2 className="font-semibold Unbounded">Chatbot interactivo</h2>
              <p className="text-gray-700">Interacción 24/7 con el chatbot SaborBot</p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-3 px-3 py-5 rounded-lg bg-[var(--prim-light)]">
            <i className="bi bi-heart text-2xl rounded-full bg-[var(--prim-color)] px-3 py-2 text-white"></i>
            <div className="flex flex-col">
              <h2 className="font-semibold Unbounded">Recetas personalizadas</h2>
              <p className="text-gray-700">Descubre recetas adaptadas a tus gustos</p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-3 px-3 py-5 rounded-lg bg-[var(--prim-light)]">
            <i className="bi bi-people text-2xl rounded-full bg-[var(--prim-color)] px-3 py-2 text-white"></i>
            <div className="flex flex-col">
              <h2 className="font-semibold Unbounded">Comunidad SaborBot</h2>
              <p className="text-gray-700">Conéctate con otros usuarios y comparte recetas</p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-3 px-3 py-5 rounded-lg bg-[var(--prim-light)]">
            <i className="bi bi-clock text-2xl rounded-full bg-[var(--prim-color)] px-3 py-2 text-white"></i>
            <div className="flex flex-col">
              <h2 className="font-semibold Unbounded">Recetas rápidas</h2>
              <p className="text-gray-700">Recetas fáciles y rápidas de preparar</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
