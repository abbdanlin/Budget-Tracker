<!-- <template>
    <q-page>
      <q-form @submit.prevent="addEntry" class="row q-px-sm q-pb-sm q-col-gutter-sm bg-foter">
        <div class="col">
          <q-input v-model="addEntryForm.name" ref="nameRef" placeholder="Name" bg-color="white" outlined dense />
        </div>
        <div class="col">
          <q-input v-model="addEntryForm.category" ref="categoryRef" placeholder="Category" bg-color="white" outlined dense />
        </div>
        <div class="col">
          <q-input v-model="addEntryForm.amount" input-class="text-right" placeholder="Amount" bg-color="white" type="number" step="0.01" outlined dense />
        </div>
        <div class="col col-auto">
          <q-btn color="primary" icon="add" type="submit" round />
        </div>
      </q-form>
      <div class="q-pa-md">
        <q-list bordered separator>
          <q-item v-for="entry in globalState.entries" :key="entry.id">
            <q-item-section class="text-weight-bold">
              {{ entry.name }}
            </q-item-section>
            <q-item-section class="catText">
              {{ entry.category }}
            </q-item-section>
            <q-item-section side class="text-weight-bold">
              {{ entry.amount }}
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-page>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  import { globalState } from 'src/store/globalState';  
  

  const nameRef = ref(null);
  const categoryRef = ref(null);
  const addEntryForm = reactive({
    name: '',
    amount: null,
    category: ''
  });
  

  const addEntryFormReset = () => {
    addEntryForm.name = '';
    addEntryForm.category = '';
    addEntryForm.amount = null;
    nameRef.value.focus();
  };
  

  const addEntry = () => {

    const newEntry = {
      id: `id${globalState.entries.length + 1}`,
      name: addEntryForm.name,
      category: addEntryForm.category,
      amount: addEntryForm.amount
    };
  

    globalState.entries.push(newEntry);
  
  
    addEntryFormReset();
  };
  </script>
  
  <style scoped>
  .bg-foter {
    background-color: #010038;
  }
  
  .catText {
    font: grey;
  }
  </style>
   -->