<script setup lang="ts">
const route = useRoute()
const theme = useThemeStore()
useAsyncData(async () => {
  theme.init()
  return true
})

const routeBreadcrumb = computed(() => {
  if (!route.params.house)
    return
  return route.params.house[0].toUpperCase() + route.params.house.slice(1)
})
</script>

<template>
  <div h-full flex="~ col">
    <Head>
      <Link rel="stylesheet" :href="theme.link" />
      <Link rel="prefetch" as="style" :href="theme.preload" />
    </Head>

    <nav p-3 flex justify-between items-center>
      <div flex gap3 items-center>
        <NuxtLink to="/" class="nostyle">
          <span font-bold class="text-$primary-color">SSTonks</span>
        </NuxtLink>

        <span opacity-70>/ Dashboard</span>
        <span v-if="routeBreadcrumb" opacity-70>/ {{ routeBreadcrumb }}</span>
      </div>

      <div flex gap3 items-center>
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
