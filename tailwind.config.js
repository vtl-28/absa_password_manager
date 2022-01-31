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
    require('@themesberg/flowbite/plugin')
  ],
  content: [
    "./node_modules/@themesberg/flowbite/dist/flowbite.bundle.js"
  ]
}
