<template>
  <div class="history">
    <header class="history__header">
      <h1 class="history__title">
        History
      </h1>
      <p class="history__subtitle">
        Track your requirements and task generation history
      </p>
      <p class="history__description">
        View all previously created requirements and their generated Jira tasks
      </p>
    </header>

    <!-- Filter and Search -->
    <div class="history-controls">
      <div class="search-box">
        <Icon name="heroicons:magnifying-glass" class="search-icon" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search requirements..."
          class="search-input"
        >
      </div>
      <div class="filter-controls">
        <select v-model="statusFilter" class="filter-select">
          <option value="">
            All Status
          </option>
          <option value="completed">
            Completed
          </option>
          <option value="in-progress">
            In Progress
          </option>
          <option value="draft">
            Draft
          </option>
        </select>
        <select v-model="projectFilter" class="filter-select">
          <option value="">
            All Projects
          </option>
          <option value="project-1">
            Project 1
          </option>
          <option value="project-2">
            Project 2
          </option>
        </select>
      </div>
    </div>

    <!-- History List -->
    <div class="history-list">
      <div v-for="item in filteredHistory" :key="item.id" class="history-item">
        <div class="history-item__header">
          <div class="history-item__info">
            <h3 class="history-item__title">
              {{ item.title }}
            </h3>
            <p class="history-item__project">
              {{ item.project }}
            </p>
          </div>
          <div class="history-item__status">
            <span class="status-badge" :class="item.status">{{ item.status }}</span>
          </div>
        </div>
        <div class="history-item__content">
          <p class="history-item__description">
            {{ item.description }}
          </p>
          <div class="history-item__meta">
            <span class="meta-item">
              <Icon name="heroicons:calendar-days" class="meta-icon" />
              {{ item.createdAt }}
            </span>
            <span class="meta-item">
              <Icon name="heroicons:user" class="meta-icon" />
              {{ item.assignee }}
            </span>
            <span class="meta-item">
              <Icon name="heroicons:clipboard-document-list" class="meta-icon" />
              {{ item.tasksGenerated }} tasks generated
            </span>
          </div>
        </div>
        <div class="history-item__actions">
          <button class="action-btn">
            View Details
          </button>
          <button class="action-btn secondary">
            Edit
          </button>
          <button class="action-btn secondary">
            Duplicate
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredHistory.length === 0" class="empty-state">
      <Icon name="heroicons:document-text" class="empty-icon" />
      <h3>No requirements found</h3>
      <p>Start by creating your first requirement to see it here.</p>
      <NuxtLink to="/new-requirement" class="btn btn-primary">
        Create New Requirement
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'sidebar'
})

const searchQuery = ref('')
const statusFilter = ref('')
const projectFilter = ref('')

// Mock data
const historyData = ref([
  {
    id: 1,
    title: 'User Authentication System',
    project: 'Project 1',
    description: 'Implement secure user login and registration with JWT tokens and password encryption.',
    status: 'completed',
    createdAt: '2024-01-15',
    assignee: 'Maxim Nuel',
    tasksGenerated: 8
  },
  {
    id: 2,
    title: 'Dashboard Analytics',
    project: 'Project 1',
    description: 'Create comprehensive analytics dashboard with charts and real-time data visualization.',
    status: 'in-progress',
    createdAt: '2024-01-12',
    assignee: 'Team Member 1',
    tasksGenerated: 12
  },
  {
    id: 3,
    title: 'API Integration',
    project: 'Project 2',
    description: 'Integrate third-party APIs for payment processing and external data sources.',
    status: 'draft',
    createdAt: '2024-01-10',
    assignee: 'Team Member 2',
    tasksGenerated: 5
  }
])

const filteredHistory = computed(() => {
  return historyData.value.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = !statusFilter.value || item.status === statusFilter.value
    const matchesProject = !projectFilter.value || item.project === projectFilter.value

    return matchesSearch && matchesStatus && matchesProject
  })
})
</script>

<style scoped>
.history {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.history__header {
  margin-bottom: 2rem;
}

.history__title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.history__subtitle {
  font-size: 1rem;
  color: #6b7280;
  margin: 0 0 0.25rem 0;
}

.history__description {
  font-size: 0.875rem;
  color: #9ca3af;
  margin: 0 0 2rem 0;
}

.history-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
}

@media (max-width: 768px) {
  .history-controls {
    flex-direction: column;
    align-items: stretch;
  }
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: #9ca3af;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #1f2937;
  background: white;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
}

.filter-controls {
  display: flex;
  gap: 1rem;
}

.filter-select {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #1f2937;
  background: white;
  min-width: 150px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.filter-select:focus {
  outline: none;
  border-color: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.history-item {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.history-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1);
}

.history-item__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.history-item__title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.history-item__project {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.completed {
  background: #dcfce7;
  color: #166534;
}

.status-badge.in-progress {
  background: #dbeafe;
  color: #1d4ed8;
}

.status-badge.draft {
  background: #f3f4f6;
  color: #374151;
}

.history-item__description {
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.history-item__meta {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

@media (max-width: 640px) {
  .history-item__meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.meta-icon {
  width: 1rem;
  height: 1rem;
  color: #9ca3af;
}

.history-item__actions {
  display: flex;
  gap: 0.75rem;
}

.action-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  background: #7c3aed;
  color: white;
}

.action-btn:hover {
  background: #6d28d9;
}

.action-btn.secondary {
  background: #f3f4f6;
  color: #374151;
}

.action-btn.secondary:hover {
  background: #e5e7eb;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
}

.empty-icon {
  width: 4rem;
  height: 4rem;
  color: #d1d5db;
  margin: 0 auto 1rem;
}

.empty-state h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.empty-state p {
  margin-bottom: 2rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #7c3aed, #6d28d9);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
}
</style>
