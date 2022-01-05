module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        slideInleft: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-25%)'
          },
          '100%': {
            opacity: '1',
            transform: 'none'
          },
        }
      },
      animation: {
        'slideInleft': 'slideInleft 1s ease-out'
      }
    }
  },
  plugins: [],
}
