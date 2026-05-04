"use client";

import { useState } from "react";
import type { GroceryItem, MascotProfile, UserProfile } from "@/lib/types";
import { buildGroceryShareText } from "@/lib/grocery";
import { copyToClipboard } from "@/lib/copy";
import { storeLabel } from "@/lib/labels";
import { Card } from "./ui/card";
import { ScreenHeader } from "./ui/screen-header";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MascotCard } from "./mascot-card";
import { GroceryList } from "./grocery-list";

type GroceryScreenProps = {
  items: GroceryItem[];
  profile: UserProfile;
  mascot: MascotProfile;
  onTogglePantry: (key: string) => void;
  onTogglePurchased: (key: string) => void;
};

export function GroceryScreen({
  items,
  profile,
  mascot,
  onTogglePantry,
  onTogglePurchased,
}: GroceryScreenProps) {
  const [copyState, setCopyState] = useState<"idle" | "ok" | "error">("idle");

  const itemsWithDeals = items.filter((item) => item.deals && item.deals.length > 0);

  async function handleCopy() {
    if (items.length === 0) return;
    const ok = await copyToClipboard(buildGroceryShareText(items));
    setCopyState(ok ? "ok" : "error");
    setTimeout(() => setCopyState("idle"), 4000);
  }

  return (
    <div className="space-y-6">
      <ScreenHeader
        eyebrow="Épicerie"
        title="Liste prête à partager"
        subtitle="On simplifie. Les quantités s’ajustent automatiquement."
      />

      <MascotCard mascot={mascot} context="grocery" />

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-ink-900">Liste de la semaine</h2>
        <GroceryList
          items={items}
          onTogglePantry={onTogglePantry}
          onTogglePurchased={onTogglePurchased}
        />
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold text-ink-900">Rabais à vérifier</h2>
          <p className="text-xs text-sand-700">
            Selon les épiceries que tu surveilles dans ton profil.
          </p>
        </div>
        {itemsWithDeals.length === 0 ? (
          <Card padding="md">
            <p className="text-sm text-sand-700">
              Aucun rabais à vérifier pour cette liste pour le moment.
            </p>
          </Card>
        ) : (
          <Card padding="md" className="space-y-2">
            <ul className="space-y-1.5 text-sm">
              {itemsWithDeals.map((item) => {
                const stores = Array.from(
                  new Set(item.deals!.map((d) => storeLabel[d.storeId])),
                );
                return (
                  <li key={item.key} className="flex items-start justify-between gap-2">
                    <span className="text-ink-900">{item.name}</span>
                    <span className="text-xs text-amber-700">{stores.join(", ")}</span>
                  </li>
                );
              })}
            </ul>
            <p className="pt-1 text-xs text-sand-700">
              Ces rabais sont des exemples mockés au MVP, à valider en magasin.
            </p>
          </Card>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-ink-900">Partage</h2>
        <Card padding="lg" className="space-y-3">
          <p className="text-sm text-ink-700">
            Tu peux la coller dans Messenger, par texto ou par courriel.
          </p>
          <Button size="lg" onClick={handleCopy} fullWidth disabled={items.length === 0}>
            Copier pour Messenger
          </Button>
          {copyState === "ok" ? (
            <Badge tone="moss">Liste copiée.</Badge>
          ) : copyState === "error" ? (
            <Badge tone="warn">La copie n’a pas fonctionné. Essaie à nouveau.</Badge>
          ) : null}
          <p className="text-xs text-sand-700">
            {profile.preferredStores.length > 0
              ? `Épiceries surveillées : ${profile.preferredStores.map((s) => storeLabel[s]).join(", ")}.`
              : "Tu peux ajouter des épiceries à surveiller dans ton profil."}
          </p>
        </Card>
      </section>
    </div>
  );
}
