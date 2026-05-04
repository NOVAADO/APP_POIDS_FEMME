"use client";

import { Button } from "./ui/button";
import { Card } from "./ui/card";

type WelcomeScreenProps = {
  onContinue: () => void;
};

export function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-cream-50 px-5 py-8">
      <div className="w-full max-w-md space-y-5">
        <Card hero padding="lg" className="space-y-5">
          <div className="flex justify-center text-5xl" aria-hidden>
            🌿
          </div>
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tightish text-ink-900">
              Bienvenue
            </h1>
            <p className="text-sm text-sand-700">
              Une compagne douce pour soutenir le muscle, la glycémie et l’alimentation simple.
            </p>
          </div>
          <ul className="space-y-2 text-sm text-ink-700">
            <li>• Aucun rattrapage. Aucune comparaison corporelle.</li>
            <li>• Tu peux personnaliser ton profil quand tu veux.</li>
            <li>• Tu peux aussi commencer tout de suite et ajuster plus tard.</li>
          </ul>
          <div className="flex flex-col gap-2 pt-1">
            <Button size="lg" onClick={onContinue} fullWidth>
              Commencer
            </Button>
            <Button variant="ghost" onClick={onContinue} fullWidth>
              Plus tard
            </Button>
          </div>
        </Card>
        <p className="text-center text-xs text-sand-700">
          Cette application est un outil de soutien aux habitudes de vie. Elle ne remplace pas un
          avis médical.
        </p>
      </div>
    </div>
  );
}
