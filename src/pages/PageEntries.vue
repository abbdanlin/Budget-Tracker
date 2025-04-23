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
                <q-item-section class="catText">
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
    </q-footer>
  </q-page>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useCurrencify } from 'src/use/useCurrencify'
import { useAmountColorClass } from 'src/use/useAmountColorClass'
import { uid, useQuasar } from 'quasar'
import { onMounted } from 'vue'
import { LocalStorage } from 'quasar'
import { date as $date } from 'quasar'

import fs from 'fs'
import path from 'path'
import draggable from 'vuedraggable'

const formatDate = (val) => {
  if (!val) return ''
  return $date.formatDate(val, 'DD/MM-YY')
}

const $q = useQuasar()


const entries = ref([

])

const balance = computed(() => {
  return entries.value.reduce((accumulator, { amount }) => {
    return accumulator + (Number(amount) || 0);
  }, 0);
});

const nameRef = ref(null)
const categoryRef = ref(null)

const addEntryForm = reactive({
  name: '',
  amount: null,
  category: '',
  date: ''
})

const saveEntriesToStorage = () => {
  LocalStorage.set('entries', entries.value)
}


const addEntryFormReset = () => {
  addEntryForm.name = ''
  addEntryForm.category = '',
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
  reset();

  $q.dialog({
    title: 'Delete',
    message: `
      <div>Would you really like to delete it?</div>
      <div class="q-mt-md text-weight-bold ${useAmountColorClass(entry.amount)}">
        Rent ${entry.name} : ${useCurrencify(entry.amount)}
      </div>
    `,
    html: true,
    persistent: true,
    ok: {
      label: 'Delete',
      color: 'negative',
      noCaps: true
    },
    cancel: {
      color: 'primary',
      noCaps: true
    }
  }).onOk(() => {
    deleteEntry(entry.id);
  }).onCancel(() => {
    reset();
  });
};

const onLeft = ({ reset }, entry) => {
  // Example action on swipe left
  $q.notify({
    color: 'info',
    message: `Swiped left on: ${entry.name}`
  });

  reset();
};

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
  if (stored) {
    entries.value = stored
  }
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