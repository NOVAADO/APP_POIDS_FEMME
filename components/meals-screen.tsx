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
import { ScreenHeader } from "./ui/screen-header";
import { Button } from "./ui/button";
import { MascotCard } from "./mascot-card";
import { RecipeCard } from "./recipe-card";
import { MealPlanner } from "./meal-planner";
import { AiMealAnalysisCard } from "./ai-meal-analysis-card";

type MealsScreenProps = {
  profile: UserProfile;
  mascot: MascotProfile;
  mealPlan: WeeklyMealPlan;
  showAllRecipes: boolean;
  onToggleShowAll: () => void;
  onChangeRecipe: (day: DayKey, mealType: MealType, recipeId: string | null) => void;
  onChangeServings: (day: DayKey, mealType: MealType, servings: number) => void;
  onCopyDayMeal: (sourceDay: DayKey, targetDay: DayKey, mealType: MealType) => void;
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
    <div className="space-y-6">
      <ScreenHeader
        eyebrow="Repas"
        title="Une semaine, à ton rythme"
        subtitle="On y va une étape à la fois. Le plan peut rester partiel."
      />

      <MascotCard mascot={mascot} context="meals" />

      {profile.foodStructurePreference !== "hidden" ? (
        <Card padding="md" className="space-y-2">
          <button
            type="button"
            onClick={() => setStructureInfoOpen((v) => !v)}
            aria-expanded={structureInfoOpen}
            className="flex w-full items-center justify-between gap-2 text-left"
          >
            <span className="text-sm font-medium text-ink-900">Repères alimentaires</span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-moss-600 underline-offset-2 group-hover:underline">
              {structureInfoOpen ? "Masquer" : "En savoir plus"}
              <span aria-hidden>{structureInfoOpen ? "▴" : "▾"}</span>
            </span>
          </button>
          {structureInfoOpen ? (
            <p className="text-sm text-sand-700">
              L’application peut afficher la structure simple des repas : protéine, légumes, fruit,
              féculent et lipide. Ces repères servent à réduire les décisions, pas à te contrôler.
              Tu peux les masquer ou les rendre plus précis dans ton profil.
            </p>
          ) : null}
        </Card>
      ) : null}

      <section className="space-y-3">
        <SectionHeader
          title="Planificateur"
          hint="Tu n’as pas besoin de tout planifier d’un coup."
        />
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
        <section className="space-y-3">
          <SectionHeader
            title="Choix rapides"
            hint="Pas besoin de tout regarder. Tu peux partir d’ici."
          />
          <div className="space-y-3">
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

      <AiMealAnalysisCard />

      <section className="space-y-3">
        <SectionHeader
          title="Livre de recettes"
          hint={
            showAllRecipes
              ? "Tu vois tout, y compris les recettes hors profil."
              : "Filtré selon ton profil alimentaire."
          }
        />

        <div className="-mx-1 flex flex-wrap gap-1.5 px-1">
          {TYPE_FILTER_OPTIONS.map((option) => {
            const active = typeFilter === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setTypeFilter(option.value)}
                aria-pressed={active}
                className={`inline-flex h-9 items-center rounded-pill border px-4 text-xs transition-colors ${
                  active
                    ? "border-ink-900 bg-ink-900 text-cream-50"
                    : "border-cream-200 bg-white text-ink-700 hover:bg-cream-100"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <Card padding="md" className="flex items-center justify-between gap-3">
          <p className="text-sm text-ink-700">
            {showAllRecipes ? "Mode complet activé" : "Filtres du profil appliqués"}
          </p>
          <Button variant="secondary" onClick={onToggleShowAll}>
            {showAllRecipes ? "Mode profil" : "Voir tout"}
          </Button>
        </Card>

        {filteredByType.length === 0 ? (
          <Card padding="md">
            <p className="text-sm text-sand-700">
              Aucune recette ne correspond pour le moment. Tu peux élargir le filtre ou activer
              « Voir tout ».
            </p>
          </Card>
        ) : null}

        {MEAL_ORDER.map((mealType) => {
          const list = grouped.get(mealType) ?? [];
          if (list.length === 0) return null;
          return (
            <div key={mealType} className="space-y-3">
              <p className="px-1 text-sm font-medium text-ink-900">{mealTypeLabel[mealType]}</p>
              <div className="space-y-3">
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

function SectionHeader({ title, hint }: { title: string; hint?: string }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-ink-900">{title}</h2>
      {hint ? <p className="mt-0.5 text-xs text-sand-700">{hint}</p> : null}
    </div>
  );
}
