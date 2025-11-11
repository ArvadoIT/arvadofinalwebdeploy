import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        orbitron: ["var(--font-orbitron)", "sans-serif"],
      },
      colors: {
        "slate-950": "#020617",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(14,165,233,0.12), transparent 45%), radial-gradient(circle at bottom right, rgba(139,92,246,0.15), transparent 40%)",
      },
    },
  },
  plugins: [],
};

export default config;

