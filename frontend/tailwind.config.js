const { colors } = require(`tailwindcss/defaultTheme`);

module.exports = {
  darkMode: "media",
  purge: ["./components/**/*.js", "./pages/**/*.js"],
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/custom-forms"),
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
      },
      container: {
        center: true,
        padding: {
          default: "1rem",
          md: "2rem",
        },
      },
    },
  },
};
