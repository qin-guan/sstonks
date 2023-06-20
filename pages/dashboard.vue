<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layout: 'dash'
})
</script>

<template>
  <div p-3>
    <h2>Statistics</h2>
    <Home/>
  </div>
</template>
