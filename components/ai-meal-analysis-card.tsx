"use client";

import { useEffect, useState } from "react";
import type {
  DetectedState,
  MealAnalysisApiResponse,
  MealAnalysisErrorPayload,
  MealAnalysisResult,
} from "@/lib/ai/meal-analysis-types";
import {
  addMealAnalysisEntry,
  clearMealAnalysisHistory,
  getMealAnalysisHistory,
  type MealAnalysisHistoryEntry,
} from "@/lib/ai/meal-analysis-history";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "result"; result: MealAnalysisResult }
  | { kind: "error"; message: string }
  | { kind: "no_api_key"; message: string };

const DETECTED_LABEL: Record<DetectedState, { text: string; tone: string; mark: string }> = {
  present: { text: "présente", tone: "text-moss-600", mark: "✓" },
  missing: { text: "à compléter", tone: "text-amber-700", mark: "○" },
  unclear: { text: "à confirmer", tone: "text-sand-700", mark: "·" },
};

function isError(value: MealAnalysisApiResponse): value is MealAnalysisErrorPayload {
  return (value as MealAnalysisErrorPayload).error === true;
}

export function AiMealAnalysisCard() {
  const [meal, setMeal] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [history, setHistory] = useState<MealAnalysisHistoryEntry[]>([]);

  useEffect(() => {
    setHistory(getMealAnalysisHistory());
  }, []);

  async function handleAnalyze() {
    const trimmed = meal.trim();
    if (trimmed.length === 0) {
      setStatus({
        kind: "error",
        message: "Écris quelques mots sur ton repas avant de lancer l’analyse.",
      });
      return;
    }
    setStatus({ kind: "loading" });
    try {
      const res = await fetch("/api/ai/meal-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meal: trimmed }),
      });
      const data = (await res.json()) as MealAnalysisApiResponse;
      if (isError(data)) {
        if (data.code === "no_api_key") {
          setStatus({ kind: "no_api_key", message: data.message });
          return;
        }
        setStatus({ kind: "error", message: data.message });
        return;
      }
      setStatus({ kind: "result", result: data });
      setHistory(addMealAnalysisEntry(trimmed, data));
    } catch {
      setStatus({
        kind: "error",
        message: "L’analyse n’a pas fonctionné pour l’instant. Tu peux réessayer plus tard.",
      });
    }
  }

  function handleReuse(entry: MealAnalysisHistoryEntry) {
    setMeal(entry.meal);
    setStatus({ kind: "result", result: entry.result });
    setHistory(addMealAnalysisEntry(entry.meal, entry.result));
  }

  function handleClearHistory() {
    clearMealAnalysisHistory();
    setHistory([]);
  }

  return (
    <Card padding="lg" className="space-y-3">
      <div>
        <h2 className="text-base font-semibold text-ink-900">Analyse douce du repas</h2>
        <p className="mt-1 text-xs text-sand-700">
          Décris ton repas, et l’application t’aide à voir ce qui soutient ton énergie — sans
          mettre les calories au centre.
        </p>
      </div>

      <textarea
        value={meal}
        onChange={(e) => setMeal(e.target.value)}
        rows={3}
        placeholder="Exemple : poulet, riz, brocoli et un peu d’huile d’olive."
        className="w-full resize-y rounded-soft border border-cream-200 bg-white p-3 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-moss-500"
      />
      <p className="text-[11px] text-sand-700">
        Évite d’écrire des informations médicales sensibles. L’analyse sert seulement à t’aider à
        structurer un repas.
      </p>

      <Button
        onClick={handleAnalyze}
        fullWidth
        disabled={status.kind === "loading"}
      >
        {status.kind === "loading" ? "Je regarde doucement…" : "Analyser doucement"}
      </Button>

      {status.kind === "loading" ? (
        <p className="text-center text-xs text-sand-700">
          Je regarde la structure du repas doucement…
        </p>
      ) : null}

      {status.kind === "no_api_key" ? (
        <p className="rounded-soft bg-cream-100 p-3 text-sm text-sand-700">{status.message}</p>
      ) : null}

      {status.kind === "error" ? (
        <p className="rounded-soft bg-amber-50 p-3 text-sm text-amber-800">{status.message}</p>
      ) : null}

      {status.kind === "result" ? <MealAnalysisResultBlock result={status.result} /> : null}

      {history.length > 0 ? (
        <div className="space-y-2 border-t border-cream-200 pt-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-sand-600">
              Repas récents
            </p>
            <button
              type="button"
              onClick={handleClearHistory}
              className="text-[11px] text-sand-700 underline-offset-2 hover:underline"
            >
              Effacer
            </button>
          </div>
          <ul className="space-y-1.5">
            {history.map((entry) => (
              <li key={entry.id}>
                <button
                  type="button"
                  onClick={() => handleReuse(entry)}
                  className="flex w-full items-center gap-2 rounded-soft border border-cream-200 bg-white px-3 py-2 text-left text-sm text-ink-700 transition-colors hover:bg-cream-100"
                >
                  <span aria-hidden className="text-xs text-sand-700">
                    ↺
                  </span>
                  <span className="line-clamp-1 flex-1">{entry.meal}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Card>
  );
}

function MealAnalysisResultBlock({ result }: { result: MealAnalysisResult }) {
  const lines: { key: string; label: string; state: DetectedState }[] = [
    { key: "protein", label: "Protéine", state: result.detected.protein },
    {
      key: "vegetablesOrFiber",
      label: "Fibres / légumes",
      state: result.detected.vegetablesOrFiber,
    },
    { key: "grainOrStarch", label: "Féculent", state: result.detected.grainOrStarch },
    { key: "fat", label: "Lipide", state: result.detected.fat },
  ];

  return (
    <div className="space-y-3 border-t border-cream-200 pt-3">
      <p className="text-sm text-ink-900">{result.summary}</p>

      <Section title="Ce que je repère">
        <ul className="space-y-0.5 text-sm">
          {lines.map((line) => {
            const meta = DETECTED_LABEL[line.state];
            return (
              <li key={line.key} className="flex items-start gap-2">
                <span aria-hidden className={`mt-0.5 ${meta.tone}`}>
                  {meta.mark}
                </span>
                <span className="text-ink-700">
                  <span className="font-medium text-ink-900">{line.label}</span> · {meta.text}
                </span>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section title="Suggestion douce">
        <p className="text-sm text-ink-700">{result.gentleSuggestion}</p>
      </Section>

      <Section title="Option facile">
        <p className="text-sm text-ink-700">{result.simpleOption}</p>
      </Section>

      <Section title="Repère glycémie">
        <p className="text-sm text-ink-700">{result.glycemicSupportNote}</p>
      </Section>

      <p className="rounded-soft bg-moss-50 p-3 text-sm text-moss-700">{result.reassurance}</p>

      {result.safetyNote ? (
        <p className="text-xs text-sand-700">{result.safetyNote}</p>
      ) : null}

      <p className="text-[11px] text-sand-700">
        Cette analyse est un repère, pas un avis médical. En cas de question de santé, consulte
        une professionnelle ou un professionnel.
      </p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-sand-600">{title}</p>
      {children}
    </div>
  );
}
