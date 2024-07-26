/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        'white-1': '#757575',
        'white-3': '#D9D9D9',
        'black-1': '#0A0A0A',
        'black-2': '#161616',
        'black-4': '#131519',
        info: '#334155',
        success: '#219653',
        error: '#ef4444',
        warning: '#FFA70B',
        'black-3': 'rgba(0, 0, 0, 0.4)',
      },
      fontFamily: {
        dmsans: ['DM Sans', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      screens: {
        xs: '480px', //mobile
        sm: '768px', //mobile model ip11
        md: '1060px', // table && laptop ipad
      },
    },
  },
  plugins: [],
};
