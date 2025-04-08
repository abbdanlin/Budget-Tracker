<template>
    <div class="chart">
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
import { ref } from 'vue'
// Register the required chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement)

const entries = ref([
    {
        id: 'id1',
        name: 'Salary',
        amount: 3000,
        category: 'income'
    },
    {
        id: 'id2',
        name: 'Rent',
        amount: -999,
        category: 'housing'
    },
    {
        id: 'id3',
        name: 'Vr-headset',
        amount: 24.99,
        category: 'tech'
    },
    {
        id: 'id4',
        name: 'Phone',
        amount: -14.99,
        category: 'tech'
    },
    {
        id: 'id5',
        name: 'Unknown',
        amount: -2.99,
        category: 'unknown'
    },
    {
        id: 'id6',
        name: 'Buss ticket',
        amount: -4.95,
        category: 'transportation'
    },
    {
        id: 'id7',
        name: 'Unknown',
        amount: 0,
        category: 'unknown'
    },
    {
        id: 'id8',
        name: 'Subway',
        amount: -14.95,
        category: 'food'
    },
])

// Extracting the data and ids for the chart
const chartData = {
    labels: entries.value.map(entry => entry.id), // Use IDs as labels
    datasets: [
        {
            label: 'Amounts',
            data: entries.value.map(entry => entry.amount), // Use amounts for data points
            backgroundColor: entries.value.map(entry => {
                // Color based on category (example, modify according to your need)
                switch (entry.category) {
                    case 'income':
                        return '#FF6384'
                    case 'housing':
                        return '#36A2EB'
                    case 'tech':
                        return '#FFCE56'
                    case 'transportation':
                        return '#FF5733'
                    case 'food':
                        return '#4CAF50'
                    default:
                        return '#9E9E9E'
                }
            }),
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
            text: 'Income and Expenses Breakdown',
        },
    },
}
</script>

<style>
.chart {
    margin-top: 5%;
    margin-left: 6.5%;
}
</style>