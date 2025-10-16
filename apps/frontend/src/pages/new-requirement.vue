<template>
  <div class="new-requirement">
    <header class="new-requirement__header">
      <h1 class="new-requirement__title">
        New Requirement
      </h1>
      <p class="new-requirement__subtitle">
        Create a new requirement for your project
      </p>
      <p class="new-requirement__description">
        Define your project requirements with AI assistance for automatic Jira task generation
      </p>
    </header>

    <!-- Main Content Form -->
    <div class="requirement-form">
      <div class="form-card">
        <div class="form-section">
          <label for="project" class="form-label">Project</label>
          <select id="project" v-model="selectedProject" class="form-select">
            <option value="">
              Select a project
            </option>
            <option value="project-1">
              Project 1
            </option>
            <option value="project-2">
              Project 2
            </option>
          </select>
        </div>

        <div class="form-section">
          <label for="requirement-title" class="form-label">Requirement Title</label>
          <input
            id="requirement-title"
            v-model="requirementTitle"
            type="text"
            class="form-input"
            placeholder="Enter requirement title"
          >
        </div>

        <div class="form-section">
          <label for="requirement-description" class="form-label">Description</label>
          <textarea
            id="requirement-description"
            v-model="requirementDescription"
            class="form-textarea"
            rows="8"
            placeholder="Describe your requirement in detail. The AI will help generate Jira tasks based on this description."
          />
        </div>

        <div class="form-section">
          <label for="priority" class="form-label">Priority</label>
          <select id="priority" v-model="selectedPriority" class="form-select">
            <option value="">
              Select priority
            </option>
            <option value="high">
              High
            </option>
            <option value="medium">
              Medium
            </option>
            <option value="low">
              Low
            </option>
          </select>
        </div>

        <div class="form-section">
          <label for="assignee" class="form-label">Assignee</label>
          <select id="assignee" v-model="selectedAssignee" class="form-select">
            <option value="">
              Select assignee
            </option>
            <option value="maxim">
              Maxim Nuel
            </option>
            <option value="team-member-1">
              Team Member 1
            </option>
            <option value="team-member-2">
              Team Member 2
            </option>
          </select>
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-secondary">
            Save as Draft
          </button>
          <button type="button" class="btn btn-primary">
            Generate Jira Tasks
          </button>
        </div>
      </div>

      <!-- AI Suggestions Panel -->
      <div class="ai-panel">
        <div class="ai-panel__header">
          <Icon name="heroicons:sparkles" class="ai-icon" />
          <h3>AI Suggestions</h3>
        </div>
        <div class="ai-panel__content">
          <p class="ai-message">
            Start typing your requirement description and I'll provide suggestions for:
          </p>
          <ul class="ai-suggestions">
            <li>• Breaking down complex requirements</li>
            <li>• Suggesting task priorities</li>
            <li>• Identifying dependencies</li>
            <li>• Estimating effort</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'sidebar'
})

const selectedProject = ref('')
const requirementTitle = ref('')
const requirementDescription = ref('')
const selectedPriority = ref('')
const selectedAssignee = ref('')
</script>

<style scoped>
.new-requirement {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.new-requirement__header {
  margin-bottom: 2rem;
}

.new-requirement__title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.new-requirement__subtitle {
  font-size: 1rem;
  color: #6b7280;
  margin: 0 0 0.25rem 0;
}

.new-requirement__description {
  font-size: 0.875rem;
  color: #9ca3af;
  margin: 0 0 2rem 0;
}

.requirement-form {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

@media (max-width: 1024px) {
  .requirement-form {
    grid-template-columns: 1fr;
  }
}

.form-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.form-section {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-input,
.form-select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #1f2937;
  background: white;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
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
  border-color: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover {
  background: #e5e7eb;
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

.ai-panel {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.ai-panel__header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.ai-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #7c3aed;
}

.ai-panel__header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.ai-panel__content {
  color: #6b7280;
}

.ai-message {
  font-size: 0.875rem;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.ai-suggestions {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ai-suggestions li {
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: #9ca3af;
}
</style>
