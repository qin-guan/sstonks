<script setup lang="ts">
import Button from 'primevue/button'

const theme = useThemeStore()
const route = useRoute()

const { data: user } = useAsyncData(async () => {
  theme.init()
  const user = useCustomCurrentUser()
  return user.value
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

        <span v-if="route.path === '/dashboard'" opacity-70>/ Dashboard</span>
      </div>

      <div flex gap3 items-center>
        <NuxtLink v-if="!user" to="/login">
          <Button label="login" link>
            Login
          </Button>
        </NuxtLink>

        <NuxtLink v-else to="/dashboard">
          <Button label="Dashboard" link>
            Dashboard
          </Button>
        </NuxtLink>

        <CommonColorModeButton />
      </div>
    </nav>

    <main h-full>
      <slot />
    </main>
  </div>
</template>
