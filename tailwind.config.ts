import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pre-existing — kept as is to avoid breaking current usages
        cream: {
          50: "#fbf8f3",
          100: "#f4eee2",
          200: "#ebe2cd",
        },
        sand: {
          400: "#c8b89a",
          500: "#a89776",
          600: "#7a6c54",
          700: "#5b5040",
        },
        moss: {
          50: "#eef3e7",
          400: "#8a9a78",
          500: "#6f8160",
          600: "#566649",
          700: "#3f4b35",
        },
        ink: {
          500: "#5a554f",
          700: "#332f2a",
          900: "#1c1916",
        },
        // Direction A — organic notebook palette (additive)
        paper: {
          50: "#fdfaf4",
          100: "#f8f1e2",
        },
        linen: {
          100: "#efe6d2",
          200: "#e1d3b6",
        },
        sage: {
          50: "#f0f4ea",
          100: "#dde6cf",
          200: "#c2d2ad",
          400: "#9bb088",
          500: "#7e9a6c",
          600: "#5f7951",
        },
        clay: {
          100: "#f3dccc",
          300: "#dfa988",
          500: "#c47a55",
          600: "#a35d3c",
        },
        apricot: {
          100: "#fbe4ce",
          300: "#f0b889",
          500: "#dd8e58",
        },
        oat: {
          100: "#f0e6d0",
          200: "#e1d2b0",
        },
        honey: {
          200: "#f0d59c",
          400: "#d8a857",
        },
        cocoa: {
          500: "#6a4c34",
          700: "#3f2c1d",
        },
        rosewarm: {
          100: "#f5d8d0",
          300: "#dfa599",
          500: "#c47565",
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      borderRadius: {
        soft: "1.25rem",
        hero: "1.75rem",
        pill: "9999px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(58,53,48,0.04), 0 6px 18px rgba(58,53,48,0.05)",
        hero: "0 4px 16px rgba(58,53,48,0.06), 0 24px 48px rgba(58,53,48,0.06)",
      },
      spacing: {
        "screen-px": "1.25rem",
      },
      letterSpacing: {
        tightish: "-0.01em",
      },
    },
  },
  plugins: [],
};

export default config;
