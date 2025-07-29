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
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      minHeight: {
        'screen-75': '75vh',
      },
      fontSize: {
        '55': '55rem',
      },
      opacity: {
        '80': '.8',
      },
      zIndex: {
        '2': 2,
        '3': 3,
      },
      inset: {
        '-100': '-100%',
        '-225-px': '-225px',
        '-160-px': '-160px',
        '-150-px': '-150px',
        '-94-px': '-94px',
        '-50-px': '-50px',
        '-29-px': '-29px',
        '-20-px': '-20px',
        '25-px': '25px',
        '40-px': '40px',
        '95-px': '95px',
        '145-px': '145px',
        '195-px': '195px',
        '210-px': '210px',
        '260-px': '260px',
      },
      maxHeight: {
        '0': '0',
        '2xl': '40rem',
      },
      minWidth: {
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
        '56': '14rem',
        '60': '15rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      objectPosition: {
        'center-bottom': 'center bottom',
        'center-center': 'center center',
        'center-top': 'center top',
        'left-bottom': 'left bottom',
        'left-center': 'left center',
        'left-top': 'left top',
        'right-bottom': 'right bottom',
        'right-center': 'right center',
        'right-top': 'right top',
      },
    },
  },
  plugins: [],
} 