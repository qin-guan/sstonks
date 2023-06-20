<script setup lang="ts">
import Divider from 'primevue/divider'
import Skeleton from 'primevue/skeleton'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import Dialog from 'primevue/dialog'

definePageMeta({
  layout: 'dash',
})

const sidebar = ref(true)

const route = useRoute()
const { data, pending, error } = useHouse(route.params.house as string)

const formData = reactive({
  points: 0,
  modalVisible: false,
})
</script>

<template>
  <div p-3 h-full px10 lg:px15>
    <div v-if="error">
      {{ error }}
    </div>
    <div v-else h-full>
      <div flex mt-3 h-full pb8>
        <div flex-1 relative overflow-x-scroll>
          <div absolute inset-0 overflow-hidden>
            <div flex justify-between>
              <h2 font-semibold text-lg>
                History
              </h2>
              <Button text plain icon="true" @click="sidebar = !sidebar">
                <div v-if="sidebar" i-tabler-chevron-right />
                <div v-else i-tabler-info-square-rounded />
              </Button>
            </div>

            <div mt-3>
              <Skeleton v-if="pending" height="10rem" width="100%" />

              <div v-else class="min-w-[100px]" flex flex-col divide-y divide-white divide-opacity-10>
                <div v-for="txn in data?.transactions" :key="txn.id" flex justify-between p2 py4>
                  <span>{{ txn.data.user }}</span>
                  <span>{{ txn.data.delta }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Transition>
          <div v-if="sidebar" flex items-start overflow-hidden min-w-md h-full>
            <Divider layout="vertical" />

            <div w-full p-3>
              <Skeleton v-if="pending" height="3rem" width="100%" />

              <div v-else>
                <div flex justify-between items-center>
                  <span>Points</span>
                  <Button icon="true" text size="small" @click="formData.modalVisible = true">
                    {{ data?.points }}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <Dialog v-model:visible="formData.modalVisible" modal header="Edit points" :style="{ width: '50vw' }">
          <InputNumber v-model="formData.points" type="number" />
        </Dialog>
      </div>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: width 0.2s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  width: 0;
}
</style>
