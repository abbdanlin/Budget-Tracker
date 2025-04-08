<template>
    <div>
        <Pie :data="chartData" :options="chartOptions" />
    </div>
</template>

<script setup>
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'
import { Pie } from 'vue-chartjs'

// Register the required chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement)

const chartData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
        {
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverOffset: 4,
        },
    ],
}

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Pie Chart Example',
        },
    },
}
</script>