import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          primary: "rgb(var(--brand-primary) / <alpha-value>)",
          secondary: "rgb(var(--brand-secondary) / <alpha-value>)",
          tertiary: "rgb(var(--brand-tertiary) / <alpha-value>)",
          bg: "rgb(var(--brand-bg) / <alpha-value>)",
        }
      },
      animation: {
        blob: "blob 10s infinite",
        shimmer: "shimmer 6s linear infinite",
        marquee: "marquee 40s linear infinite",
        "cursor-blink": "cursor-blink 1s steps(2) infinite",
        "pulse-dot": "pulse-dot 1.6s ease-in-out infinite",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        shimmer: {
          "from": { backgroundPosition: "200% 0" },
          "to": { backgroundPosition: "-200% 0" },
        },
        marquee: {
          "from": { transform: "translateX(0)" },
          "to": { transform: "translateX(-50%)" },
        },
        "cursor-blink": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.55", transform: "scale(0.85)" },
        },
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            h1: {
              fontFamily: `${theme('fontFamily.serif')}`,
              fontWeight: '700',
              letterSpacing: '-0.025em',
            },
            h2: {
              fontFamily: `${theme('fontFamily.serif')}`,
              fontWeight: '700',
              letterSpacing: '-0.025em',
            },
            h3: {
              fontFamily: `${theme('fontFamily.serif')}`,
              fontWeight: '700',
              letterSpacing: '-0.025em',
            },
          },
        },
      }),
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
