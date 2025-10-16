<template>
  <div class="new-requirement">
    <!-- Project Selection Step -->
    <div v-if="currentStep === 1" class="step-container">
      <div class="content-card">
        <div class="corner-accent"></div>

        <div class="content-center">
          <div class="icon-container">
            <div class="project-icon">{ }</div>
          </div>

          <h1 class="step-title">Select a Project</h1>
          <p class="step-subtitle">Pick a project to start adding new requirements</p>
          <p class="step-description">Keep everything connected and easy to track</p>

          <div class="form-section">
            <select v-model="selectedProject" class="project-select-large">
              <option value="" disabled>
                Project Name
              </option>
              <option value="project-1">
                Project 1
              </option>
              <option value="project-2">
                Project 2
              </option>
              <option value="project-404">
                Project 404
              </option>
            </select>
          </div>

          <button
            type="button"
            class="btn btn-primary btn-large"
            :disabled="!selectedProject"
            @click="nextStep"
          >
            Select Project
          </button>
        </div>
      </div>
    </div>

    <!-- Requirement Setup Step -->
    <div v-else-if="currentStep === 2" class="step-container overflow-scroll">
      <div class="content-card content-wide ">
        <div class="corner-accent"></div>

        <div class="step-header">
          <h1 class="step-title">Requirement Setup</h1>
          <p class="step-subtitle">Define your requirement and assign teams before linking it to a project</p>
        </div>

        <div class="form-grid">
          <div class="form-section">
            <label class="form-label">Team BA</label>
            <select v-model="teamBA" class="form-select">
              <option value="" disabled>Team Name</option>
              <option value="team-ba-1">Team BA 1</option>
              <option value="team-ba-2">Team BA 2</option>
            </select>
          </div>

          <div class="form-row">
            <div class="form-section">
              <label class="form-label">Team Dev (Frontend)</label>
              <select v-model="teamFrontend" class="form-select">
                <option value="" disabled>Team Name</option>
                <option value="frontend-team-1">Frontend Team 1</option>
                <option value="frontend-team-2">Frontend Team 2</option>
              </select>
            </div>

            <div class="form-section">
              <label class="form-label">Team Dev (Backend)</label>
              <select v-model="teamBackend" class="form-select">
                <option value="" disabled>Team Name</option>
                <option value="backend-team-1">Backend Team 1</option>
                <option value="backend-team-2">Backend Team 2</option>
              </select>
            </div>
          </div>

          <div class="form-section">
            <label class="form-label">Requirement Project</label>
            <div class="requirement-input">
              <div class="input-container">
                <Icon name="heroicons:sparkles" class="input-icon" />
                <textarea
                  v-model="requirementDescription"
                  class="requirement-textarea"
                  placeholder="Start your request, and let orion handle everything"
                  rows="8"
                />
                <div class="input-actions">
                  <button type="button" class="action-btn">
                    <Icon name="heroicons:paper-clip" />
                  </button>
                  <button type="button" class="action-btn">
                    <Icon name="heroicons:document" />
                  </button>
                  <button type="button" class="action-btn">
                    <Icon name="heroicons:microphone" />
                  </button>
                  <button type="button" class="action-btn primary">
                    <Icon name="heroicons:paper-airplane" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="step-actions">
          <button type="button" class="btn btn-secondary" @click="previousStep">
            Back
          </button>
          <button
            type="button"
            class="btn btn-primary"
            :disabled="!isStep2Valid"
            @click="nextStep"
          >
            Select Project
          </button>
        </div>
      </div>
    </div>

    <!-- Task Overview Step -->
    <div v-else-if="currentStep === 3" class="step-container">
      <div class="content-card content-wide">
        <div class="corner-accent"></div>

        <div class="step-header">
          <h1 class="step-title">Task Overview</h1>
          <p class="step-subtitle">Review your tasks and assignments before linking them to Jira for the next phase</p>
        </div>

        <div class="task-table">
          <div class="table-header">
            <div class="header-cell">Action</div>
            <div class="header-cell">Tasks</div>
            <div class="header-cell">Assign</div>
          </div>

          <div v-for="(task, index) in generatedTasks" :key="index" class="task-row">
            <div class="task-actions">
              <button type="button" class="action-icon" @click="editTask(index)">
                <Icon name="heroicons:pencil" />
              </button>
              <button type="button" class="action-icon delete">
                <Icon name="heroicons:trash" />
              </button>
            </div>
            <div class="task-info">
              <h4 class="task-title">{{ task.title }}</h4>
              <p class="task-description">{{ task.description }}</p>
            </div>
            <div class="task-assignee">
              <div class="assignee-avatar"></div>
            </div>
          </div>
        </div>

        <div class="step-actions">
          <button type="button" class="btn btn-secondary" @click="previousStep">
            Back
          </button>
          <button type="button" class="btn btn-primary" @click="nextStep">
            <Icon name="heroicons:bolt" class="btn-icon" />
            Scan to Jira
          </button>
        </div>
      </div>
    </div>

    <!-- Task Detail Step -->
    <div v-else-if="currentStep === 4" class="step-container">
      <div class="content-card content-wide">
        <div class="corner-accent"></div>

        <div class="step-header">
          <h1 class="step-title">Task Detail</h1>
          <p class="step-subtitle">Review and finalize your task details before syncing to Jira</p>
          <p class="step-description">Make sure all requirements and assignments are correct before submission</p>
        </div>

        <div class="task-detail-form">
          <div class="form-section">
            <label class="form-label">Title</label>
            <input v-model="editingTask.title" type="text" class="form-input" placeholder="Team Name">
          </div>

          <div class="form-section">
            <label class="form-label">Description</label>
            <textarea
              v-model="editingTask.description"
              class="form-textarea"
              rows="6"
              placeholder="Start your request, and let orion handle everything"
            />
          </div>

          <div class="form-section">
            <label class="form-label">Team BA</label>
            <select v-model="editingTask.teamBA" class="form-select">
              <option value="" disabled>Team Name</option>
              <option value="team-ba-1">Team BA 1</option>
              <option value="team-ba-2">Team BA 2</option>
            </select>
          </div>

          <div class="form-row">
            <div class="form-section">
              <label class="form-label">Team Dev (Frontend)</label>
              <select v-model="editingTask.teamFrontend" class="form-select">
                <option value="" disabled>Team Name</option>
                <option value="frontend-team-1">Frontend Team 1</option>
                <option value="frontend-team-2">Frontend Team 2</option>
              </select>
            </div>

            <div class="form-section">
              <label class="form-label">Team Dev (Backend)</label>
              <select v-model="editingTask.teamBackend" class="form-select">
                <option value="" disabled>Team Name</option>
                <option value="backend-team-1">Backend Team 1</option>
                <option value="backend-team-2">Backend Team 2</option>
              </select>
            </div>
          </div>
        </div>

        <div class="step-actions">
          <button type="button" class="btn btn-secondary" @click="previousStep">
            Back
          </button>
          <button type="button" class="btn btn-primary" @click="saveTask">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStatusStore } from '../stores/statusStore';

