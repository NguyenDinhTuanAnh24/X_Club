
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
                // Modern Clean Palette for Business/Professional

                // Primary - Navy (Trust & Authority)
                primary: {
                    DEFAULT: "#0F172A", // Slate-900 - Main text, headers
                    50: "#F8FAFC",
                    100: "#F1F5F9",
                    200: "#E2E8F0",
                    300: "#CBD5E1",
                    400: "#94A3B8",
                    500: "#64748B",
                    600: "#475569",
                    700: "#334155",
                    800: "#1E293B",
                    900: "#0F172A",
                    950: "#020617",
                },

                // Brand - Royal Blue (Action & Energy)
                brand: {
                    DEFAULT: "#2563EB", // Royal Blue - Primary buttons, links
                    50: "#EFF6FF",
                    100: "#DBEAFE",
                    200: "#BFDBFE",
                    300: "#93C5FD",
                    400: "#60A5FA",
                    500: "#3B82F6",
                    600: "#2563EB",
                    700: "#1D4ED8",
                    800: "#1E40AF",
                    900: "#1E3A8A",
                },

                // Accent - Amber (Highlight & Warmth)
                accent: {
                    DEFAULT: "#F59E0B", // Amber-500
                    50: "#FFFBEB",
                    100: "#FEF3C7",
                    200: "#FDE68A",
                    300: "#FCD34D",
                    400: "#FBBF24",
                    500: "#F59E0B",
                    600: "#D97706",
                    700: "#B45309",
                    800: "#92400E",
                    900: "#78350F",
                },

                // Success - Emerald
                success: {
                    DEFAULT: "#10B981",
                    50: "#ECFDF5",
                    100: "#D1FAE5",
                    500: "#10B981",
                    600: "#059669",
                    700: "#047857",
                },

                // Background & Surface
                background: "#F8FAFC", // Slate-50
                surface: "#FFFFFF",

                // Keep slate for utility
                slate: {
                    50: "#F8FAFC",
                    100: "#F1F5F9",
                    200: "#E2E8F0",
                    300: "#CBD5E1",
                    400: "#94A3B8",
                    500: "#64748B",
                    600: "#475569",
                    700: "#334155",
                    800: "#1E293B",
                    900: "#0F172A",
                    950: "#020617",
                }
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'slide-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
                    '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
                },
            },
            animation: {
                'fade-in': 'fade-in 0.2s ease-out',
                'slide-up': 'slide-up 0.3s ease-out',
            },
        },
    },
    plugins: [],
};
export default config;
