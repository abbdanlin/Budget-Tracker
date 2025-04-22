<template>
    <q-page padding>
        <q-table title="Transaction Overview" :rows="entries" :columns="columns" row-key="id"
            :rows-per-page-options="[5, 10, 25, 0]" :filter="filter" flat bordered>
            <template v-slot:top-right>
                <q-input dense debounce="300" v-model="filter" placeholder="Search...">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>

            <template v-slot:body-cell-amount="props">
                <q-td :props="props" :class="useAmountColorClass(props.row.amount)">
                    {{ useCurrencify(props.row.amount) }}
                </q-td>
            </template>

            <template v-slot:body-cell-date="props">
                <q-td :props="props">
                    {{ formatDate(props.row.date) }}
                </q-td>
            </template>
        </q-table>
    </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { LocalStorage, date as $date } from 'quasar'
import { useCurrencify } from 'src/use/useCurrencify'
import { useAmountColorClass } from 'src/use/useAmountColorClass'

// --- Load entries from storage
const entries = ref([])
onMounted(() => {
    entries.value = LocalStorage.getItem('entries') || []
})

// --- Column definitions
const columns = [
    { name: 'name', label: 'Name', align: 'left', field: 'name', sortable: true },
    { name: 'category', label: 'Category', align: 'left', field: 'category', sortable: true },
    { name: 'amount', label: 'Amount', align: 'right', field: row => Number(row.amount), sortable: true },
    { name: 'date', label: 'Date', align: 'right', field: 'date', sortable: true }
]

// --- Format functions
const formatDate = (val) => {
    if (!val) return ''
    return $date.formatDate(val, 'DD/MM-YY')
}

const filter = ref('')
</script>