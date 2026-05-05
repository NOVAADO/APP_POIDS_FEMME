"use client";

import type { GroceryItem } from "@/lib/types";
import { groceryCategoryIcon, groceryCategoryLabel, storeLabel } from "@/lib/labels";
import { groupGroceryItemsByCategory } from "@/lib/grocery";
import { formatGroceryItemName } from "@/lib/format";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

type GroceryListProps = {
  items: GroceryItem[];
  onTogglePantry: (key: string) => void;
  onTogglePurchased: (key: string) => void;
  onOpenMeals?: () => void;
};

function StatusChip({ item }: { item: GroceryItem }) {
  if (item.purchased) {
    return (
      <span className="inline-flex items-center gap-1 rounded-pill bg-moss-500 px-2.5 py-0.5 text-[11px] font-medium text-cream-50">
        <span aria-hidden>✓</span> Acheté
      </span>
    );
  }
  if (item.inPantry) {
    return (
      <span className="inline-flex items-center gap-1 rounded-pill bg-cream-200 px-2.5 py-0.5 text-[11px] font-medium text-sand-700">
        <span aria-hidden>🏠</span> Déjà à la maison
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-pill bg-amber-100 px-2.5 py-0.5 text-[11px] font-medium text-amber-800">
      À acheter
    </span>
  );
}

export function GroceryList({
  items,
  onTogglePantry,
  onTogglePurchased,
  onOpenMeals,
}: GroceryListProps) {
  if (items.length === 0) {
    return (
      <Card padding="lg" className="space-y-3">
        <p className="text-sm text-sand-700">
          Aucun ingrédient pour le moment. Choisis des recettes dans le planificateur, la liste
          se construira toute seule.
        </p>
        {onOpenMeals ? (
          <Button variant="soft" onClick={onOpenMeals} fullWidth>
            Ouvrir Repas
          </Button>
        ) : null}
      </Card>
    );
  }

  const groups = groupGroceryItemsByCategory(items);

  return (
    <div className="space-y-3">
      {groups.map(({ category, items: categoryItems }) => (
        <Card key={category} className="space-y-2">
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-100 text-lg"
            >
              {groceryCategoryIcon[category]}
            </span>
            <p className="text-sm font-semibold text-ink-900">
              {groceryCategoryLabel[category]}
            </p>
          </div>
          <ul className="space-y-2">
            {categoryItems.map((item) => {
              const stores = item.deals
                ? Array.from(new Set(item.deals.map((d) => storeLabel[d.storeId])))
                : [];
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
                      <div className="mt-1.5">
                        <StatusChip item={item} />
                      </div>
                    </div>
                  </div>

                  {stores.length > 0 ? (
                    <p className="mt-2 text-xs text-amber-700">
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
