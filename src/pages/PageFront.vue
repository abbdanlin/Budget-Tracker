<template>
    <div>
        <q-input v-model="question" label="Ask your financial advisor..." />
        <q-btn label="Ask" @click="askAdvisor" />
        <div v-if="response" class="q-mt-md">
            <q-banner>{{ response }}</q-banner>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const question = ref('');
const response = ref('');

const askAdvisor = async () => {
    const res = await axios.post('http://localhost:3000/ask-advisor', {
        question: question.value,
    });
    response.value = res.data.answer;
};
</script>