/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      // Palet warna kustom: cream, brown, accent
      colors: {
        cream: { DEFAULT: '#F5F1E8', light: '#FAF6EF' },
        brown: { DEFAULT: '#2D2A26', soft: '#5C544A' },
        accent: { DEFAULT: '#A47551', light: '#C8A98A' }
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif']
      },
      borderRadius: { xl: '1rem' }
    }
  },
  plugins: []
}
