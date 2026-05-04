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
