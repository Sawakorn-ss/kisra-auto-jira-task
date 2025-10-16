<template>
  <div class="dashboard">
    <div class="dashboard-card">
      <div class="corner-accent"></div>

      <header class="dashboard__header">
        <h1 class="dashboard__title">
          Dashboard
        </h1>
        <p class="dashboard__subtitle">
          Get a complete overview of your projects and requirements in one place
        </p>
        <p class="dashboard__description">
          Track progress, manage priorities, and keep your team aligned every step of the way
        </p>
      </header>

    <!-- Project Selector -->
    <div class="project-selector">
      <label for="project-select" class="project-label">Project Name</label>
      <select
        id="project-select"
        v-model="selectedProject"
        class="project-select"
        :disabled="isLoadingProjects"
      >
        <option value="" disabled>
          {{ isLoadingProjects ? 'Loading projects...' : 'Select a project' }}
        </option>
        <option
          v-for="project in projects"
          :key="project.id"
          :value="project.key"
        >
          {{ project.name }}
        </option>
      </select>
    </div>

    <!-- Process Project -->
    <div class="process-section">
      <div class="process-header">
        <h3>Process Project</h3>
        <span class="process-percentage">75% Complete</span>
      </div>
      <div class="process-bar">
        <div class="process-fill" style="width: 75%" />
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">
          All Task
        </div>
        <div class="stat-number">
          200
        </div>
        <div class="stat-period">
          in the last 24 hours
        </div>
      </div>

      <div class="stat-card done">
        <div class="stat-icon">
          <Icon name="heroicons:check" />
        </div>
        <div class="stat-label">
          Done
        </div>
        <div class="stat-number">
          150
        </div>
        <div class="stat-period">
          in the last 24 hours
        </div>
      </div>

      <div class="stat-card verify">
        <div class="stat-icon">
          <Icon name="heroicons:clipboard-document-check" />
        </div>
        <div class="stat-label">
          To verify
        </div>
        <div class="stat-number">
          20
        </div>
        <div class="stat-period">
          in the last 24 hours
        </div>
      </div>

      <div class="stat-card backlog">
        <div class="stat-icon">
          <Icon name="heroicons:clock" />
        </div>
        <div class="stat-label">
          Backlog
        </div>
        <div class="stat-number">
          30
        </div>
        <div class="stat-period">
          in the last 24 hours
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="charts-section">
      <div class="chart-card">
        <div class="chart-card__header">
          <h3>Job Overview</h3>
          <button class="chart-menu">
            <Icon name="heroicons:ellipsis-vertical" />
          </button>
        </div>
        <div class="chart-card__content">
          <div class="job-overview">
            <DoughnutChart />
            <div class="job-total">
              <div class="job-number">
                200
              </div>
              <div class="job-label">
                Total Jobs
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-card__header">
          <h3>Team workload</h3>
        </div>
        <div class="chart-card__content">
          <div class="team-workload">
            <div class="team-member">
              <div class="member-avatar" />
              <span class="member-name">Name</span>
              <div class="workload-bar">
                <div class="workload-fill orange" style="width: 75%" />
              </div>
              <span class="workload-percentage">75%</span>
            </div>
            <div class="team-member">
              <div class="member-avatar" />
              <span class="member-name">Name</span>
              <div class="workload-bar">
                <div class="workload-fill purple" style="width: 50%" />
              </div>
              <span class="workload-percentage">50%</span>
            </div>
            <div class="team-member">
              <div class="member-avatar" />
              <span class="member-name">Name</span>
              <div class="workload-bar">
                <div class="workload-fill teal" style="width: 100%" />
              </div>
              <span class="workload-percentage">100%</span>
            </div>
            <div class="team-member">
              <div class="member-avatar" />
              <span class="member-name">Name</span>
              <div class="workload-bar">
                <div class="workload-fill teal" style="width: 100%" />
              </div>
              <span class="workload-percentage">100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DoughnutChart from '~/components/charts/DoughnutChart.vue'
import { projectService, type JiraProject } from '~/services/projectService'

const selectedProject = ref('')
const projects = ref<JiraProject[]>([])
const isLoadingProjects = ref(false)

definePageMeta({
  layout: 'sidebar'
})

onMounted(async () => {
  await loadProjects()
})

