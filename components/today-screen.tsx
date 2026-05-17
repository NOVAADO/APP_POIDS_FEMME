"use client";

import { useMemo, useState } from "react";
import type {
  DailyCheckIn,
  DailyWorkoutPlan,
  DayKey,
  EnergyMode,
  GroceryItem,
  MascotProfile,
  MealType,
  TabId,
  UserProfile,
  WeeklyMealPlan,
} from "@/lib/types";
import { DAY_KEYS, DAY_LABELS, formatLongDate, getCurrentDayKey } from "@/lib/dates";
import { mealTypeLabel } from "@/lib/labels";
import { formatGroceryItemName } from "@/lib/format";
import { getRecipeById } from "@/lib/recipes";
import { getWorkoutCompletion } from "@/lib/workouts";
import { hasAnyAction } from "@/lib/checkins";
import { Card } from "./ui/card";
import { ScreenHeader } from "./ui/screen-header";
import { Button } from "./ui/button";
import { OrganicCard, type OrganicTone } from "./ui/organic-card";
import { SoftHero } from "./ui/soft-hero";
import { VisualChip } from "./ui/visual-chip";
import { MascotAvatar } from "./mascot-avatar";
import { MascotHero } from "./mascot-hero";
import { MascotPresence } from "./mascot-presence";

type TodayScreenProps = {
  mascot: MascotProfile;
  profile: UserProfile;
  workoutPlan: DailyWorkoutPlan;
  energyMode: EnergyMode;
  shortMode: boolean;
  mealPlan: WeeklyMealPlan;
  groceryItems: GroceryItem[];
  weeklyCheckIns: Record<DayKey, DailyCheckIn | undefined>;
  onNavigate: (tab: TabId) => void;
};

const MEAL_ORDER: MealType[] = ["breakfast", "lunch", "dinner", "snack"];

function pickHomeMessage(mascot: MascotProfile): string {
  const list = mascot.messages.home;
  return list?.[0] ?? "On regarde seulement aujourd’hui.";
}

function pickEnergyPhrase(mode: EnergyMode): string {
  if (mode === "low") return "On garde ça petit aujourd’hui. Une seule chose suffit.";
  if (mode === "medium") return "On choisit ce qui aide le plus maintenant.";
  return "Tu peux avancer doucement, sans te presser.";
}

type ActionAccent = "moss" | "rose" | "warm" | "cream";

type SuggestedActionId = "workout" | "meals" | "grocery" | "progress";

type SuggestedAction = {
  id: SuggestedActionId;
  title: string;
  hint: string;
  ctaLabel: string;
  tab: TabId;
  icon: string;
  accent: ActionAccent;
};

function pickSuggestedAction(args: {
  workoutDone: number;
  workoutTotal: number;
  plannedMealsCount: number;
  remainingGrocery: number;
}): SuggestedAction {
  const { workoutDone, workoutTotal, plannedMealsCount, remainingGrocery } = args;
  if (workoutTotal > 0 && workoutDone === 0) {
    return {
      id: "workout",
      title: "Faire une version courte",
      hint: "Un seul mouvement compte aussi.",
      ctaLabel: "Voir Bouger",
      tab: "workout",
      icon: "💪",
      accent: "moss",
    };
  }
  if (plannedMealsCount === 0) {
    return {
      id: "meals",
      title: "Choisir un repas simple",
      hint: "Un repas prévisible suffit.",
      ctaLabel: "Voir Repas",
      tab: "meals",
      icon: "🍲",
      accent: "rose",
    };
  }
  if (remainingGrocery > 0) {
    return {
      id: "grocery",
      title: "Regarder la liste d’épicerie",
      hint: "Tu peux la copier ou la partager.",
      ctaLabel: "Voir Épicerie",
      tab: "grocery",
      icon: "🛒",
      accent: "warm",
    };
  }
  return {
    id: "progress",
    title: "Faire le suivi doux du jour",
    hint: "Quelques cases, sans jugement.",
    ctaLabel: "Voir Suivi doux",
    tab: "progress",
    icon: "🌿",
    accent: "cream",
  };
}

