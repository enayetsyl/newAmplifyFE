/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "custum-meet-bg": "#fde2d0",
        "custom-gray-1": "#E8E8E8",
        "custom-white": "#FFFFFF",
        "custom-gray-2": "#F7F8F9",
        "custom-black": "#000000",
        "custom-orange-1": "#FF6600",
        "custom-dark-blue-1": "#00293C",
        "custom-dark-blue-2": "#031F3A",
        "custom-ligt-blue-1": "#2976a5",
        "custom-pink": "#FF7E296E",
        "custom-light-blue-1": "#369CFF",
        "custom-light-blue-2": "#559FFB",
        "custom-red": "#FF3838",
        "custom-green": "#07C800",
        "custom-gray-3": "#707070",
        "custom-orange-2": "#FC6E15",
        "custom-gray-4": "#00000029",
        "custom-teal": "#1E656D",
        "custom-yellow": "#FCD860",
        "custom-orange-3": "#E39906",
        "custom-gray-5": "#A8A8A8",
        "custom-gray-6": "#AFAFAF",
        "custom-gray-7": "#EAEAEA",
        "custom-gray-8": "#EBEBEB",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "sidebar-gradient":
          "linear-gradient(28deg, #FC6E15 0%, #031f3a 100%) 0% 0% no-repeat",
      },
    },
  },
  plugins: [],
};
