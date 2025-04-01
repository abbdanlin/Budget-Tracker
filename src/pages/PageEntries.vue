<template>
  <q-page class="">
    <div class="q-pa-md" style="">
      <q-list bordered separator>
        <q-slide-item v-for="entry in entries" :key="entry.id" @left="onLeft" @right="onEntrySlideRight left - color="
          positive" right-color="negative">
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
          Balance
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
          <q-input v-model="addEntryForm.amount" input-class="text-right" placeholders="Amount" bg-color="white"
            type="number" step="0.01" outlined dense />
        </div>
        <div class="col col-auto">
          <q-btn color="primary" icon="add" type="submit" round />
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
import { uid } from 'quasar'

const entries = ref([
  {
    id: 'id1',
    name: 'Salary',
    amount: 5000
  },
  {
    id: 'id2',
    name: 'Rent',
    amount: -999
  },
  {
    id: 'id3',
    name: 'Phone',
    amount: -14.99
  },
  {
    id: 'id4',
    name: 'Unknown',
    amount: 0
  },
])

const balance = computed(() => {
  return entries.value.reduce((accumulator, { amount }) => {
    return accumulator + (Number(amount) || 0);
  }, 0);
});

const nameRef = ref(null)

const addEntryForm = reactive({
  name: '',
  amount: null
})

const addEntryFormReset = () => {
  addEntryForm.name = ''
  addEntryForm.amount = null
  nameRef.value.focus()
}

const addEntry = () => {
  const newEntry = {
    id: uid(),
    name: addEntryForm.name,
    amount: addEntryForm.amount
  }
  entries.value.push(newEntry)
  addEntryFormReset()
}
const onEntrySlideRight = () => {
  console.log('right')
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

</script>
<style>
.bg-foter {
  background-color: #010038;
}
</style>