"use client";
import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";
import Image from "next/image";

// Si no tienes estas imágenes, comenta estas líneas o sustitúyelas por las tuyas:
import StoreImg1 from "@/public/store-img1.png";
import StoreImg2 from "@/public/store-img2.png";
import payment from "@/public/payment.png";

export default function Footer() {
  return (
    <>
      <div className="footer px-[6%] lg:px-[10%] py-5 pt-10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 pb-5">
          {/* Marca y contacto */}
          <div className="flex flex-col lg:w-[28%]">
            <Link href="/" className="text-3xl font-bold Merienda text-black">
              Sabor<span className="text-[var(--prim-color)]">Bot</span>
            </Link>

            <p className="my-3 text-gray-700 leading-relaxed">
              Recetas y asistentes de cocina para inspirarte cada día. Proyecto de ZenithCorp.
            </p>

            <div className="flex flex-col gap-y-4 mt-3">
              <p className="text-base flex items-center">
                <i className="bi bi-geo-alt-fill inline-flex px-3 py-2 mr-3 text-white bg-[var(--prim-color)] rounded-full"></i>
                CDMX, México
              </p>
              <p className="text-base flex items-center">
                <i className="bi bi-telephone inline-flex px-3 py-2 mr-3 text-white bg-[var(--prim-color)] rounded-full"></i>
                +52 55 0000 0000
              </p>
              <p className="text-base flex items-center">
                <i className="bi bi-envelope inline-flex px-3 py-2 mr-3 text-white bg-[var(--prim-color)] rounded-full"></i>
                contacto@saborbot.dev
              </p>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-8 mt-12 lg:mt-0 lg:flex-1">
            <div className="flex flex-col ps-2 min-w-[180px]">
              <h2 className="Unbounded text-[20px] mb-3 font-semibold">Información</h2>
              <Link href="/acerca" className="mb-1 text-gray-700 text-[16px] leading-7 hover:text-[var(--prim-color)] hover:ps-2 transition-all duration-300">Sobre SaborBot</Link>
              <Link href="/politicas/privacidad" className="mb-1 text-gray-700 text-[16px] leading-7 hover:text-[var(--prim-color)] hover:ps-2 transition-all duration-300">Aviso de Privacidad</Link>
              <Link href="/politicas/terminos" className="mb-1 text-gray-700 text-[16px] leading-7 hover:text-[var(--prim-color)] hover:ps-2 transition-all duration-300">Términos y Condiciones</Link>
              <Link href="/proveedores" className="mb-1 text-gray-700 text-[16px] leading-7 hover:text-[var(--prim-color)] hover:ps-2 transition-all duration-300">Proveedores</Link>
              <Link href="/comunidad" className="mb-1 text-gray-700 text-[16px] leading-7 hover:text-[var(--prim-color)] hover:ps-2 transition-all duration-300">Comunidad</Link>
            </div>

            <div className="flex flex-col ps-2 min-w-[180px]">
              <h2 className="Unbounded text-[20px] mb-3 font-semibold">Soporte</h2>
              <Link href="/ayuda" className="mb-1 text-gray-700 text-[16px] leading-7 hover:text-[var(--prim-color)] hover:ps-2 transition-all duration-300">Centro de ayuda</Link>
              <Link href="/contacto" className="mb-1 text-gray-700 text-[16px] leading-7 hover:text-[var(--prim-color)] hover:ps-2 transition-all duration-300">Contáctanos</Link>
              <Link href="/politicas/devoluciones" className="mb-1 text-gray-700 text-[16px] leading-7 hover:text-[var(--prim-color)] hover:ps-2 transition-all duration-300">Política de devoluciones</Link>
              <Link href="/reportes" className="mb-1 text-gray-700 text-[16px] leading-7 hover:text-[var(--prim-color)] hover:ps-2 transition-all duration-300">Reportes</Link>
              <Link href="/guias" className="mb-1 text-gray-700 text-[16px] leading-7 hover:text-[var(--prim-color)] hover:ps-2 transition-all duration-300">Guías</Link>
            </div>

            <div className="flex flex-col ps-2 min-w-[180px]">
              <h2 className="Unbounded text-[20px] mb-3 font-semibold">Mi cuenta</h2>
              <Link href="/UI-Components/Pages/account" className="mb-1 text-gray-700 text-[16px] leading-7 hover:text-[var(--prim-color)] hover:ps-2 transition-all duration-300">Cuenta</Link>
              <Link href="/UI-Components/Pages/wishlist" className="mb-1 text-gray-700 text-[16px] leading-7 hover:text-[var(--prim-color)] hover:ps-2 transition-all duration-300">Favoritos</Link>
              <Link href="/UI-Components/Pages/cart" className="mb-1 text-gray-700 text-[16px] leading-7 hover:text-[var(--prim-color)] hover:ps-2 transition-all duration-300">Carrito</Link>
              <Link href="/UI-Components/Pages/checkout" className="mb-1 text-gray-700 text-[16px] leading-7 hover:text-[var(--prim-color)] hover:ps-2 transition-all duration-300">Finalizar</Link>
            </div>
          </div>

          {/* Apps y redes */}
          <div className="flex flex-col lg:w-[250px] shrink-0 mt-12 lg:mt-0">
            <h2 className="Unbounded text-[20px] mb-3 font-semibold">SaborBot en tu mano</h2>
            <p className="my-3 text-gray-700 text-[15px] leading-relaxed">Próximamente en tiendas.</p>
            <div className="flex items-center gap-3">
              <Image src={StoreImg1} alt="App Store" width={100} height={40} />
              <Image src={StoreImg2} alt="Google Play" width={100} height={40} />
            </div>
            <div className="social-media flex gap-3 mt-5">
              <i className="bi bi-facebook px-3 py-2 rounded-full bg-black text-white hover:bg-[var(--prim-color)] transition-all duration-300 cursor-pointer"></i>
              <i className="bi bi-twitter px-3 py-2 rounded-full bg-black text-white hover:bg-[var(--prim-color)] transition-all duration-300 cursor-pointer"></i>
              <i className="bi bi-linkedin px-3 py-2 rounded-full bg-black text-white hover:bg-[var(--prim-color)] transition-all duration-300 cursor-pointer"></i>
              <i className="bi bi-youtube px-3 py-2 rounded-full bg-black text-white hover:bg-[var(--prim-color)] transition-all duration-300 cursor-pointer"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-footer px-[8%] lg:px-[12%] py-5 bg-[var(--prim-light)]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          <p className="text-lg">
            ©2025. Todos los derechos reservados — <span className="font-semibold">SaborBot</span> by ZenithCorp
          </p>
          <Image src={payment} alt="Métodos de pago" />
        </div>
      </div>
    </>
  );
}
