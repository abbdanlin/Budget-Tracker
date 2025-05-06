<template>
    <q-page class="q-pa-md backround">
        <div class="column">

            <!-- First Row -->
            <div class="row q-col-gutter-md q-mb-md">
                <!-- First Column (Wider) -->
                <div class="col-6">
                    <div class="box inner-box">
                        <!-- Row 1: Positive Income -->
                        <div class="row q-col-gutter-sm q-mb-sm">
                            <div class="col">
                                <div class=""></div>
                            </div>
                            <div class="col">
                                <div class="" :class="useAmountColorClass(totalPositive)">
                                    £{{ totalPositive }}
                                </div>
                            </div>
                        </div>

                        <!-- Row 2: Negative Expenses -->
                        <div class="row q-col-gutter-sm q-m-sm">
                            <div class="col">
                                <div class="boldText">Total Bank Balance:</div>
                            </div>
                            <div class="col">
                                <div class="" :class="useAmountColorClass(totalNegative)">
                                    £{{ totalNegative }}
                                </div>
                            </div>
                        </div>
                        <div class="row q-col-gutter-sm q-mb-sm">
                            <div class="col">
                                <div class="inner-box"></div>
                            </div>
                            <div class="col">
                                <div class="inner-box">
                                    ______________________
                                </div>
                            </div>
                        </div>

                        <!-- Row 3: Net Balance -->
                        <div class="row q-col-gutter-sm q-mb-sm">
                            <div class="col">
                                <div class="inner-box"></div>
                            </div>
                            <div class="col">
                                <div class="inner-box" :class="useAmountColorClass(netAmount)">
                                    £{{ netAmount }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Second Column: Doughnut Chart -->
                <div class="col">
                    <div class="box chart full-width inner-box">
                        <Doughnut :data="doughnutChartData" :options="doughnutChartOptions" />
                        <div class="summary-box">
                            <div class="summary-text">£{{ totalAmount }}</div>
                            <div class="summary-label">Summary</div>
                        </div>
                    </div>
                </div>

                <!-- Third Column: Another Doughnut -->
                <div class="col">
                    <div class="box chart full-width inner-box">
                        <Doughnut :data="doughnutChartData" :options="doughnutChartOptions" />
                        <div class="summary-box">
                            <div class="summary-text">£{{ totalAmount }}</div>
                            <div class="summary-label">Summary</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Row 2: Line Chart and Top Spenders Side by Side (Top Spenders on the Left) -->
            <div class="row q-col-gutter-md q-mb-md">
                <!-- Top Spenders (Left Column) -->
                <div class="col-4">
                    <div class="box inner-box">
                        <!-- Row 1: Top Spenders -->
                        <div class="row q-mb-sm">
                            <div class="col">
                                <div class="cell boldText">Top Spenders</div>
                            </div>
                        </div>

                        <!-- Row 2: Entertainment -->
                        <div class="row q-mb-sm">
                            <div class="col-auto icon-circle">
                                <q-icon name="theaters" size="md" color="purple" />
                            </div>
                            <div class="col">
                                <div class="cell">Entertainment</div>
                            </div>
                        </div>

                        <!-- Row 3: Food -->
                        <div class="row q-mb-sm">
                            <div class="col-auto icon-circle">
                                <q-icon name="restaurant" size="md" color="orange" />
                            </div>
                            <div class="col">
                                <div class="cell">Food</div>
                            </div>
                        </div>

                        <!-- Row 4: Fuel -->
                        <div class="row">
                            <div class="col-auto icon-circle">
                                <q-icon name="local_gas_station" size="md" color="red" />
                            </div>
                            <div class="col">
                                <div class="cell">Fuel</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Line Chart (Right Column) -->
                <div class="col-8">
                    <div class="box chart inner-box">
                        <Line :data="lineChartData" :options="lineChartOptions" />
                    </div>
                </div>
            </div>

            <!-- Row 3: Bar and Pie Charts -->
            <div class="row q-col-gutter-md">
                <div class="col">
                    <div class="box chart inner-box">
                        <Bar :data="barChartData" :options="barChartOptions" />
                    </div>
                </div>
                <div class="col">
                    <div class="box chart inner-box scale-3">
                        <Pie :data="chartData" :options="chartOptions" />
                    </div>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { LocalStorage } from 'quasar'
import { Doughnut, Pie, Line, Bar } from 'vue-chartjs'
import { useAmountColorClass } from 'src/use/useAmountColorClass'

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
    TimeScale,
    Filler,
    BarElement,
    BarController
} from 'chart.js'

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
    TimeScale,
    Filler,
    BarElement,
    BarController
)

const entries = ref([])

onMounted(() => {
    entries.value = LocalStorage.getItem('entries') || []
})

const totalPositive = computed(() =>
    entries.value
        .filter(e => Number(e.amount) > 0)
        .reduce((acc, e) => acc + Number(e.amount), 0)
        .toFixed(2)
)

const totalNegative = computed(() =>
    entries.value
        .filter(e => Number(e.amount) < 0)
        .reduce((acc, e) => acc + Number(e.amount), 0)
        .toFixed(2)
)

const netAmount = computed(() =>
    (Number(totalPositive.value) + Number(totalNegative.value)).toFixed(2)
)

const totalAmount = computed(() =>
    entries.value.reduce((acc, e) => acc + Number(e.amount), 0).toFixed(2)
)

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

const lineChartData = computed(() => ({
    labels: entries.value.map((e, index) => `Entry ${index + 1}`),
    datasets: [
        {
            label: 'Net Flow Over Time',
            data: entries.value.map(e => Number(e.amount)),
            fill: true,
            borderColor: '#42A5F5',
            backgroundColor: 'rgba(66, 165, 245, 0.2)',
            tension: 0.4,
        }
    ]
}))

const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Total Income and Outcome' }
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
}

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
    position: relative;
    margin-top: 5%;
}

.summary-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
}

.summary-text {
    font-size: 3rem;
    color: #42A5F5;
}

.summary-label {
    font-size: 14px;
    color: #fff;
}

.inner-box {
    background-color: rgb(248, 248, 248);
    padding: 0.5rem;
    border-radius: 8px;
    border-color: rgb(214, 214, 214);
    border: 0.5rem;
    text-align: center;
}

.backround {
    background-color: rgb(231, 231, 231);
}

.boldText {
    font-weight: bold;
}

.scale-3 {
    width: 5wv;
    height: 5wv;
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

.cell {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    background-color: #f9f9f9;
    border-radius: 6px;
    font-size: 0.95rem;
    min-height: 40px;
}

.boldText {
    font-weight: bold;
    font-size: 1rem;
}

.icon-circle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: #272727;
    border-radius: 50%;
    margin-right: 10px;
}
</style>