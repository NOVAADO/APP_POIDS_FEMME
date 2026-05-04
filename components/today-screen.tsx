"use client";

import type {
  DailyWorkoutPlan,
  EnergyMode,
  GroceryItem,
  MascotProfile,
  MealType,
  TabId,
  UserProfile,
  WeeklyMealPlan,
} from "@/lib/types";
import { formatLongDate, getCurrentDayKey } from "@/lib/dates";
import { mealTypeLabel } from "@/lib/labels";
import { formatGroceryItemName } from "@/lib/format";
import { getRecipeById } from "@/lib/recipes";
import { getWorkoutCompletion } from "@/lib/workouts";
import { Card } from "./ui/card";
import { ScreenHeader } from "./ui/screen-header";
import { Badge } from "./ui/badge";
import { MascotAvatar } from "./mascot-avatar";

type TodayScreenProps = {
  mascot: MascotProfile;
  profile: UserProfile;
  workoutPlan: DailyWorkoutPlan;
  energyMode: EnergyMode;
  shortMode: boolean;
  mealPlan: WeeklyMealPlan;
  groceryItems: GroceryItem[];
  onNavigate: (tab: TabId) => void;
};

const MEAL_ORDER: MealType[] = ["breakfast", "lunch", "dinner", "snack"];

function pickHomeMessage(mascot: MascotProfile): string {
  const list = mascot.messages.home;
  return list?.[0] ?? "On regarde seulement aujourd’hui.";
}

export function TodayScreen({
  mascot,
  profile,
  workoutPlan,
  energyMode,
  shortMode,
  mealPlan,
  groceryItems,
  onNavigate,
}: TodayScreenProps) {
  const dayKey = getCurrentDayKey();
  const dayMeals = mealPlan.days[dayKey] ?? {};
  const { done, total } = getWorkoutCompletion(workoutPlan);
  const remainingItems = groceryItems
    .filter((item) => !item.purchased && !item.inPantry)
    .slice(0, 3);
  const energyLabel =
    energyMode === "low"
      ? "Batterie basse"
      : energyMode === "medium"
      ? "Batterie correcte"
      : "Bonne batterie";

  const plannedToday = MEAL_ORDER.filter((t) => dayMeals[t]);

  return (
    <div className="space-y-6">
      <ScreenHeader
        eyebrow={formatLongDate()}
        title={profile.firstName ? `Bonjour ${profile.firstName}` : "Bonjour"}
        subtitle="On simplifie. Tu peux commencer par une seule petite action."
      />

      <Card hero padding="lg" className="flex items-center gap-4">
        <MascotAvatar mascot={mascot} size="lg" />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-sand-600">
            {mascot.name}
          </p>
          <p className="mt-1 text-base font-medium text-ink-900">
            {pickHomeMessage(mascot)}
          </p>
          <p className="mt-1 text-xs text-sand-700">{mascot.supportTone}</p>
        </div>
      </Card>

      <PrimaryAction
        eyebrow="Bouger"
        title={workoutPlan.title}
        meta={
          <>
            <span className="text-base font-semibold tabular-nums text-ink-900">
              {done}<span className="text-sand-700"> / {total}</span>
            </span>
            <span className="text-xs text-sand-700">activités faites</span>
          </>
        }
        hint={`${energyLabel}${shortMode && energyMode !== "low" ? " · version courte" : ""}.`}
        onClick={() => onNavigate("workout")}
      />

      <PrimaryAction
        eyebrow="Repas du jour"
        title={
          plannedToday.length === 0
            ? "Aucun repas prévu"
            : `${plannedToday.length} repas prévu${plannedToday.length > 1 ? "s" : ""}`
        }
        meta={
          plannedToday.length > 0 ? (
            <ul className="space-y-0.5 text-xs text-sand-700">
              {plannedToday.map((type) => {
                const planned = dayMeals[type];
                const recipe = planned ? getRecipeById(planned.recipeId) : undefined;
                return (
                  <li key={type}>
                    <span className="font-medium text-ink-900">{mealTypeLabel[type]}</span> ·{" "}
                    {recipe?.title ?? "—"}
                  </li>
                );
              })}
            </ul>
          ) : null
        }
        hint={
          plannedToday.length === 0
            ? "Tu peux en planifier un quand tu veux."
            : undefined
        }
        onClick={() => onNavigate("meals")}
      />

      <PrimaryAction
        eyebrow="Épicerie"
        title={
          groceryItems.length === 0
            ? "Liste vide"
            : remainingItems.length === 0
            ? "Tout est coché"
            : `${remainingItems.length} ingrédient${remainingItems.length > 1 ? "s" : ""} en attente`
        }
        meta={
          remainingItems.length > 0 ? (
            <ul className="space-y-0.5 text-xs text-sand-700">
              {remainingItems.map((item) => (
                <li key={item.key}>□ {formatGroceryItemName(item)}</li>
              ))}
            </ul>
          ) : null
        }
        hint={
          groceryItems.length === 0
            ? "Choisis des recettes dans Repas, la liste se construit toute seule."
            : remainingItems.length === 0
            ? "Tu peux passer à autre chose."
            : undefined
        }
        onClick={() => onNavigate("grocery")}
      />

      <PrimaryAction
        eyebrow="Suivi doux"
        title="Quelques cases pour ton journal"
        hint="Sans graphique anxiogène. Sans poids central."
        onClick={() => onNavigate("progress")}
      />

      <p className="px-2 pt-2 text-center text-xs text-sand-700">
        Cette application soutient les habitudes de vie. Elle ne remplace pas un avis médical ou un
        suivi professionnel.
      </p>
    </div>
  );
}

type PrimaryActionProps = {
  eyebrow: string;
  title: string;
  meta?: React.ReactNode;
  hint?: string;
  onClick: () => void;
  trailing?: React.ReactNode;
};

function PrimaryAction({ eyebrow, title, meta, hint, onClick, trailing }: PrimaryActionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left"
    >
      <Card padding="lg" className="space-y-2 transition-colors hover:bg-cream-100">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-sand-600">
            {eyebrow}
          </p>
          {trailing ?? (
            <Badge tone="neutral">
              <span aria-hidden>→</span>
            </Badge>
          )}
        </div>
        <p className="text-lg font-semibold text-ink-900">{title}</p>
        {meta ? <div>{meta}</div> : null}
        {hint ? <p className="text-xs text-sand-700">{hint}</p> : null}
      </Card>
    </button>
  );
}
