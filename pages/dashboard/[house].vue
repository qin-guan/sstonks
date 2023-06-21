<script setup lang="ts">
import Toast from 'primevue/toast'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Divider from 'primevue/divider'
import Skeleton from 'primevue/skeleton'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import Dialog from 'primevue/dialog'
import { useToast } from 'primevue/usetoast'
import { setHousePoints } from '~/composables/house'

definePageMeta({
  layout: 'dash',
})

const sidebar = ref(true)

const toast = useToast()
const route = useRoute()
const db = useFirestore()
const { data, pending, refresh, error } = useHouse(db, route.params.house as string)

const formData = reactive({
  points: 0,
  pending: false,
  modalVisible: false,
})

watch(pending, (value, oldValue) => {
  if (oldValue && !value)
    formData.points = data.value?.points ?? 0
})

async function savePoints() {
  formData.pending = true
  try {
    await setHousePoints(db, route.params.house as string, formData.points)
    await refresh()
  }
  catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: JSON.stringify(err),
    })
  }
  formData.pending = false
  formData.modalVisible = false
}
</script>

<template>
  <div p-3 h-full px3 md:px10 lg:px15>
    <Toast />
    <div v-if="error">
      {{ error }}
    </div>
    <div v-else h-full flex flex-col>
      <Button icon="true" plain text size="small" self-end @click="sidebar = !sidebar">
        <div v-if="sidebar" i-tabler-chevron-right />
        <div v-else i-tabler-chevron-left />
      </Button>
      <div flex mt-3 h-full pb8>
        <div flex-1 flex flex-col>
          <h2 font-semibold text-lg>
            History
          </h2>
          <CommonScrollArea horizontal>
            <div mt-3 min-w-xs>
              <Skeleton v-if="pending" height="10rem" width="100%" />

              <DataTable v-else :value="data?.transactions">
                <Column field="data.user" header="User" />
                <Column field="data.delta" header="Delta" />
              </DataTable>
            </div>
          </CommonScrollArea>
        </div>

        <Transition>
          <div v-if="sidebar" flex items-start overflow-hidden w-sm h-full>
            <Divider layout="vertical" />

            <div w-full p-3>
              <Skeleton v-if="pending" height="3rem" width="100%" />

              <div v-else>
                <div flex justify-between items-center>
                  <span>Points</span>

                  <Button :label="`${data?.points}`" text @click="formData.modalVisible = true" />
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <Dialog v-model:visible="formData.modalVisible" modal header="Edit points">
          <InputNumber id="points" v-model="formData.points" />
          <template #footer>
            <Button label="Save" :loading="formData.pending" @click="savePoints" />
          </template>
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
