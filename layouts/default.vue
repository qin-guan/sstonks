<script setup lang="ts">
const route = useRoute()
const config = useAppConfig()

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
        <LazyLandingAuthButton v-if="!isDashboard" />

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
