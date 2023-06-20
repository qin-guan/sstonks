<script setup lang="ts">
import { collection, getDocs } from 'firebase/firestore'

const db = useFirestore()

const { data, pending } = useAsyncData(async () => {
  const d = await getDocs(collection(db, 'houses'))
  return d.docs.map((doc) => doc.id)
})
</script>

<template>
  <div>
    {{ data }}
    {{ pending }}
  </div>
</template>
