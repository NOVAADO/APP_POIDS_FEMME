"use client";

import { useEffect, useMemo, useState } from "react";
import type { Recipe } from "@/lib/types";
import { mealTypeLabel } from "@/lib/labels";
import { Button } from "./ui/button";
import { MealIllustration } from "./meal-illustration";

type RecipePickerSheetProps = {
  open: boolean;
  recipes: Recipe[];
  selectedRecipeId?: string | null;
  title: string;
  onClose: () => void;
  onSelect: (recipeId: string | null) => void;
};

export function RecipePickerSheet({
  open,
  recipes,
  selectedRecipeId,
  title,
  onClose,
  onSelect,
}: RecipePickerSheetProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return recipes;
    return recipes.filter((r) => r.title.toLowerCase().includes(q));
  }, [recipes, query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 flex flex-col">
      <div
        className="absolute inset-0 bg-ink-900/40"
        aria-hidden
        onClick={onClose}
      />
      <div className="relative mt-auto flex max-h-[85svh] flex-col rounded-t-hero bg-cream-50 shadow-hero">
        <div className="flex items-start justify-between gap-3 px-5 pt-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-sand-700">
              {title}
            </p>
            <p className="mt-1 text-lg font-semibold text-ink-900">Choisir une recette</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le choix de recette"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink-700 shadow-soft hover:bg-cream-100 active:bg-cream-200"
          >
            <span aria-hidden className="text-lg">
              ✕
            </span>
          </button>
        </div>
        <div className="px-5 pt-3">
          <input
            type="search"
            placeholder="Rechercher une recette…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-11 w-full rounded-pill border border-cream-200 bg-white px-4 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-moss-500"
          />
        </div>

        <div className="relative flex-1 overflow-hidden">
          <ul className="h-full overflow-y-auto px-5 pb-8 pt-3 space-y-2">
          {selectedRecipeId ? (
            <li>
              <button
                type="button"
                onClick={() => {
                  onSelect(null);
                  onClose();
                }}
                className="flex w-full items-center gap-3 rounded-soft border border-cream-200 bg-white p-3 text-left transition-colors hover:bg-cream-100"
              >
                <span
                  aria-hidden
                  className="flex h-12 w-12 items-center justify-center rounded-soft bg-cream-100 text-xl text-sand-700"
                >
                  ✕
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink-900">Aucun choix</p>
                  <p className="text-xs text-sand-700">Retirer ce repas du plan.</p>
                </div>
              </button>
            </li>
          ) : null}
          {filtered.length === 0 ? (
            <li>
              <p className="rounded-soft bg-white p-3 text-sm text-sand-700">
                Aucune recette ne correspond. Essaie un autre mot ou efface la recherche.
              </p>
            </li>
          ) : (
            filtered.map((recipe) => {
              const active = recipe.id === selectedRecipeId;
              return (
                <li key={recipe.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(recipe.id);
                      onClose();
                    }}
                    aria-pressed={active}
                    className={`flex w-full items-center gap-3 rounded-soft border bg-white p-3 text-left transition-colors ${
                      active
                        ? "border-ink-900 shadow-soft"
                        : "border-cream-200 hover:bg-cream-100"
                    }`}
                  >
                    <MealIllustration mealType={recipe.mealType} size="square" className="h-14 w-14" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink-900">
                        {recipe.title}
                      </p>
                      <p className="text-xs text-sand-700">
                        {mealTypeLabel[recipe.mealType]} · {recipe.prepTimeMinutes} min ·{" "}
                        {recipe.baseServings} portion{recipe.baseServings > 1 ? "s" : ""}
                      </p>
                    </div>
                    {active ? (
                      <span aria-hidden className="text-moss-600">
                        ✓
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })
          )}
          </ul>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-cream-50 to-transparent"
          />
        </div>

        <div className="border-t border-cream-200 bg-white px-5 py-3 safe-bottom">
          <Button variant="secondary" onClick={onClose} fullWidth>
            Annuler
          </Button>
        </div>
      </div>
    </div>
  );
}