definePageMeta({
  layout: 'sidebar'
})

// Step management
const currentStep = ref(1)

// Step 1 data
const selectedProject = ref('')

// Step 2 data
const teamBA = ref('')
const teamFrontend = ref('')
const teamBackend = ref('')
const requirementDescription = ref('')

// Step 3 data
type Task = {
  title: string;
  description: string;
  assignee: string;
}

const generatedTasks = ref<Task[]>([
  {
    title: 'Web Mockup',
    description: 'Define your requirement and assign team...',
    assignee: 'Team Member 1'
  },
  {
    title: 'Carl Landing Page',
    description: 'Define your requirement and assign team...',
    assignee: 'Team Member 2'
  },
  {
    title: 'Carl Landing Page',
    description: 'Define your requirement and assign team...',
    assignee: 'Team Member 1'
  },
  {
    title: 'POS UI/UX',
    description: 'Define your requirement and assign team...',
    assignee: 'Team Member 3'
  },
  {
    title: 'POS UI/UX',
    description: 'Define your requirement and assign team...',
    assignee: 'Team Member 2'
  },
  {
    title: 'POS UI/UX',
    description: 'Define your requirement and assign team...',
    assignee: 'Team Member 1'
  }
])

// Step 4 data
const editingTask = ref({
  title: '',
  description: '',
  teamBA: '',
  teamFrontend: '',
  teamBackend: ''
})

const editingTaskIndex = ref(-1)

// Computed properties
const isStep2Valid = computed(() => {
  return teamBA.value && teamFrontend.value && teamBackend.value && requirementDescription.value
})


const generateTasks = async (): Promise<Task[]> => {
  const res = await fetch('http://localhost:3001/n8n/trigger', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      projectKey: selectedProject.value,
      teamBA: teamBA.value,
      teamFrontend: teamFrontend.value,
      teamBackend: teamBackend.value,
      requirement: requirementDescription.value
    })
  })
  if (!res.ok) {
    throw new Error('Failed to generate tasks')
  }
  const data = await res.json()
  return data as Task[]
}


const savetojira  = async () => {
  const res = await fetch('http://localhost:3001/n8n/trigger', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      projectKey: selectedProject.value,
      teamBA: teamBA.value,
      teamFrontend: teamFrontend.value,
      teamBackend: teamBackend.value,
      requirement: requirementDescription.value
    })
  })
  return res
}

