/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
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
                display: ['"Outfit"', 'sans-serif'],
                sans: ['"Inter"', 'sans-serif'],
                mono: ['"Fira Code"', 'monospace'],
            },
        },
    },
    plugins: [],
}
