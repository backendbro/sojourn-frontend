import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config = {
  important: true,
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      transform: {
        "translateZ-0": "translateZ(0)",
      },
      screens: {
        lg: "1025px",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        inter: ["var(--font-inter)"],
      },
      colors: {
        // primary: "#DE5353",
        primary: "#C40A0D",
        paper: "#FFFDFA",
        secondary: "#FEEBC7",
        "golden-orange": "#F0AE2F",
      },
      boxShadow: {
        "navbar-shadow": "0 4px 16px rgba(0, 0, 0, .2)",
        t: "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
        "t-md":
          "0 -6px 10px -1px rgba(0, 0, 0, 0.1), 0 -4px 6px -1px rgba(0, 0, 0, 0.06)",
        "t-lg":
          "0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "translate-z": (value) => ({
            "--tw-translate-z": value,
            transform: ` translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`,
          }), // this is actual CSS
        },
        { values: theme("translate"), supportsNegativeValues: true }
      );
    }),
  ],
} satisfies Config;

export default config;
