"use client";

import type {
  Equipment,
  FoodFilter,
  HormonalStage,
  MascotAnimal,
  NeuroProfile,
  StoreId,
  UserProfile,
} from "@/lib/types";
import { mascots } from "@/data/mascots";
import {
  breakfastPreferenceOptions,
  cookingCapacityOptions,
  equipmentOptions,
  foodFilterOptions,
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

  const mascotOptions = mascots.map((m) => ({ value: m.id, label: m.name, emoji: m.emoji }));

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
        <SectionTitle hint="Choisis la présence qui te convient aujourd’hui.">
          Mascotte-compagnon
        </SectionTitle>
        <ToggleGroup<MascotAnimal>
          mode="single"
          options={mascotOptions}
          value={profile.mascotId}
          onChange={(v) => update("mascotId", v)}
        />
        <p className="mt-3 text-sm text-sand-600">
          Sélection actuelle&nbsp;:{" "}
          {mascots.find((m) => m.id === profile.mascotId)?.name ?? "—"}.
        </p>
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

