<template>
    <q-dialog ref="dialogRef" padding>
        <q-card style="width: 500px">
            <q-card-section>
                <div class="text-h6">Kommentar</div>
                <div class="q-mb-md">
                    <q-input outlined v-model="description" label="Beskrivning" type="textarea" />
                </div>
                <div class="row justify-between q-my-md">
                    <q-btn color="primary" @click="onSubmit">
                        Skicka</q-btn>
                    <q-btn color="primary" flat @click="cancel">Avbryt</q-btn>
                </div>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useDialogPluginComponent } from 'quasar';

const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent();

const description = ref('')

const cancel = async () => {
    onDialogCancel()
};

const onSubmit = async () => {
    onDialogOK(description.value)
}

</script>