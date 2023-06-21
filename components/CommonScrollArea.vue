<script setup lang="ts">
const props = defineProps<{
  vertical?: boolean
  horizontal?: boolean
}>()
</script>

<template>
  <div flex-1 relative>
    <div
      flex flex-col absolute inset-0 pr-1 overflow-hidden :class="{
        'overflow-y-scroll': props.vertical,
        'overflow-x-scroll': props.horizontal,
      }"
    >
      <slot />
    </div>
  </div>
</template>
