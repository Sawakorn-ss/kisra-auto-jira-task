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
            <option v-for="value in dataaa" :value="value.key">
              {{ value.name }}
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
const dataaa = [
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10149",
    "id": "10149",
    "key": "AE",
    "name": "AIS-EagleEye",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10635",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10635?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10635?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10635?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10087",
    "id": "10087",
    "key": "AG",
    "name": "AEON-Gamification",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10404",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10404?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10404?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10404?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10086",
    "id": "10086",
    "key": "AOGA",
    "name": "ASB-Online-gosure.asia",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10422",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10422?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10422?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10422?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10393",
    "id": "10393",
    "key": "AOR",
    "name": "Personal Task Planner - Aor",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10416",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10416?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10416?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10416?size=medium"
    },
    "projectTypeKey": "business",
    "simplified": true,
    "style": "next-gen",
    "isPrivate": false,
    "properties": {},
    "entityId": "fccafac5-eba9-4c7a-a0f1-eec09869e41f",
    "uuid": "fccafac5-eba9-4c7a-a0f1-eec09869e41f"
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10077",
    "id": "10077",
    "key": "AP",
    "name": "ASB-Pool",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10402",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10402?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10402?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10402?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10690",
    "id": "10690",
    "key": "ASEO",
    "name": "SEO [Phase2]",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10425",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10425?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10425?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10425?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": true,
    "style": "next-gen",
    "isPrivate": false,
    "properties": {},
    "entityId": "f1e2fe8b-eb79-419b-b5d8-005194a95492",
    "uuid": "f1e2fe8b-eb79-419b-b5d8-005194a95492"
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10155",
    "id": "10155",
    "key": "AW",
    "name": "Aurora-WarRoom",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10652",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10652?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10652?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10652?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10065",
    "id": "10065",
    "key": "BEDO",
    "name": "BEDO-AI",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10416",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10416?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10416?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10416?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10097",
    "id": "10097",
    "key": "BF",
    "name": "BearWash-FCard",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10592",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10592?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10592?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10592?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10121",
    "id": "10121",
    "key": "BH",
    "name": "BOTNOI-HackFest",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10613",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10613?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10613?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10613?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10150",
    "id": "10150",
    "key": "BI",
    "name": "Bossup-IOD",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10636",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10636?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10636?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10636?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10148",
    "id": "10148",
    "key": "BUMZ",
    "name": "Personal Task Planner - Bumz",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10633",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10633?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10633?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10633?size=medium"
    },
    "projectTypeKey": "business",
    "simplified": true,
    "style": "next-gen",
    "isPrivate": false,
    "properties": {},
    "entityId": "5558ce44-2232-4e03-bcf0-4ef8b5b64429",
    "uuid": "5558ce44-2232-4e03-bcf0-4ef8b5b64429"
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10000",
    "id": "10000",
    "key": "CAS",
    "name": "Cash2Coins-Wallet",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10001",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10001?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10001?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10001?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10076",
    "id": "10076",
    "key": "CB",
    "name": "CTMS-Billing64",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10402",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10402?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10402?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10402?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10079",
    "id": "10079",
    "key": "CC",
    "name": "CEA-CKAN",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10409",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10409?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10409?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10409?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10109",
    "id": "10109",
    "key": "CCIT",
    "name": "CCIT-SleepApp",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10603",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10603?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10603?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10603?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10137",
    "id": "10137",
    "key": "CDD",
    "name": "CDD-AI",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10625",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10625?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10625?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10625?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10106",
    "id": "10106",
    "key": "CEA",
    "name": "CEA-MA66",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10612",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10612?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10612?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10612?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10154",
    "id": "10154",
    "key": "CEL",
    "name": "CPCR E-Learning",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10651",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10651?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10651?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10651?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10558",
    "id": "10558",
    "key": "CIB",
    "name": "CIB E-Learning",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/11058",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/11058?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/11058?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/11058?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10090",
    "id": "10090",
    "key": "CM",
    "name": "CEA-MAIN",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10402",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10402?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10402?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10402?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10102",
    "id": "10102",
    "key": "CM6",
    "name": "CCB-MA66",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10598",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10598?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10598?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10598?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10100",
    "id": "10100",
    "key": "CPC",
    "name": "CEA-PDPA-Cookies",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10597",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10597?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10597?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10597?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10074",
    "id": "10074",
    "key": "CS",
    "name": "Consmix-Sales",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10423",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10423?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10423?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10423?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10525",
    "id": "10525",
    "key": "DA",
    "name": "DeepSOC-AI",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/11025",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/11025?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/11025?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/11025?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10117",
    "id": "10117",
    "key": "DM",
    "name": "Drowning-MA66",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10610",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10610?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10610?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10610?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10146",
    "id": "10146",
    "key": "DR67",
    "name": "Drowning-MA67",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10419",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10419?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10419?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10419?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": true,
    "style": "next-gen",
    "isPrivate": false,
    "properties": {},
    "entityId": "28d110ea-e95d-42a3-8111-96a392828773",
    "uuid": "28d110ea-e95d-42a3-8111-96a392828773"
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10073",
    "id": "10073",
    "key": "DW",
    "name": "DMS-Webinar",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10425",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10425?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10425?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10425?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10122",
    "id": "10122",
    "key": "FAR",
    "name": "FarmBoy",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10616",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10616?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10616?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10616?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10088",
    "id": "10088",
    "key": "GUAR",
    "name": "GuardTour",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10423",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10423?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10423?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10423?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10095",
    "id": "10095",
    "key": "IC",
    "name": "IRPC-CustomerPortal",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10594",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10594?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10594?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10594?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10144",
    "id": "10144",
    "key": "ICE",
    "name": "Personal Task Planner - Ice",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10416",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10416?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10416?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10416?size=medium"
    },
    "projectTypeKey": "business",
    "simplified": true,
    "style": "next-gen",
    "isPrivate": false,
    "properties": {},
    "entityId": "9fd58b73-306f-49dc-9173-6f24147c18f3",
    "uuid": "9fd58b73-306f-49dc-9173-6f24147c18f3"
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10098",
    "id": "10098",
    "key": "JD",
    "name": "Jitta-DipChip",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10595",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10595?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10595?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10595?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10135",
    "id": "10135",
    "key": "JL",
    "name": "Jowit-Loco24Parking",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10623",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10623?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10623?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10623?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10143",
    "id": "10143",
    "key": "JOM",
    "name": "Personal Task Planner - Jom",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10419",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10419?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10419?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10419?size=medium"
    },
    "projectTypeKey": "business",
    "simplified": true,
    "style": "next-gen",
    "isPrivate": false,
    "properties": {},
    "entityId": "d6f183c1-3d26-42d7-adff-d0085970f360",
    "uuid": "d6f183c1-3d26-42d7-adff-d0085970f360"
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10128",
    "id": "10128",
    "key": "JT",
    "name": "Jowit-TerraMotorLicense",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10619",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10619?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10619?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10619?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10145",
    "id": "10145",
    "key": "KHIMEIEI",
    "name": "Personal Task Planner - Khim EiEi",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10403",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10403?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10403?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10403?size=medium"
    },
    "projectTypeKey": "business",
    "simplified": true,
    "style": "next-gen",
    "isPrivate": false,
    "properties": {},
    "entityId": "dd65b997-f5cb-4071-b942-91cba5a6b24a",
    "uuid": "dd65b997-f5cb-4071-b942-91cba5a6b24a"
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10657",
    "id": "10657",
    "key": "KHUIAI",
    "name": "KhuiAI",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10422",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10422?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10422?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10422?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": true,
    "style": "next-gen",
    "isPrivate": false,
    "properties": {},
    "entityId": "a9b06f18-522d-4fd5-846a-22d3b15806ed",
    "uuid": "a9b06f18-522d-4fd5-846a-22d3b15806ed"
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10124",
    "id": "10124",
    "key": "KUC",
    "name": "KUCPE",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10617",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10617?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10617?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10617?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10096",
    "id": "10096",
    "key": "KUF",
    "name": "KUForest",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10593",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10593?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10593?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10593?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10723",
    "id": "10723",
    "key": "LF",
    "name": "Lamsam-FamilyChart",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/11093",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/11093?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/11093?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/11093?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10115",
    "id": "10115",
    "key": "LP",
    "name": "LabVet-PH2",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10608",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10608?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10608?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10608?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10085",
    "id": "10085",
    "key": "LPM",
    "name": "LocKsi PMUC MediPod",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10586",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10586?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10586?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10586?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10156",
    "id": "10156",
    "key": "LY",
    "name": "LCS-YardService",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10655",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10655?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10655?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10655?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10082",
    "id": "10082",
    "key": "MA",
    "name": "MVTV-AuthenStreaming",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10405",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10405?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10405?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10405?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10132",
    "id": "10132",
    "key": "MA6",
    "name": "CEA-MA67",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10622",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10622?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10622?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10622?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10130",
    "id": "10130",
    "key": "MA67",
    "name": "CCB-MA67",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10624",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10624?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10624?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10624?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10158",
    "id": "10158",
    "key": "MA68",
    "name": "CEA-MA68",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10658",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10658?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10658?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10658?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10037",
    "id": "10037",
    "key": "MEET",
    "name": "Stream Meeting",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10536",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10536?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10536?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10536?size=medium"
    },
    "projectTypeKey": "software",
    "simplified": false,
    "style": "classic",
    "isPrivate": false,
    "properties": {}
  },
  {
    "expand": "description,lead,issueTypes,url,projectKeys,permissions,insight",
    "self": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/project/10140",
    "id": "10140",
    "key": "MEW",
    "name": "Personal Task Planner - Mew",
    "avatarUrls": {
      "48x48": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10628",
      "24x24": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10628?size=small",
      "16x16": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10628?size=xsmall",
      "32x32": "https://api.atlassian.com/ex/jira/42201d73-b354-4fa1-bfcf-96c19449bf3a/rest/api/3/universal_avatar/view/type/project/avatar/10628?size=medium"
    },
    "projectTypeKey": "business",
    "simplified": true,
    "style": "next-gen",
    "isPrivate": false,
    "properties": {},
    "entityId": "101607cc-bdd2-49de-a2bf-f769120d984c",
    "uuid": "101607cc-bdd2-49de-a2bf-f769120d984c"
  }
]
const editingTaskIndex = ref(-1)

