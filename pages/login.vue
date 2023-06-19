<script setup lang="ts">
import { signInWithPopup, getAuth, GoogleAuthProvider } from "firebase/auth";
import { useToast } from 'primevue/usetoast';

import Button from 'primevue/button'
import Toast from 'primevue/toast'

definePageMeta({
  middleware: ['anon']
})

const toast = useToast();
const router = useRouter()

async function login() {
  try {
    const auth = getAuth()
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
    router.push('/dashboard')
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to login',
      life: 3000
    })
  }
}
</script>

<template>
  <div h-full flex items-center justify-center>
    <Toast />
    <Button @click="login">Login with Google</Button>
  </div>
</template>
