import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E94560",
          50: "#FEF2F4",
          100: "#FCE5E9",
          200: "#F9CBCF",
          300: "#F5A1AB",
          400: "#EF6D7F",
          500: "#E94560",
          600: "#DB2748",
          700: "#B71D3A",
          800: "#981A35",
          900: "#801831",
        },
      },
    },
  },
  plugins: [],
};
export default config;
