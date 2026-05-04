"use client";

import { TogglePill } from "./toggle-pill";

export type ToggleOption<T extends string> = {
  value: T;
  label: string;
  emoji?: string;
};

type SingleProps<T extends string> = {
  mode: "single";
  title?: string;
  description?: string;
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

type MultiProps<T extends string> = {
  mode: "multi";
  title?: string;
  description?: string;
  options: ToggleOption<T>[];
  value: T[];
  onChange: (value: T[]) => void;
};

type ToggleGroupProps<T extends string> = SingleProps<T> | MultiProps<T>;

export function ToggleGroup<T extends string>(props: ToggleGroupProps<T>) {
  const { title, description, options } = props;

  function isActive(option: ToggleOption<T>): boolean {
    if (props.mode === "single") return props.value === option.value;
    return props.value.includes(option.value);
  }

  function handleClick(option: ToggleOption<T>) {
    if (props.mode === "single") {
      props.onChange(option.value);
      return;
    }
    const set = new Set(props.value);
    if (set.has(option.value)) {
      set.delete(option.value);
    } else {
      set.add(option.value);
    }
    props.onChange(Array.from(set));
  }

  return (
    <div>
      {title ? <p className="mb-1 text-sm font-medium text-ink-900">{title}</p> : null}
      {description ? <p className="mb-3 text-xs text-sand-600">{description}</p> : null}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <TogglePill
            key={option.value}
            active={isActive(option)}
            onClick={() => handleClick(option)}
            ariaLabel={option.label}
          >
            {option.emoji ? (
              <span aria-hidden className="mr-1">
                {option.emoji}
              </span>
            ) : null}
            {option.label}
          </TogglePill>
        ))}
      </div>
    </div>
  );
}
