/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                neon: {
                    cyan: '#00f3ff',
                    purple: '#bc13fe',
                    green: '#0aff00'
                },
                dark: {
                    bg: '#050505',
                    card: '#101010',
                    border: '#2a2a2a'
                }
            },
            fontFamily: {
                sans: ['"Inter"', 'sans-serif'],
                mono: ['"Fira Code"', 'monospace'],
                display: ['"Outfit"', 'sans-serif'], // Premium display font
            },
            animation: {
                'spin-slow': 'spin 8s linear infinite',
                'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, #1f2937 1px, transparent 1px), linear-gradient(to bottom, #1f2937 1px, transparent 1px)",
            }
        },
    },
    plugins: [],
}
