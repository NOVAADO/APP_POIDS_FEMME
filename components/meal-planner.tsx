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
import { MealIllustration } from "./meal-illustration";
import { RecipePickerSheet } from "./recipe-picker-sheet";

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

type PickerTarget = { day: DayKey; mealType: MealType } | null;

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
  const [picker, setPicker] = useState<PickerTarget>(null);

  const pickerOptions = picker
    ? getRecipesByMealType(visibleRecipes, picker.mealType)
    : [];
  const pickerSelectedId = picker
    ? mealPlan.days[picker.day][picker.mealType]?.recipeId ?? null
    : null;
  const pickerTitle = picker
    ? `${DAY_LABELS[picker.day]} · ${mealTypeLabel[picker.mealType]}`
    : "";

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
                <div className="space-y-3 border-t border-cream-200 px-4 py-4">
                  {MEAL_TYPES.map((mealType) => (
                    <MealSlot
                      key={mealType}
                      day={day}
                      mealType={mealType}
                      planned={dayMeals[mealType]}
                      mealPlan={mealPlan}
                      defaultServings={defaultServings}
                      onOpenPicker={() => setPicker({ day, mealType })}
                      onChangeServings={onChangeServings}
                      onCopyDayMeal={onCopyDayMeal}
                    />
                  ))}
                  <p className="border-t border-cream-200 pt-3 text-[11px] text-sand-700">
                    Le point sous une portion indique ta valeur familiale par défaut (
                    {defaultServings}).
                  </p>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>

      <RecipePickerSheet
        open={picker !== null}
        recipes={pickerOptions}
        selectedRecipeId={pickerSelectedId}
        title={pickerTitle}
        onClose={() => setPicker(null)}
        onSelect={(recipeId) => {
          if (!picker) return;
          onChangeRecipe(picker.day, picker.mealType, recipeId);
        }}
      />
    </Card>
  );
}

type MealSlotProps = {
  day: DayKey;
  mealType: MealType;
  planned?: PlannedMeal;
  mealPlan: WeeklyMealPlan;
  defaultServings: number;
  onOpenPicker: () => void;
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
  mealPlan,
  defaultServings,
  onOpenPicker,
  onChangeServings,
  onCopyDayMeal,
}: MealSlotProps) {
  const recipe = planned ? getRecipeById(planned.recipeId) : undefined;
  const repeatSource = !planned ? findPreviousDayWithMeal(mealPlan, day, mealType) : null;

  return (
    <div>
      <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-sand-600">
        {mealTypeLabel[mealType]}
      </p>

      <button
        type="button"
        onClick={onOpenPicker}
        className={`flex w-full items-center gap-3 rounded-soft border p-2.5 text-left transition-colors ${
          planned
            ? "border-cream-200 bg-white hover:bg-cream-100"
            : "border-dashed border-cream-200 bg-white hover:bg-cream-100"
        }`}
      >
        {planned && recipe ? (
          <MealIllustration mealType={mealType} size="square" className="h-12 w-12" />
        ) : (
          <span
            aria-hidden
            className="flex h-12 w-12 items-center justify-center rounded-soft bg-cream-100 text-xl text-sand-700"
          >
            +
          </span>
        )}
        <div className="min-w-0 flex-1">
          {planned && recipe ? (
            <>
              <p className="truncate text-sm font-medium text-ink-900">{recipe.title}</p>
              <p className="text-xs text-sand-700">
                {planned.servings} portion{planned.servings > 1 ? "s" : ""} ·{" "}
                {recipe.prepTimeMinutes} min
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-ink-900">Choisir une recette</p>
              <p className="text-xs text-sand-700">Aucun repas prévu pour ce créneau.</p>
            </>
          )}
        </div>
        <span aria-hidden className="text-sand-700">
          ›
        </span>
      </button>

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
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
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
          {planned.servings !== defaultServings ? (
            <button
              type="button"
              onClick={() => onChangeServings(day, mealType, defaultServings)}
              className="ml-auto text-[11px] font-medium text-ink-900 underline-offset-2 hover:underline"
            >
              Réappliquer {defaultServings}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
