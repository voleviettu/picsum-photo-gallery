/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#E7DFD9',
        surface: '#F4F1EE',
        text: '#1E1E1C',
        muted: '#6B6A67',
        accent: '#7BB13B',
        'accent-contrast': '#0F1B07',
        'card-info': '#d2bba5ff',
      },
      boxShadow: {
        'soft': '0 8px 24px rgba(18, 18, 18, 0.08)',
      },
    },
  },
  plugins: [],
}
