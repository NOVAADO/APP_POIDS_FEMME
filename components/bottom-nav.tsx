"use client";

import type { TabId } from "@/lib/types";

type Tab = {
  id: TabId;
  label: string;
  icon: string;
};

const tabs: Tab[] = [
  { id: "today", label: "Aujourd’hui", icon: "🌿" },
  { id: "workout", label: "Bouger", icon: "💪" },
  { id: "meals", label: "Repas", icon: "🍲" },
  { id: "grocery", label: "Épicerie", icon: "🛒" },
  { id: "progress", label: "Progression", icon: "📈" },
  { id: "profile", label: "Profil", icon: "👤" },
];

type BottomNavProps = {
  active: TabId;
  onChange: (id: TabId) => void;
};

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav
      aria-label="Navigation principale"
      className="sticky bottom-0 left-0 right-0 z-10 border-t border-cream-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-1 py-1">
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <li key={tab.id} className="flex-1">
              <button
                type="button"
                onClick={() => onChange(tab.id)}
                aria-current={isActive ? "page" : undefined}
                className={`flex w-full flex-col items-center gap-0.5 rounded-soft px-1 py-2 text-[11px] transition-colors ${
                  isActive ? "text-moss-600" : "text-sand-600 hover:text-ink-700"
                }`}
              >
                <span aria-hidden className="text-lg">{tab.icon}</span>
                <span className={isActive ? "font-medium" : ""}>{tab.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
