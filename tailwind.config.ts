import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Sora'", "sans-serif"],
        body: ["'Outfit'", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          DEFAULT: "#6366f1",
        },
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        rose: { 400: "#fb7185", 500: "#f43f5e" },
        emerald: { 500: "#10b981" },
        amber: { 500: "#f59e0b" },
      },
      animation: {
        "fade-up": "fadeUp .45s cubic-bezier(.4,0,.2,1) both",
        "fade-in": "fadeIn .35s ease both",
        "slide-l": "slideL .3s cubic-bezier(.4,0,.2,1) both",
        "pulse-sm": "pulseSm 2s infinite",
        shimmer: "shimmer 1.4s infinite linear",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideL: {
          from: { transform: "translateX(-100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        pulseSm: { "0%,100%": { opacity: "1" }, "50%": { opacity: ".35" } },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      boxShadow: {
        card: "0 2px 14px rgba(15,23,42,.06)",
        "card-lg": "0 8px 30px rgba(15,23,42,.12)",
        input: "0 0 0 3px rgba(99,102,241,.2)",
      },
    },
  },
  plugins: [],
};
export default config;
