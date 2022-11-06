const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        nvbar: "890px",
      },
      colors: {
        lightgreen: "#0ce363",
        darkgreen: "#00c67f",
        lightblack: "#293231",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        sora: ["Sora", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      minWidth: {
        "1/2": "50%",
      },
      maxWidth: {
        "1/2": "50%",
      },
      width: {
        markerbox: "38rem",
      },
      height: {
        hero: "93vh",
        fullscreen: "93vh",
        navbar: "7vh",
        smlogo: "43px",
        markerbox: "27rem",
      },
      fontSize: {
        title: ["10rem", "20rem"],
      },
    },
  },
  plugins: [],
};
