<template>
    <div class="chart">
        <Pie :data="chartData" :options="chartOptions" />
    </div>
    <div class="chart">
        <Line :data="lineChartData" :options="lineChartOptions" />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { LocalStorage } from 'quasar'

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    PointElement,
    LineController,
    CategoryScale,
    LinearScale,
    TimeScale
} from 'chart.js'

// date‑fns adapter for the time scale
import 'chartjs-adapter-date-fns'

import { Pie, Line } from 'vue-chartjs'

// --- 1. Register everything just once ---
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    PointElement,
    LineController,
    CategoryScale,
    LinearScale,
    TimeScale
)

const entries = ref([])

onMounted(() => {
    entries.value = LocalStorage.getItem('entries') || []
})

// --- 2. Pie chart setup ---
const chartData = computed(() => ({
    labels: entries.value.map(e => e.name),
    datasets: [
        {
            label: 'Amounts',
            data: entries.value.map(e => e.amount),
            backgroundColor: entries.value.map(e =>
                e.amount >= 0 ? '#4CAF50' : '#F44336'
            ),
            hoverOffset: 4
        }
    ]
}))

const chartOptions = {
    responsive: true,
    plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Income and Expenses Breakdown' }
    }
}

// --- 3. Line chart with time scale ---
const lineChartData = computed(() => ({
    datasets: [
        {
            label: 'Amount Over Time',
            data: entries.value.map(e => ({
                x: new Date(e.date),       // fix: parse date
                y: Number(e.amount)        // fix: convert to number
            })),
            fill: true,
            tension: 0.3,
            pointBackgroundColor: '#42A5F5',
            pointBorderColor: '#fff',
            pointRadius: 5,
            backgroundColor: 'rgba(66, 165, 245, 0.2)',
            borderColor: '#42A5F5'
        }
    ]
}))

const lineChartOptions = {
    responsive: true,
    scales: {
        x: {
            type: 'time',
            time: {
                // **Use lowercase tokens** for date-fns:
                parser: 'yyyy-MM-dd',
                unit: 'day',
                displayFormats: {
                    day: 'dd/MM-yy'
                }
            },
            title: { display: true, text: 'Date' }
        },
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Transaction Trend' }
    }
}
onMounted(() => {
    const stored = LocalStorage.getItem('entries') || []
    console.log('Parsed entries:', stored)
    stored.forEach(e => {
        console.log(`Parsed: ${e.name}, Date: ${e.date}, Amount: ${Number(e.amount)}`)
    })
    entries.value = stored
})
</script>

<style>
.chart {
    margin-top: 5%;
    margin-left: 6.5%;
}
</style>