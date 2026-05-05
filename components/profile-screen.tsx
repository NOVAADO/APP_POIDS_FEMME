"use client";

import { useState } from "react";
import type {
  Equipment,
  FoodFilter,
  FoodStructurePreference,
  HormonalStage,
  MascotAnimal,
  NeuroProfile,
  StoreId,
  UserProfile,
} from "@/lib/types";
import { mascots, getMascotById } from "@/data/mascots";
import { MascotAvatar } from "./mascot-avatar";
import {
  breakfastPreferenceOptions,
  cookingCapacityOptions,
  equipmentOptions,
  equipmentLabel,
  foodFilterOptions,
  foodStructurePreferenceOptions,
  hormonalStageOptions,
  neuroProfileOptions,
  servingsOptions,
  storeLabel,
  storeOptions,
} from "@/lib/labels";
import { Card } from "./ui/card";
import { ScreenHeader } from "./ui/screen-header";
import { ToggleGroup } from "./ui/toggle-group";
import { OptionCard } from "./ui/option-card";

type ProfileScreenProps = {
  profile: UserProfile;
  onChange: (next: UserProfile) => void;
};

type SectionKey =
  | "compagne"
  | "contexte"
  | "alimentation"
  | "equipement"
  | "epiceries"
  | "preferences";

const SECTION_META: Record<SectionKey, { title: string; hint: string }> = {
  compagne: {
    title: "Ma compagne",
    hint: "La mascotte qui t’accompagne au quotidien.",
  },
  contexte: {
    title: "Mon contexte",
    hint: "Étape hormonale et neuroprofil. Aucun champ obligatoire.",
  },
  alimentation: {
    title: "Alimentation",
    hint: "Particularités, repères, déjeuner et capacité de cuisine.",
  },
  equipement: {
    title: "Équipement",
    hint: "Ce que tu as à la maison. Une chaise et un mur suffisent.",
  },
  epiceries: {
    title: "Épiceries",
    hint: "Magasins surveillés pour les rabais.",
  },
  preferences: {
    title: "Préférences",
    hint: "Portions familiales par défaut.",
  },
};

const SECTION_ORDER: SectionKey[] = [
  "compagne",
  "contexte",
  "alimentation",
  "equipement",
  "epiceries",
  "preferences",
];