const loadProjects = async () => {
  isLoadingProjects.value = true
  try {
    projects.value = await projectService.getAllProjects()
    // Set default project if available
    if (projects.value.length > 0) {
      selectedProject.value = projects.value[0].key
    }
  } catch (error) {
    console.error('Failed to load projects:', error)
  } finally {
    isLoadingProjects.value = false
  }
}
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: transparent;
  padding: 0;
}

.dashboard-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
}

.corner-accent {
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%);
  border-radius: 0 1rem 0 100%;
  z-index: 1;
}

.dashboard-card > *:not(.corner-accent) {
  position: relative;
  z-index: 2;
}

.dashboard__header {
  margin-bottom: 2rem;
}

.dashboard__title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.dashboard__subtitle {
  font-size: 1rem;
  color: #6b7280;
  margin: 0 0 0.25rem 0;
}

.dashboard__description {
  font-size: 0.875rem;
  color: #9ca3af;
  margin: 0 0 2rem 0;
}

/* Project Selector */
.project-selector {
  margin-bottom: 2rem;
}

.project-label {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.project-select {
  width: 100%;
  max-width: 400px;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #1f2937;
  background: white;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.project-select:focus {
  outline: none;
  border-color: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
}

.project-select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #f9fafb;
}

/* Process Section */
.process-section {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.process-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.process-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.process-percentage {
  font-size: 1rem;
  font-weight: 600;
  color: #d97706;
}

.process-bar {
  height: 1rem;
  background: #f1f5f9;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
}

.process-fill {
  height: 100%;
  background: linear-gradient(90deg, #f59e0b, #d97706);
  border-radius: 0.5rem;
  transition: width 0.3s ease;
  position: relative;
}

.process-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

.stat-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.stat-card.done {
  border-left: 4px solid #10b981;
}

.stat-card.verify {
  border-left: 4px solid #3b82f6;
}

.stat-card.backlog {
  border-left: 4px solid #f59e0b;
}

.stat-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.stat-card.done .stat-icon {
  background: #dcfce7;
  color: #10b981;
}

.stat-card.verify .stat-icon {
  background: #dbeafe;
  color: #3b82f6;
}

.stat-card.backlog .stat-icon {
  background: #fef3c7;
  color: #f59e0b;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.stat-period {
  font-size: 0.75rem;
  color: #9ca3af;
}

/* Charts Section */
.charts-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .charts-section {
    grid-template-columns: 1fr;
  }
}

.chart-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.chart-card__header {
  margin-bottom: 1rem;
}

.chart-card__header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.chart-card__content {
  height: 300px;
}

/* Job Overview */
.job-overview {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
}

.job-total {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.job-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.job-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.chart-menu {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  font-size: 1.5rem;
  transition: all 0.2s ease;
}

.chart-menu:hover {
  background: #f1f5f9;
  color: #334155;
}

/* Team Workload */
.team-workload {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.team-member {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.member-avatar {
  width: 2rem;
  height: 2rem;
  background: #e2e8f0;
  border-radius: 50%;
  flex-shrink: 0;
}

.member-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
  min-width: 4rem;
}

.workload-bar {
  flex: 1;
  height: 0.5rem;
  background: #f1f5f9;
  border-radius: 0.25rem;
  overflow: hidden;
  position: relative;
  margin-right: 0.75rem;
}

.workload-percentage {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  min-width: 2.5rem;
  text-align: right;
}

.workload-fill {
  height: 100%;
  border-radius: 0.25rem;
  transition: width 0.3s ease;
}

.workload-fill.orange {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.workload-fill.purple {
  background: linear-gradient(90deg, #8b5cf6, #7c3aed);
}

.workload-fill.teal {
  background: linear-gradient(90deg, #14b8a6, #0d9488);
}


/* Activity Section */
.activity-section {
  grid-column: 1 / -1;
}

.activity-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.activity-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.activity-card__header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.btn-link {
  color: #3b82f6;
  font-weight: 500;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;
}

.btn-link:hover {
  background-color: #eff6ff;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.75rem;
  background: #f9fafb;
  transition: background-color 0.2s ease;
}

.activity-item:hover {
  background: #f3f4f6;
}

.activity-item__icon {
  width: 2rem;
  height: 2rem;
  background: #3b82f6;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.activity-item__content p {
  margin: 0 0 0.25rem 0;
  color: #1f2937;
}

.activity-item__time {
  font-size: 0.875rem;
  color: #6b7280;
}
</style>
