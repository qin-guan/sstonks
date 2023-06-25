<script setup lang="ts">
import Button from 'primevue/button'

const app = useNuxtApp()
const route = useRoute()
const config = useAppConfig()
const { isAuthenticated } = useAuth(app.$firebase.auth)

const isDashboard = computed(() => route.path.startsWith('/dashboard'))

const breadcrumbs = computed(() => {
  if (route.path === '/')
    return []
  const segments = route.path.split('/').slice(1)
  return segments.map(s => s[0].toUpperCase() + s.slice(1))
})
</script>

<template>
  <div h-full flex="~ col">
    <nav p-3 flex justify-between items-center>
      <div flex gap2 items-center>
        <NuxtLink to="/" class="nostyle">
          <span font-bold class="text-$primary-color">{{ config.title }}</span>
        </NuxtLink>

        <template v-for="crumb in breadcrumbs" :key="crumb">
          <span opacity-70>/</span>
          <span opacity-70>{{ crumb }}</span>
        </template>
      </div>

      <div flex gap3 items-center>
        <template v-if="!isDashboard">
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
        </template>

        <CommonColorModeButton />
      </div>
    </nav>

    <main h-full>
      <slot />
    </main>
  </div>
</template>

<style scoped>
</style>
