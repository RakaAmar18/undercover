/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#8b5cf6',
        secondary: '#6366f1',
        background: '#0f172a',
        surface: '#1e293b',
        cardBg: '#334155',
        textPrimary: '#f1f5f9',
        textSecondary: '#cbd5e1',
        civilian: '#10b981',
        undercover: '#ef4444',
      },
    },
  },
  plugins: [],
}
