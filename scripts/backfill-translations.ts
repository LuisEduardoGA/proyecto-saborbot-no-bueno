// scripts/backfill-translations.ts
import "dotenv/config";
import { prisma } from "@/lib/prisma";
import { translateIngredient, translateMeasure, translateTextBlock, translateTitle } from "@/lib/i18n/translate";

async function run() {
  const batch = 200;
  let skip = 0;

  while (true) {
    const recipes = await prisma.recipe.findMany({
      skip, take: batch,
      include: { ingredients: true },
      orderBy: { id: "asc" },
    });
    if (recipes.length === 0) break;

    for (const r of recipes) {
      const title_es = r.title_es && r.title_es.trim() ? r.title_es : (translateTitle(r.title) ?? r.title);
      const instructions_es =
        r.instructions_es && r.instructions_es.trim()
          ? r.instructions_es
          : translateTextBlock(r.instructions ?? undefined);

      await prisma.recipe.update({
        where: { id: r.id },
        data: { title_es, instructions_es },
      });

      for (const ing of r.ingredients) {
        const name_es = ing.name_es && ing.name_es.trim() ? ing.name_es : translateIngredient(ing.name);
        await prisma.ingredient.update({
          where: { id: ing.id },
          data: { name_es },
        });
      }
    }

    skip += batch;
    console.log(`✅ Backfill: ${skip} recetas procesadas...`);
  }

  console.log("🎉 Backfill completado");
}

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