export function TodayScreen({
  mascot,
  profile,
  workoutPlan,
  energyMode,
  shortMode,
  mealPlan,
  groceryItems,
  weeklyCheckIns,
  onNavigate,
}: TodayScreenProps) {
  const dayKey = getCurrentDayKey();
  const dayMeals = mealPlan.days[dayKey] ?? {};
  const { done, total } = getWorkoutCompletion(workoutPlan);
  const remainingItems = useMemo(
    () => groceryItems.filter((item) => !item.purchased && !item.inPantry).slice(0, 3),
    [groceryItems],
  );
  const plannedToday = useMemo(
    () => MEAL_ORDER.filter((t) => dayMeals[t]),
    [dayMeals],
  );

  const energyLabel =
    energyMode === "low"
      ? "Batterie basse"
      : energyMode === "medium"
      ? "Batterie correcte"
      : "Bonne batterie";

  const suggested = pickSuggestedAction({
    workoutDone: done,
    workoutTotal: total,
    plannedMealsCount: plannedToday.length,
    remainingGrocery: remainingItems.length,
  });

  // Layout decisions per energy mode.
  // low: hero alone + collapsed "Voir le reste".
  // medium: hero + 2 primary cards (Bouger, Repas) + collapsed "Voir aussi" (Épicerie, Suivi).
  // good: hero + 4 cards.
  const showWorkoutPrimary = energyMode === "good" || energyMode === "medium";
  const showMealsPrimary = energyMode === "good" || energyMode === "medium";
  const showGroceryPrimary = energyMode === "good";
  const showProgressPrimary = energyMode === "good";
  const hasCollapsibleRest =
    !showWorkoutPrimary || !showMealsPrimary || !showGroceryPrimary || !showProgressPrimary;

  const [showRest, setShowRest] = useState(false);

  return (
    <div className="space-y-6">
      <ScreenHeader
        eyebrow={formatLongDate()}
        title={profile.firstName ? `Bonjour ${profile.firstName}` : "Bonjour"}
        subtitle="On simplifie. Tu peux commencer par une seule petite action."
      />

      <PetiteActionHero
        mascot={mascot}
        energyMode={energyMode}
        energyLabel={energyLabel}
        suggested={suggested}
        onNavigate={onNavigate}
      />

      <WeeklyConsistencyStrip
        weeklyCheckIns={weeklyCheckIns}
        currentDay={dayKey}
        onClick={() => onNavigate("progress")}
      />

      {showWorkoutPrimary ? (
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
          hint={`${energyLabel}${shortMode ? " · version courte" : ""}.`}
          onClick={() => onNavigate("workout")}
          highlighted={suggested.tab === "workout"}
        />
      ) : null}

      {showMealsPrimary ? (
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
          highlighted={suggested.tab === "meals"}
        />
      ) : null}

      {showGroceryPrimary ? (
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
          highlighted={suggested.tab === "grocery"}
        />
      ) : null}

      {showProgressPrimary ? (
        <PrimaryAction
          eyebrow="Suivi doux"
          accent="cream"
          icon="🌿"
          title="Quelques cases pour ton journal"
          hint="Sans graphique anxiogène. Sans poids central."
          onClick={() => onNavigate("progress")}
          highlighted={suggested.tab === "progress"}
        />
      ) : null}

      {hasCollapsibleRest ? (
        <CollapsedRest
          showRest={showRest}
          onToggle={() => setShowRest((v) => !v)}
          energyMode={energyMode}
          // Pass the action ids that are NOT shown as primary
          hiddenIds={(() => {
            const ids: SuggestedActionId[] = [];
            if (!showWorkoutPrimary) ids.push("workout");
            if (!showMealsPrimary) ids.push("meals");
            if (!showGroceryPrimary) ids.push("grocery");
            if (!showProgressPrimary) ids.push("progress");
            return ids;
          })()}
          workoutTitle={workoutPlan.title}
          workoutDone={done}
          workoutTotal={total}
          plannedToday={plannedToday}
          dayMeals={dayMeals}
          remainingItems={remainingItems}
          groceryItemsCount={groceryItems.length}
          onNavigate={onNavigate}
        />
      ) : null}

      <OrganicCard tone="paper" padding="md">
        <MascotPresence mascot={mascot} size="sm">
          <p>{pickHomeMessage(mascot)}</p>
          <p className="mt-1 text-xs text-sand-700">{mascot.supportTone}</p>
        </MascotPresence>
      </OrganicCard>

      <p className="px-2 pt-2 text-center text-xs text-sand-700">
        Cette application soutient les habitudes de vie. Elle ne remplace pas un avis médical ou un
        suivi professionnel.
      </p>
    </div>
  );
}

type PetiteActionHeroProps = {
  mascot: MascotProfile;
  energyMode: EnergyMode;
  energyLabel: string;
  suggested: SuggestedAction;
  onNavigate: (tab: TabId) => void;
};

