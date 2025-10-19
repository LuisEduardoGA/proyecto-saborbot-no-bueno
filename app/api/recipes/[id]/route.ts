// app/api/recipes/[id]/route.ts
import { NextResponse } from "next/server";
import { loadRecipes } from "@/lib/loadRecipes"; // o tu método real

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> } // params ahora es Promise
) {
  const { id } = await context.params; // espera params antes de usar
  const all = await loadRecipes();
  const recipe = all.find((r) => String(r.id) === String(id).trim());

  if (!recipe) {
    return NextResponse.json({ error: "Receta no encontrada" }, { status: 404 });
  }

  return NextResponse.json(recipe);
}