const statusStore = useStatusStore()
// Methods
const nextStep = async () => {
  if(currentStep.value ===1){
    
  }
  if(currentStep.value ===2){
    //  projectKey: selectedProject.value,
    //   teamBA: teamBA.value,
    //   teamFrontend: teamFrontend.value,
    //   teamBackend: teamBackend.value,
    //   requirement: requirementDescription validate pls
    if(!selectedProject.value || !teamBA.value || !teamFrontend.value || !teamBackend.value || !requirementDescription.value){
      statusStore.pushToast({
        title: 'Invalid data',
        message: 'Please fill all the fields',
        variant: 'error'
      })
      return
    }
    const res2 = await generateTasks()
    if(res2){
        generatedTasks.value = res2 || [ ]
       }
  }
  if(currentStep.value ===3){
    //  projectKey: selectedProject.value,
    //   teamBA: teamBA.value,
    //   teamFrontend: teamFrontend.value,
    //   teamBackend: teamBackend.value,
    //   requirement: requirementDescription validate pls
    if(!selectedProject.value || !teamBA.value || !teamFrontend.value || !teamBackend.value || !requirementDescription.value){
      statusStore.pushToast({
        title: 'Invalid data',
        message: 'Please fill all the fields',
        variant: 'error'
      })
      return
    }
    const res3 = await savetojira()
    if(res3){

    }
  }
  if (currentStep.value < 4) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const editTask = (index: number) => {
  editingTaskIndex.value = index
  const task = generatedTasks.value[index]
  editingTask.value = {
    title: task.title,
    description: task.description,
    teamBA: teamBA.value,
    teamFrontend: teamFrontend.value,
    teamBackend: teamBackend.value
  }
  currentStep.value = 4
}

const saveTask = () => {
  if (editingTaskIndex.value >= 0) {
    generatedTasks.value[editingTaskIndex.value] = {
      title: editingTask.value.title,
      description: editingTask.value.description,
      assignee: editingTask.value.teamBA || editingTask.value.teamFrontend || editingTask.value.teamBackend
    }
  }
  currentStep.value = 3
}
</script>

<style scoped>
.new-requirement {
  min-height: 100vh;
  background: transparent;
  padding: 0;
}

.step-container {
  width: 100%;
  height: max-content;
  min-height: calc(100vh);
}

.content-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.content-center {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
}

.content-wide {
  /* Additional styles for wide content can be added here */
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

.content-card > *:not(.corner-accent) {
  position: relative;
  z-index: 2;
}

.icon-container {
  margin-bottom: 2rem;
}

.project-icon {
  font-size: 4rem;
  font-weight: 700;
  color: #d97706;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  display: inline-block;
}

.step-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1rem 0;
}

.step-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
}

.step-description {
  font-size: 1rem;
  color: #9ca3af;
  margin: 0 0 3rem 0;
}

.step-header {
  margin-bottom: 2rem;
}

.step-header .step-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.step-header .step-subtitle {
  font-size: 1rem;
}

.step-header .step-description {
  margin-bottom: 0;
}

.form-section {
  margin-bottom: 2rem;
}

.form-label {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.75rem;
}

.project-select-large {
  width: 100%;
  max-width: 400px;
  padding: 1rem 1.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 1rem;
  color: #6b7280;
  background: white;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  margin-bottom: 2rem;
}

.project-select-large:focus {
  outline: none;
  border-color: #d97706;
  box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.1);
}

.form-select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  background: white;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-select:focus {
  outline: none;
  border-color: #d97706;
  box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.1);
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #1f2937;
  background: white;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #d97706;
  box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.1);
}

.form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #1f2937;
  background: white;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-textarea:focus {
  outline: none;
  border-color: #d97706;
  box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.1);
}

.form-grid {
  display: grid;
  gap: 2rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.requirement-input {
  position: relative;
}

.input-container {
  position: relative;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  background: white;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input-container:focus-within {
  border-color: #d97706;
  box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.1);
}

.input-icon {
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 1.25rem;
  height: 1.25rem;
  color: #d97706;
}

.requirement-textarea {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: none;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  color: #1f2937;
  background: transparent;
  resize: none;
  font-family: inherit;
}

.requirement-textarea:focus {
  outline: none;
}

.input-actions {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 0.375rem;
  background: #f3f4f6;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: #e5e7eb;
}

.action-btn.primary {
  background: #d97706;
  color: white;
}

.action-btn.primary:hover {
  background: #b45309;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover:not(:disabled) {
  background: #e5e7eb;
}

.btn-primary {
  background: #1f2937;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #111827;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(31, 41, 55, 0.3);
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1rem;
}

.btn-icon {
  width: 1rem;
  height: 1rem;
}

.step-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.task-table {
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  overflow: hidden;
  margin-bottom: 2rem;
}

.table-header {
  display: grid;
  grid-template-columns: 120px 1fr 100px;
  background: #f9fafb;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.header-cell {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.task-row {
  display: grid;
  grid-template-columns: 120px 1fr 100px;
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
  align-items: center;
}

.task-row:last-child {
  border-bottom: none;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
}

.action-icon {
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 0.375rem;
  background: #f3f4f6;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-icon:hover {
  background: #e5e7eb;
}

.action-icon.delete {
  color: #ef4444;
}

.action-icon.delete:hover {
  background: #fef2f2;
}

.task-info {
  padding-left: 1rem;
}

.task-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.task-description {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
}

.task-assignee {
  display: flex;
  justify-content: center;
}

.assignee-avatar {
  width: 2rem;
  height: 2rem;
  background: #3b82f6;
  border-radius: 50%;
}

.task-detail-form {
  display: grid;
  gap: 2rem;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .table-header,
  .task-row {
    grid-template-columns: 80px 1fr 80px;
  }

  .step-actions {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
