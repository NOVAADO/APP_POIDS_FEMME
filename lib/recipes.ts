import type { FoodFilter, Ingredient, MealType, Recipe } from "./types";
import { recipes as allRecipes } from "@/data/recipes";
import { round1 } from "./format";

export function filterRecipes(
  recipes: Recipe[],
  foodFilters: FoodFilter[],
  showAll: boolean,
): Recipe[] {
  if (showAll) return recipes;
  return recipes.filter((recipe) =>
    !recipe.excludedFor.some((filter) => foodFilters.includes(filter)),
  );
}

export function isRecipeCompatible(recipe: Recipe, foodFilters: FoodFilter[]): boolean {
  return !recipe.excludedFor.some((filter) => foodFilters.includes(filter));
}

export function scaleIngredients(recipe: Recipe, servings: number): Ingredient[] {
  const safeServings = Math.max(1, servings);
  const multiplier = safeServings / Math.max(1, recipe.baseServings);
  return recipe.ingredients.map((ingredient) => ({
    ...ingredient,
    quantity: round1(ingredient.quantity * multiplier),
  }));
}

export function getRecipeById(recipeId: string): Recipe | undefined {
  return allRecipes.find((r) => r.id === recipeId);
}

export function getRecipesByMealType(recipes: Recipe[], mealType: MealType): Recipe[] {
  return recipes.filter((r) => r.mealType === mealType);
}

export function getCompatibilityReason(recipe: Recipe, foodFilters: FoodFilter[]): string[] {
  return recipe.excludedFor.filter((filter) => foodFilters.includes(filter));
}
