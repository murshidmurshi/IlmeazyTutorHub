/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}', 
    './src/**/*.{js,jsx,ts,tsx}', 
    './src/**/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors if needed
      },
      fontSize: {
      },
      fontFamily: {
        bold: ['Poppins-Bold'],
        f_extrabold: ['Poppins-ExtraBold'],
        f_extralight: ['Poppins-ExtraLight'],
        semi: ['Poppins-SemiBold'],
        p_medium: ['Poppins-Medium'],
        regular: ['Poppins-Regular'],
        f_light: ['Poppins-Light'],
        thin: ['Poppins-Thin'],
      },
    },
  },
  plugins: [],
};
