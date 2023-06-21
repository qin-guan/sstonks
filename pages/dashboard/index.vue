<script setup lang="ts">
import Skeleton from 'primevue/skeleton'

definePageMeta({
  middleware: ['auth'],
  layout: 'dash',
})

const theme = useThemeStore()
const db = useFirestore()
const { data, pending, error } = useHouses(db)

const cardBgColors = computed<Record<string, string>>(() => {
  if (theme.mode === 'dark') {
    return {
      black: 'bg-purple-700',
      blue: 'bg-blue-700',
      green: 'bg-green-700',
      yellow: 'bg-yellow-700',
      red: 'bg-red-700',
    }
  }

  return {
    black: 'bg-purple-100',
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    yellow: 'bg-yellow-100',
    red: 'bg-red-100',
  }
})
</script>

<template>
  <div mt-10 px10 lg:px15 flex flex-col gap-10>
    <section>
      <h2 font-semibold text-lg>
        Points
      </h2>
      <div mt-5>
        <div v-if="pending">
          <Skeleton height="5rem" />
        </div>
        <div v-else-if="error" />
        <div v-else flex gap3 flex-wrap>
          <div
            v-for="{ title, points, id } in data" :key="id" :class="cardBgColors[id]" flex-1 rounded-md p-3 flex
            flex-col class="min-w-[150px]" @click="$router.push(`/dashboard/${id}`)"
          >
            <span font-semibold>{{ title }}</span>
            <span text-2xl ml-auto>{{ points }}</span>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 font-semibold text-lg>
        Students
      </h2>
    </section>
  </div>
</template>
