const path = require('path');

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxtjs/google-fonts'
  ],
  css: [
    'assets/normalize.css'
  ],
  googleFonts: {
    families: {
      Workbench: true,
      "Rosarivo": true,
    }
  }
})
