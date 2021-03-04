const { colors } = require(`tailwindcss/defaultTheme`);

module.exports = {
  darkMode: "class",
  purge: ["./components/**/*.js", "./pages/**/*.js"],
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/custom-forms"),
    require("@tailwindcss/forms"),
  ],
  theme: {
    customForms: theme => ({
      default: {
        input: {
          backgroundColor: theme('colors.gray.700'),
          '&:focus': {
            backgroundColor: theme('colors.gray.400'),
          }
        },
        select: {
          borderColor: theme('colors.gray.700'),
          color: theme('colors.gray.300'),
          boxShadow: theme('boxShadow.default'),
          backgroundColor: theme('colors.gray.700'),
          '&:focus': {
            backgroundColor: theme('colors.gray.900'),
            borderColor: theme('colors.primary.900'),
          }
        },
      },
    }),
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