// Computed properties
const isStep2Valid = computed(() => {
  return teamBA.value && teamFrontend.value && teamBackend.value && requirementDescription.value
})

const step1 = async (): Promise<Task[]> => {
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
  return res.json()
}
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
  return res.json()
}


// const createIssue = async () => {

//   const cloudid = '42201d73-b354-4fa1-bfcf-96c19449bf3a'
//   const tok = localStorage.getItem("jira_token")
//   try {
//     // discover Jira Cloud site
//     // create issue
//     const res2 = await fetch(
//       `https://api.atlassian.com/ex/jira/${cloudid}/rest/api/3/issue`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${tok}`,
//         },
//         body: JSON.stringify(generatedTasks.value),
//       }
//     )
//   } catch (err: any) {
   
//   }
// }



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
    console.log(res2)
    if(res2){
        generatedTasks.value = res2.data[0].tasks || []
       }
  }
  if(currentStep.value ===3){
    localStorage.setItem('jira_refresh', 'eyJraWQiOiJhdXRoLmF0bGFzc2lhbi5jb20tUkVGUkVTSC1hMjFjYWFhZS1hNzkwLTQ0YWQtODQ1Zi00MDE1NGM1ODRhZTYiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI0ZGQ0NTJmNS0wYzQxLTQ1N2EtYTk4Ny1lOTc0ZTYyOWMzYjYiLCJzdWIiOiI3MTIwMjA6ZjRiZjM3MjMtZWM0MS00Nzk5LTg4MmUtY2FmY2UyMzgyNGZlIiwibmJmIjoxNzYwNjIwNTA2LCJpc3MiOiJodHRwczovL2F1dGguYXRsYXNzaWFuLmNvbSIsImlhdCI6MTc2MDYyMDUwNiwiZXhwIjoxNzY4Mzk2NTA2LCJhdWQiOiIyNUhEREZQU21SOVJmd1lpdlFBRE45REtoWkNkTDI2QiIsImh0dHBzOi8vaWQuYXRsYXNzaWFuLmNvbS9yZWZyZXNoX2NoYWluX2lkIjoiMjVIRERGUFNtUjlSZndZaXZRQUROOURLaFpDZEwyNkItNzEyMDIwOmY0YmYzNzIzLWVjNDEtNDc5OS04ODJlLWNhZmNlMjM4MjRmZS00OTExNzNkZS0xY2U3LTRjYzAtOWViMC03MDgyYzgxMzVjYzciLCJodHRwczovL2lkLmF0bGFzc2lhbi5jb20vYXRsX3Rva2VuX3R5cGUiOiJST1RBVElOR19SRUZSRVNIIiwidmVyaWZpZWQiOiJ0cnVlIiwiaHR0cHM6Ly9pZC5hdGxhc3NpYW4uY29tL3BhcmVudF9hY2Nlc3NfdG9rZW5faWQiOiI1MjRlNGIwYy1lMjIyLTQ3YzktYjlhOS02ZmJhZGFmZWI1ZmMiLCJodHRwczovL2lkLmF0bGFzc2lhbi5jb20vcHJvY2Vzc1JlZ2lvbiI6InVzLXdlc3QtMiIsImh0dHBzOi8vaWQuYXRsYXNzaWFuLmNvbS91anQiOiI2ZTEwYWYyZS1mNjQ4LTRjNjktYWRiMy0zNzZmMjFmZjk1ZjYiLCJodHRwczovL2lkLmF0bGFzc2lhbi5jb20vc2Vzc2lvbl9pZCI6IjVhYmE2OTJiLWFlOTgtNDE4ZC1iNzBmLWQ3ZGRiMTFjNWNjMSIsInNjb3BlIjoicmVhZDpqaXJhLXdvcmsgb2ZmbGluZV9hY2Nlc3Mgd3JpdGU6amlyYS13b3JrIiwiaHR0cHM6Ly9pZC5hdGxhc3NpYW4uY29tL3ZlcmlmaWVkIjp0cnVlfQ.KH3ssWT6vAHBtrFHsTRP1uccwyElEflYmXrMr6N_KULN12jrrYqmSJ05A7q3HBxLEXfhEqhhazX0LKONS0KE7ZIWVQ_DdhWMVMLqGjxAfdnO5P9gSSd570zQJzz2H-d-2mpnYLbycSeRtHwYIYw6fBLYrCQDbUiQeF3oEsS9NCBGGU5qMAVCh8nJ-IjQPLJwD5FhIbd0ueij75fKBVT1qTHKv83_jMnPniUv9R549aHw47bOJnjMLLTLx1yTSQnG1kb30khPTqAgZ2MgD_9HeAKfQKEEisXBGsEHR0HKxEVro0YFhzgsuMQiLGEEtq93Gy34oFY-oMpdGHWEkCkZSQ')
    localStorage.setItem('jira_token', 'eyJraWQiOiJhdXRoLmF0bGFzc2lhbi5jb20tQUNDRVNTLTk0ZTczYTkwLTUxYWQtNGFjMS1hOWFjLWU4NGUwNDVjNDU3ZCIsImFsZyI6IlJTMjU2In0.eyJqdGkiOiI1MjRlNGIwYy1lMjIyLTQ3YzktYjlhOS02ZmJhZGFmZWI1ZmMiLCJzdWIiOiI3MTIwMjA6ZjRiZjM3MjMtZWM0MS00Nzk5LTg4MmUtY2FmY2UyMzgyNGZlIiwibmJmIjoxNzYwNjIwNTA2LCJpc3MiOiJodHRwczovL2F1dGguYXRsYXNzaWFuLmNvbSIsImlhdCI6MTc2MDYyMDUwNiwiZXhwIjoxNzYwNjI0MTA2LCJhdWQiOiIyNUhEREZQU21SOVJmd1lpdlFBRE45REtoWkNkTDI2QiIsImh0dHBzOi8vYXRsYXNzaWFuLmNvbS9zeXN0ZW1BY2NvdW50RW1haWwiOiI0ZGU5MTE5YS0zNTUwLTQ3NjgtYjNkNi00YTA0NGRmMThiMDlAY29ubmVjdC5hdGxhc3NpYW4uY29tIiwiY2xpZW50X2lkIjoiMjVIRERGUFNtUjlSZndZaXZRQUROOURLaFpDZEwyNkIiLCJodHRwczovL2F0bGFzc2lhbi5jb20vc3lzdGVtQWNjb3VudElkIjoiNzEyMDIwOjY0MGVhNTk1LTM0MTctNGMwZC04MjM0LTI0MWUxZTJmMDU5MiIsImh0dHBzOi8vaWQuYXRsYXNzaWFuLmNvbS9zZXNzaW9uX2lkIjoiNWFiYTY5MmItYWU5OC00MThkLWI3MGYtZDdkZGIxMWM1Y2MxIiwiaHR0cHM6Ly9pZC5hdGxhc3NpYW4uY29tL3VqdCI6IjZlMTBhZjJlLWY2NDgtNGM2OS1hZGIzLTM3NmYyMWZmOTVmNiIsImh0dHBzOi8vYXRsYXNzaWFuLmNvbS9hdXRoUHJvZmlsZSI6Im9hdXRoLmVjb3N5c3RlbS5vYXV0aEludGVncmF0aW9uIiwic2NvcGUiOiJvZmZsaW5lX2FjY2VzcyByZWFkOmppcmEtd29yayB3cml0ZTpqaXJhLXdvcmsiLCJodHRwczovL2lkLmF0bGFzc2lhbi5jb20vYXRsX3Rva2VuX3R5cGUiOiJBQ0NFU1MiLCJodHRwczovL2F0bGFzc2lhbi5jb20vZmlyc3RQYXJ0eSI6ZmFsc2UsImh0dHBzOi8vYXRsYXNzaWFuLmNvbS92ZXJpZmllZCI6dHJ1ZSwiaHR0cHM6Ly9hdGxhc3NpYW4uY29tL2VtYWlsRG9tYWluIjoia2lzcmFjb3JwLmNvbSIsImh0dHBzOi8vaWQuYXRsYXNzaWFuLmNvbS9yZWZyZXNoX2NoYWluX2lkIjoiMjVIRERGUFNtUjlSZndZaXZRQUROOURLaFpDZEwyNkItNzEyMDIwOmY0YmYzNzIzLWVjNDEtNDc5OS04ODJlLWNhZmNlMjM4MjRmZS00OTExNzNkZS0xY2U3LTRjYzAtOWViMC03MDgyYzgxMzVjYzciLCJodHRwczovL2lkLmF0bGFzc2lhbi5jb20vcHJvY2Vzc1JlZ2lvbiI6InVzLXdlc3QtMiIsImh0dHBzOi8vYXRsYXNzaWFuLmNvbS9vYXV0aENsaWVudElkIjoiMjVIRERGUFNtUjlSZndZaXZRQUROOURLaFpDZEwyNkIiLCJodHRwczovL2lkLmF0bGFzc2lhbi5jb20vcnRpIjoiNGRkNDUyZjUtMGM0MS00NTdhLWE5ODctZTk3NGU2MjljM2I2IiwiaHR0cHM6Ly9hdGxhc3NpYW4uY29tLzNsbyI6dHJ1ZSwiaHR0cHM6Ly9pZC5hdGxhc3NpYW4uY29tL3ZlcmlmaWVkIjp0cnVlLCJodHRwczovL2F0bGFzc2lhbi5jb20vc3lzdGVtQWNjb3VudEVtYWlsRG9tYWluIjoiY29ubmVjdC5hdGxhc3NpYW4uY29tIn0.p145Mn3Xi51gBj1kwQCIwRbaORHXXLyF_0mMGfgz41jf_GuJyCK4Son5rzFEjPm1CRXb-uFqkDJneLhuNYhZC-9l-3502filwLzvaj7uwYlcBNex5zITO4WooQ91nUD8YpIZjL4BoC6JqhKiVIsk40AlNE9V5rpdZYc5ofaFRUFkYiCKrBvnytFaVjsESGhsxlfy6Ef6npYACvoABtHBcUNdRJFqlleVYKYl8WLAYskUHfpNaaPVSL0ZhHqPSr0IKVKCpRg9Xjm1GrgZroodS0KNPw3IGVibG63XPjdkx3rWQRDoUAorB9903at9tVqkio7siybJjfY16qgOU3TDzQ.eyJqdGkiOiI0ZGQ0NTJmNS0wYzQxLTQ1N2EtYTk4Ny1lOTc0ZTYyOWMzYjYiLCJzdWIiOiI3MTIwMjA6ZjRiZjM3MjMtZWM0MS00Nzk5LTg4MmUtY2FmY2UyMzgyNGZlIiwibmJmIjoxNzYwNjIwNTA2LCJpc3MiOiJodHRwczovL2F1dGguYXRsYXNzaWFuLmNvbSIsImlhdCI6MTc2MDYyMDUwNiwiZXhwIjoxNzY4Mzk2NTA2LCJhdWQiOiIyNUhEREZQU21SOVJmd1lpdlFBRE45REtoWkNkTDI2QiIsImh0dHBzOi8vaWQuYXRsYXNzaWFuLmNvbS9yZWZyZXNoX2NoYWluX2lkIjoiMjVIRERGUFNtUjlSZndZaXZRQUROOURLaFpDZEwyNkItNzEyMDIwOmY0YmYzNzIzLWVjNDEtNDc5OS04ODJlLWNhZmNlMjM4MjRmZS00OTExNzNkZS0xY2U3LTRjYzAtOWViMC03MDgyYzgxMzVjYzciLCJodHRwczovL2lkLmF0bGFzc2lhbi5jb20vYXRsX3Rva2VuX3R5cGUiOiJST1RBVElOR19SRUZSRVNIIiwidmVyaWZpZWQiOiJ0cnVlIiwiaHR0cHM6Ly9pZC5hdGxhc3NpYW4uY29tL3BhcmVudF9hY2Nlc3NfdG9rZW5faWQiOiI1MjRlNGIwYy1lMjIyLTQ3YzktYjlhOS02ZmJhZGFmZWI1ZmMiLCJodHRwczovL2lkLmF0bGFzc2lhbi5jb20vcHJvY2Vzc1JlZ2lvbiI6InVzLXdlc3QtMiIsImh0dHBzOi8vaWQuYXRsYXNzaWFuLmNvbS91anQiOiI2ZTEwYWYyZS1mNjQ4LTRjNjktYWRiMy0zNzZmMjFmZjk1ZjYiLCJodHRwczovL2lkLmF0bGFzc2lhbi5jb20vc2Vzc2lvbl9pZCI6IjVhYmE2OTJiLWFlOTgtNDE4ZC1iNzBmLWQ3ZGRiMTFjNWNjMSIsInNjb3BlIjoicmVhZDpqaXJhLXdvcmsgb2ZmbGluZV9hY2Nlc3Mgd3JpdGU6amlyYS13b3JrIiwiaHR0cHM6Ly9pZC5hdGxhc3NpYW4uY29tL3ZlcmlmaWVkIjp0cnVlfQ.KH3ssWT6vAHBtrFHsTRP1uccwyElEflYmXrMr6N_KULN12jrrYqmSJ05A7q3HBxLEXfhEqhhazX0LKONS0KE7ZIWVQ_DdhWMVMLqGjxAfdnO5P9gSSd570zQJzz2H-d-2mpnYLbycSeRtHwYIYw6fBLYrCQDbUiQeF3oEsS9NCBGGU5qMAVCh8nJ-IjQPLJwD5FhIbd0ueij75fKBVT1qTHKv83_jMnPniUv9R549aHw47bOJnjMLLTLx1yTSQnG1kb30khPTqAgZ2MgD_9HeAKfQKEEisXBGsEHR0HKxEVro0YFhzgsuMQiLGEEtq93Gy34oFY-oMpdGHWEkCkZSQ')
     const res3 = await createIssue()
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


async function createIssue() {
  error.value = ""
  issueKey.value = ""
  if (!token.value) {
    error.value = "Please connect Jira first."
    return
  }

  try {
    // discover Jira Cloud site
    const resources = await axios.get(
      "https://api.atlassian.com/oauth/token/accessible-resources",
      { headers: { Authorization: `Bearer ${token.value}` } }
    )
    const cloudId = resources.data[0].id

    // create issue
    const res2 = await axios.post(
      `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/issue`,
      {
        fields: {
          project: { key: "LY" },
          summary: summary.value,
          "description": {
  "type": "doc",
  "version": 1,
  "content": [
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "my description"
        }
      ]
    }
  ]
},
          issuetype: { name: "Task" },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
      }
    )
    issueKey.value = res2.data.key
  } catch (err: any) {
    // try refresh if token expired
    if (err.response?.status === 401) {
      await refreshAccessToken()
      await createIssue()
      return
    }
    console.error(err.response?.data || err.message)
    error.value =
      err.response?.data?.errorMessages?.[0] ||
      err.message ||
      "Failed to create issue"
  }
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