function PetiteActionHero({
  mascot,
  energyMode,
  energyLabel,
  suggested,
  onNavigate,
}: PetiteActionHeroProps) {
  const palette = ACTION_ACCENT[suggested.accent];
  const organicTone = ACCENT_TO_ORGANIC[suggested.accent];
  const energyPhrase = pickEnergyPhrase(energyMode);
  return (
    <SoftHero tone={organicTone}>
      <MascotHero mascot={mascot} variant="soft" />

      <div className="space-y-1 text-center">
        <p className="text-[11px] font-medium uppercase tracking-wide text-sand-700">
          {mascot.name} · {energyLabel.toLowerCase()}
        </p>
        <p className="text-sm text-ink-900">{energyPhrase}</p>
      </div>

      <div className="space-y-2 rounded-soft bg-white/60 p-3 ring-1 ring-inset ring-white/40">
        <p className="text-[11px] font-medium uppercase tracking-wide text-sand-700">
          Petite action proposée
        </p>
        <div className="flex items-start gap-3">
          <div
            aria-hidden
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-soft text-2xl ${palette.iconBg}`}
          >
            {suggested.icon}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-semibold leading-tight text-ink-900">
              {suggested.title}
            </p>
            <p className="mt-0.5 text-xs text-sand-700">{suggested.hint}</p>
          </div>
        </div>
        <Button onClick={() => onNavigate(suggested.tab)} fullWidth>
          {suggested.ctaLabel}
        </Button>
      </div>
    </SoftHero>
  );
}

type CollapsedRestProps = {
  showRest: boolean;
  onToggle: () => void;
  energyMode: EnergyMode;
  hiddenIds: SuggestedActionId[];
  workoutTitle: string;
  workoutDone: number;
  workoutTotal: number;
  plannedToday: MealType[];
  dayMeals: WeeklyMealPlan["days"][DayKey];
  remainingItems: GroceryItem[];
  groceryItemsCount: number;
  onNavigate: (tab: TabId) => void;
};

function CollapsedRest({
  showRest,
  onToggle,
  energyMode,
  hiddenIds,
  workoutTitle,
  workoutDone,
  workoutTotal,
  plannedToday,
  dayMeals,
  remainingItems,
  groceryItemsCount,
  onNavigate,
}: CollapsedRestProps) {
  const toggleLabel = showRest
    ? "Masquer le reste"
    : energyMode === "low"
    ? "Voir le reste de la journée"
    : "Voir aussi";
  const hint =
    energyMode === "low"
      ? "Aujourd’hui, on garde seulement l’essentiel. Le reste peut attendre."
      : "Les autres modules sont là si tu veux y jeter un œil.";

  return (
    <OrganicCard tone="oat" padding="md" textured={false} className="space-y-3">
      <div className="space-y-1">
        <p className="text-xs text-sand-700">{hint}</p>
      </div>
      <Button variant="secondary" onClick={onToggle} fullWidth>
        {toggleLabel}
      </Button>
      {showRest ? (
        <div className="space-y-2">
          {hiddenIds.map((id) => {
            if (id === "workout") {
              return (
                <CompactAction
                  key={id}
                  eyebrow="Bouger"
                  accent="moss"
                  icon="💪"
                  title={workoutTitle}
                  subtitle={
                    workoutTotal > 0
                      ? `${workoutDone} / ${workoutTotal} activités faites`
                      : undefined
                  }
                  onClick={() => onNavigate("workout")}
                />
              );
            }
            if (id === "meals") {
              const firstPlanned = plannedToday[0];
              const firstRecipe = firstPlanned ? getRecipeById(dayMeals[firstPlanned]?.recipeId ?? "") : undefined;
              return (
                <CompactAction
                  key={id}
                  eyebrow="Repas du jour"
                  accent="rose"
                  icon="🍲"
                  title={
                    plannedToday.length === 0
                      ? "Aucun repas prévu"
                      : `${plannedToday.length} repas prévu${plannedToday.length > 1 ? "s" : ""}`
                  }
                  subtitle={firstRecipe?.title}
                  onClick={() => onNavigate("meals")}
                />
              );
            }
            if (id === "grocery") {
              return (
                <CompactAction
                  key={id}
                  eyebrow="Épicerie"
                  accent="warm"
                  icon="🛒"
                  title={
                    groceryItemsCount === 0
                      ? "Liste vide"
                      : remainingItems.length === 0
                      ? "Tout est coché"
                      : `${remainingItems.length} en attente`
                  }
                  onClick={() => onNavigate("grocery")}
                />
              );
            }
            return (
              <CompactAction
                key={id}
                eyebrow="Suivi doux"
                accent="cream"
                icon="🌿"
                title="Quelques cases pour ton journal"
                onClick={() => onNavigate("progress")}
              />
            );
          })}
        </div>
      ) : null}
    </OrganicCard>
  );
}

const ACTION_ACCENT: Record<
  ActionAccent,
  { bg: string; iconBg: string; ring: string }
> = {
  moss: {
    bg: "bg-moss-50",
    iconBg: "bg-moss-500/15 text-moss-600",
    ring: "ring-moss-500/40",
  },
  rose: {
    bg: "bg-rose-50",
    iconBg: "bg-rose-100 text-rose-700",
    ring: "ring-rose-300",
  },
  warm: {
    bg: "bg-amber-50",
    iconBg: "bg-amber-100 text-amber-800",
    ring: "ring-amber-300",
  },
  cream: {
    bg: "bg-cream-100",
    iconBg: "bg-white text-sand-600",
    ring: "ring-sand-400",
  },
};

const ACCENT_TO_ORGANIC: Record<ActionAccent, OrganicTone> = {
  moss: "sage",
  rose: "rose",
  warm: "apricot",
  cream: "oat",
};

type PrimaryActionProps = {
  eyebrow: string;
  accent: ActionAccent;
  icon: string;
  title: string;
  meta?: React.ReactNode;
  hint?: string;
  onClick: () => void;
  highlighted?: boolean;
};

function PrimaryAction({
  eyebrow,
  accent,
  icon,
  title,
  meta,
  hint,
  onClick,
  highlighted,
}: PrimaryActionProps) {
  const palette = ACTION_ACCENT[accent];
  const organicTone = ACCENT_TO_ORGANIC[accent];
  return (
    <button type="button" onClick={onClick} className="w-full text-left">
      <OrganicCard
        tone={organicTone}
        padding="lg"
        textured={false}
        halo={highlighted}
        className="space-y-2 transition-shadow hover:shadow-hero"
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
      </OrganicCard>
    </button>
  );
}

type CompactActionProps = {
  eyebrow: string;
  accent: ActionAccent;
  icon: string;
  title: string;
  subtitle?: string;
  onClick: () => void;
};

function CompactAction({ eyebrow, accent, icon, title, subtitle, onClick }: CompactActionProps) {
  const palette = ACTION_ACCENT[accent];
  return (
    <button type="button" onClick={onClick} className="w-full text-left">
      <div
        className={`flex items-center gap-3 rounded-soft px-3 py-2.5 transition-colors hover:bg-cream-100`}
      >
        <div
          aria-hidden
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-soft text-lg ${palette.iconBg}`}
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-medium uppercase tracking-wide text-sand-700">
            {eyebrow}
          </p>
          <p className="truncate text-sm font-medium text-ink-900">{title}</p>
          {subtitle ? (
            <p className="truncate text-xs text-sand-700">{subtitle}</p>
          ) : null}
        </div>
        <span aria-hidden className="text-sand-700">→</span>
      </div>
    </button>
  );
}

