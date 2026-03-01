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
        // ── NexusStore palette ──────────────────
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        accent: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        dark: {
          100: '#2d2d3a',
          200: '#1e1e2a',
          300: '#13131a',
          400: '#0d0d14',
        },
        // ── Lumière palette ─────────────────────
        cream: {
          50: '#FEFDFB',
          100: '#FAF8F5',
          200: '#F5F3EE',
          300: '#EDE9E1',
          400: '#DDD8CF',
          500: '#C9C2B5',
        },
        charcoal: {
          50: '#F2F2F2',
          100: '#E0E0E0',
          200: '#BDBDBD',
          300: '#888888',
          400: '#555555',
          500: '#333333',
          600: '#2C2C2C',
          700: '#222222',
          800: '#1A1A1A',
          900: '#111111',
          950: '#0A0A0A',
        },
        gold: {
          50: '#FDF9F3',
          100: '#F6EDD8',
          200: '#EDD9B0',
          300: '#DFC182',
          400: '#C5A880',
          500: '#B8956A',
          600: '#A07D50',
          700: '#7D5E35',
          800: '#5A4220',
          900: '#3A280F',
        },
        brand: {
          bg: '#F8F7F4',
          'bg-alt': '#F0EDE8',
          dark: '#1A1A1A',
          text: '#2C2C2C',
          muted: '#888888',
          accent: '#C5A880',
          'accent-dark': '#A07D50',
          border: '#E8E3DA',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Montserrat"', '"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'underline-grow': 'underlineGrow 0.3s ease forwards',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeUp: {
          'from': { opacity: '0', transform: 'translateY(24px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        slideInRight: {
          'from': { transform: 'translateX(100%)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' },
        },
        underlineGrow: {
          'from': { transform: 'scaleX(0)' },
          'to': { transform: 'scaleX(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
