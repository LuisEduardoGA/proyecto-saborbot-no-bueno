// lib/meals/mapMealDB.ts
import type { Recipe } from "../../types/recipe"; // si usas types TS

export function mapMealDB(meal: any): Recipe {
  const ingredients: { name: string; measure?: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const mea = meal[`strMeasure${i}`];
    if (ing && String(ing).trim()) {
      ingredients.push({ name: String(ing).trim(), measure: mea ? String(mea).trim() : undefined });
    }
  }

  return {
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb || undefined,
    ingredients,
    instructions: meal.strInstructions || undefined,
    sourceUrl: meal.strSource || undefined,
    tags: meal.strTags ? String(meal.strTags).split(",").map((t: string) => t.trim()).filter(Boolean) : [],
    areaOrCuisine: meal.strArea || meal.strCategory || undefined,
  };
}
