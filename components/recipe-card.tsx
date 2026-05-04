"use client";

import { useState } from "react";
import type { FoodStructurePreference, Recipe, RecipeTag } from "@/lib/types";
import { mealTypeLabel } from "@/lib/labels";
import { getMealStructureSummary, scaleIngredients } from "@/lib/recipes";
import { formatHumanQuantity } from "@/lib/format";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

const tagLabel: Record<string, string> = {
  glycemic_stable: "Glycémie stable",
  high_protein: "Protéiné",
  high_fiber: "Riche en fibres",
  salty_breakfast: "Salé",
  soft_sweet: "Sucré doux",
  quick: "Rapide",
  family_friendly: "Famille",
  freezer_friendly: "Congélation",
  low_prep: "Peu de prép.",
  lunchbox: "Lunch",
};

const PRIORITY_TAGS: RecipeTag[] = [
  "quick",
  "family_friendly",
  "low_prep",
  "lunchbox",
  "high_protein",
  "freezer_friendly",
];

function pickPriorityTag(tags: RecipeTag[]): RecipeTag | null {
  for (const tag of PRIORITY_TAGS) {
    if (tags.includes(tag)) return tag;
  }
  return tags[0] ?? null;
}

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
  const compatLabel = hiddenByDefault
    ? "Affichée en mode complet"
    : compatible
    ? "Convient à ton profil"
    : "À vérifier selon ton profil";
  const priorityTag = pickPriorityTag(recipe.tags);
  const supportNote = recipe.supportNote ?? "Repas simple à ajouter à ta semaine.";

  return (
    <Card padding="lg" className="space-y-3">
      <p className="text-xs text-sand-600">
        {mealTypeLabel[recipe.mealType]} · {compatLabel}
      </p>

      <h3 className="text-xl font-semibold leading-snug text-ink-900">{recipe.title}</h3>

      <div className="flex flex-wrap gap-1.5 text-xs">
        <Badge tone="neutral">{recipe.prepTimeMinutes} min</Badge>
        <Badge tone="neutral">
          {effectiveServings} portion{effectiveServings > 1 ? "s" : ""}
        </Badge>
        {priorityTag ? (
          <Badge tone="sand">{tagLabel[priorityTag] ?? priorityTag}</Badge>
        ) : null}
      </div>

      <p className="text-sm text-ink-700">{supportNote}</p>

      {hiddenByDefault ? (
        <p className="text-xs text-sand-700">
          Tu la vois parce que tu as activé « Voir toutes les recettes ».
        </p>
      ) : null}

      {structureSummary.length > 0 ? (
        structurePreference === "precise" ? (
          <div>
            <p className="mb-1 text-xs text-sand-700">Structure du repas</p>
            <div className="flex flex-wrap gap-1.5">
              {structureSummary.map((label) => (
                <Badge key={label} tone="moss">
                  {label}
                </Badge>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-xs text-sand-700">
            Équilibre : {structureSummary.join(" + ").toLowerCase()}.
          </p>
        )
      ) : null}

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="inline-flex h-10 items-center rounded-pill bg-cream-100 px-4 text-sm font-medium text-ink-900 transition-colors hover:bg-cream-200"
      >
        {expanded ? "Masquer la recette" : "Voir la recette"}
      </button>

      {expanded ? (
        <div className="space-y-4 border-t border-cream-200 pt-4">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-sand-600">
              Ingrédients
            </p>
            <ul className="space-y-1 text-sm text-ink-700">
              {ingredients.map((ing) => (
                <li key={ing.id}>
                  {ing.name} — {formatHumanQuantity(ing.quantity, ing.unit)}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-sand-600">
              Étapes
            </p>
            <ol className="list-decimal space-y-1 pl-5 text-sm text-ink-700">
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      ) : null}
    </Card>
  );
}
