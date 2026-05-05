"use client";

import { useState } from "react";
import type {
  DailyWorkoutPlan,
  EnergyMode,
  Exercise,
  MascotProfile,
  UserProfile,
  WorkoutActivity,
} from "@/lib/types";
import { exercises as allExercises } from "@/data/exercises";
import {
  getExerciseById,
  getMissingEquipment,
  getWorkoutCompletion,
  groupBySuperset,
  isExerciseCompatible,
} from "@/lib/workouts";
import { energyModeOptions, equipmentLabel, exerciseCategoryLabel } from "@/lib/labels";
import { Card } from "./ui/card";
import { ScreenHeader } from "./ui/screen-header";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MascotCard } from "./mascot-card";
import { WorkoutActivityCard } from "./workout-activity-card";
import { WorkoutTimer } from "./workout-timer";
import { ExerciseIllustration } from "./exercise-illustration";
import { ExerciseDetailSheet } from "./exercise-detail-sheet";

type WorkoutScreenProps = {
  plan: DailyWorkoutPlan;
  profile: UserProfile;
  mascot: MascotProfile;
  energyMode: EnergyMode;
  shortMode: boolean;
  onToggleActivity: (activityId: string) => void;
  onChangeEnergy: (mode: EnergyMode) => void;
  onToggleShortMode: () => void;
};

export function WorkoutScreen({
  plan,
  profile,
  mascot,
  energyMode,
  shortMode,
  onToggleActivity,
  onChangeEnergy,
  onToggleShortMode,
}: WorkoutScreenProps) {
  const { groups, singles } = groupBySuperset(plan.activities);
  const { done, total } = getWorkoutCompletion(plan);
  const allDone = total > 0 && done === total;

  function renderActivity(activity: WorkoutActivity) {
    const exercise = getExerciseById(activity.exerciseId);
    if (!exercise) return null;
    const missing = getMissingEquipment(exercise, profile.availableEquipment);
    return (
      <WorkoutActivityCard
        key={activity.id}
        activity={activity}
        exercise={exercise}
        missingEquipment={missing}
        onToggle={() => onToggleActivity(activity.id)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <ScreenHeader eyebrow="Bouger" title={plan.title} />

      <MascotCard mascot={mascot} context="workout" />

      <Card hero padding="lg" className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-sand-700">Activités faites</p>
          {allDone ? <Badge tone="moss">Belle constance</Badge> : null}
        </div>
        <p className="text-3xl font-semibold tabular-nums text-ink-900">
          {done}
          <span className="text-base font-normal text-sand-700"> / {total}</span>
        </p>
        <p className="text-[11px] uppercase tracking-wide text-sand-600">
          {shortMode || energyMode === "low"
            ? `Version courte · ${total} exercice${total > 1 ? "s" : ""}`
            : `Plan standard · ${total} exercice${total > 1 ? "s" : ""}`}
        </p>
        <p className="text-xs text-sand-700">
          {allDone
            ? "Ce qui est fait compte. Tu peux t’arrêter ici."
            : "Aucun rattrapage. La version courte compte autant."}
        </p>
      </Card>

      <Card padding="lg" className="space-y-3">
        <div>
          <h2 className="text-base font-semibold text-ink-900">Batterie du jour</h2>
          <p className="text-xs text-sand-700">Comment est ton énergie aujourd’hui ?</p>
        </div>
        <div
          role="radiogroup"
          aria-label="Niveau d’énergie"
          className="grid grid-cols-3 gap-2"
        >
          {energyModeOptions.map((option) => {
            const active = option.value === energyMode;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onChangeEnergy(option.value)}
                className={`flex h-11 items-center justify-center gap-1.5 rounded-pill border text-sm transition-colors ${
                  active
                    ? "border-ink-900 bg-ink-900 text-cream-50"
                    : "border-cream-200 bg-white text-ink-700 hover:bg-cream-100"
                }`}
              >
                <span aria-hidden>{option.emoji}</span>
                {option.label}
              </button>
            );
          })}
        </div>
        <p className="text-sm text-sand-700">
          {energyMode === "low"
            ? "Batterie basse : la version courte est appliquée d’office."
            : shortMode
            ? "Tu es en version courte. Tout ce qui est fait compte."
            : "Tu peux passer en version courte si l’énergie est basse."}
        </p>
        {energyMode !== "low" ? (
          <Button
            variant={shortMode ? "secondary" : "soft"}
            onClick={onToggleShortMode}
            fullWidth
          >
            {shortMode ? "Revenir au plan complet" : "Passer en version courte"}
          </Button>
        ) : null}
      </Card>

      {groups.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-ink-900">Supersets</h2>
          {groups.map((group, index) => (
            <div key={group.id} className="rounded-soft bg-cream-100 p-3">
              <p className="mb-2 px-1 text-xs font-medium uppercase tracking-wide text-sand-700">
                Superset {String.fromCharCode(65 + index)}
              </p>
              <div className="space-y-2">{group.activities.map(renderActivity)}</div>
            </div>
          ))}
        </section>
      ) : null}

      {singles.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-ink-900">Activités simples</h2>
          <div className="space-y-3">{singles.map(renderActivity)}</div>
        </section>
      ) : null}

      <WorkoutTimer />

      <ExerciseLibrary profile={profile} />
    </div>
  );
}

function ExerciseLibrary({ profile }: { profile: UserProfile }) {
  const [detail, setDetail] = useState<Exercise | null>(null);

  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold text-ink-900">Bibliothèque d’exercices</h2>
        <p className="text-xs text-sand-700">
          Tape une carte pour voir le détail d’un mouvement.
        </p>
      </div>
      <div className="space-y-3">
        {allExercises.map((exercise) => {
          const compatible = isExerciseCompatible(exercise, profile.availableEquipment);
          const showableEquipment = exercise.requiredEquipment.filter((e) => e !== "none");
          const supportNote =
            exercise.supportNote ?? "Un mouvement doux à intégrer à ton plan.";
          return (
            <button
              key={exercise.id}
              type="button"
              onClick={() => setDetail(exercise)}
              className="w-full text-left"
              aria-label={`Voir le détail : ${exercise.name}`}
            >
              <article className="overflow-hidden rounded-soft bg-white shadow-soft transition-shadow hover:shadow-hero">
                <ExerciseIllustration exerciseId={exercise.id} size="banner" />
                <div className="space-y-2 p-4">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-sand-700">
                    {exerciseCategoryLabel[exercise.category]}
                  </p>
                  <h3 className="text-base font-semibold leading-snug text-ink-900">
                    {exercise.name}
                  </h3>
                  <p className="text-sm text-sand-700">{supportNote}</p>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {showableEquipment.length === 0 ? (
                      <Badge tone="neutral">Aucun équipement</Badge>
                    ) : (
                      showableEquipment.map((eq) => (
                        <Badge key={eq} tone="neutral">
                          {equipmentLabel[eq]}
                        </Badge>
                      ))
                    )}
                    <span
                      className={`ml-auto text-[11px] ${
                        compatible ? "text-moss-600" : "text-amber-700"
                      }`}
                    >
                      {compatible ? "Prêt avec ton équipement" : "Alternative à prévoir"}
                    </span>
                  </div>
                  <p className="pt-1 text-xs font-medium text-ink-900 underline-offset-2 hover:underline">
                    Voir l’exercice →
                  </p>
                </div>
              </article>
            </button>
          );
        })}
      </div>

      <ExerciseDetailSheet
        exercise={detail}
        missingEquipment={detail ? getMissingEquipment(detail, profile.availableEquipment) : []}
        onClose={() => setDetail(null)}
      />
    </section>
  );
}
