<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue';
import MainPage from './components/MainPage.vue';


// import {
//   Chart as ChartJS,
//   Title,
//   Tooltip,
//   Legend,
//   BarElement,
//   CategoryScale,
//   LinearScale
// } from 'chart.js'
// import { Bar } from 'vue-chartjs'

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)


// const data = {
//   labels: ['January', 'February', 'March'],
//   datasets: [{ data: [40, 20, 12], label: 'Test Chart' }]
// }
// const options = {
//   responsive: true
// }

// const response = await fetch('/api/jobsData')


</script>

<template>
  <header class="container-base grid grid-flow-col justify-between items-center py-8">
    <PageHeader />
  </header>

  <main>
    <MainPage />
  </main>

  <footer>

  </footer>
</template>