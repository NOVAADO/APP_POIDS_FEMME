"use client";

import { useState } from "react";
import type { GroceryItem, MascotProfile, UserProfile } from "@/lib/types";
import { buildGroceryShareText } from "@/lib/grocery";
import { copyToClipboard } from "@/lib/copy";
import { storeLabel } from "@/lib/labels";
import { Card } from "./ui/card";
import { SectionTitle } from "./ui/section-title";
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
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-semibold text-ink-900">Épicerie</h1>
        <p className="mt-1 text-sm text-sand-600">
          On simplifie. La liste est prête à partager.
        </p>
      </header>

      <MascotCard mascot={mascot} context="grocery" />

      <section className="space-y-2">
        <SectionTitle>Liste de la semaine</SectionTitle>
        <GroceryList
          items={items}
          onTogglePantry={onTogglePantry}
          onTogglePurchased={onTogglePurchased}
        />
      </section>

      <section>
        <SectionTitle hint="Selon les épiceries que tu surveilles dans ton profil.">
          Rabais à vérifier
        </SectionTitle>
        {itemsWithDeals.length === 0 ? (
          <Card>
            <p className="text-sm text-sand-600">
              Aucun rabais à vérifier pour cette liste pour le moment.
            </p>
          </Card>
        ) : (
          <Card className="space-y-2">
            <ul className="space-y-1.5 text-sm">
              {itemsWithDeals.map((item) => {
                const stores = Array.from(
                  new Set(item.deals!.map((d) => storeLabel[d.storeId])),
                );
                return (
                  <li key={item.key} className="flex items-start justify-between gap-2">
                    <span className="text-ink-700">{item.name}</span>
                    <span className="text-xs text-amber-700">{stores.join(", ")}</span>
                  </li>
                );
              })}
            </ul>
            <p className="pt-1 text-xs text-sand-600">
              Ces rabais sont des exemples mockés au MVP, à valider en magasin.
            </p>
          </Card>
        )}
      </section>

      <section>
        <SectionTitle>Partage</SectionTitle>
        <Card className="space-y-3">
          <p className="text-sm text-ink-700">
            Tu peux maintenant la coller dans Messenger, par texto ou par courriel.
          </p>
          <Button onClick={handleCopy} fullWidth disabled={items.length === 0}>
            Copier pour Messenger
          </Button>
          {copyState === "ok" ? (
            <Badge tone="moss">Liste copiée.</Badge>
          ) : copyState === "error" ? (
            <Badge tone="warn">La copie n’a pas fonctionné. Essaie à nouveau.</Badge>
          ) : null}
          <p className="text-xs text-sand-600">
            {profile.preferredStores.length > 0
              ? `Épiceries surveillées : ${profile.preferredStores.map((s) => storeLabel[s]).join(", ")}.`
              : "Tu peux ajouter des épiceries à surveiller dans ton profil."}
          </p>
        </Card>
      </section>
    </div>
  );
}
