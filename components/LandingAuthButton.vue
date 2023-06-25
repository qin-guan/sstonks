<script setup lang="ts">
import Button from 'primevue/button'

const app = useNuxtApp()
const { isAuthenticated } = useAuth(app.$firebase.auth)
</script>

<template>
  <div>
    <NuxtLink v-if="!isAuthenticated" to="/login">
      <Button label="login" link size="small">
        Login
      </Button>
    </NuxtLink>

    <NuxtLink v-else to="/dashboard">
      <Button label="Dashboard" link size="small">
        Dashboard
      </Button>
    </NuxtLink>
  </div>
</template>
