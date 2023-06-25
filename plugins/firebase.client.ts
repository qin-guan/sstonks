import { getAuth } from 'firebase/auth'
import { getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBYN9qy98CUX2eSgEf54zhTpVn1bF7I3Bg',
  authDomain: 'incredible-sstonks.firebaseapp.com',
  projectId: 'incredible-sstonks',
  storageBucket: 'incredible-sstonks.appspot.com',
  messagingSenderId: '438193097420',
  appId: '1:438193097420:web:efb6fab1139930b2479069',
}

export default defineNuxtPlugin(() => {
  if (!getApps().length)
    initializeApp(firebaseConfig)

  const auth = getAuth()
  const db = getFirestore()

  return {
    provide: {
      firebase: {
        auth,
        db,
      },
    },
  }
})
