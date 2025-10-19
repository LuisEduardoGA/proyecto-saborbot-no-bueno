// src/lib/loadRecipes.ts
import fs from "node:fs/promises";
import path from "node:path";

export type Ingredient = { name: string; measure: string };
export type Recipe = {
  id: string; // ← fuerza string
  title: string;
  image?: string;
  ingredients: Ingredient[];
  instructions: string;
  category: string[];
  tags?: string[];
  areaOrCuisine?: string;
};

function asLocalImagePath(val?: string): string | undefined {
  if (!val) return undefined;
  const s = String(val).trim();
  if (!s) return undefined;
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith("/")) return s;
  return `/recetas/${s}`;
}

function splitList(val?: string | null): string[] {
  if (!val) return [];
  return String(val).split(",").map((x) => x.trim()).filter(Boolean);
}

function normalizeId(rawId: any): string {
  if (rawId === null || rawId === undefined) return "";
  // si viene como número -> "12"; si viene como " 12 " -> "12"
  return String(rawId).trim();
}

export async function loadRecipes() {
  const file = path.join(process.cwd(), "data", "recetas.json"); // o recetas_normalizado.json si así lo dejaste
  const raw = await fs.readFile(file, "utf8");
  const arr = JSON.parse(raw) as any[];

  const normalized = (Array.isArray(arr) ? arr : []).map((raw) => {
    const rawImg = raw.imagen ?? raw.imagen_alusiva_a_la_receta ?? raw.image ?? undefined;
    return {
      id: normalizeId(raw.Id ?? raw.id ?? raw.ID ?? ""),
      title: (raw.Nombre_de_la_receta ?? raw.titulo ?? raw.title ?? "").toString().trim(),
      image: asLocalImagePath(rawImg),
      ingredients: Array.isArray(raw.ingredientes)
        ? raw.ingredientes.map((i: any) => ({
            name: (i?.nombre ?? i?.name ?? "").toString().trim(),
            measure: (i?.medida ?? i?.measure ?? "").toString().trim(),
          }))
        : [],
      instructions:
        (raw.instrucciones_de_preparación ?? raw.instrucciones ?? raw.instructions ?? "").toString(),
      category: Array.isArray(raw.categoría)
        ? raw.categoría
        : splitList(raw.categoría ?? raw.categoria),
      tags: Array.isArray(raw.tags) ? raw.tags : splitList(raw.tags),
      areaOrCuisine: raw.area ?? raw.cuisine ?? raw.areaOrCuisine ?? undefined,
    } as Recipe;
  });

  return normalized;
}
