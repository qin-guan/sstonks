<script setup lang="ts">
const user = useCurrentUser()
console.log(user.value)
</script>

<template>
  <div>
    hello {{ user }}
  </div>
</template>
