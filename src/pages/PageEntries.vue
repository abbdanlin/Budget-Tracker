<template>
  <q-page class="">
    <div class="q-pa-md">
      <q-list bordered separator>
        <draggable v-model="entries" item-key="id" animation="200" handle=".drag-handle" @end="saveEntriesToStorage">
          <template #item="{ element: entry }">
            <q-slide-item @left="(event) => onLeft(event, entry)" @right="(event) => onEntrySlideRight(event, entry)"
              left-color="positive" right-color="negative">
              <template v-slot:right>
                <q-icon name="delete" />
              </template>
              <q-item>
                <q-item-section avatar class="drag-handle cursor-move">
                  <q-icon name="drag_indicator" />
                </q-item-section>
                <q-item-section class="text-weight-bold" :class="useAmountColorClass(entry.amount)">
                  {{ entry.name }}
                </q-item-section>
                <q-item-section :class="['catText', categoryColorClass(entry.category)]">
                  {{ entry.category }}
                </q-item-section>

                <q-item-section side class="text-grey">
                  {{ formatDate(entry.date) }}
                </q-item-section>
                <q-item-section side class="text-weight-bold" :class="useAmountColorClass(entry.amount)">
                  {{ useCurrencify(entry.amount) }}
                </q-item-section>
              </q-item>
            </q-slide-item>
          </template>
        </draggable>
      </q-list>
    </div>

    <q-footer class="bg-transparent">
      <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3">
        <div class="col text-grey-7 text-h6">Total Balance</div>
        <div :class="useAmountColorClass(balance)" class="col text-h6 text-right">
          {{ useCurrencify(balance) }}
        </div>
      </div>

      <q-form @submit="addEntry" class="row q-px-sm q-pb-sm q-col-gutter-sm bg-foter">
        <div class="col">
          <q-input v-model="addEntryForm.name" ref="nameRef" placeholder="Name" bg-color="white" outlined dense />
        </div>
        <div class="col">
          <q-input v-model="addEntryForm.category" ref="categoryRef" placeholder="Category" bg-color="white" outlined
            dense />
        </div>
        <div class="col">
          <q-input v-model="addEntryForm.amount" input-class="text-right" placeholder="Amount" bg-color="white"
            type="number" step="0.01" outlined dense />
        </div>
        <q-input v-model="addEntryForm.date" label="Select Date" readonly outlined dense bg-color="white">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer" />
          </template>
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="addEntryForm.date" />
          </q-popup-proxy>
        </q-input>

        <div class="col col-auto">
          <q-btn color="primary" icon="add" type="submit" round @click="saveEntriesToFile" />
        </div>
      </q-form>

      <!-- AI-rådgivare -->
      <q-form @submit.prevent="askAI">
        <div class="row q-gutter-sm q-mt-md">
          <div class="col">
            <q-input v-model="aiQuestion" label="Fråga din AI-rådgivare" outlined dense />
          </div>
          <div class="col-auto">
            <q-btn icon="send" color="primary" @click="askAI" />
          </div>
        </div>
        <div v-if="aiAnswer" class="q-mt-sm bg-grey-2 q-pa-sm">
          <div class="text-bold">AI Svar:</div>
          <div>{{ aiAnswer }}</div>
        </div>
      </q-form>
    </q-footer>
  </q-page>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useCurrencify } from 'src/use/useCurrencify'
import { useAmountColorClass } from 'src/use/useAmountColorClass'
import { uid, useQuasar, LocalStorage, date as $date } from 'quasar'
import draggable from 'vuedraggable'
import axios from 'axios'
import fs from 'fs'
import path from 'path'

const $q = useQuasar()

const entries = ref([])

const formatDate = (val) => {
  if (!val) return ''
  return $date.formatDate(val, 'DD/MM-YY')
}

const balance = computed(() =>
  entries.value.reduce((acc, { amount }) => acc + (Number(amount) || 0), 0)
)

const nameRef = ref(null)
const categoryRef = ref(null)

const addEntryForm = reactive({
  name: '',
  amount: null,
  category: '',
  date: ''
})

const aiQuestion = ref('')
const aiAnswer = ref('')

const askAI = async () => {
  try {
    const res = await axios.post('http://localhost:3000/ask-advisor', {
      question: aiQuestion.value
    })
    aiAnswer.value = res.data.answer
  } catch {
    $q.notify({ type: 'negative', message: 'AI-förfrågan misslyckades' })
  }
}

const saveEntriesToStorage = () => {
  LocalStorage.set('entries', entries.value)
}

const addEntryFormReset = () => {
  addEntryForm.name = ''
  addEntryForm.category = ''
  addEntryForm.amount = null
  nameRef.value.focus()
}

const addEntry = () => {
  const newEntry = {
    id: uid(),
    name: addEntryForm.name,
    category: addEntryForm.category,
    amount: addEntryForm.amount,
    date: addEntryForm.date
  }
  entries.value.push(newEntry)
  saveEntriesToStorage()
  addEntryFormReset()
}

const onEntrySlideRight = ({ reset }, entry) => {
  reset()
  $q.dialog({
    title: 'Delete',
    message: `
      <div>Vill du ta bort detta?</div>
      <div class="q-mt-md text-weight-bold ${useAmountColorClass(entry.amount)}">
        ${entry.name} : ${useCurrencify(entry.amount)}
      </div>
    `,
    html: true,
    persistent: true,
    ok: { label: 'Delete', color: 'negative', noCaps: true },
    cancel: { color: 'primary', noCaps: true }
  }).onOk(() => deleteEntry(entry.id))
}

const onLeft = ({ reset }, entry) => {
  $q.notify({
    color: 'info',
    message: `Swiped left on: ${entry.name}`
  })
  reset()
}

const categoryColorClass = (category) => {
  switch (category?.toLowerCase()) {
    case 'mat':
      return 'text-green-8';
    case 'transport':
      return 'text-blue-8';
    case 'nöje':
      return 'text-orange-8';
    case 'hyra':
      return 'text-red-8';
    case 'lön':
      return 'text-teal-8';
    default:
      return 'text-grey';
  }
}

const deleteEntry = (entryId) => {
  const index = entries.value.findIndex(entry => entry.id === entryId)
  entries.value.splice(index, 1)
  saveEntriesToStorage()
}

const saveEntriesToFile = () => {
  const dataStr = JSON.stringify(entries.value, null, 2)
  const filePath = path.resolve(__dirname, '../storage/entries.json')
  fs.writeFile(filePath, dataStr, 'utf8', (err) => {
    if (err) {
      console.error('Error saving file:', err)
    } else {
      console.log('File saved successfully to', filePath)
    }
  })
}

onMounted(() => {
  const stored = LocalStorage.getItem('entries')
  if (stored) entries.value = stored
})
</script>

<style>
.bg-foter {
  background-color: #010038;
}

.catText {
  font: grey;
}
</style>