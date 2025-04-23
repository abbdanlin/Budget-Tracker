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
                        <div class="row q-col-gutter-sm q-mb-sm">
                            <div class="col">
                                <div class="">Total Bank Balance:</div>
                            </div>
                            <div class="col">
                                <div class="" :class="useAmountColorClass(totalNegative)">
                                    £{{ totalNegative }}
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

                <!-- Third Column: Another Chart -->
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

            <!-- Row 2 -->
            <div class="row q-col-gutter-md q-mb-md">
                <div class="col">
                    <div class="box inner-box">Box 1</div>
                </div>
                <div class="col">
                    <div class="box inner-box">Box 2</div>
                </div>
            </div>

            <!-- Row 3 -->
            <div class="row q-col-gutter-md">
                <div class="col">
                    <div class="box inner-box">Box 1</div>
                </div>
                <div class="col">
                    <div class="box inner-box">Box 2</div>
                </div>
            </div>

        </div>
    </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { LocalStorage } from 'quasar'
import { Doughnut } from 'vue-chartjs'
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
    Filler
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
    Filler
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

/* All inner-box elements will now have a red background */
.inner-box {
    background-color: rgb(248, 248, 248);
    /* Red background for all .inner-box elements */
    padding: 0.5rem;
    border-radius: 8px;
    border-color: rgb(214, 214, 214);
    border: 0.5rem;
    text-align: center;
}

.backround {
    background-color: rgb(231, 231, 231);
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