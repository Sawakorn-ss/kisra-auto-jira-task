<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  Chart as ChartJS,
  ArcElement,
  DoughnutController,
  Tooltip,
  Legend
} from 'chart.js'
import type { Chart } from 'chart.js'

// Register Chart.js components
ChartJS.register(ArcElement, DoughnutController, Tooltip, Legend)

const chartCanvas = ref<HTMLCanvasElement>()
let chart: Chart | null = null

const chartData = {
  labels: ['To Do', 'In Progress', 'In Review', 'Done'],
  datasets: [
    {
      data: [25, 35, 15, 89],
      backgroundColor: [
        '#ef4444', // Red for To Do
        '#f59e0b', // Amber for In Progress
        '#3b82f6', // Blue for In Review
        '#10b981'  // Green for Done
      ],
      borderColor: '#ffffff',
      borderWidth: 3,
      hoverBackgroundColor: [
        '#dc2626',
        '#d97706',
        '#2563eb',
        '#059669'
      ],
      hoverBorderWidth: 4
    }
  ]
}

const chartOptions: any = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '60%',
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        padding: 20,
        usePointStyle: true,
        font: {
          size: 12,
          weight: 500
        },
        generateLabels: (chart: any) => {
          const data = chart.data
          if (data.labels?.length && data.datasets.length) {
            return data.labels.map((label: string, index: number) => ({
              text: `${label}: ${data.datasets[0].data[index]}`,
              fillStyle: Array.isArray(data.datasets[0].backgroundColor)
                ? data.datasets[0].backgroundColor[index]
                : data.datasets[0].backgroundColor,
              strokeStyle: Array.isArray(data.datasets[0].backgroundColor)
                ? data.datasets[0].backgroundColor[index]
                : data.datasets[0].backgroundColor,
              pointStyle: 'circle',
              hidden: false,
              index
            }))
          }
          return []
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      padding: 12,
      callbacks: {
        label: (context: any) => {
          const label = context.label || ''
          const value = context.parsed
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
          const percentage = ((value / total) * 100).toFixed(1)
          return `${label}: ${value} (${percentage}%)`
        }
      }
    }
  },
  animation: {
    animateRotate: true,
    animateScale: true
  }
}

onMounted(() => {
  if (chartCanvas.value) {
    chart = new ChartJS(chartCanvas.value, {
      type: 'doughnut',
      data: chartData,
      options: chartOptions
    })
  }
})

onBeforeUnmount(() => {
  if (chart) {
    chart.destroy()
  }
})
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>