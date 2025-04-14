import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "spin-fast": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "spin-reverse": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        "spin-reverse-fast": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        "spin-medium": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "spin-medium-fast": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(0.95)" },
        },
        "pulse-fast": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(0.98)" },
        },
        "pulse": {
          "0%": { opacity: "0.7", transform: "scale(0.95)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
          "100%": { opacity: "0.7", transform: "scale(0.95)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow": {
          "0%, 100%": {
            boxShadow: "0 0 5px rgba(0, 136, 255, 0.5), 0 0 10px rgba(0, 136, 255, 0.3)"
          },
          "50%": {
            boxShadow: "0 0 20px rgba(0, 136, 255, 0.8), 0 0 30px rgba(0, 136, 255, 0.5)"
          },
        },
        "glow-strong": {
          "0%, 100%": {
            boxShadow: "0 0 10px rgba(0, 136, 255, 0.6), 0 0 20px rgba(0, 136, 255, 0.4)"
          },
          "50%": {
            boxShadow: "0 0 30px rgba(0, 136, 255, 0.9), 0 0 50px rgba(0, 136, 255, 0.7), 0 0 70px rgba(0, 136, 255, 0.5)"
          },
        },
        "ironman-pulse": {
          "0%": { 
            boxShadow: "0 0 15px rgba(0, 150, 255, 0.7), 0 0 30px rgba(0, 100, 255, 0.5) inset",
            filter: "brightness(0.9)"
          },
          "50%": { 
            boxShadow: "0 0 35px rgba(50, 180, 255, 0.9), 0 0 60px rgba(50, 150, 255, 0.7) inset",
            filter: "brightness(1.2)"
          },
          "100%": { 
            boxShadow: "0 0 15px rgba(0, 150, 255, 0.7), 0 0 30px rgba(0, 100, 255, 0.5) inset",
            filter: "brightness(0.9)"
          },
        },
        "scanning-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "fadeInUp": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fadeInRight": {
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "hologram-scan": {
          "0%": { transform: "translateY(-50%) rotate(0deg)" },
          "100%": { transform: "translateY(50%) rotate(0deg)" },
        },
        "data-flicker": {
          "0%, 100%": { opacity: "0.9" },
          "50%": { opacity: "0.4" },
          "92%": { opacity: "0.9" },
          "94%": { opacity: "0.2" },
          "96%": { opacity: "0.9" },
        },
        "data-scroll": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
        "particle-float": {
          "0%": { transform: "translateY(0) scale(1) rotate(0deg)", opacity: "0.8" },
          "50%": { transform: "translateY(-10px) scale(1.1) rotate(5deg)", opacity: "1" },
          "100%": { transform: "translateY(0) scale(1) rotate(0deg)", opacity: "0.8" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin-slow 10s linear infinite",
        "spin": "spin 8s linear infinite",
        "spin-fast": "spin-fast 5s linear infinite",
        "spin-reverse": "spin-reverse 10s linear infinite",
        "spin-reverse-fast": "spin-reverse-fast 5s linear infinite",
        "spin-medium": "spin-medium 7s linear infinite",
        "spin-medium-fast": "spin-medium-fast 4s linear infinite",
        "pulse-slow": "pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-fast": "pulse-fast 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse": "pulse 3s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
        "glow-strong": "glow-strong 1.5s ease-in-out infinite",
        "ironman-pulse": "ironman-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scanning-line": "scanning-line 2.5s ease-in-out infinite alternate",
        "scan-slow": "scanning-line 4s linear infinite",
        "scan-medium": "scanning-line 3s linear infinite", 
        "scan-fast": "scanning-line 2s linear infinite",
        "fadeInUp": "fadeInUp 0.6s ease-out",
        "fadeInRight": "fadeInRight 0.3s ease-out",
        "hologram-scan": "hologram-scan 2s ease-in-out infinite alternate",
        "data-flicker": "data-flicker 4s ease-in-out infinite",
        "data-scroll": "data-scroll 10s linear infinite",
        "particle-float": "particle-float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
