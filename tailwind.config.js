/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Paleta Amatista, de la noche a la perla. El porqué está en IDENTIDAD.md.
      colors: {
        night: '#250A33',
        plum: '#451460',
        violet: '#6C2296',
        orchid: '#9838CE',
        lilac: '#BB74E2',
        mist: '#D9AEF1',
        pearl: '#F3E4FB',
      },
      fontFamily: {
        display: ['"Noto Serif Display"', 'Didot', 'Georgia', 'serif'],
        script: ['"Pinyon Script"', 'cursive'],
        sans: ['Jost', 'Futura', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