type WeeklyConsistencyStripProps = {
  weeklyCheckIns: Record<DayKey, DailyCheckIn | undefined>;
  currentDay: DayKey;
  onClick: () => void;
};

function WeeklyConsistencyStrip({
  weeklyCheckIns,
  currentDay,
  onClick,
}: WeeklyConsistencyStripProps) {
  const activeDays = DAY_KEYS.filter((day) => hasAnyAction(weeklyCheckIns[day])).length;

  return (
    <button type="button" onClick={onClick} className="w-full text-left">
      <Card padding="md" className="space-y-2 transition-colors hover:bg-cream-100">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-sand-700">
            Ta semaine
          </p>
          <p className="text-xs text-sand-700">
            {activeDays} sur 7 jour{activeDays > 1 ? "s" : ""}
          </p>
        </div>
        <div
          className="grid grid-cols-7 gap-1.5"
          aria-label={`Semaine en cours, ${activeDays} jours actifs sur 7`}
        >
          {DAY_KEYS.map((day) => {
            const active = hasAnyAction(weeklyCheckIns[day]);
            const isToday = day === currentDay;
            return (
              <div
                key={day}
                aria-hidden
                className={`flex flex-col items-center gap-0.5 rounded-soft py-1 text-[10px] ${
                  isToday ? "ring-1 ring-moss-500/40" : ""
                } ${active ? "bg-moss-50 text-moss-700" : "bg-cream-100 text-sand-700"}`}
              >
                <span>{DAY_LABELS[day].slice(0, 3)}</span>
                <span className="text-sm leading-none">{active ? "●" : "○"}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </button>
  );
}
