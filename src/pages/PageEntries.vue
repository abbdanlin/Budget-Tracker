<template>
  <q-page class="">
    <div class="q-pa-md" style="">
      <q-list bordered separator>
        <q-item v-for="entry in entries" :key="entry.id">
          <q-item-section class="text-weight-bold" :class="useAmountColorClass(entry.amount)">
            {{ entry.name }}
          </q-item-section>

          <q-item-section side class="text-weight-bold" :class="useAmountColorClass(entry.amount)">
            {{ useCurrencify(entry.amount) }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <q-footer class="bg-transparent">
      <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3">
        <div class="col text-grey-7 text-h6">
          Balance
        </div>
        <div :class="useAmountColorClass(balance)" class="col text-h6 text-right">
          {{ useCurrencity(balance) }}
        </div>
      </div>
      <div class="row q-px-sm q-pb-sm q-col-gutter-sm bg-foter">
        <div class="col">
          <q-input placeholder="Name" bg-color="white" outlined dense />
        </div>
        <div class="col">
          <q-input input-class="text-right" placeholders="Amount" bg-color="white" type="number" step="0.01" outlined
            dense />
        </div>
        <div class="col col-auto">
          <q-btn color="primary" icon="add" round />
        </div>
      </div>
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
import { ref, computed } from 'vue'
import { useCurrencify } from 'src/use/useCurrencify'
import { useAmountColorClass } from 'src/use/useAmountColorClass'

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
    return accumulator + amount
  }, 0)
})

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