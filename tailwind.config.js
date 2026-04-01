/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dpjic: {
          green: '#2D8A4E', // Couleur pour l'Axe Agricole [cite: 15]
          red: '#E21F26',   // Couleur pour l'Axe Social [cite: 16]
          blue: '#1E40AF',  // Couleur pour l'Axe Innovation [cite: 17]
          yellow: '#FFD700',// Couleur pour l'Axe Paix [cite: 18]
        }
      },
    },
  },
  plugins: [],
}