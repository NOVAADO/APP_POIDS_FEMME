import type {
  FlyerDeal,
  GroceryCategory,
  GroceryItem,
  Recipe,
  StoreId,
  WeeklyMealPlan,
} from "./types";
import { groceryCategoryLabel, groceryCategoryOrder, storeLabel } from "./labels";
import { formatQuantity, formatGroceryStatus, round1 } from "./format";

export type GroceryCheckMap = Record<string, { inPantry?: boolean; purchased?: boolean }>;

function dealMatches(deal: FlyerDeal, ingredientName: string, aliases: string[] = []): boolean {
  const normalized = deal.normalizedIngredientName.toLowerCase();
  if (normalized === ingredientName.toLowerCase()) return true;
  return aliases.some((alias) => alias.toLowerCase() === normalized);
}

export function buildGroceryList(
  mealPlan: WeeklyMealPlan,
  recipes: Recipe[],
  groceryChecks: GroceryCheckMap,
  deals: FlyerDeal[],
  enabledStores: StoreId[],
): GroceryItem[] {
  const map = new Map<string, GroceryItem>();

  Object.values(mealPlan.days).forEach((day) => {
    Object.values(day).forEach((plannedMeal) => {
      if (!plannedMeal) return;
      const recipe = recipes.find((r) => r.id === plannedMeal.recipeId);
      if (!recipe) return;

      const safeBase = Math.max(1, recipe.baseServings);
      const multiplier = plannedMeal.servings / safeBase;

      recipe.ingredients.forEach((ingredient) => {
        const key = `${ingredient.id}-${ingredient.unit}`;
        const matchingDeals = deals.filter(
          (deal) =>
            enabledStores.includes(deal.storeId) &&
            dealMatches(deal, ingredient.name, ingredient.aliases),
        );

        const existing = map.get(key);
        const addedQuantity = ingredient.quantity * multiplier;

        if (existing) {
          existing.quantity = round1(existing.quantity + addedQuantity);
          const dealIds = new Set(existing.deals?.map((d) => d.id));
          matchingDeals.forEach((d) => {
            if (!dealIds.has(d.id)) {
              existing.deals = [...(existing.deals ?? []), d];
              dealIds.add(d.id);
            }
          });
        } else {
          map.set(key, {
            key,
            ingredientId: ingredient.id,
            name: ingredient.name,
            quantity: round1(addedQuantity),
            unit: ingredient.unit,
            category: ingredient.category,
            inPantry: groceryChecks[key]?.inPantry ?? false,
            purchased: groceryChecks[key]?.purchased ?? false,
            deals: matchingDeals.length > 0 ? matchingDeals : undefined,
          });
        }
      });
    });
  });

  return Array.from(map.values()).sort((a, b) => {
    const cA = groceryCategoryOrder.indexOf(a.category);
    const cB = groceryCategoryOrder.indexOf(b.category);
    if (cA !== cB) return cA - cB;
    return a.name.localeCompare(b.name, "fr-CA");
  });
}

export function groupGroceryItemsByCategory(
  items: GroceryItem[],
): { category: GroceryCategory; items: GroceryItem[] }[] {
  const map = new Map<GroceryCategory, GroceryItem[]>();
  items.forEach((item) => {
    const list = map.get(item.category) ?? [];
    list.push(item);
    map.set(item.category, list);
  });
  return groceryCategoryOrder
    .filter((category) => map.has(category))
    .map((category) => ({ category, items: map.get(category) ?? [] }));
}

export function toggleGroceryItemStatus(
  groceryChecks: GroceryCheckMap,
  itemKey: string,
  status: "inPantry" | "purchased",
): GroceryCheckMap {
  const previous = groceryChecks[itemKey] ?? {};
  const next = { ...previous, [status]: !previous[status] };
  if (status === "inPantry" && next.inPantry) next.purchased = false;
  if (status === "purchased" && next.purchased) next.inPantry = false;
  return { ...groceryChecks, [itemKey]: next };
}

export function buildGroceryShareText(items: GroceryItem[]): string {
  const groups = groupGroceryItemsByCategory(items);

  const lines: string[] = ["Liste d’épicerie de la semaine", ""];

  groups.forEach(({ category, items: categoryItems }) => {
    lines.push(groceryCategoryLabel[category]);
    categoryItems.forEach((item) => {
      lines.push(`□ ${item.name} — ${formatQuantity(item)} — ${formatGroceryStatus(item)}`);
    });
    lines.push("");
  });

  const itemsWithDeals = items.filter((i) => i.deals && i.deals.length > 0);
  if (itemsWithDeals.length > 0) {
    lines.push("Rabais à vérifier");
    itemsWithDeals.forEach((item) => {
      const stores = Array.from(new Set(item.deals!.map((d) => storeLabel[d.storeId])));
      lines.push(`- ${item.name} : ${stores.join(", ")}`);
    });
    lines.push("");
  }

  lines.push("Merci de m’aider avec une partie de l’épicerie.");
  return lines.join("\n");
}
