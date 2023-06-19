// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@unocss/nuxt',
    'nuxt-vuefire'
  ],
  css: [
    'primevue/resources/primevue.css',
    '~/styles/global.css'
  ],
  build: {
    transpile: ['primevue']
  },
  vuefire: {
    auth: true,
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
