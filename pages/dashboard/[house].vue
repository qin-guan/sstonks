<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Toast from 'primevue/toast'
import Divider from 'primevue/divider'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import Dialog from 'primevue/dialog'
import { useToast } from 'primevue/usetoast'

const sidebar = ref(true)

const toast = useToast()
const route = useRoute()
const { house, txns, setPoints } = useHouse(route.params.house as string)

const formData = reactive({
  points: 0,
  pending: false,
  modalVisible: false,
})

watch(house, (value, oldValue) => {
  if (value?.points && !oldValue?.points)
    formData.points = value.points ?? 0
})

async function savePoints() {
  formData.pending = true
  try {
    await setPoints(formData.points)
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
  <CommonAuthGate>
    <div p-3 h-full px3 md:px10 lg:px15>
      <Toast />
      <div h-full flex flex-col>
        <div flex justify-between>
          <NuxtLink to="/dashboard">
            <Button text size="small">
              &lt; Back to dashboard
            </Button>
          </NuxtLink>
          <Button icon="true" plain text size="small" self-end @click="sidebar = !sidebar">
            <div v-if="sidebar" i-tabler-chevron-right />
            <div v-else i-tabler-chevron-left />
          </Button>
        </div>
        <div flex mt-3 h-full pb8>
          <div flex-1 flex flex-col>
            <h2 font-semibold text-lg>
              History
            </h2>
            <CommonScrollArea horizontal>
              <div mt-3 min-w-xs>
                <DataTable :value="txns">
                  <Column field="user" header="User" />
                  <Column field="delta" header="Delta" />
                  <Column field="timestamp" header="Time" />
                </DataTable>
              </div>
            </CommonScrollArea>
          </div>

          <Transition>
            <div v-if="sidebar" flex items-start overflow-hidden w-sm h-full>
              <Divider layout="vertical" />

              <div w-full p-3>
                <div>
                  <div flex justify-between items-center>
                    <span>Points</span>

                    <Button :label="`${house?.points}`" text @click="formData.modalVisible = true" />
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
  </CommonAuthGate>
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
