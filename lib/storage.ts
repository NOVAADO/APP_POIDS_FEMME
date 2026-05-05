const PREFIX = "mca:";

export function getLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function setLocal<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // Silently ignore storage failures (quota, private mode).
  }
}

export function removeLocal(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {
    // ignore
  }
}

export const StorageKeys = {
  profile: "profile",
  mealPlan: "mealPlan",
  groceryChecks: "groceryChecks",
  showAllRecipes: "showAllRecipes",
  workoutPlan: "workoutPlan",
  workoutEnergy: "workoutEnergy",
  workoutShortMode: "workoutShortMode",
  dailyCheckIns: "dailyCheckIns",
  activeTab: "activeTab",
  weekStart: "weekStart",
  welcomeSeen: "welcomeSeen",
  aiMealHistory: "aiMealHistory",
} as const;
