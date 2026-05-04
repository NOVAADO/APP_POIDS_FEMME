import type { FoodFilter, Ingredient, MealType, Recipe } from "./types";
import { recipes as allRecipes } from "@/data/recipes";
import { round1 } from "./format";
import {
  foodStructureLabel,
  foodStructureLabelPrecise,
  type FoodStructureKey,
} from "./labels";

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

const STRUCTURE_KEYS: FoodStructureKey[] = [
  "protein",
  "vegetables",
  "salad",
  "fruit",
  "grainOrStarch",
  "fat",
];

export function hasProtein(recipe: Recipe): boolean {
  return Boolean(recipe.foodStructure?.protein);
}

export function hasVegetables(recipe: Recipe): boolean {
  return Boolean(recipe.foodStructure?.vegetables || recipe.foodStructure?.salad);
}

export function hasGrainOrStarch(recipe: Recipe): boolean {
  return Boolean(recipe.foodStructure?.grainOrStarch);
}

export function hasFat(recipe: Recipe): boolean {
  return Boolean(recipe.foodStructure?.fat);
}

export function getMealStructureSummary(
  recipe: Recipe,
  precise: boolean = false,
): string[] {
  const structure = recipe.foodStructure;
  if (!structure) return [];
  const labels = precise ? foodStructureLabelPrecise : foodStructureLabel;
  return STRUCTURE_KEYS.filter((key) => structure[key]).map((key) => labels[key]);
}
