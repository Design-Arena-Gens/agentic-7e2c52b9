import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Clash Display'", "system-ui", "sans-serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"]
      },
      colors: {
        night: "#0f172a",
        aurora: "#7c3aed",
        neon: "#32d5ff",
        ember: "#ff7849"
      },
      boxShadow: {
        glow: "0 0 30px rgba(50, 213, 255, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
