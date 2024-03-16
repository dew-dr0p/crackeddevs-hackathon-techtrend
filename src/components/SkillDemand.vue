<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar, Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)


const data = {
  labels: ['January', 'February', 'March'],
  datasets: [{ data: [40, 20, 12], label: 'Test Chart' }],
}
const options = {
  responsive: true,
//   fill: false,
//     borderColor: 'rgb(75, 192, 192)',
//     tension: 0.1
}
</script>

<template>
    <Bar :options="options" :data="data" />
    <Line :options="options" :data="data" />
</template>