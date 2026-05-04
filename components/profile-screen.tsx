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
import { mascots } from "@/data/mascots";
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
import { SectionTitle } from "./ui/section-title";
import { ToggleGroup } from "./ui/toggle-group";

type ProfileScreenProps = {
  profile: UserProfile;
  onChange: (next: UserProfile) => void;
};

export function ProfileScreen({ profile, onChange }: ProfileScreenProps) {
  function update<K extends keyof UserProfile>(key: K, value: UserProfile[K]) {
    onChange({ ...profile, [key]: value });
  }

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-semibold text-ink-900">Profil</h1>
        <p className="mt-1 text-sm text-sand-600">
          Ces choix servent à simplifier ce que l’application te propose. Tu peux les modifier à tout
          moment. Rien n’est figé.
        </p>
      </header>

      <Card>
        <SectionTitle hint="Choisis l’étape qui correspond le mieux à ce que tu vis en ce moment.">
          Étape hormonale
        </SectionTitle>
        <ToggleGroup<HormonalStage>
          mode="single"
          options={hormonalStageOptions}
          value={profile.hormonalStage}
          onChange={(v) => update("hormonalStage", v)}
        />
      </Card>

      <Card>
        <SectionTitle hint="Tu peux en cocher plusieurs. Aucun n’est obligatoire.">
          Neuroprofil
        </SectionTitle>
        <ToggleGroup<NeuroProfile>
          mode="multi"
          options={neuroProfileOptions}
          value={profile.neuroProfiles}
          onChange={(v) => update("neuroProfiles", v)}
        />
      </Card>

      <Card>
        <SectionTitle hint="On ajuste l’application à ta réalité, pas l’inverse.">
          Particularités alimentaires et digestives
        </SectionTitle>
        <ToggleGroup<FoodFilter>
          mode="multi"
          options={foodFilterOptions}
          value={profile.foodFilters}
          onChange={(v) => update("foodFilters", v)}
        />
      </Card>

      <Card>
        <SectionTitle hint="Coche ce que tu as à la maison. Une chaise et un mur suffisent.">
          Équipement disponible
        </SectionTitle>
        <ToggleGroup<Equipment>
          mode="multi"
          options={equipmentOptions}
          value={profile.availableEquipment}
          onChange={(v) => update("availableEquipment", v)}
        />
      </Card>

      <Card>
        <SectionTitle hint="On affichera les rabais correspondants.">
          Épiceries à surveiller
        </SectionTitle>
        <ToggleGroup<StoreId>
          mode="multi"
          options={storeOptions}
          value={profile.preferredStores}
          onChange={(v) => update("preferredStores", v)}
        />
      </Card>

      <Card>
        <SectionTitle hint="Combien de personnes mangent en moyenne à la maison.">
          Portions familiales par défaut
        </SectionTitle>
        <ToggleGroup<string>
          mode="single"
          options={servingsOptions.map((o) => ({ value: String(o.value), label: o.label }))}
          value={String(profile.householdDefaultServings)}
          onChange={(v) => update("householdDefaultServings", Number(v))}
        />
      </Card>

      <Card>
        <SectionTitle>Préférence déjeuner</SectionTitle>
        <ToggleGroup<UserProfile["breakfastPreference"]>
          mode="single"
          options={breakfastPreferenceOptions}
          value={profile.breakfastPreference}
          onChange={(v) => update("breakfastPreference", v)}
        />
      </Card>

      <Card>
        <SectionTitle hint="Aujourd’hui ou en général. C’est correct que ça change.">
          Capacité de cuisine
        </SectionTitle>
        <ToggleGroup<UserProfile["cookingCapacity"]>
          mode="single"
          options={cookingCapacityOptions}
          value={profile.cookingCapacity}
          onChange={(v) => update("cookingCapacity", v)}
        />
      </Card>

      <Card>
        <SectionTitle hint="Ces repères servent à simplifier les choix. Tu peux les masquer ou les rendre plus précis.">
          Repères alimentaires
        </SectionTitle>
        <ToggleGroup<FoodStructurePreference>
          mode="single"
          options={foodStructurePreferenceOptions}
          value={profile.foodStructurePreference}
          onChange={(v) => update("foodStructurePreference", v)}
        />
      </Card>

      <Card>
        <SectionTitle hint="Une compagne, pas un coach. Tu peux changer en tout temps.">
          Mascotte-compagnon
        </SectionTitle>
        <MascotPicker
          selectedId={profile.mascotId}
          onSelect={(id) => update("mascotId", id)}
        />
      </Card>

      <Card>
        <SectionTitle>Limites de cette application</SectionTitle>
        <p className="text-sm text-sand-600">
          Cette application est un outil de soutien aux habitudes de vie. Elle ne remplace pas un avis
          médical, un diagnostic, un traitement ou un suivi professionnel. En cas de condition
          médicale, de diabète traité, de douleurs, de symptômes inhabituels ou de médication,
          consulter une professionnelle ou un professionnel de la santé.
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
            className={`flex flex-col items-start gap-2 rounded-soft border bg-white p-3 text-left transition-colors ${
              active
                ? "border-moss-500 bg-moss-500/5"
                : "border-cream-200 hover:bg-cream-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <MascotAvatar mascot={m} size="sm" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink-900">{m.name}</p>
                <p className="truncate text-[11px] text-sand-600">{m.energy}</p>
              </div>
            </div>
            <p className="text-[11px] text-sand-600">{m.description}</p>
          </button>
        );
      })}
    </div>
  );
}
