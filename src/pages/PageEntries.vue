<template>
  <q-page class="">
    <div class="q-pa-md" style="">
      <q-list bordered separator>
        <q-slide-item v-for="entry in entries" :key="entry.id" @left="onLeft" @right="onEntrySlideRight($event, entry)"
          left-color="positive" right-color="negative">
          <!-- <template v-slot:left>
            <q-icon name="done" />
          </template> -->
          <template v-slot:right>
            <q-icon name="delete" />
          </template>
          <q-item>
            <q-item-section class="text-weight-bold" :class="useAmountColorClass(entry.amount)">
              {{ entry.name }}
            </q-item-section>

            <q-item-section class="catText">
              {{ entry.category }}
            </q-item-section>

            <q-item-section side class="text-weight-bold" :class="useAmountColorClass(entry.amount)">
              {{ useCurrencify(entry.amount) }}
            </q-item-section>
          </q-item>
        </q-slide-item>
      </q-list>
    </div>
    <q-footer class="bg-transparent">
      <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3">
        <div class="col text-grey-7 text-h6">
          Total Balance
        </div>
        <div :class="useAmountColorClass(balance)" class="col text-h6 text-right">
          {{ useCurrencify(balance) }}
        </div>
      </div>
      <q-form @submit="addEntry" class="row q-px-sm q-pb-sm q-col-gutter-sm bg-foter">
        <div class="col">
          <q-input v-model="addEntryForm.name" ref="nameRef" placeholder="Name" bg-color="white" outlined dense />
        </div>
        <div class="col">
          <q-input v-model="addEntryForm.category" ref="categoryRef" placeholder="category" bg-color="white" outlined
            dense />
        </div>
        <div class="col">
          <q-input v-model="addEntryForm.amount" input-class="text-right" placeholders="Amount" bg-color="white"
            type="number" step="0.01" outlined dense />
        </div>
        <div class="col col-auto">
          <q-btn color="primary" icon="add" type="submit" round @click="saveEntriesToFile" />
        </div>
      </q-form>
    </q-footer>
  </q-page>
</template>

<script setup>
// import { useRouter } from 'vue-router'

// const router = useRouter()

// const goTo = () => {
//   router.go(-1)
//   router.push('/')

// }

/* 
 imports
/* 

import { ref } from 'vue'

/*
entries
*/

// import { fasZ } from '@quasar/extras/fontawesome-v6'
import { ref, computed, reactive } from 'vue'
import { useCurrencify } from 'src/use/useCurrencify'
import { useAmountColorClass } from 'src/use/useAmountColorClass'
import { uid, useQuasar } from 'quasar'

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
  category: ''
})

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
    amount: addEntryForm.amount
  }
  entries.value.push(newEntry)
  addEntryFormReset()
}
const onEntrySlideRight = ({ reset }, entry) => {
  reset(); // Correct way to call reset

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

const deleteEntry = (entryId) => {
  const index = entries.value.findIndex(entry => entry.id === entryId)
  entries.value.splice(index, 1)
}
// function currencyFormat(amount) {
//   if (typeof amount !== 'number') return '';

//   let posNegSymbol = amount < 0 ? '-' : '+';
//   const currencySymbol = '£';

//   const amountFormatted = Math.abs(amount).toLocaleString('en-US', {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2
//   });

//   return `${posNegSymbol} ${currencySymbol} ${amountFormatted}`;
// }

// Example of using the function
// console.log(currencyFormat(4999.99));  // Output: "+ £ 4,999.99"
// console.log(currencyFormat(-999.00));  // Output: "- £ 999.00"

import fs from 'fs'
import path from 'path'

const saveEntriesToFile = () => {
  const dataStr = JSON.stringify(entries.value, null, 2)
  const filePath = path.resolve(__dirname, '../storage/entries.json') // Adjust path as needed

  fs.writeFile(filePath, dataStr, 'utf8', (err) => {
    if (err) {
      console.error('Error saving file:', err)
    } else {
      console.log('File saved successfully to', filePath)
    }
  })
}
</script>
<style>
.bg-foter {
  background-color: #010038;
}

.catText {
  font: grey;
}
</style>