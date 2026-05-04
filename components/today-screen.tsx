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
import { formatQuantity } from "@/lib/format";
import { getRecipeById } from "@/lib/recipes";
import { getWorkoutCompletion } from "@/lib/workouts";
import { Card } from "./ui/card";
import { SectionTitle } from "./ui/section-title";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MascotCard } from "./mascot-card";

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
    .slice(0, 4);
  const energyLabel =
    energyMode === "low"
      ? "Batterie basse"
      : energyMode === "medium"
      ? "Batterie correcte"
      : "Bonne batterie";

  return (
    <div className="space-y-5">
      <header>
        <p className="text-sm text-sand-600">{formatLongDate()}</p>
        <h1 className="mt-1 text-2xl font-semibold text-ink-900">
          {profile.firstName ? `Bonjour ${profile.firstName}` : "Bonjour"}
        </h1>
        <p className="mt-1 text-sm text-sand-600">
          On regarde seulement aujourd’hui. Tu peux commencer par une petite action.
        </p>
      </header>

      <MascotCard mascot={mascot} context="home" />

      <section>
        <SectionTitle hint={`${energyLabel}${shortMode ? " · version courte active" : ""}`}>
          Bouger
        </SectionTitle>
        <Card className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-base text-ink-900">
              <span className="font-semibold">{done}</span>
              <span className="text-sand-600"> sur {total} activités faites</span>
            </p>
            <Badge tone={shortMode || energyMode === "low" ? "sand" : "moss"}>
              {workoutPlan.title}
            </Badge>
          </div>
          <p className="text-xs text-sand-600">
            {done === total && total > 0
              ? "Ce qui est fait compte. Tu peux t’arrêter ici."
              : "La version courte compte. Aucun rattrapage nécessaire."}
          </p>
          <Button variant="soft" fullWidth onClick={() => onNavigate("workout")}>
            Ouvrir Bouger
          </Button>
        </Card>
      </section>

      <section>
        <SectionTitle>Repas du jour</SectionTitle>
        <Card className="space-y-2">
          {MEAL_ORDER.some((t) => dayMeals[t]) ? (
            <ul className="space-y-1.5 text-sm">
              {MEAL_ORDER.map((type) => {
                const planned = dayMeals[type];
                if (!planned) return null;
                const recipe = getRecipeById(planned.recipeId);
                return (
                  <li key={type} className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wide text-sand-600">
                        {mealTypeLabel[type]}
                      </p>
                      <p className="text-ink-900">{recipe?.title ?? "Recette retirée"}</p>
                    </div>
                    <Badge tone="neutral">
                      {planned.servings} portion{planned.servings > 1 ? "s" : ""}
                    </Badge>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-sand-600">
              Pas de repas prévu aujourd’hui. Tu peux en planifier un quand tu veux.
            </p>
          )}
          <Button variant="soft" fullWidth onClick={() => onNavigate("meals")}>
            Ouvrir Repas
          </Button>
        </Card>
      </section>

      <section>
        <SectionTitle hint={`${groceryItems.length} ingrédient${groceryItems.length > 1 ? "s" : ""} dans la liste.`}>
          Mini-liste d’épicerie
        </SectionTitle>
        <Card className="space-y-2">
          {remainingItems.length === 0 ? (
            <p className="text-sm text-sand-600">
              {groceryItems.length === 0
                ? "Aucune liste pour l’instant. Choisis des recettes dans Repas, la liste se construit toute seule."
                : "Tout est coché. Tu peux passer à autre chose."}
            </p>
          ) : (
            <ul className="space-y-1 text-sm text-ink-700">
              {remainingItems.map((item) => (
                <li key={item.key}>
                  □ {item.name} — {formatQuantity(item)}
                </li>
              ))}
            </ul>
          )}
          <Button variant="soft" fullWidth onClick={() => onNavigate("grocery")}>
            Ouvrir Épicerie
          </Button>
        </Card>
      </section>

      <section>
        <SectionTitle hint="Sans graphique anxiogène. Sans poids central.">
          Suivi doux
        </SectionTitle>
        <Card className="space-y-2">
          <p className="text-sm text-sand-600">
            Tu peux cocher quelques actions du jour. Aucune obligation.
          </p>
          <Button variant="soft" fullWidth onClick={() => onNavigate("progress")}>
            Ouvrir Progression
          </Button>
        </Card>
      </section>

      <p className="px-2 pt-2 text-center text-xs text-sand-600">
        Cette application soutient les habitudes de vie. Elle ne remplace pas un avis médical ou un
        suivi professionnel.
      </p>
    </div>
  );
}
