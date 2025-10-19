"use client";
import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";

type NavLink = {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
};

const NavLinks: NavLink[] = [
  { label: "Inicio", href: "/" },
  {
    label: "Recetas",
    href: "/UI-Components/Shop", // cámbialo a "/recetas" si ya tienes esa ruta
  },
  { label: "Favoritos", href: "/UI-Components/Pages/wishlist" },
  { label: "Cuenta", href: "/UI-Components/Pages/account" },
  {
    label: "Blog",
    href: "/UI-Components/Pages/blog",
    dropdown: [
      { label: "Misión y Visión", href: "/UI-Components/Pages/blog#mision-vision" },
      { label: "Valores", href: "/UI-Components/Pages/blog#valores" },
    ],
  },
  { label: "Contacto", href: "/UI-Components/Pages/contact" },
];

export default function BottomNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );
  const [isFixed, setIsFixed] = useState(false);

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  useEffect(() => {
    const handleScroll = () => setIsFixed(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [cartCount, setCartCount] = useState(0);
  const [whishlistCount, setWishlistCount] = useState(0);

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
    <div
      className={`w-full bg-white shadow-sm transition-all duration-500 ${
        isFixed ? "fixed top-0 left-0 z-50 fixed-nav" : ""
      }`}
    >
      <div className="flex items-center justify-between px-[8%] lg:px-[12%] text-gray-700">
        {/* Logo compacto al fijarse */}
        <Link
          href="/"
          className={`text-3xl font-bold Merienda text-black hidden ${
            isFixed ? "lg:flex" : "hidden"
          }`}
        >
          Sabor<span className="text-[var(--prim-color)]">Bot</span>
        </Link>

        {/* Menú desktop */}
        <nav className="hidden lg:flex space-x-6 menu-link relative">
          {NavLinks.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="relative group z-[99999]">
                <Link href={link.href} className="flex items-center gap-1">
                  {link.label} <i className="ri-arrow-down-s-line"></i>
                </Link>
                <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-xl p-2 border border-gray-100 rounded-lg min-w-[180px]">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 rounded-md hover:bg-[var(--prim-light)] transition-all"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={link.label} href={link.href}>
                {link.label}
              </Link>
            )
          )}
        </nav>

      </div>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="overflow-hidden transition-all duration-500">
          <nav className="flex flex-col px-[4%] py-4 space-y-1">
            {NavLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="flex flex-col">
                  <button
                    className="flex justify-between items-center w-full px-2 py-2 font-medium rounded-md hover:bg-gray-100"
                    onClick={() => toggleDropdown(link.label)}
                    aria-expanded={!!openDropdowns[link.label]}
                  >
                    {link.label}{" "}
                    <i
                      className={`ri-arrow-down-s-line transition-transform ${
                        openDropdowns[link.label] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      openDropdowns[link.label] ? "max-h-60 mt-1" : "max-h-0"
                    }`}
                  >
                    <div className="flex flex-col bg-[var(--prim-light)] p-2 space-y-1">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="px-2 py-1 bg-white rounded-md hover:bg-gray-100"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2 py-2 rounded-md hover:bg-gray-100"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
      
    </div>
  );
}
