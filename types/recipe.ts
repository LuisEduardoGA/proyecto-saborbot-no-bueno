export type Ingredient = { name: string; measure: string };

export type Recipe = {
  id: string | number;
  title: string;
  image?: string;
  ingredients: Ingredient[];
  instructions: string;
  category: string[];   // ["Vegana","Vegetariana","Sin gluten",...]
  tags?: string[];
  areaOrCuisine?: string;
};
