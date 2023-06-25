<script setup lang="ts">
const theme = useThemeStore()
useAsyncData(async () => {
  theme.init()
  return true
})
</script>

<template>
  <NuxtLayout>
    <Head>
      <Link rel="stylesheet" :href="theme.link" />
      <Link rel="prefetch" as="style" :href="theme.preload" />
    </Head>
    <NuxtPage />
  </NuxtLayout>
</template>
