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
        float: {
          '0%' : {
            'boxShadow': '0 5px 15px 0px rgba(0,0,0,0.4)',
		        'transform': 'translatey(0px)'
        },
	      '50%' : {
          'boxShadow': '0 25px 15px 0px rgba(0,0,0,0.2)',
		      'transform': 'translatey(-5px)'
        },
	      '100%' : {
        'boxShadow': '0 5px 15px 0px rgba(0,0,0,0.4)',
		    'transform': 'translatey(0px)'
    }
        }
      },
      animation: {
        'float': 'float 5s ease-in-out infinite'
      }
    }
  },
  plugins: [],
}
