import type {
  DailyWorkoutPlan,
  EnergyMode,
  Equipment,
  Exercise,
  WorkoutActivity,
} from "./types";
import { exercises as allExercises } from "@/data/exercises";

export function filterExercisesByEquipment(
  exercises: Exercise[],
  availableEquipment: Equipment[],
): Exercise[] {
  return exercises.filter((exercise) =>
    exercise.requiredEquipment.every(
      (equipment) => equipment === "none" || availableEquipment.includes(equipment),
    ),
  );
}

export function getMissingEquipment(
  exercise: Exercise,
  availableEquipment: Equipment[],
): Equipment[] {
  return exercise.requiredEquipment.filter(
    (equipment) => equipment !== "none" && !availableEquipment.includes(equipment),
  );
}

export function isExerciseCompatible(
  exercise: Exercise,
  availableEquipment: Equipment[],
): boolean {
  return getMissingEquipment(exercise, availableEquipment).length === 0;
}

export function getExerciseById(exerciseId: string): Exercise | undefined {
  return allExercises.find((e) => e.id === exerciseId);
}

export function getWorkoutCompletion(plan: DailyWorkoutPlan): {
  done: number;
  total: number;
  setAside: number;
  effectiveTotal: number;
} {
  const total = plan.activities.length;
  const setAside = plan.activities.filter((a) => a.setAside).length;
  const done = plan.activities.filter((a) => a.completed && !a.setAside).length;
  const effectiveTotal = total - setAside;
  return { done, total, setAside, effectiveTotal };
}

const PRIORITY_BY_CATEGORY: Record<Exercise["category"], number> = {
  mobility: 1,
  lower_body: 2,
  upper_body: 3,
  core: 4,
  cardio_soft: 5,
};

export function getShortWorkoutPlan(plan: DailyWorkoutPlan): DailyWorkoutPlan {
  const ranked = [...plan.activities].sort((a, b) => {
    const exA = getExerciseById(a.exerciseId);
    const exB = getExerciseById(b.exerciseId);
    const pA = exA ? PRIORITY_BY_CATEGORY[exA.category] : 99;
    const pB = exB ? PRIORITY_BY_CATEGORY[exB.category] : 99;
    return pA - pB;
  });

  const shortened = ranked.slice(0, 3).map((activity) => {
    const reducedSets = activity.sets ? Math.max(1, Math.min(activity.sets, 1)) : activity.sets;
    return { ...activity, sets: reducedSets };
  });

  return {
    ...plan,
    title: `${plan.title} — version courte`,
    activities: shortened,
  };
}

export function applyEnergyMode(
  plan: DailyWorkoutPlan,
  energyMode: EnergyMode,
): DailyWorkoutPlan {
  if (energyMode === "low") return getShortWorkoutPlan({ ...plan, energyMode });
  return { ...plan, energyMode };
}

export function groupBySuperset(activities: WorkoutActivity[]): {
  groups: { id: string; activities: WorkoutActivity[] }[];
  singles: WorkoutActivity[];
} {
  const map = new Map<string, WorkoutActivity[]>();
  const singles: WorkoutActivity[] = [];

  activities.forEach((activity) => {
    if (!activity.supersetGroupId) {
      singles.push(activity);
      return;
    }
    const list = map.get(activity.supersetGroupId) ?? [];
    list.push(activity);
    map.set(activity.supersetGroupId, list);
  });

  const groups = Array.from(map.entries())
    .filter(([, list]) => list.length > 1)
    .map(([id, list]) => ({ id, activities: list }));

  const orphanGroupActivities = Array.from(map.entries())
    .filter(([, list]) => list.length <= 1)
    .flatMap(([, list]) => list);

  return {
    groups,
    singles: [...singles, ...orphanGroupActivities],
  };
}

export function toggleActivityCompleted(
  plan: DailyWorkoutPlan,
  activityId: string,
): DailyWorkoutPlan {
  return {
    ...plan,
    activities: plan.activities.map((a) =>
      a.id === activityId ? { ...a, completed: !a.completed } : a,
    ),
  };
}

export function toggleActivitySetAside(
  plan: DailyWorkoutPlan,
  activityId: string,
): DailyWorkoutPlan {
  return {
    ...plan,
    activities: plan.activities.map((a) => {
      if (a.id !== activityId) return a;
      const nextSetAside = !a.setAside;
      // Setting aside an activity clears its completed flag so the count reflects
      // the user's current intent without losing the original plan structure.
      return { ...a, setAside: nextSetAside, completed: nextSetAside ? false : a.completed };
    }),
  };
}

export function getRequiredEquipmentForPlan(plan: DailyWorkoutPlan): Equipment[] {
  const set = new Set<Equipment>();
  plan.activities.forEach((activity) => {
    const exercise = getExerciseById(activity.exerciseId);
    exercise?.requiredEquipment.forEach((eq) => {
      if (eq !== "none") set.add(eq);
    });
  });
  return Array.from(set);
}
