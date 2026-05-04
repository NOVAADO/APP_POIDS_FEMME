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
        accent="moss"
        icon="💪"
        title={workoutPlan.title}
        meta={
          <>
            <span className="text-base font-semibold tabular-nums text-ink-900">
              {done}<span className="text-sand-700"> / {total}</span>
            </span>{" "}
            <span className="text-xs text-sand-700">activités faites</span>
          </>
        }
        hint={`${energyLabel}${shortMode && energyMode !== "low" ? " · version courte" : ""}.`}
        onClick={() => onNavigate("workout")}
      />

      <PrimaryAction
        eyebrow="Repas du jour"
        accent="rose"
        icon="🍲"
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
        accent="warm"
        icon="🛒"
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
        accent="cream"
        icon="🌿"
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

type ActionAccent = "moss" | "rose" | "warm" | "cream";

const ACTION_ACCENT: Record<
  ActionAccent,
  { bg: string; iconBg: string; ring: string }
> = {
  moss: {
    bg: "bg-moss-50",
    iconBg: "bg-moss-500/15 text-moss-600",
    ring: "ring-moss-500/20",
  },
  rose: {
    bg: "bg-rose-50",
    iconBg: "bg-rose-100 text-rose-700",
    ring: "ring-rose-200",
  },
  warm: {
    bg: "bg-amber-50",
    iconBg: "bg-amber-100 text-amber-800",
    ring: "ring-amber-200",
  },
  cream: {
    bg: "bg-cream-100",
    iconBg: "bg-white text-sand-600",
    ring: "ring-cream-200",
  },
};

type PrimaryActionProps = {
  eyebrow: string;
  accent: ActionAccent;
  icon: string;
  title: string;
  meta?: React.ReactNode;
  hint?: string;
  onClick: () => void;
};

function PrimaryAction({ eyebrow, accent, icon, title, meta, hint, onClick }: PrimaryActionProps) {
  const palette = ACTION_ACCENT[accent];
  return (
    <button type="button" onClick={onClick} className="w-full text-left">
      <Card
        padding="lg"
        className={`relative space-y-2 transition-shadow hover:shadow-hero ${palette.bg}`}
      >
        <div className="flex items-start gap-3">
          <div
            aria-hidden
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-soft text-2xl ${palette.iconBg}`}
          >
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-sand-700">
              {eyebrow}
            </p>
            <p className="mt-0.5 text-lg font-semibold leading-tight text-ink-900">
              {title}
            </p>
          </div>
          <span aria-hidden className="text-sand-700 text-base">
            →
          </span>
        </div>
        {meta ? <div className="ml-[60px]">{meta}</div> : null}
        {hint ? <p className="ml-[60px] text-xs text-sand-700">{hint}</p> : null}
      </Card>
    </button>
  );
}
