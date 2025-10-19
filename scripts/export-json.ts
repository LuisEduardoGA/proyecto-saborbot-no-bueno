// scripts/export-json.ts
import { writeFileSync } from "fs";
import { prisma } from "@/lib/prisma";

async function run() {
  const recipes = await prisma.recipe.findMany({
    include: { ingredients: true, diets: true },
  });
  writeFileSync("./data/recipes.json", JSON.stringify(recipes, null, 2), "utf-8");
  console.log("✅ Exportado a data/recipes.json");
}
run().finally(() => prisma.$disconnect());
