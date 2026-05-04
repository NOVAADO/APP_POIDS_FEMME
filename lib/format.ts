import type { GroceryItem } from "./types";

export function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

const UNIT_PLURALS: Record<string, string> = {
  unité: "unités",
  tête: "têtes",
  branche: "branches",
  boîte: "boîtes",
  pot: "pots",
  sac: "sacs",
  tasse: "tasses",
  litre: "litres",
};

const UNITLESS_FOOD_NAMES: Record<string, string> = {
  Brocoli: "Brocoli",
  Concombre: "Concombre",
  Avocat: "Avocat",
  Oignon: "Oignon",
  Citron: "Citron",
  "Pommes de terre": "Pommes de terre",
  Carottes: "Carottes",
  Épinards: "Épinards",
  Tortilla: "Tortilla blé entier",
};

function pluralizeUnit(unit: string, quantity: number): string {
  if (quantity <= 1) return unit;
  return UNIT_PLURALS[unit] ?? unit;
}

function fractionLabel(value: number): string | null {
  const tolerance = 0.05;
  const fractions: { v: number; label: string }[] = [
    { v: 0.25, label: "1/4" },
    { v: 0.333, label: "1/3" },
    { v: 0.5, label: "1/2" },
    { v: 0.666, label: "2/3" },
    { v: 0.75, label: "3/4" },
  ];
  for (const f of fractions) {
    if (Math.abs(value - f.v) < tolerance) return f.label;
  }
  return null;
}

function humanQuantity(value: number): string {
  if (Number.isInteger(value)) return String(value);
  const whole = Math.floor(value);
  const remainder = value - whole;
  const frac = fractionLabel(remainder);
  if (frac) return whole === 0 ? frac : `${whole} ${frac}`;
  return String(round1(value));
}

export function formatHumanQuantity(quantity: number, unit: string): string {
  const q = humanQuantity(quantity);
  const pluralUnit = pluralizeUnit(unit, quantity);
  return `${q} ${pluralUnit}`;
}

export function formatGroceryItemName(item: { name: string; quantity: number; unit: string }): string {
  const unitlessLabel = UNITLESS_FOOD_NAMES[item.name];
  if (unitlessLabel && item.unit === "unité") {
    if (item.quantity === 1) return `1 ${unitlessLabel.toLowerCase()}`;
    if (item.quantity === 0.5) return `1/2 ${unitlessLabel.toLowerCase()}`;
    return `${humanQuantity(item.quantity)} ${unitlessLabel.toLowerCase()}`;
  }
  return `${item.name} — ${formatHumanQuantity(item.quantity, item.unit)}`;
}

export function formatGroceryStatus(item: GroceryItem): string {
  if (item.inPantry) return "déjà à la maison";
  if (item.purchased) return "acheté";
  return "à acheter";
}
