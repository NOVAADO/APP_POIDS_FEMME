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
import { SectionTitle } from "./ui/section-title";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ToggleGroup } from "./ui/toggle-group";
import { MascotCard } from "./mascot-card";
import { WorkoutActivityCard } from "./workout-activity-card";
import { WorkoutTimer } from "./workout-timer";

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
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-semibold text-ink-900">Bouger</h1>
        <p className="mt-1 text-sm text-sand-600">{plan.title}</p>
      </header>

      <MascotCard mascot={mascot} context="workout" />

      <Card>
        <div className="flex items-center justify-between">
          <p className="text-base text-ink-900">
            <span className="font-semibold">{done}</span>
            <span className="text-sand-600"> sur {total} activités faites</span>
          </p>
          {allDone ? <Badge tone="moss">Belle constance</Badge> : null}
        </div>
        <p className="mt-2 text-xs text-sand-600">
          {allDone
            ? "Ce qui est fait compte. Tu peux t’arrêter ici."
            : "Aucun rattrapage. La version courte compte autant."}
        </p>
      </Card>

      <Card>
        <SectionTitle hint="Comment est ton énergie aujourd’hui ?">Batterie du jour</SectionTitle>
        <ToggleGroup<EnergyMode>
          mode="single"
          options={energyModeOptions}
          value={energyMode}
          onChange={onChangeEnergy}
        />
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-sm text-sand-600">
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
          <SectionTitle>Supersets</SectionTitle>
          {groups.map((group, index) => (
            <div key={group.id} className="rounded-soft bg-cream-100 p-3">
              <p className="mb-2 px-1 text-xs font-medium uppercase tracking-wide text-sand-600">
                Superset {String.fromCharCode(65 + index)}
              </p>
              <div className="space-y-2">{group.activities.map(renderActivity)}</div>
            </div>
          ))}
        </section>
      ) : null}

      {singles.length > 0 ? (
        <section className="space-y-3">
          <SectionTitle>Activités simples</SectionTitle>
          <div className="space-y-2">{singles.map(renderActivity)}</div>
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
      <SectionTitle hint="Tous les exercices disponibles, compatibles ou non avec ton équipement.">
        Bibliothèque d’exercices
      </SectionTitle>
      <div className="space-y-2">
        {allExercises.map((exercise) => {
          const compatible = isExerciseCompatible(exercise, profile.availableEquipment);
          const showableEquipment = exercise.requiredEquipment.filter((e) => e !== "none");
          return (
            <Card key={exercise.id} className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <p className="text-base font-medium text-ink-900">{exercise.name}</p>
                <Badge tone={compatible ? "moss" : "warn"}>
                  {compatible ? "Compatible" : "Accessoire manquant"}
                </Badge>
              </div>
              <p className="text-xs text-sand-600">
                {exerciseCategoryLabel[exercise.category]}
                {exercise.targetZones.length > 0 ? ` · ${exercise.targetZones.join(", ")}` : ""}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {showableEquipment.length === 0 ? (
                  <Badge tone="moss">Aucun équipement</Badge>
                ) : (
                  showableEquipment.map((eq) => (
                    <Badge key={eq} tone="neutral">
                      {equipmentLabel[eq]}
                    </Badge>
                  ))
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

