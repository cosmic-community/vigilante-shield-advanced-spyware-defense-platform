/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
        },
        danger: {
          DEFAULT: '#ef4444',
          dark: '#dc2626',
        },
        warning: {
          DEFAULT: '#f59e0b',
          dark: '#d97706',
        },
        success: {
          DEFAULT: '#10b981',
          dark: '#059669',
        },
        dark: {
          DEFAULT: '#111827',
          lighter: '#1f2937',
          light: '#374151',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}