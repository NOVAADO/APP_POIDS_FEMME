"use client";

import type { GroceryItem } from "@/lib/types";
import { groceryCategoryLabel, storeLabel } from "@/lib/labels";
import { groupGroceryItemsByCategory } from "@/lib/grocery";
import { formatGroceryItemName, formatGroceryStatus } from "@/lib/format";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

type GroceryListProps = {
  items: GroceryItem[];
  onTogglePantry: (key: string) => void;
  onTogglePurchased: (key: string) => void;
};

export function GroceryList({ items, onTogglePantry, onTogglePurchased }: GroceryListProps) {
  if (items.length === 0) {
    return (
      <Card>
        <p className="text-sm text-sand-600">
          Aucun ingrédient pour le moment. Choisis des recettes dans le planificateur, la liste se
          construira toute seule.
        </p>
      </Card>
    );
  }

  const groups = groupGroceryItemsByCategory(items);

  return (
    <div className="space-y-3">
      {groups.map(({ category, items: categoryItems }) => (
        <Card key={category} className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-sand-600">
            {groceryCategoryLabel[category]}
          </p>
          <ul className="space-y-2">
            {categoryItems.map((item) => {
              const stores = item.deals
                ? Array.from(new Set(item.deals.map((d) => storeLabel[d.storeId])))
                : [];
              const status = formatGroceryStatus(item);
              return (
                <li
                  key={item.key}
                  className={`rounded-soft border p-3.5 transition-colors ${
                    item.purchased
                      ? "border-moss-500/40 bg-moss-50"
                      : item.inPantry
                      ? "border-sand-400/40 bg-cream-100"
                      : "border-cream-200 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-ink-900">
                        {formatGroceryItemName(item)}
                      </p>
                      <p className="text-xs text-sand-600">{status}</p>
                    </div>
                  </div>

                  {stores.length > 0 ? (
                    <p className="mt-1 text-xs text-amber-700">
                      Rabais à vérifier : {stores.join(", ")}
                    </p>
                  ) : null}

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => onTogglePantry(item.key)}
                      aria-pressed={item.inPantry}
                      className={`inline-flex h-8 items-center rounded-pill border px-3 text-xs transition-colors ${
                        item.inPantry
                          ? "border-sand-400 bg-cream-200 text-sand-700"
                          : "border-cream-200 bg-white text-ink-700 hover:bg-cream-100"
                      }`}
                    >
                      Déjà à la maison
                    </button>
                    <button
                      type="button"
                      onClick={() => onTogglePurchased(item.key)}
                      aria-pressed={item.purchased}
                      className={`inline-flex h-8 items-center rounded-pill border px-3 text-xs transition-colors ${
                        item.purchased
                          ? "border-moss-500 bg-moss-500 text-cream-50"
                          : "border-cream-200 bg-white text-ink-700 hover:bg-cream-100"
                      }`}
                    >
                      Acheté
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      ))}

      <p className="text-center text-xs text-sand-600">
        <Badge tone="neutral">{items.length}</Badge>{" "}
        {items.length > 1 ? "ingrédients regroupés" : "ingrédient"} · les quantités s’ajustent
        automatiquement.
      </p>
    </div>
  );
}
