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
      width: {
        sketchaboutlg: "381.33px",
        sketchaboutxl: "418px",
        cserviceslg: "300px",
        cservicesxl: "350px",
        paboutlg: "580px",
        paboutxl: "600px",
        pboxsm: "540px",
        pboxmd: "720px",
        pboxlg: "960px",
        pboxxl: "1140px",
        textbox: "40rem",
        projectbox: "60rem",
      },
      height: {
        sketchaboutlg: "500px",
        sketchaboutxl: "555px",
        cservicesxl: "140px",
        contactboxlg: "300px",
        contactboxxl: "350px",
        paboutmd: "800px",
        paboutlg: "750px",
        paboutxl: "750px",
        pboxph: "900px",
        pboxsm: "969px",
        pboxmd: "555px",
        pboxlg: "465px",
        pboxxl: "555px",
        box: "107vh",
        hero: "93.1vh",
        fullscreen: "93vh",
        about: "60vh",
        navbar: "7vh",
        herologo: "23rem",
        smlogo: "43px",
      },
      backgroundImage: {
        "hero-img": "url('./images/hero-trash.jpg')",
      },
    },
  },
  plugins: [],
};
