<script setup lang="ts">
import Button from 'primevue/button'

const theme = useThemeStore()
const user = useCurrentUser()
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
        <NuxtLink v-if="!user" to="/login">
          <Button label="login" link>Login</Button>
        </NuxtLink>
        <NuxtLink v-else to="/dashboard">
          <Button label="Dashboard" link>Dashboard</Button>
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
