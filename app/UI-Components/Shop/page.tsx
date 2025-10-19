"use client";
import { useSearchParams } from "next/navigation";
import ProductDetails from "./ProductDetails/ProductDetails";
import Products from "./Products/Products";

// Esta página decide: si hay ?id=... muestra el detalle; si no, la grilla.
export default function ShopPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? undefined;

  return <div>{id ? <ProductDetails id={id} /> : <Products />}</div>;
}
