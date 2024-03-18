<script setup lang="ts">
import { Chart as ChartJS, registerables } from 'chart.js'
import { Line } from 'vue-chartjs'
import { onMounted, reactive, computed } from 'vue'

ChartJS.register(...registerables)

const fetchData = async () => {
  const res = await fetch('/api/processSkills')
  const skills = await res.json()

  console.log(skills)
  return skills
}

const chartData = reactive({ labels: [] as any[], datasets: [] as any[] });
const skillMap = reactive({} as any);


onMounted(async () => {
  const originalData = (await fetchData()).skillsData

  console.log(originalData)
  

  originalData.forEach((dataPoint: any) => {
    chartData.labels.push(dataPoint.date as any)
  })

  chartData.labels = chartData.labels.reverse().slice(30)

  // Extract dates and initialize skill map
  for (const dataPoint of originalData) {
      for (const skill of dataPoint.skills) {
          if (!(skillMap[skill.name] as { [key: string]: any })) {
              (skillMap[skill.name] as { [key: string]: any}) = Array(chartData.labels.length).fill(0); // Initialize as empty arrays
          }
      }
  }

  // Populate skill data
  for (const dataPoint of originalData) {
      const dateIndex = chartData.labels.indexOf(dataPoint.date as any);

      for (const skill of dataPoint.skills) {
          skillMap[skill.name][dateIndex] = skill.count;
      }
  }

  // Create datasets (unchanged)
  for (const skillName in skillMap) {
      chartData.datasets.push({
          label: skillName[0].toUpperCase().concat(skillName.slice(1,skillName.length)),
          data: skillMap[skillName],
          skillVisibility: false,
      } as any);
  }

  for (let i = 0; i <= 6; i++) {
    chartData.datasets[i].skillVisibility = true
  }
})

console.log(chartData, skillMap)

const options = {
  responsive: true,
  scales: {
    x: { 
      title: { display: true, text: 'Dates' }  
    },
    y: { 
      title: { display: true, text: 'Skill Count'},
      beginAtZero: true // Start the y-axis at 0
    }
  },
  plugins: {
    title: {
      display: true,
      text: 'Skills vs Time' 
    },
    colors: {
      forceOverride: true
    }
  }
}

const filteredChartData = computed(() => {
  return {
    ...chartData, 
    datasets: chartData.datasets.filter(skill => skill.skillVisibility === true)
  }
})
</script>

<template>
    <Line :options="options" :data="filteredChartData" />
    <div class="grid grid-cols-6 justify-center">
      <div v-for="(skill, index) in chartData.datasets" :key="index" class="flex gap-2">
        <input v-model="skill.skillVisibility" type="checkbox" name="skill" :id="`skill[${skill.label.toLowerCase()}]`">
        <label :for="`skill[${skill.label.toLowerCase()}]`" class="font-medium text-secondary cursor-pointer">{{ skill.label }}</label>
      </div>
    </div>
</template>