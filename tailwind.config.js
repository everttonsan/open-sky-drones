/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Cores oficiais Open Sky Drones - identidade visual
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe', 
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#3BB7F0',
          500: '#3BB7F0', // Azul Céu principal - cor primária oficial
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
          DEFAULT: '#3BB7F0', // Azul Céu #3BB7F0
        },
        // Azul Claro para fundos suaves
        'sky-light': '#A8E6FF',
        // Azul Céu para destaques
        'sky-blue': '#3BB7F0',
        // Preto Técnico para tipografia e alto contraste
        'tech-black': '#1E1E1E',
        // Cinza Drone para elementos neutros - tons melhorados para contraste
        'drone-gray': {
          50: '#f8fafc',
          100: '#f1f5f9', 
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8', // Para textos secundários - melhor contraste
          500: '#64748b', // Para textos corridos - excelente contraste
          600: '#475569', // Para textos importantes
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          DEFAULT: '#64748b', // Mudança principal: cor mais escura para textos
          light: '#BFC5CA', // Mantém a cor original para elementos decorativos
        },
        // Aliases para compatibilidade
        sky: {
          light: '#A8E6FF', // Azul Claro
          DEFAULT: '#3BB7F0', // Azul Céu
        },
        drone: {
          dark: '#1E1E1E', // Preto Técnico
          gray: '#BFC5CA', // Cinza Drone
        },
        // Gradientes
        gradient: {
          start: '#3BB7F0',
          end: '#A8E6FF',
        }
      },
      fontFamily: {
        // Títulos: Exo 2
        'heading': ['Exo 2', 'sans-serif'],
        // Textos: Montserrat
        'body': ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.1' }],
        'hero-mobile': ['2.5rem', { lineHeight: '1.2' }],
      },
      backgroundImage: {
        'gradient-sky': 'linear-gradient(135deg, #3BB7F0 0%, #A8E6FF 100%)',
        'gradient-sky-dark': 'linear-gradient(135deg, #0284c7 0%, #3BB7F0 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'drone': '0 20px 40px rgba(59, 183, 240, 0.1)',
        'elevation': '0 10px 30px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};

module.exports = config;