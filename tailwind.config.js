/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        accent: ['var(--font-accent)', 'serif'],
      },
      colors: {
        cream: '#F5F0E8',
        espresso: '#1A0F0A',
        gold: '#B8922A',
        'gold-light': '#D4AF6A',
        'warm-gray': '#8C7B6B',
        'deep-brown': '#2C1810',
        'parchment': '#EDE8DC',
      },
    },
  },
  plugins: [],
}
