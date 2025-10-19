// src/app/api/recipes/[id]/route.ts
import { NextResponse } from "next/server";
import { loadRecipes } from "@/lib/loadRecipes";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const all = await loadRecipes();
  const recipe = all.find((r) => r.id === String(id).trim());
  if (!recipe) {
    return NextResponse.json({ message: "Receta no encontrada" }, { status: 404 });
  }
  return NextResponse.json(recipe);
}
