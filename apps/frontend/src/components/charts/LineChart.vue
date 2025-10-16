<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import type { Chart } from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler
)

const chartCanvas = ref<HTMLCanvasElement>()
let chart: Chart | null = null

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Completed Tasks',
      data: [12, 19, 15, 25, 22, 30, 28],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#3b82f6',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7
    },
    {
      label: 'Created Tasks',
      data: [15, 23, 18, 30, 25, 35, 32],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#10b981',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7
    }
  ]
}

const chartOptions: any = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: 'index' as const,
  },
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        padding: 20,
        usePointStyle: true,
        font: {
          size: 12,
          weight: 500
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
      padding: 12
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      border: {
        display: false
      },
      ticks: {
        color: '#6b7280',
        font: {
          size: 12
        }
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(107, 114, 128, 0.1)'
      },
      border: {
        display: false
      },
      ticks: {
        color: '#6b7280',
        font: {
          size: 12
        }
      }
    }
  }
}

onMounted(() => {
  if (chartCanvas.value) {
    chart = new ChartJS(chartCanvas.value, {
      type: 'line',
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
}
</style>