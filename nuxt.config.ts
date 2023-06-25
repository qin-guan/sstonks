import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@vueuse/nuxt',
  ],
  alias: {
    // Issue: https://github.com/unjs/nitro/issues/1277
    jose: resolve(__dirname, './node_modules/jose/dist/browser/index.js'),
  },
  css: [
    '@unocss/reset/tailwind-compat.css',
    'primevue/resources/primevue.css',
    '~/styles/global.css',
  ],
  build: {
    transpile: ['primevue'],
  },
  appConfig: {
    title: 'SSTonks',
  },
  // vuefire: {
  //   auth: true,
  //   admin: {
  //   },
  //   config: {
  //     apiKey: 'AIzaSyBYN9qy98CUX2eSgEf54zhTpVn1bF7I3Bg',
  //     authDomain: 'incredible-sstonks.firebaseapp.com',
  //     projectId: 'incredible-sstonks',
  //     storageBucket: 'incredible-sstonks.appspot.com',
  //     messagingSenderId: '438193097420',
  //     appId: '1:438193097420:web:efb6fab1139930b2479069',
  //   },
  // },
})
