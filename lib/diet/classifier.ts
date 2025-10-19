// lib/diet/classifier.ts
const GRAINS_GLUTEN = ["trigo", "harina de trigo", "cebada", "centeno", "pan", "pasta", "cuscús", "bulgur"];
const MEATS = ["pollo", "res", "cerdo", "cordero", "pavo", "jamón", "tocino", "salchicha"];
const FISH = ["pescado", "atún", "salmón", "bacalao"];
const SEAFOOD = ["camarón", "gamba", "langostino", "calamar", "pulpo"];
const DAIRY = ["leche", "mantequilla", "queso", "crema", "yogur"];
const EGGS = ["huevo", "huevos"];
const HONEY = ["miel"];
const NUTS = ["almendra", "nuez", "nueces", "cacahuate", "maní", "avellana", "pistache", "nuez de la india"];

function hasAny(words: string[], haystack: string[]) {
  return haystack.some(h => words.includes(h));
}

export type DietKey = "gluten_free" | "vegan" | "vegetarian" | "dairy_free" | "nut_free";

export function classifyDiets(ingredientNamesEs: string[]): DietKey[] {
  const ing = ingredientNamesEs.map(s => s.toLowerCase());

  const hasGluten = hasAny(GRAINS_GLUTEN, ing);
  const hasMeat = hasAny(MEATS, ing);
  const hasFish = hasAny(FISH, ing) || hasAny(SEAFOOD, ing);
  const hasDairy = hasAny(DAIRY, ing);
  const hasEggs = hasAny(EGGS, ing);
  const hasHoney = hasAny(HONEY, ing);
  const hasNuts = hasAny(NUTS, ing);

  const diets: DietKey[] = [];

  if (!hasGluten) diets.push("gluten_free");
  if (!hasDairy) diets.push("dairy_free");
  if (!hasNuts) diets.push("nut_free");

  const vegetarianOk = !hasMeat && !hasFish;
  if (vegetarianOk) diets.push("vegetarian");

  const veganOk = vegetarianOk && !hasDairy && !hasEggs && !hasHoney;
  if (veganOk) diets.push("vegan");

  return diets;
}