export function ProfileScreen({ profile, onChange }: ProfileScreenProps) {
  function update<K extends keyof UserProfile>(key: K, value: UserProfile[K]) {
    onChange({ ...profile, [key]: value });
  }

  const mascot = getMascotById(profile.mascotId) ?? mascots[0];
  const [openSection, setOpenSection] = useState<SectionKey | null>("compagne");

  function toggle(key: SectionKey) {
    setOpenSection((curr) => (curr === key ? null : key));
  }

  function joinShort(parts: string[], max = 3): string {
    if (parts.length === 0) return "";
    if (parts.length <= max) return parts.join(" · ");
    return `${parts.slice(0, max).join(" · ")} +${parts.length - max}`;
  }

  function summaryFor(key: SectionKey): string {
    switch (key) {
      case "compagne":
        return mascot.name;
      case "contexte": {
        const stage = hormonalStageOptions.find((o) => o.value === profile.hormonalStage)?.label;
        const neuro = profile.neuroProfiles
          .map((n) => neuroProfileOptions.find((o) => o.value === n)?.label)
          .filter((s): s is string => Boolean(s));
        return [stage, ...neuro].filter(Boolean).join(" · ");
      }
      case "alimentation": {
        const filters = profile.foodFilters
          .map((f) => foodFilterOptions.find((o) => o.value === f)?.label)
          .filter((s): s is string => Boolean(s));
        const repere = foodStructurePreferenceOptions.find(
          (o) => o.value === profile.foodStructurePreference,
        )?.label;
        const cooking = cookingCapacityOptions.find((o) => o.value === profile.cookingCapacity)
          ?.label;
        const parts: string[] = [];
        if (filters.length === 0) parts.push("Aucun filtre");
        else parts.push(joinShort(filters, 2));
        if (repere) parts.push(`Repères : ${repere.toLowerCase()}`);
        if (cooking) parts.push(`Cuisine : ${cooking.toLowerCase()}`);
        return parts.join(" · ");
      }
      case "equipement": {
        const eq = profile.availableEquipment
          .filter((e) => e !== "none")
          .map((e) => equipmentLabel[e]);
        if (eq.length === 0) return "Aucun équipement";
        return joinShort(eq, 3);
      }
      case "epiceries": {
        const stores = profile.preferredStores.map((s) => storeLabel[s]);
        if (stores.length === 0) return "Aucune épicerie surveillée";
        return joinShort(stores, 3);
      }
      case "preferences":
        return `${profile.householdDefaultServings} portion${
          profile.householdDefaultServings > 1 ? "s" : ""
        } par défaut · ${
          breakfastPreferenceOptions.find((o) => o.value === profile.breakfastPreference)?.label ??
          ""
        }`;
    }
  }

  return (
    <div className="space-y-5">
      <ScreenHeader
        eyebrow="Profil"
        title="Ta compagne, ton rythme"
        subtitle="On simplifie. Tu peux modifier tes choix à tout moment."
      />

      <Card hero padding="lg" className="flex items-center gap-4 bg-white">
        <MascotAvatar mascot={mascot} size="lg" />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-sand-600">
            Compagne actuelle
          </p>
          <p className="mt-1 text-lg font-semibold text-ink-900">{mascot.name}</p>
          <p className="text-sm text-sand-700">{mascot.energy}</p>
        </div>
      </Card>

      <div className="space-y-2">
        {SECTION_ORDER.map((key) => {
          const meta = SECTION_META[key];
          const open = openSection === key;
          return (
            <Accordion
              key={key}
              title={meta.title}
              hint={meta.hint}
              summary={summaryFor(key)}
              open={open}
              onToggle={() => toggle(key)}
            >
              {key === "compagne" ? (
                <MascotPicker
                  selectedId={profile.mascotId}
                  onSelect={(id) => update("mascotId", id)}
                />
              ) : null}
              {key === "contexte" ? (
                <div className="space-y-4">
                  <FieldGroup
                    label="Étape hormonale"
                    hint="Choisis l’étape qui correspond le mieux."
                  >
                    <div className="space-y-2">
                      {hormonalStageOptions.map((option) => (
                        <OptionCard
                          key={option.value}
                          title={option.label}
                          active={profile.hormonalStage === option.value}
                          onClick={() => update("hormonalStage", option.value as HormonalStage)}
                        />
                      ))}
                    </div>
                  </FieldGroup>
                  <FieldGroup
                    label="Neuroprofil"
                    hint="Tu peux en cocher plusieurs. Aucun n’est obligatoire."
                  >
                    <ToggleGroup<NeuroProfile>
                      mode="multi"
                      options={neuroProfileOptions}
                      value={profile.neuroProfiles}
                      onChange={(v) => update("neuroProfiles", v)}
                    />
                  </FieldGroup>
                </div>
              ) : null}
              {key === "alimentation" ? (
                <div className="space-y-4">
                  <FieldGroup
                    label="Particularités alimentaires"
                    hint="On ajuste l’application à ta réalité."
                  >
                    <ToggleGroup<FoodFilter>
                      mode="multi"
                      options={foodFilterOptions}
                      value={profile.foodFilters}
                      onChange={(v) => update("foodFilters", v)}
                    />
                  </FieldGroup>
                  <FieldGroup
                    label="Repères alimentaires"
                    hint="Tu peux les masquer ou les rendre plus précis."
                  >
                    <div className="space-y-2">
                      {foodStructurePreferenceOptions.map((option) => (
                        <OptionCard
                          key={option.value}
                          title={option.label}
                          active={profile.foodStructurePreference === option.value}
                          onClick={() =>
                            update(
                              "foodStructurePreference",
                              option.value as FoodStructurePreference,
                            )
                          }
                        />
                      ))}
                    </div>
                  </FieldGroup>
                  <FieldGroup label="Préférence déjeuner">
                    <div className="space-y-2">
                      {breakfastPreferenceOptions.map((option) => (
                        <OptionCard
                          key={option.value}
                          title={option.label}
                          active={profile.breakfastPreference === option.value}
                          onClick={() => update("breakfastPreference", option.value)}
                        />
                      ))}
                    </div>
                  </FieldGroup>
                  <FieldGroup
                    label="Capacité de cuisine"
                    hint="Aujourd’hui ou en général. Ça peut changer."
                  >
                    <div className="grid grid-cols-3 gap-2">
                      {cookingCapacityOptions.map((option) => {
                        const active = profile.cookingCapacity === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => update("cookingCapacity", option.value)}
                            aria-pressed={active}
                            className={`flex flex-col items-center gap-1 rounded-soft border px-3 py-4 text-sm transition-colors ${
                              active
                                ? "border-ink-900 bg-white shadow-soft"
                                : "border-cream-200 bg-white hover:bg-cream-100"
                            }`}
                          >
                            <span aria-hidden className="text-xl">
                              {option.emoji}
                            </span>
                            <span className={active ? "font-medium text-ink-900" : "text-ink-700"}>
                              {option.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </FieldGroup>
                </div>
              ) : null}
              {key === "equipement" ? (
                <ToggleGroup<Equipment>
                  mode="multi"
                  options={equipmentOptions}
                  value={profile.availableEquipment}
                  onChange={(v) => update("availableEquipment", v)}
                />
              ) : null}
              {key === "epiceries" ? (
                <ToggleGroup<StoreId>
                  mode="multi"
                  options={storeOptions}
                  value={profile.preferredStores}
                  onChange={(v) => update("preferredStores", v)}
                />
              ) : null}
              {key === "preferences" ? (
                <FieldGroup
                  label="Portions familiales par défaut"
                  hint="Combien de personnes mangent en moyenne à la maison."
                >
                  <div className="flex flex-wrap gap-2">
                    {servingsOptions.map((option) => {
                      const active = profile.householdDefaultServings === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => update("householdDefaultServings", option.value)}
                          aria-pressed={active}
                          className={`h-12 w-12 rounded-soft border text-base transition-colors ${
                            active
                              ? "border-ink-900 bg-ink-900 text-cream-50"
                              : "border-cream-200 bg-white text-ink-700 hover:bg-cream-100"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </FieldGroup>
              ) : null}
            </Accordion>
          );
        })}
      </div>

      <Card padding="lg">
        <p className="text-sm text-sand-700">
          Cette application est un outil de soutien aux habitudes de vie. Elle ne remplace pas un
          avis médical, un diagnostic, un traitement ou un suivi professionnel. En cas de condition
          médicale, de douleurs, de symptômes inhabituels ou de médication, consulter une
          professionnelle ou un professionnel de la santé.
        </p>
      </Card>

      <p className="pt-2 text-center text-xs text-sand-600">
        Tes choix sont gardés sur ton appareil.
      </p>
    </div>
  );
}

function Accordion({
  title,
  hint,
  summary,
  open,
  onToggle,
  children,
}: {
  title: string;
  hint?: string;
  summary?: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`overflow-hidden rounded-soft border bg-white transition-colors ${
        open ? "border-ink-900 shadow-soft" : "border-cream-200"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-3 px-4 py-3.5 text-left"
      >
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink-900">{title}</p>
          {!open && summary ? (
            <p className="mt-0.5 truncate text-xs text-sand-700">{summary}</p>
          ) : hint ? (
            <p className="mt-0.5 text-xs text-sand-700">{hint}</p>
          ) : null}
        </div>
        <span aria-hidden className="mt-1 text-sand-700">
          {open ? "−" : "+"}
        </span>
      </button>
      {open ? <div className="space-y-3 border-t border-cream-200 px-4 py-4">{children}</div> : null}
    </div>
  );
}

function FieldGroup({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-ink-900">{label}</p>
      {hint ? <p className="mb-2 mt-0.5 text-xs text-sand-700">{hint}</p> : <div className="mb-2" />}
      {children}
    </div>
  );
}

type MascotPickerProps = {
  selectedId: MascotAnimal;
  onSelect: (id: MascotAnimal) => void;
};

function MascotPicker({ selectedId, onSelect }: MascotPickerProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {mascots.map((m) => {
        const active = m.id === selectedId;
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelect(m.id)}
            aria-pressed={active}
            className={`flex flex-col items-start gap-3 rounded-soft border bg-white p-3 text-left transition-colors ${
              active
                ? "border-ink-900 shadow-soft"
                : "border-cream-200 hover:bg-cream-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <MascotAvatar mascot={m} size="sm" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink-900">{m.name}</p>
                <p className="truncate text-[11px] text-sand-700">{m.energy}</p>
              </div>
            </div>
            <p className="text-[11px] leading-relaxed text-sand-700">{m.description}</p>
          </button>
        );
      })}
    </div>
  );
}
