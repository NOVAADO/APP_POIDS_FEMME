import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#fbf8f3",
          100: "#f6f1e7",
          200: "#ede4d0",
        },
        sand: {
          400: "#c8b89a",
          600: "#8a7c66",
        },
        moss: {
          500: "#7a8a6b",
          600: "#5e6e52",
        },
        ink: {
          700: "#3a3530",
          900: "#1f1c19",
        },
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      borderRadius: {
        soft: "1.25rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(58,53,48,0.05), 0 4px 16px rgba(58,53,48,0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
