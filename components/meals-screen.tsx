"use client";

import { useMemo, useState } from "react";
import type {
  DayKey,
  MascotProfile,
  MealType,
  Recipe,
  UserProfile,
  WeeklyMealPlan,
} from "@/lib/types";
import { recipes as allRecipes } from "@/data/recipes";
import { filterRecipes, isRecipeCompatible } from "@/lib/recipes";
import { mealTypeLabel } from "@/lib/labels";
import { Card } from "./ui/card";
import { SectionTitle } from "./ui/section-title";
import { Button } from "./ui/button";
import { MascotCard } from "./mascot-card";
import { RecipeCard } from "./recipe-card";
import { MealPlanner } from "./meal-planner";

type MealsScreenProps = {
  profile: UserProfile;
  mascot: MascotProfile;
  mealPlan: WeeklyMealPlan;
  showAllRecipes: boolean;
  onToggleShowAll: () => void;
  onChangeRecipe: (day: DayKey, mealType: MealType, recipeId: string | null) => void;
  onChangeServings: (day: DayKey, mealType: MealType, servings: number) => void;
  onCopyDayMeal: (
    sourceDay: DayKey,
    targetDay: DayKey,
    mealType: MealType,
  ) => void;
  onResetWeek: () => void;
};

const MEAL_ORDER: MealType[] = ["breakfast", "lunch", "dinner", "snack"];

type TypeFilter = "all" | MealType;

const TYPE_FILTER_OPTIONS: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "breakfast", label: "Déjeuners" },
  { value: "lunch", label: "Dîners" },
  { value: "dinner", label: "Soupers" },
  { value: "snack", label: "Collations" },
];

function pickQuickRecipes(recipes: Recipe[]): Recipe[] {
  if (recipes.length < 3) return [];
  const quick = recipes.find((r) => r.tags.includes("quick"));
  const family = recipes.find(
    (r) => r.tags.includes("family_friendly") && r.id !== quick?.id,
  );
  const stable = recipes.find(
    (r) =>
      (r.tags.includes("glycemic_stable") || r.tags.includes("high_protein")) &&
      r.id !== quick?.id &&
      r.id !== family?.id,
  );
  const picks = [quick, family, stable].filter((r): r is Recipe => Boolean(r));
  if (picks.length >= 3) return picks.slice(0, 3);
  // Fallback: complete with first compatible recipes not already picked
  const taken = new Set(picks.map((r) => r.id));
  for (const r of recipes) {
    if (picks.length >= 3) break;
    if (!taken.has(r.id)) {
      picks.push(r);
      taken.add(r.id);
    }
  }
  return picks.slice(0, 3);
}

