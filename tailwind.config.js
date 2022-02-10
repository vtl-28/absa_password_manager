module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/custom-forms'),
    require('@themesberg/flowbite/plugin'),
    require('flowbite/plugin')
  ],
  content: [
    "./node_modules/@themesberg/flowbite/dist/flowbite.bundle.js",
    "./node_modules/flowbite/**/*.js"
  ]
}
