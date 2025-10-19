import type { Metadata } from "next";
import { Geist, Geist_Mono, Merienda, Unbounded } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar/Navbar";

import {Toaster} from "react-hot-toast";
import Footer from "./Components/Footer/Footer";

const unbounded = Unbounded({ variable: "--font-unbounded", subsets: ["latin"], display: "swap" });
const merienda = Merienda({ variable: "--font-merienda", subsets: ["latin"], display: "swap" });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SaborBot",
  description: "SaborBot Recetas",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} ${unbounded.variable} ${merienda.variable}`}
      >
        <Navbar />
        {children}
        <Footer />

        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
