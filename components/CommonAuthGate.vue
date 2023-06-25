<script setup lang="ts">
const app = useNuxtApp()
const { isAuthenticated } = useAuth(app.$firebase.auth)
</script>

<template>
  <template v-if="isAuthenticated">
    <slot />
  </template>
</template>
