"use client";
import Link from "next/link";

export default function Topnav() {
  return (
    <div className="w-full bg-[var(--prim-color)] text-white text-sm">
      <div className="flex items-center justify-between py-3 px-[8%] lg:px-[12%]">
        <div className="flex space-x-4">
          <Link href="/acerca" className="pr-3 border-r-2 border-gray-300 hover:underline">
            Sobre SaborBot
          </Link>
          <Link href="/envios" className="pr-3 border-r-2 border-gray-300 hover:underline">
            Entregas
          </Link>
          <Link href="/politicas/devoluciones" className="hover:underline">
            Devoluciones
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/ayuda" className="pr-3 border-r-2 border-gray-300 hover:underline">
            Centro de ayuda
          </Link>
          <Link href="/UI-Components/Pages/account" className="hover:underline">
            Mi cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}
