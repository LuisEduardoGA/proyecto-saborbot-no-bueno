"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";

export default function Account() {
  return (
    <>
      <div className="px-[8%] lg:px-[12%] bg-[#E6F9EF] py-5">
        <div className="flex justify-between items-center">
          <h2 className="Unbounded text-2xl">Cuenta</h2>
          <div className="flex">
            <Link href="/" className="text-2xl Unbounded">
              Inicio &nbsp; :
            </Link>
            <h2 className="Unbounded text-2xl text-[var(--prim-color)]">
              &nbsp; Cuenta
            </h2>
          </div>
        </div>
      </div>

      <div className="px-[8%] lg:px-[12%] py-5">
        <div className="flex flex-col lg:flex-row justify-between gap-5">
          {/* Login */}
          <div className="w-full lg:w-1/2 gap-3 border border-gray-300 px-5 py-8 rounded-lg hover:border-[var(--prim-color)] cursor-pointer">
            <h2 className="Unbounded text-xl mb-10">Iniciar sesión</h2>
            <form>
              <div className="flex flex-col mb-5">
                <label className="Unbounded mb-2">Nombre de usuario o correo electrónico *</label>
                <input
                  type="text"
                  placeholder="Nombre"
                  className="rounded-md border border-gray-300 p-3 focus:outline-none focus:border-[var(--prim-color)]"
                />
              </div>

              <div className="flex flex-col mb-2">
                <label className="Unbounded mb-2">Contraseña</label>
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="rounded-md border border-gray-300 p-3 focus:outline-none focus:border-[var(--prim-color)]"
                />
              </div>

              {/* Olvidaste tu contraseña */}
              <div className="mb-5">
                <Link
                  href="/UI-Components/Pages/forgot-password"
                  className="text-sm text-[var(--prim-color)] hover:underline Unbounded"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <button
                  type="button"
                  className="px-6 py-2 rounded-md Unbounded font-normal text-sm tracking-wide text-white 
                  bg-[var(--prim-color)] shadow-sm hover:shadow-md 
                  hover:bg-[var(--prim-light)] hover:text-[var(--prim-color)] 
                  transition-all duration-300 ease-in-out cursor-pointer"
                >
                  Iniciar sesión
                </button>
                <div className="flex items-center">
                  <label className="flex items-center text-base cursor-pointer text-gray-700">
                    <input
                      type="checkbox"
                      className="w-4 h-4 mr-2 accent-[var(--prim-color)]"
                    />
                    Recordarme
                  </label>
                </div>
              </div>
            </form>
          </div>

          {/* Registro */}
          <div className="w-full lg:w-1/2 gap-3 border border-gray-300 px-5 py-8 rounded-lg hover:border-[var(--prim-color)] cursor-pointer">
            <h2 className="Unbounded text-xl mb-10">Registrarse</h2>
            <form>
              <div className="flex flex-col mb-5">
                <label className="Unbounded mb-2">Nombre de usuario *</label>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="rounded-md border border-gray-300 p-3 focus:outline-none focus:border-[var(--prim-color)]"
                />
              </div>

              <div className="flex flex-col mb-5">
                <label className="Unbounded mb-2">Correo electrónico *</label>
                <input
                  type="text"
                  placeholder="Nombre de usuario"
                  className="rounded-md border border-gray-300 p-3 focus:outline-none focus:border-[var(--prim-color)]"
                />
              </div>

              <div className="flex flex-col mb-5">
                <label className="Unbounded mb-2">Contraseña *</label>
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="rounded-md border border-gray-300 p-3 focus:outline-none focus:border-[var(--prim-color)]"
                />
              </div>

              <p className="text-gray-600 text-md mb-5">
                Al registrarte, aceptas nuestra <span className="text-[var(--prim-color)] hover:underline">política de privacidad</span>.
              </p>

              <button
                type="button"
                className="px-6 py-2 rounded-md Unbounded font-normal text-sm tracking-wide text-white 
                bg-[var(--prim-color)] shadow-sm hover:shadow-md 
                hover:bg-[var(--prim-light)] hover:text-[var(--prim-color)] 
                transition-all duration-300 ease-in-out cursor-pointer"
              >
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Cards inferiores (sin cambios) */}
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
