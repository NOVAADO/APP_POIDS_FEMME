import type { MealAnalysisResult } from "./meal-analysis-types";
import { getLocal, setLocal, StorageKeys } from "../storage";

const MAX_ENTRIES = 5;

export type MealAnalysisHistoryEntry = {
  id: string;
  meal: string;
  result: MealAnalysisResult;
  timestamp: number;
};

export function getMealAnalysisHistory(): MealAnalysisHistoryEntry[] {
  return getLocal<MealAnalysisHistoryEntry[]>(StorageKeys.aiMealHistory, []);
}

export function addMealAnalysisEntry(
  meal: string,
  result: MealAnalysisResult,
): MealAnalysisHistoryEntry[] {
  const trimmedMeal = meal.trim();
  if (trimmedMeal.length === 0) return getMealAnalysisHistory();

  const next: MealAnalysisHistoryEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    meal: trimmedMeal,
    result,
    timestamp: Date.now(),
  };

  const previous = getMealAnalysisHistory().filter(
    (entry) => entry.meal.toLowerCase() !== trimmedMeal.toLowerCase(),
  );
  const updated = [next, ...previous].slice(0, MAX_ENTRIES);
  setLocal(StorageKeys.aiMealHistory, updated);
  return updated;
}

export function clearMealAnalysisHistory(): void {
  setLocal<MealAnalysisHistoryEntry[]>(StorageKeys.aiMealHistory, []);
}
