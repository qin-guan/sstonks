<script setup lang="ts">

const theme = useThemeStore()
useAsyncData(async () => {
  theme.init()
  return true
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
