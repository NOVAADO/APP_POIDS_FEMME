"use client";

import { useMemo } from "react";
import type {
  DayKey,
  MascotProfile,
  MealType,
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
  onResetWeek: () => void;
};

const MEAL_ORDER: MealType[] = ["breakfast", "lunch", "dinner", "snack"];

export function MealsScreen({
  profile,
  mascot,
  mealPlan,
  showAllRecipes,
  onToggleShowAll,
  onChangeRecipe,
  onChangeServings,
  onResetWeek,
}: MealsScreenProps) {
  const visibleRecipes = useMemo(
    () => filterRecipes(allRecipes, profile.foodFilters, showAllRecipes),
    [profile.foodFilters, showAllRecipes],
  );

  const grouped = useMemo(() => {
    const map = new Map<MealType, typeof visibleRecipes>();
    MEAL_ORDER.forEach((t) => map.set(t, []));
    visibleRecipes.forEach((recipe) => {
      map.get(recipe.mealType)?.push(recipe);
    });
    return map;
  }, [visibleRecipes]);

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-semibold text-ink-900">Repas</h1>
        <p className="mt-1 text-sm text-sand-600">
          On prépare la semaine sans la surcharger. Tu peux cuisiner pour toi ou pour toute la famille.
        </p>
      </header>

      <MascotCard mascot={mascot} context="meals" />

      <section>
        <SectionTitle hint="Tu peux modifier les portions en tout temps. Les quantités s’ajustent automatiquement.">
          Planificateur hebdomadaire
        </SectionTitle>
        <MealPlanner
          mealPlan={mealPlan}
          visibleRecipes={visibleRecipes}
          defaultServings={profile.householdDefaultServings}
          onChangeRecipe={onChangeRecipe}
          onChangeServings={onChangeServings}
          onResetWeek={onResetWeek}
        />
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <SectionTitle
            hint={
              showAllRecipes
                ? "Tu vois toutes les recettes, y compris celles qui sortent de ton profil."
                : "Recettes filtrées selon ton profil alimentaire."
            }
          >
            Livre de recettes
          </SectionTitle>
        </div>
        <Card className="flex items-center justify-between gap-3">
          <p className="text-sm text-ink-700">
            {showAllRecipes ? "Mode complet activé" : "Filtres du profil appliqués"}
          </p>
          <Button variant="secondary" onClick={onToggleShowAll}>
            {showAllRecipes ? "Revenir aux recettes compatibles" : "Voir toutes les recettes"}
          </Button>
        </Card>

        {visibleRecipes.length === 0 ? (
          <Card>
            <p className="text-sm text-sand-600">
              Aucune recette ne correspond à ces filtres pour le moment. Tu peux élargir les options
              ou activer « Voir toutes les recettes ».
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
