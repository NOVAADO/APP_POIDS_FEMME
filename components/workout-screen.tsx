"use client";

import type {
  DailyWorkoutPlan,
  EnergyMode,
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
import { ToggleGroup } from "./ui/toggle-group";
import { MascotCard } from "./mascot-card";
import { WorkoutActivityCard } from "./workout-activity-card";
import { WorkoutTimer } from "./workout-timer";
import { ExerciseIllustration } from "./exercise-illustration";

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
        <ToggleGroup<EnergyMode>
          mode="single"
          options={energyModeOptions}
          value={energyMode}
          onChange={onChangeEnergy}
        />
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-sand-700">
            {energyMode === "low"
              ? "Batterie basse : la version courte est appliquée d’office."
              : shortMode
              ? "Tu es en version courte. Tout ce qui est fait compte."
              : "Tu peux passer en version courte si l’énergie est basse."}
          </p>
          {energyMode !== "low" ? (
            <Button variant={shortMode ? "secondary" : "soft"} onClick={onToggleShortMode}>
              {shortMode ? "Plan complet" : "Version courte"}
            </Button>
          ) : null}
        </div>
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
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold text-ink-900">Bibliothèque d’exercices</h2>
        <p className="text-xs text-sand-700">
          Tous les exercices, compatibles ou non avec ton équipement.
        </p>
      </div>
      <div className="space-y-2">
        {allExercises.map((exercise) => {
          const compatible = isExerciseCompatible(exercise, profile.availableEquipment);
          const showableEquipment = exercise.requiredEquipment.filter((e) => e !== "none");
          return (
            <article
              key={exercise.id}
              className="overflow-hidden rounded-soft bg-white shadow-soft"
            >
              <div className="flex items-stretch">
                <ExerciseIllustration exerciseId={exercise.id} size="library" />
                <div className="min-w-0 flex-1 space-y-1.5 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-wide text-sand-600">
                        {exerciseCategoryLabel[exercise.category]}
                      </p>
                      <p className="truncate text-sm font-medium text-ink-900">
                        {exercise.name}
                      </p>
                    </div>
                    <Badge tone={compatible ? "moss" : "warn"}>
                      {compatible ? "Compatible" : "Accessoire manquant"}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {showableEquipment.length === 0 ? (
                      <Badge tone="neutral">Aucun équipement</Badge>
                    ) : (
                      showableEquipment.map((eq) => (
                        <Badge key={eq} tone="neutral">
                          {equipmentLabel[eq]}
                        </Badge>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
