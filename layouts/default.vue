<script setup lang="ts">
import Button from 'primevue/button'

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

    <nav p-3 flex justify-between items-center class="text-$primary-color">
      <NuxtLink to="/" class="nostyle">
        <span font-bold>SSTonks</span>
      </NuxtLink>

      <div flex gap3 items-center>
        <NuxtLink to="/login">
          <Button label="login" link>Login</Button>
        </NuxtLink>
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
