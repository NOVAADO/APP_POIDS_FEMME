"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const PRESETS_SECONDS: { label: string; value: number }[] = [
  { label: "1 min", value: 60 },
  { label: "3 min", value: 180 },
  { label: "5 min", value: 300 },
  { label: "10 min", value: 600 },
];

function formatMMSS(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function WorkoutTimer() {
  const [duration, setDuration] = useState<number>(60);
  const [remaining, setRemaining] = useState<number>(60);
  const [running, setRunning] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  function handlePreset(seconds: number) {
    setDuration(seconds);
    setRemaining(seconds);
    setRunning(false);
  }

  function handleStartPause() {
    if (remaining === 0) {
      setRemaining(duration);
      setRunning(true);
      return;
    }
    setRunning((r) => !r);
  }

  function handleReset() {
    setRunning(false);
    setRemaining(duration);
  }

  return (
    <Card padding="lg" className="space-y-4">
      <div>
        <h2 className="text-base font-semibold text-ink-900">Minuterie</h2>
        <p className="text-xs text-sand-700">On commence doucement. Ce qui est fait compte.</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <p
          aria-live="polite"
          className="font-mono text-6xl tabular-nums text-ink-900"
        >
          {formatMMSS(remaining)}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {PRESETS_SECONDS.map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() => handlePreset(preset.value)}
              aria-pressed={duration === preset.value}
              className={`inline-flex h-9 items-center rounded-pill border px-3 text-xs transition-colors ${
                duration === preset.value
                  ? "border-ink-900 bg-ink-900 text-cream-50"
                  : "border-cream-200 bg-white text-ink-700 hover:bg-cream-100"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
        <div className="flex w-full gap-2">
          <Button onClick={handleStartPause} fullWidth>
            {running ? "Pause" : remaining === 0 ? "Recommencer" : "Démarrer"}
          </Button>
          <Button variant="secondary" onClick={handleReset} fullWidth>
            Reset
          </Button>
        </div>
        <p className="text-center text-xs text-sand-700">
          Tu peux arrêter après la version courte.
        </p>
      </div>
    </Card>
  );
}
