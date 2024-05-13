// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Market Warehouse',
      link: [
        { rel: "icon", type: "image/png", href: "/market-icon.png" }
      ]
    }
  },
  devtools: { enabled: true },
  
  // Import Vuetify
  build: {
    transpile: ['vuetify'],
  },
  css: ['assets/variables.scss', 'assets/css/custom.scss'],
  modules: [
    'nuxt-snackbar',
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    }
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  snackbar: {
    bottom: true,
    right: true,
    duration: 5000
  }
})
