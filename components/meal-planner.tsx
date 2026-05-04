"use client";

import { useState } from "react";
import type {
  DayKey,
  MealType,
  PlannedMeal,
  Recipe,
  WeeklyMealPlan,
} from "@/lib/types";
import { DAY_KEYS, DAY_LABELS, getCurrentDayKey } from "@/lib/dates";
import { mealTypeLabel } from "@/lib/labels";
import { getRecipeById, getRecipesByMealType } from "@/lib/recipes";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

type MealPlannerProps = {
  mealPlan: WeeklyMealPlan;
  visibleRecipes: Recipe[];
  defaultServings: number;
  onChangeRecipe: (day: DayKey, mealType: MealType, recipeId: string | null) => void;
  onChangeServings: (day: DayKey, mealType: MealType, servings: number) => void;
  onCopyDayMeal: (sourceDay: DayKey, targetDay: DayKey, mealType: MealType) => void;
  onResetWeek: () => void;
};

const MEAL_TYPES: MealType[] = ["breakfast", "lunch", "dinner", "snack"];

export function MealPlanner({
  mealPlan,
  visibleRecipes,
  defaultServings,
  onChangeRecipe,
  onChangeServings,
  onCopyDayMeal,
  onResetWeek,
}: MealPlannerProps) {
  const [openDay, setOpenDay] = useState<DayKey | null>(getCurrentDayKey());

  return (
    <Card padding="lg" className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-base font-semibold text-ink-900">Semaine en cours</p>
          <p className="text-xs text-sand-700">
            On ajuste un jour à la fois. Tu peux commencer par les soupers seulement.
          </p>
        </div>
        <Button variant="secondary" onClick={onResetWeek}>
          Nouvelle semaine
        </Button>
      </div>

      <ul className="space-y-2">
        {DAY_KEYS.map((day) => {
          const isOpen = openDay === day;
          const dayMeals = mealPlan.days[day];
          const filledCount = MEAL_TYPES.filter((t) => dayMeals[t]).length;
          const isToday = day === getCurrentDayKey();
          return (
            <li
              key={day}
              className={`overflow-hidden rounded-soft border bg-white transition-colors ${
                isOpen ? "border-ink-900" : isToday ? "border-moss-500/40" : "border-cream-200"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenDay(isOpen ? null : day)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-2 px-4 py-3.5 text-left"
              >
                <span className="flex items-center gap-2">
                  <span className="text-sm font-medium text-ink-900">{DAY_LABELS[day]}</span>
                  {isToday ? (
                    <span className="rounded-pill bg-moss-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-moss-600">
                      Aujourd’hui
                    </span>
                  ) : null}
                </span>
                <span className="text-xs text-sand-700">
                  {filledCount === 0
                    ? "—"
                    : `${filledCount} repas prévu${filledCount > 1 ? "s" : ""}`}
                </span>
              </button>
              {isOpen ? (
                <div className="space-y-4 border-t border-cream-200 px-4 py-4">
                  {MEAL_TYPES.map((mealType) => (
                    <MealSlot
                      key={mealType}
                      day={day}
                      mealType={mealType}
                      planned={dayMeals[mealType]}
                      visibleRecipes={visibleRecipes}
                      mealPlan={mealPlan}
                      defaultServings={defaultServings}
                      onChangeRecipe={onChangeRecipe}
                      onChangeServings={onChangeServings}
                      onCopyDayMeal={onCopyDayMeal}
                    />
                  ))}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

type MealSlotProps = {
  day: DayKey;
  mealType: MealType;
  planned?: PlannedMeal;
  visibleRecipes: Recipe[];
  mealPlan: WeeklyMealPlan;
  defaultServings: number;
  onChangeRecipe: (day: DayKey, mealType: MealType, recipeId: string | null) => void;
  onChangeServings: (day: DayKey, mealType: MealType, servings: number) => void;
  onCopyDayMeal: (sourceDay: DayKey, targetDay: DayKey, mealType: MealType) => void;
};

function findPreviousDayWithMeal(
  mealPlan: WeeklyMealPlan,
  day: DayKey,
  mealType: MealType,
): DayKey | null {
  const index = DAY_KEYS.indexOf(day);
  for (let i = index - 1; i >= 0; i--) {
    const previousDay = DAY_KEYS[i];
    if (mealPlan.days[previousDay][mealType]) return previousDay;
  }
  return null;
}

function MealSlot({
  day,
  mealType,
  planned,
  visibleRecipes,
  mealPlan,
  defaultServings,
  onChangeRecipe,
  onChangeServings,
  onCopyDayMeal,
}: MealSlotProps) {
  const options = getRecipesByMealType(visibleRecipes, mealType);
  const selectId = `recipe-${day}-${mealType}`;
  const recipe = planned ? getRecipeById(planned.recipeId) : undefined;
  const repeatSource = !planned ? findPreviousDayWithMeal(mealPlan, day, mealType) : null;

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label
          htmlFor={selectId}
          className="text-xs font-medium uppercase tracking-wide text-sand-600"
        >
          {mealTypeLabel[mealType]}
        </label>
        {planned ? (
          <span className="text-xs text-sand-700">
            {planned.servings} portion{planned.servings > 1 ? "s" : ""}
          </span>
        ) : null}
      </div>

      {recipe && planned ? (
        <p className="mb-2 text-sm font-medium text-ink-900">{recipe.title}</p>
      ) : null}

      <select
        id={selectId}
        value={planned?.recipeId ?? ""}
        onChange={(e) => {
          const value = e.target.value;
          onChangeRecipe(day, mealType, value === "" ? null : value);
        }}
        className="h-11 w-full rounded-pill border border-cream-200 bg-white px-4 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-moss-500"
      >
        <option value="">— Aucun choix —</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.title}
          </option>
        ))}
      </select>

      {!planned && repeatSource ? (
        <button
          type="button"
          onClick={() => onCopyDayMeal(repeatSource, day, mealType)}
          className="mt-2 text-xs font-medium text-ink-900 underline-offset-2 hover:underline"
        >
          Répéter {DAY_LABELS[repeatSource].toLowerCase()}
        </button>
      ) : null}

      {planned ? (
        <div className="mt-3 space-y-1.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-sand-700">Portions :</span>
            {[1, 2, 3, 4, 5, 6].map((n) => {
              const isActive = planned.servings === n;
              const isDefault = n === defaultServings;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => onChangeServings(day, mealType, n)}
                  aria-pressed={isActive}
                  aria-label={`${n} portion${n > 1 ? "s" : ""}${isDefault ? " (par défaut)" : ""}`}
                  className={`relative h-8 w-8 rounded-full border text-xs transition-colors ${
                    isActive
                      ? "border-ink-900 bg-ink-900 text-cream-50"
                      : "border-cream-200 bg-white text-ink-700 hover:bg-cream-100"
                  }`}
                >
                  {n}
                  {isDefault ? (
                    <span
                      aria-hidden
                      className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-sand-600"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-sand-700">
            Le point sous une portion indique ta valeur familiale par défaut ({defaultServings}).
            {planned.servings !== defaultServings ? (
              <>
                {" "}
                <button
                  type="button"
                  onClick={() => onChangeServings(day, mealType, defaultServings)}
                  className="font-medium text-ink-900 underline-offset-2 hover:underline"
                >
                  Réappliquer {defaultServings}
                </button>
              </>
            ) : null}
          </p>
        </div>
      ) : null}
    </div>
  );
}
