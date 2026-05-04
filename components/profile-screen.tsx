"use client";

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
  foodFilterOptions,
  foodStructurePreferenceOptions,
  hormonalStageOptions,
  neuroProfileOptions,
  servingsOptions,
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

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <Card padding="lg" className="space-y-3">
      <div>
        <h2 className="text-base font-semibold text-ink-900">{title}</h2>
        {hint ? <p className="mt-1 text-xs text-sand-700">{hint}</p> : null}
      </div>
      {children}
    </Card>
  );
}

export function ProfileScreen({ profile, onChange }: ProfileScreenProps) {
  function update<K extends keyof UserProfile>(key: K, value: UserProfile[K]) {
    onChange({ ...profile, [key]: value });
  }

  const mascot = getMascotById(profile.mascotId) ?? mascots[0];

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
          <p className="mt-1 text-lg font-semibold text-ink-900">
            {mascot.name}
          </p>
          <p className="text-sm text-sand-700">{mascot.energy}</p>
        </div>
      </Card>

      <Section
        title="Mascotte-compagnon"
        hint="Une compagne, pas un coach. Tu peux changer en tout temps."
      >
        <MascotPicker
          selectedId={profile.mascotId}
          onSelect={(id) => update("mascotId", id)}
        />
      </Section>

      <Section
        title="Étape hormonale"
        hint="Choisis l’étape qui correspond le mieux à ce que tu vis."
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
      </Section>

      <Section
        title="Capacité de cuisine"
        hint="Aujourd’hui ou en général. C’est correct que ça change."
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
      </Section>

      <Section
        title="Préférence déjeuner"
        hint="Pas figé. Tu peux suivre ton humeur."
      >
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
      </Section>

      <Section
        title="Neuroprofil"
        hint="Tu peux en cocher plusieurs. Aucun n’est obligatoire."
      >
        <ToggleGroup<NeuroProfile>
          mode="multi"
          options={neuroProfileOptions}
          value={profile.neuroProfiles}
          onChange={(v) => update("neuroProfiles", v)}
        />
      </Section>

      <Section
        title="Particularités alimentaires"
        hint="On ajuste l’application à ta réalité, pas l’inverse."
      >
        <ToggleGroup<FoodFilter>
          mode="multi"
          options={foodFilterOptions}
          value={profile.foodFilters}
          onChange={(v) => update("foodFilters", v)}
        />
      </Section>

      <Section
        title="Repères alimentaires"
        hint="Tu peux les masquer ou les rendre plus précis."
      >
        <div className="space-y-2">
          {foodStructurePreferenceOptions.map((option) => (
            <OptionCard
              key={option.value}
              title={option.label}
              active={profile.foodStructurePreference === option.value}
              onClick={() =>
                update("foodStructurePreference", option.value as FoodStructurePreference)
              }
            />
          ))}
        </div>
      </Section>

      <Section
        title="Équipement disponible"
        hint="Coche ce que tu as. Une chaise et un mur suffisent."
      >
        <ToggleGroup<Equipment>
          mode="multi"
          options={equipmentOptions}
          value={profile.availableEquipment}
          onChange={(v) => update("availableEquipment", v)}
        />
      </Section>

      <Section
        title="Épiceries à surveiller"
        hint="On affichera les rabais correspondants."
      >
        <ToggleGroup<StoreId>
          mode="multi"
          options={storeOptions}
          value={profile.preferredStores}
          onChange={(v) => update("preferredStores", v)}
        />
      </Section>

      <Section
        title="Portions familiales par défaut"
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
      </Section>

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
            <p className="text-[11px] leading-relaxed text-sand-700">
              {m.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}
