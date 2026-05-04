"use client";

import { useState } from "react";
import type { FoodStructurePreference, Recipe } from "@/lib/types";
import { mealTypeLabel } from "@/lib/labels";
import { getMealStructureSummary, scaleIngredients } from "@/lib/recipes";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

const tagLabel: Record<string, string> = {
  glycemic_stable: "Glycémie stable",
  high_protein: "Riche en protéines",
  high_fiber: "Riche en fibres",
  salty_breakfast: "Déjeuner salé",
  soft_sweet: "Sucré doux",
  quick: "Rapide",
  family_friendly: "Famille",
  freezer_friendly: "Congélation",
  low_prep: "Peu de préparation",
  lunchbox: "Boîte à lunch",
};

type RecipeCardProps = {
  recipe: Recipe;
  servings?: number;
  compatible?: boolean;
  hiddenByDefault?: boolean;
  structurePreference?: FoodStructurePreference;
};

export function RecipeCard({
  recipe,
  servings,
  compatible = true,
  hiddenByDefault = false,
  structurePreference = "soft",
}: RecipeCardProps) {
  const [expanded, setExpanded] = useState(false);
  const effectiveServings = servings ?? recipe.baseServings;
  const ingredients = scaleIngredients(recipe, effectiveServings);
  const showStructure = structurePreference !== "hidden" && Boolean(recipe.foodStructure);
  const structureSummary = showStructure
    ? getMealStructureSummary(recipe, structurePreference === "precise")
    : [];

  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wide text-sand-600">
            {mealTypeLabel[recipe.mealType]}
          </p>
          <h3 className="mt-0.5 text-base font-medium text-ink-900">{recipe.title}</h3>
        </div>
        {compatible ? (
          <Badge tone="moss">Compatible</Badge>
        ) : (
          <Badge tone="warn">Visible en mode complet</Badge>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 text-xs">
        <Badge tone="neutral">{recipe.prepTimeMinutes} min</Badge>
        <Badge tone="neutral">{effectiveServings} portion{effectiveServings > 1 ? "s" : ""}</Badge>
        {recipe.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} tone="sand">
            {tagLabel[tag] ?? tag}
          </Badge>
        ))}
      </div>

      {hiddenByDefault ? (
        <p className="text-xs text-sand-600">
          Cette recette est masquée par défaut selon ton profil. Tu la vois parce que tu as activé
          « Voir toutes les recettes ».
        </p>
      ) : null}

      {structureSummary.length > 0 ? (
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-sand-600">
            Repères du repas
          </p>
          <div className="flex flex-wrap gap-1.5">
            {structureSummary.map((label) => (
              <Badge key={label} tone="moss">
                {label}
              </Badge>
            ))}
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="text-sm font-medium text-moss-600 hover:underline"
      >
        {expanded ? "Masquer les ingrédients" : "Voir les ingrédients"}
      </button>

      {expanded ? (
        <div className="space-y-3 border-t border-cream-200 pt-3">
          <ul className="space-y-1 text-sm text-ink-700">
            {ingredients.map((ing) => (
              <li key={ing.id}>
                {ing.name} — {ing.quantity} {ing.unit}
              </li>
            ))}
          </ul>
          <ol className="list-decimal space-y-1 pl-5 text-sm text-ink-700">
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      ) : null}
    </Card>
  );
}
