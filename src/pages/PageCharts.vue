<template>
    <q-page class="q-pa-md flex flex-center">
        <div class="column items-center" style="max-width: 1000px; width: 100%;">
            <!-- Doughnut Chart with Summary Box -->
            <div class="chart full-width q-mb-md" style="position: relative;">
                <Doughnut :data="doughnutChartData" :options="doughnutChartOptions" class="full-width" />
                <div class="summary-box">
                    <div class="summary-text">{{ totalAmount + '£' }}</div>
                    <div class="summary-label">Summary</div>
                </div>
            </div>

            <!-- Pie Chart -->
            <div class="chart full-width q-mb-md">
                <Pie :data="chartData" :options="chartOptions" class="full-width" />
            </div>

            <!-- Line Chart -->
            <div class="chart full-width q-mb-md">
                <Line :data="lineChartData" :options="lineChartOptions" class="full-width" />
            </div>

            <!-- Bar Chart at the Bottom -->
            <div class="chart full-width">
                <Bar :data="barChartData" :options="barChartOptions" class="full-width" />
            </div>
        </div>
    </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { LocalStorage } from 'quasar'

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    PointElement,
    BarElement,       // ✅ Import BarElement
    LineController,
    BarController,    // ✅ Import BarController
    CategoryScale,
    LinearScale,
    TimeScale,
    Filler
} from 'chart.js'

import 'chartjs-adapter-date-fns'

import { Pie, Line, Doughnut, Bar } from 'vue-chartjs'

// ✅ Register all chart components, including Bar
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    BarElement,       // ✅ Register
    PointElement,
    LineController,
    BarController,    // ✅ Register
    CategoryScale,
    LinearScale,
    TimeScale,
    Filler
)

const entries = ref([])

onMounted(() => {
    entries.value = LocalStorage.getItem('entries') || []
})

// Doughnut Chart
const doughnutChartData = computed(() => ({
    labels: entries.value.map(e => e.name),
    datasets: [
        {
            label: 'Amounts',
            data: entries.value.map(e => e.amount),
            backgroundColor: entries.value.map(e =>
                e.amount >= 0 ? '#81C784' : '#E57373'
            ),
            hoverOffset: 6
        }
    ]
}))

const doughnutChartOptions = {
    responsive: true,
    cutout: '60%',
    plugins: {
        legend: { position: 'bottom' },
        title: { display: true, text: 'Doughnut: Income vs Expenses' }
    }
}

const totalAmount = computed(() =>
    entries.value.reduce((acc, { amount }) => acc + Number(amount), 0).toFixed(2)
)

// Pie Chart
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

// Line Chart
const lineChartData = computed(() => {
    const sortedEntries = [...entries.value].sort((a, b) => new Date(a.date) - new Date(b.date))

    return {
        datasets: [
            {
                label: 'Amount Over Time',
                data: sortedEntries.map(e => ({
                    x: new Date(e.date),
                    y: Number(e.amount)
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
    }
})

const lineChartOptions = {
    responsive: true,
    scales: {
        x: {
            type: 'time',
            time: {
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

// Bar Chart
const barChartData = computed(() => ({
    labels: entries.value.map(e => e.name),
    datasets: [
        {
            label: 'Amount',
            data: entries.value.map(e => e.amount),
            backgroundColor: entries.value.map(e =>
                e.amount >= 0 ? '#64B5F6' : '#E57373'
            )
        }
    ]
}))

const barChartOptions = {
    responsive: true,
    plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Bar Chart: Amounts per Entry' }
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
}
</script>

<style>
.chart {
    margin-top: 5%;
    margin-left: 6.5%;
    position: relative;
}

.summary-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    font-size: 18px;
    font-weight: bold;
}

.summary-label {
    font-size: 14px;
    color: #fff;
}

.summary-text {
    font-size: 3rem;
    color: #42A5F5;
}

@media (max-width: 768px) {
    .summary-text {
        font-size: 1.5rem;
    }
}

@media (max-width: 480px) {
    .summary-text {
        font-size: 1.2rem;
    }
}
</style>