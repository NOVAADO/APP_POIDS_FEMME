"use client";

import { useState } from "react";
import type {
  DayKey,
  MealType,
  PlannedMeal,
  Recipe,
  WeeklyMealPlan,
} from "@/lib/types";
import { DAY_KEYS, DAY_LABELS } from "@/lib/dates";
import { mealTypeLabel } from "@/lib/labels";
import { getRecipesByMealType } from "@/lib/recipes";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

type MealPlannerProps = {
  mealPlan: WeeklyMealPlan;
  visibleRecipes: Recipe[];
  defaultServings: number;
  onChangeRecipe: (day: DayKey, mealType: MealType, recipeId: string | null) => void;
  onChangeServings: (day: DayKey, mealType: MealType, servings: number) => void;
  onResetWeek: () => void;
};

const MEAL_TYPES: MealType[] = ["breakfast", "lunch", "dinner", "snack"];

export function MealPlanner({
  mealPlan,
  visibleRecipes,
  defaultServings,
  onChangeRecipe,
  onChangeServings,
  onResetWeek,
}: MealPlannerProps) {
  const [openDay, setOpenDay] = useState<DayKey | null>("monday");

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-base font-semibold text-ink-900">Semaine en cours</p>
          <p className="text-xs text-sand-600">
            Tu peux modifier les portions en tout temps.
          </p>
        </div>
        <Button variant="secondary" onClick={onResetWeek}>
          Préparer une nouvelle semaine
        </Button>
      </div>

      <div className="space-y-2">
        {DAY_KEYS.map((day) => {
          const isOpen = openDay === day;
          const dayMeals = mealPlan.days[day];
          const filledCount = MEAL_TYPES.filter((t) => dayMeals[t]).length;
          return (
            <div key={day} className="rounded-soft border border-cream-200 bg-white">
              <button
                type="button"
                onClick={() => setOpenDay(isOpen ? null : day)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
              >
                <span className="text-sm font-medium text-ink-900">{DAY_LABELS[day]}</span>
                <span className="text-xs text-sand-600">
                  {filledCount > 0 ? `${filledCount} repas` : "Vide"}
                </span>
              </button>
              {isOpen ? (
                <div className="space-y-3 border-t border-cream-200 px-4 py-3">
                  {MEAL_TYPES.map((mealType) => (
                    <MealSlot
                      key={mealType}
                      day={day}
                      mealType={mealType}
                      planned={dayMeals[mealType]}
                      visibleRecipes={visibleRecipes}
                      defaultServings={defaultServings}
                      onChangeRecipe={onChangeRecipe}
                      onChangeServings={onChangeServings}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

type MealSlotProps = {
  day: DayKey;
  mealType: MealType;
  planned?: PlannedMeal;
  visibleRecipes: Recipe[];
  defaultServings: number;
  onChangeRecipe: (day: DayKey, mealType: MealType, recipeId: string | null) => void;
  onChangeServings: (day: DayKey, mealType: MealType, servings: number) => void;
};

function MealSlot({
  day,
  mealType,
  planned,
  visibleRecipes,
  defaultServings,
  onChangeRecipe,
  onChangeServings,
}: MealSlotProps) {
  const options = getRecipesByMealType(visibleRecipes, mealType);
  const selectId = `recipe-${day}-${mealType}`;

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label htmlFor={selectId} className="text-xs font-medium uppercase tracking-wide text-sand-600">
          {mealTypeLabel[mealType]}
        </label>
        {planned ? (
          <Badge tone="neutral">
            {planned.servings} portion{planned.servings > 1 ? "s" : ""}
          </Badge>
        ) : null}
      </div>
      <select
        id={selectId}
        value={planned?.recipeId ?? ""}
        onChange={(e) => {
          const value = e.target.value;
          if (value === "") {
            onChangeRecipe(day, mealType, null);
          } else {
            onChangeRecipe(day, mealType, value);
          }
        }}
        className="w-full rounded-soft border border-cream-200 bg-white px-3 py-2 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-moss-500"
      >
        <option value="">— Aucun choix —</option>
        {options.map((recipe) => (
          <option key={recipe.id} value={recipe.id}>
            {recipe.title}
          </option>
        ))}
      </select>
      {planned ? (
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs text-sand-600">Portions :</span>
          <div className="flex flex-wrap gap-1">
            {[1, 2, 3, 4, 5, 6].map((n) => {
              const isActive = planned.servings === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => onChangeServings(day, mealType, n)}
                  aria-pressed={isActive}
                  className={`h-7 w-7 rounded-full border text-xs transition-colors ${
                    isActive
                      ? "border-moss-500 bg-moss-500 text-white"
                      : "border-cream-200 bg-white text-ink-700 hover:bg-cream-100"
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </div>
          {planned.servings !== defaultServings ? (
            <button
              type="button"
              onClick={() => onChangeServings(day, mealType, defaultServings)}
              className="ml-auto text-xs text-moss-600 hover:underline"
            >
              Revenir à {defaultServings}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
