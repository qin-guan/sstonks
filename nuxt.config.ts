import {createResolver} from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@unocss/nuxt',
    'nuxt-vuefire'
  ],
  alias: {
    // Issue: https://github.com/unjs/nitro/issues/1277
    "jose": resolve(__dirname, "./node_modules/jose/dist/browser/index.js"),
  },
  css: [
    'primevue/resources/primevue.css',
    '~/styles/global.css'
  ],
  build: {
    transpile: ['primevue']
  },
  vuefire: {
    auth: true,
    admin: {
      // For development only, use FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY and FIREBASE_PROJECT_ID env in prod
      serviceAccount: resolve(__dirname, './firebase-adminsdk.json')
    },
    config: {
      apiKey: "AIzaSyBYN9qy98CUX2eSgEf54zhTpVn1bF7I3Bg",
      authDomain: "incredible-sstonks.firebaseapp.com",
      projectId: "incredible-sstonks",
      storageBucket: "incredible-sstonks.appspot.com",
      messagingSenderId: "438193097420",
      appId: "1:438193097420:web:efb6fab1139930b2479069"
    }
  }
})
