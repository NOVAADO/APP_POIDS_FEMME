"use client";

import { Button } from "./ui/button";
import { Card } from "./ui/card";

type WelcomeScreenProps = {
  onContinue: () => void;
};

export function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-cream-50 px-4 py-8">
      <div className="w-full max-w-md space-y-5">
        <Card className="space-y-4">
          <div className="flex justify-center text-5xl" aria-hidden>
            🌿
          </div>
          <h1 className="text-center text-2xl font-semibold text-ink-900">Bienvenue</h1>
          <p className="text-center text-sm text-sand-600">
            Une compagne douce pour soutenir le muscle, la glycémie et l’alimentation simple.
          </p>
          <ul className="space-y-2 text-sm text-ink-700">
            <li>• Aucun rattrapage. Aucune comparaison corporelle.</li>
            <li>• Tu peux personnaliser ton profil quand tu veux.</li>
            <li>• Tu peux aussi commencer tout de suite et ajuster plus tard.</li>
          </ul>
          <div className="flex flex-col gap-2 pt-1">
            <Button onClick={onContinue} fullWidth>
              Commencer
            </Button>
            <Button variant="ghost" onClick={onContinue} fullWidth>
              Plus tard
            </Button>
          </div>
        </Card>
        <p className="text-center text-xs text-sand-600">
          Cette application est un outil de soutien aux habitudes de vie. Elle ne remplace pas un avis
          médical.
        </p>
      </div>
    </div>
  );
}
