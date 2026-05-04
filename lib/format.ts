import type { GroceryItem } from "./types";

export function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function formatQuantity(item: { quantity: number; unit: string }): string {
  const q = Number.isInteger(item.quantity) ? item.quantity : round1(item.quantity);
  return `${q} ${item.unit}`;
}

export function formatGroceryStatus(item: GroceryItem): string {
  if (item.inPantry) return "déjà à la maison";
  if (item.purchased) return "acheté";
  return "à acheter";
}
