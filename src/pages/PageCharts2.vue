<!-- <template>
    <div class="chart">
        <Pie :data="chartData" :options="chartOptions" />
    </div>
</template>

<script setup>
import { Pie } from 'vue-chartjs';
import { reactive } from 'vue';
import { globalState } from 'src/store/globalState';  // Import globalState
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register the required chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

// Chart data using entries from global state
const chartData = reactive({
    labels: globalState.entries.map(entry => entry.id), // Use IDs as labels
    datasets: [
        {
            label: 'Amounts',
            data: globalState.entries.map(entry => entry.amount), // Use amounts for data points
            backgroundColor: globalState.entries.map(entry => {
                switch (entry.category) {
                    case 'income':
                        return '#FF6384';
                    case 'housing':
                        return '#36A2EB';
                    case 'tech':
                        return '#FFCE56';
                    case 'transportation':
                        return '#FF5733';
                    case 'food':
                        return '#4CAF50';
                    default:
                        return '#9E9E9E';
                }
            }),
            hoverOffset: 4,
        },
    ],
});

// Chart options
const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Income and Expenses Breakdown',
        },
    },
};
</script>

<style>
.chart {
    margin-top: 5%;
    margin-left: 6.5%;
}
</style> -->