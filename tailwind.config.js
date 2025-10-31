/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#f0fdf4',
          100: '#dcfce7',
          300: '#86efac',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          300: '#d4d4d8',
          500: '#737373',
          700: '#404040',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 25px rgba(0,0,0,0.05)',
        glow: '0 4px 30px rgba(34, 197, 94, 0.3)',
      },
    },
  },
  plugins: [],
}
