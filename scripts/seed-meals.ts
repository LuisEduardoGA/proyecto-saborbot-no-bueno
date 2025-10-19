// scripts/seed-meals.ts
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { mapMealDB } from "@/lib/meals/mapMealDB";
import { translateIngredient, translateTextBlock } from "@/lib/i18n/translate";
import { classifyDiets } from "@/lib/diet/classifier";

const prisma = new PrismaClient();

async function fetchByLetter(letter: string) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const json = await res.json();
  return json.meals ?? [];
}

async function main() {
  // Diets base
  const dietDefs = [
    { key: "gluten_free", label: "Sin gluten" },
    { key: "vegan", label: "Vegana" },
    { key: "vegetarian", label: "Vegetariana" },
    { key: "dairy_free", label: "Sin lácteos" },
    { key: "nut_free", label: "Sin nueces" },
  ];
  for (const d of dietDefs) {
    await prisma.diet.upsert({ where: { key: d.key }, update: {}, create: d });
  }

  for (const ch of "abcdefghijklmnopqrstuvwxyz") {
    const meals = await fetchByLetter(ch);
    for (const m of meals) {
      const r = mapMealDB(m);

      const title_es = translateTextBlock(r.title) ?? r.title;
      const instructions_es = translateTextBlock(r.instructions);
      const ingredients_es = r.ingredients.map(ing => ({
        ...ing,
        name_es: translateIngredient(ing.name),
      }));

      const dietKeys = classifyDiets(ingredients_es.map(i => i.name_es.toLowerCase()));

      await prisma.recipe.upsert({
        where: { id: r.id },
        update: {
          title: r.title,
          title_es,
          instructions: r.instructions,
          instructions_es,
          ingredients: {
            deleteMany: {},
            create: ingredients_es.map(i => ({
              name: i.name,
              name_es: i.name_es,
              measure: i.measure,
            })),
          },
          diets: {
            set: [],
            connect: dietKeys.map(key => ({ key })),
          },
        },
        create: {
          id: r.id,
          title: r.title,
          title_es,
          instructions: r.instructions,
          instructions_es,
          ingredients: {
            create: ingredients_es.map(i => ({
              name: i.name,
              name_es: i.name_es,
              measure: i.measure,
            })),
          },
          diets: {
            connect: dietKeys.map(key => ({ key })),
          },
        },
      });
    }
  }
  console.log("✅ Seed completado");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
