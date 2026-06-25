import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "#FBF5EC",
        ink: "#2A0E3D",
        cream: { DEFAULT: "#FDF6EE", 200: "#F6ECDB" },
        gold: { light: "#E8D5A3", DEFAULT: "#C9A84C", dark: "#8B6914" },
        rose: { light: "#EABEC9", DEFAULT: "#C0607A" },
        plum: { DEFAULT: "#7B3F8C", deep: "#4A1F5C" },
        terra: "#C1440E",
        body: { DEFAULT: "#2D1B0E", muted: "#6B4C35", faint: "#A07860" },
        line: "rgba(123,63,140,0.12)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-hanken)", "system-ui", "sans-serif"],
      },
      maxWidth: { shell: "1240px" },
      borderRadius: { "4xl": "2rem" },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.2, 0.7, 0.2, 1)",
        bloom: "cubic-bezier(0.18, 0.9, 0.26, 1)",
      },
      keyframes: {
        bdot: {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.7)" },
        },
        sdot: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(11px)", opacity: "0" },
        },
        spin: { to: { transform: "translate(-50%,-50%) rotate(360deg)" } },
        "spin-rev": { to: { transform: "translate(-50%,-50%) rotate(-360deg)" } },
        "spin-c": { to: { transform: "rotate(360deg)" } },
        "spin-cc": { to: { transform: "rotate(-360deg)" } },
        bob: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-9px)" } },
        float: {
          "0%,100%": { transform: "translateY(0) scale(1)", opacity: "var(--po,0.5)" },
          "50%": { transform: "translateY(-18px) scale(1.4)", opacity: "calc(var(--po,0.5)*1.6)" },
        },
      },
      animation: {
        bdot: "bdot 2s ease-in-out infinite",
        sdot: "sdot 2s ease infinite",
        "mandala-cw": "spin-c 80s linear infinite",
        "mandala-ccw": "spin-cc 110s linear infinite",
        "orbit-cw": "spin 60s linear infinite",
        "orbit-ccw": "spin-rev 44s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