export function MealsScreen({
  profile,
  mascot,
  mealPlan,
  showAllRecipes,
  onToggleShowAll,
  onChangeRecipe,
  onChangeServings,
  onCopyDayMeal,
  onResetWeek,
}: MealsScreenProps) {
  const visibleRecipes = useMemo(
    () => filterRecipes(allRecipes, profile.foodFilters, showAllRecipes),
    [profile.foodFilters, showAllRecipes],
  );

  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [structureInfoOpen, setStructureInfoOpen] = useState(false);

  const filteredByType = useMemo(() => {
    if (typeFilter === "all") return visibleRecipes;
    return visibleRecipes.filter((r) => r.mealType === typeFilter);
  }, [visibleRecipes, typeFilter]);

  const grouped = useMemo(() => {
    const map = new Map<MealType, Recipe[]>();
    MEAL_ORDER.forEach((t) => map.set(t, []));
    filteredByType.forEach((recipe) => {
      map.get(recipe.mealType)?.push(recipe);
    });
    return map;
  }, [filteredByType]);

  const quickPicks = useMemo(() => pickQuickRecipes(visibleRecipes), [visibleRecipes]);

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-semibold text-ink-900">Repas</h1>
        <p className="mt-1 text-sm text-sand-600">
          On y va un jour à la fois. Le plan peut rester partiel.
        </p>
      </header>

      <MascotCard mascot={mascot} context="meals" />

      {profile.foodStructurePreference !== "hidden" ? (
        <Card className="space-y-2">
          <button
            type="button"
            onClick={() => setStructureInfoOpen((v) => !v)}
            aria-expanded={structureInfoOpen}
            className="flex w-full items-center justify-between gap-2 text-left"
          >
            <span className="text-sm font-medium text-ink-900">Repères alimentaires</span>
            <span className="text-xs text-moss-600">
              {structureInfoOpen ? "Masquer" : "En savoir plus"}
            </span>
          </button>
          {structureInfoOpen ? (
            <p className="text-sm text-sand-600">
              L’application peut afficher la structure simple des repas : protéine, légumes, fruit,
              féculent et lipide. Ces repères servent à réduire les décisions, pas à te contrôler.
              Tu peux les masquer ou les rendre plus précis dans ton profil.
            </p>
          ) : null}
        </Card>
      ) : null}

      <section>
        <SectionTitle hint="Tu n’as pas besoin de tout planifier d’un coup.">
          Planificateur hebdomadaire
        </SectionTitle>
        <MealPlanner
          mealPlan={mealPlan}
          visibleRecipes={visibleRecipes}
          defaultServings={profile.householdDefaultServings}
          onChangeRecipe={onChangeRecipe}
          onChangeServings={onChangeServings}
          onCopyDayMeal={onCopyDayMeal}
          onResetWeek={onResetWeek}
        />
      </section>

      {quickPicks.length >= 3 ? (
        <section>
          <SectionTitle hint="Pas besoin de tout regarder. Tu peux partir d’ici.">
            Choix rapides
          </SectionTitle>
          <div className="space-y-2">
            {quickPicks.map((recipe) => (
              <RecipeCard
                key={`quick-${recipe.id}`}
                recipe={recipe}
                compatible={isRecipeCompatible(recipe, profile.foodFilters)}
                structurePreference={profile.foodStructurePreference}
              />
            ))}
          </div>
        </section>
      ) : null}

      <section className="space-y-3">
        <SectionTitle
          hint={
            showAllRecipes
              ? "Tu vois toutes les recettes, y compris celles qui sortent de ton profil."
              : "Recettes filtrées selon ton profil alimentaire."
          }
        >
          Livre de recettes
        </SectionTitle>

        <div className="-mx-1 flex flex-wrap gap-1.5 px-1">
          {TYPE_FILTER_OPTIONS.map((option) => {
            const active = typeFilter === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setTypeFilter(option.value)}
                aria-pressed={active}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  active
                    ? "border-moss-500 bg-moss-500/10 text-moss-600"
                    : "border-cream-200 bg-white text-ink-700 hover:bg-cream-100"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <Card className="flex items-center justify-between gap-3">
          <p className="text-sm text-ink-700">
            {showAllRecipes ? "Mode complet activé" : "Filtres du profil appliqués"}
          </p>
          <Button variant="secondary" onClick={onToggleShowAll}>
            {showAllRecipes ? "Revenir aux recettes compatibles" : "Voir toutes les recettes"}
          </Button>
        </Card>

        {filteredByType.length === 0 ? (
          <Card>
            <p className="text-sm text-sand-600">
              Aucune recette ne correspond pour le moment. Tu peux élargir le filtre ou activer
              « Voir toutes les recettes ».
            </p>
          </Card>
        ) : null}

        {MEAL_ORDER.map((mealType) => {
          const list = grouped.get(mealType) ?? [];
          if (list.length === 0) return null;
          return (
            <div key={mealType} className="space-y-2">
              <p className="px-1 text-sm font-medium text-ink-900">{mealTypeLabel[mealType]}</p>
              <div className="space-y-2">
                {list.map((recipe) => {
                  const compatible = isRecipeCompatible(recipe, profile.foodFilters);
                  return (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      compatible={compatible}
                      hiddenByDefault={!compatible && showAllRecipes}
                      structurePreference={profile.foodStructurePreference}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
