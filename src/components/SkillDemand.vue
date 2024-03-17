<script setup lang="ts">
import { Chart as ChartJS, registerables } from 'chart.js'
import { Line } from 'vue-chartjs'
import { onMounted, reactive } from 'vue'

ChartJS.register(...registerables)

const fetchData = async () => {
  const res = await fetch('/api/processSkills')
  const skills = await res.json()

  console.log(skills)
  return skills
}

const chartData = reactive({ labels: [], datasets: [] });
const skillMap = reactive({});

onMounted(async () => {
  const originalData = (await fetchData()).skillsData

  console.log(originalData)
  

  originalData.forEach(dataPoint => {
    chartData.labels.push(dataPoint.date)
  })

  chartData.labels = chartData.labels.reverse().slice(30)

  // Extract dates and initialize skill map
  for (const dataPoint of originalData) {
      for (const skill of dataPoint.skills) {
          if (!skillMap[skill.name]) {
              skillMap[skill.name] = Array(chartData.labels.length).fill(0); // Initialize as empty arrays
          }
      }
  }

  // Populate skill data
  for (const dataPoint of originalData) {
      const dateIndex = chartData.labels.indexOf(dataPoint.date);

      for (const skill of dataPoint.skills) {
          skillMap[skill.name][dateIndex] = skill.count;
      }
  }

  // Create datasets (unchanged)
  for (const skillName in skillMap) {
      chartData.datasets.push({
          label: skillName[0].toUpperCase().concat(skillName.slice(1,skillName.length)),
          data: skillMap[skillName]
      });
  }
})

console.log(chartData, skillMap)

const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true // Start the y-axis at 0
    }
  },
}
</script>

<template>
    <Line :options="options" :data="{...chartData, datasets: chartData.datasets.slice(0,6)}" />
</template>