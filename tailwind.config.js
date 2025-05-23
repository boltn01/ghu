/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D4AF37',
          light: '#E6C655',
          dark: '#B39329',
        },
        secondary: {
          DEFAULT: '#0F0F3E',
          light: '#1A1A5C',
          dark: '#080820',
        },
        accent: {
          DEFAULT: '#CD853F',
          light: '#DEA05F',
          dark: '#A66A32',
        },
        background: '#000B1F',
        foreground: '#F8F6F0',
        border: 'rgba(212, 175, 55, 0.2)',
        glass: {
          light: 'rgba(255, 255, 255, 0.1)',
          dark: 'rgba(0, 0, 0, 0.2)',
        }
      },
      fontFamily: {
        main: ['Noto Kufi Arabic', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'pattern-mashrabiya': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.1'%3E%3Cpath d='M30 0L30 60 20 60 20 0zM60 30L0 30 0 20 60 20zM35 5L25 15 15 5 25 -5zM30 15L30 45 20 45 20 15zM15 30L45 30 45 20 15 20zM45 35L35 45 25 35 35 25zM20 45L20 15 30 15 30 45z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};