<script setup lang="ts">
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useToast } from 'primevue/usetoast'

import Button from 'primevue/button'
import Toast from 'primevue/toast'

const app = useNuxtApp()

const toast = useToast()
const router = useRouter()

async function login() {
  try {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(app.$firebase.auth, provider)
    router.push('/dashboard')
  }
  catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to login',
      life: 3000,
    })
  }
}
</script>

<template>
  <div h-full flex items-center justify-center>
    <Toast />
    <Button @click="login">
      Login with Google
    </Button>
  </div>
</template>
