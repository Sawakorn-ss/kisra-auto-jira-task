<template>
  <section class="page">
    <header class="page-header">
      <h2>Jira Integration</h2>
      <button type="button" class="primary" :disabled="isLoading.metadata" @click="loadMetadata">
        {{ metadataButtonLabel }}
      </button>
    </header>

    <form class="form" @submit.prevent>
      <label>
        Jira Site URL
        <input
          type="url"
          v-model="jira.siteUrl"
          placeholder="https://your-domain.atlassian.net"
          autocomplete="off"
          required
        />
      </label>
      <label>
        Project Key
        <input type="text" v-model="jira.projectKey" placeholder="ABC" autocomplete="off" required />
      </label>
      <label>
        Account Email
        <input
          type="email"
          v-model="jira.email"
          placeholder="admin@your-domain.com"
          autocomplete="off"
          required
        />
      </label>
      <label>
        API Token
        <input type="password" v-model="jira.apiToken" placeholder="Atlassian API token" required />
      </label>
    </form>

    <section class="metadata-grid">
      <article class="metadata-card">
        <header>
          <h3>Boards</h3>
          <button type="button" :disabled="isLoading.boards" @click="refreshBoards">Refresh</button>
        </header>
        <select v-model.number="selectedBoardId" :disabled="!jira.boards.length">
          <option disabled value="">Select a board</option>
          <option v-for="board in jira.boards" :key="board.id" :value="board.id">
            {{ board.name }} · {{ board.type }}
          </option>
        </select>
        <p v-if="!jira.boards.length" class="metadata-empty">
          Load metadata to list boards associated with the project.
        </p>
      </article>

      <article class="metadata-card">
        <header>
          <h3>Assignable Users</h3>
          <button type="button" :disabled="isLoading.users" @click="refreshAssignableUsers">Refresh</button>
        </header>
        <select v-model="selectedAssigneeId" :disabled="!jira.assignableUsers.length">
          <option disabled value="">Select an assignee</option>
          <option v-for="user in jira.assignableUsers" :key="user.accountId" :value="user.accountId">
            {{ user.displayName }} <span v-if="user.emailAddress">({{ user.emailAddress }})</span>
          </option>
        </select>
        <p v-if="!jira.assignableUsers.length" class="metadata-empty">
          Refresh users to fetch assignable collaborators for the chosen project.
        </p>
      </article>

      <article class="metadata-card">
        <header>
          <h3>Issue Types</h3>
          <button type="button" :disabled="isLoading.issueTypes" @click="refreshIssueTypes">Refresh</button>
        </header>
        <select v-model="taskForm.issueTypeId" :disabled="!issueTypes.length">
          <option disabled value="">Select an issue type</option>
          <option
            v-for="issueType in issueTypes"
            :key="issueType.id"
            :value="issueType.id"
          >
            {{ issueType.name }} <span v-if="issueType.subtask">· Sub-task</span>
          </option>
        </select>
        <p v-if="!issueTypes.length" class="metadata-empty">
          Issue type metadata helps the task form validate required fields.
        </p>
      </article>
    </section>

    <section class="task-card">
      <header>
        <h3>Create Task</h3>
        <button
          type="button"
          class="ghost"
          :disabled="!jira.isConnected || isLoading.create"
          @click="prefillFromDraft"
        >
          Prefill from Draft
        </button>
      </header>
      <form class="task-form" @submit.prevent="handleCreateTask">
        <label>
          Summary
          <input type="text" v-model="taskForm.summary" placeholder="Task summary" required />
        </label>
        <label>
          Description
          <textarea
            v-model="taskForm.description"
            placeholder="Details, acceptance criteria, context..."
            rows="5"
          />
        </label>
        <div class="task-form__actions">
          <button type="submit" class="primary" :disabled="isLoading.create">
            {{ isLoading.create ? 'Creating…' : 'Create Jira Task' }}
          </button>
        </div>
      </form>
    </section>

    <JiraFieldMapper
      :value="jira.fieldMapping"
      :connection="jira"
      @update:value="updateFieldMapping"
      @save="saveFieldMapping"
    />
    <StatusToasts />
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, reactive } from 'vue';
import JiraFieldMapper from '../../../components/JiraFieldMapper.vue';
import StatusToasts from '../../../components/StatusToasts.vue';
import { useRequirementStore } from '../../../stores/requirementStore';
import { useStatusStore } from '../../../stores/statusStore';

const requirementStore = useRequirementStore();
const statusStore = useStatusStore();
const { jira, rawText } = storeToRefs(requirementStore);
const runtimeConfig = useRuntimeConfig();
const apiBaseUrl = runtimeConfig.public.apiBaseUrl || 'http://localhost:3001';

if (!jira.value.siteUrl && runtimeConfig.public.jiraDefaultSiteUrl) {
  requirementStore.updateJiraState({ siteUrl: runtimeConfig.public.jiraDefaultSiteUrl });
}

if (!jira.value.projectKey && runtimeConfig.public.jiraDefaultProjectKey) {
  requirementStore.updateJiraState({ projectKey: runtimeConfig.public.jiraDefaultProjectKey });
}

if (!jira.value.email && runtimeConfig.public.jiraDefaultEmail) {
  requirementStore.updateJiraState({ email: runtimeConfig.public.jiraDefaultEmail });
}

if (!jira.value.apiToken && runtimeConfig.public.jiraDefaultApiToken) {
  requirementStore.updateJiraState({ apiToken: runtimeConfig.public.jiraDefaultApiToken });
}

const isLoading = reactive({
  metadata: false,
  boards: false,
  users: false,
  issueTypes: false,
  create: false
});

const taskForm = reactive({
  summary: '',
  description: '',
  issueTypeId: '',
  assigneeId: ''
});

const selectedBoardId = computed({
  get: () => jira.value.selectedBoardId ?? '',
  set: (value: number | '') => {
    requirementStore.updateJiraState({
      selectedBoardId: value === '' ? undefined : value
    });
  }
});

const selectedAssigneeId = computed({
  get: () => jira.value.selectedAssigneeId ?? '',
  set: (value: string | '') => {
    requirementStore.updateJiraState({
      selectedAssigneeId: value === '' ? undefined : value
    });
    taskForm.assigneeId = value ?? '';
  }
});

const issueTypes = computed(() => jira.value.createMeta?.issueTypes ?? []);
const metadataButtonLabel = computed(() =>
  jira.value.isConnected ? 'Refresh Metadata' : 'Load Jira Metadata'
);

function requireCredentials() {
  if (!jira.value.siteUrl || !jira.value.projectKey) {
    throw new Error('Please provide Jira site URL and project key');
  }
  if (jira.value.authMethod === 'apiToken' && (!jira.value.email || !jira.value.apiToken)) {
    throw new Error('Please provide Jira email and API token');
  }
}

function handleError(error: unknown, title: string) {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : 'Unexpected error occurred';
  statusStore.pushToast({
    title,
    message,
    variant: 'error'
  });
}

async function loadMetadata() {
  try {
    requireCredentials();
    isLoading.metadata = true;
    await Promise.all([
      requirementStore.fetchJiraBoards(apiBaseUrl),
      requirementStore.fetchAssignableUsers(apiBaseUrl),
      requirementStore.fetchCreateMeta(apiBaseUrl)
    ]);

    const defaultIssueType = issueTypes.value.find((type) => !type.subtask) ?? issueTypes.value[0];

    requirementStore.updateJiraState({
      isConnected: true,
      selectedAssigneeId: jira.value.selectedAssigneeId,
      selectedBoardId: jira.value.selectedBoardId
    });

    if (!taskForm.assigneeId && jira.value.assignableUsers.length) {
      const defaultAssignee = jira.value.assignableUsers[0];
      requirementStore.updateJiraState({ selectedAssigneeId: defaultAssignee.accountId });
      taskForm.assigneeId = defaultAssignee.accountId;
    } else {
      taskForm.assigneeId = jira.value.selectedAssigneeId ?? '';
    }

    if (defaultIssueType) {
      taskForm.issueTypeId = defaultIssueType.id;
    }

    statusStore.pushToast({
      title: 'Jira metadata loaded',
      message: 'Boards, assignable users, and issue types are ready.',
      variant: 'success'
    });
  } catch (error) {
    handleError(error, 'Failed to load Jira metadata');
  } finally {
    isLoading.metadata = false;
  }
}

async function refreshBoards() {
  try {
    requireCredentials();
    isLoading.boards = true;
    await requirementStore.fetchJiraBoards(apiBaseUrl);
    statusStore.pushToast({
      title: 'Boards refreshed',
      message: `Loaded ${jira.value.boards.length} boards.`,
      variant: 'success'
    });
  } catch (error) {
    handleError(error, 'Unable to refresh boards');
  } finally {
    isLoading.boards = false;
  }
}

async function refreshAssignableUsers() {
  try {
    requireCredentials();
    isLoading.users = true;
    await requirementStore.fetchAssignableUsers(apiBaseUrl);
    statusStore.pushToast({
      title: 'Assignable users refreshed',
      message: `Loaded ${jira.value.assignableUsers.length} users.`,
      variant: 'success'
    });
  } catch (error) {
    handleError(error, 'Unable to refresh assignable users');
  } finally {
    isLoading.users = false;
  }
}

async function refreshIssueTypes() {
  try {
    requireCredentials();
    isLoading.issueTypes = true;
    const meta = await requirementStore.fetchCreateMeta(apiBaseUrl);
    if (meta.issueTypes.length && !taskForm.issueTypeId) {
      const nonSubtask = meta.issueTypes.find((type) => !type.subtask) ?? meta.issueTypes[0];
      taskForm.issueTypeId = nonSubtask.id;
    }
    statusStore.pushToast({
      title: 'Issue types refreshed',
      message: `Loaded ${meta.issueTypes.length} issue types.`,
      variant: 'success'
    });
  } catch (error) {
    handleError(error, 'Unable to refresh issue types');
  } finally {
    isLoading.issueTypes = false;
  }
}

async function handleCreateTask() {
  try {
    requireCredentials();
    if (!taskForm.issueTypeId) {
      throw new Error('Please choose an issue type before creating a task.');
    }

    isLoading.create = true;
    const response = await requirementStore.createJiraTask(apiBaseUrl, {
      summary: taskForm.summary,
      description: taskForm.description || undefined,
      issueTypeId: taskForm.issueTypeId,
      assigneeId: taskForm.assigneeId || jira.value.selectedAssigneeId || undefined
    });

    statusStore.pushToast({
      title: 'Jira task created',
      message: `Issue ${response.key} created successfully.`,
      variant: 'success'
    });

    taskForm.summary = '';
    taskForm.description = '';
  } catch (error) {
    handleError(error, 'Failed to create Jira task');
  } finally {
    isLoading.create = false;
  }
}

function prefillFromDraft() {
  taskForm.summary = taskForm.summary || rawText.value.slice(0, 200) || 'Requirement Task';
  taskForm.description = taskForm.description || rawText.value;
}

function updateFieldMapping(mapping: typeof jira.value.fieldMapping) {
  requirementStore.updateJiraState({ fieldMapping: mapping });
}

function saveFieldMapping(mapping: typeof jira.value.fieldMapping) {
  statusStore.pushToast({
    title: 'Mapping saved',
    message: 'Field mapping preset stored for this project.',
    variant: 'success'
  });
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

input {
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid #cbd5f5;
}

.metadata-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
}

.metadata-card,
.task-card {
  background: white;
  border-radius: 0.75rem;
  border: 1px solid #cbd5f5;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.metadata-card header,
.task-card header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

select,
textarea {
  border: 1px solid #cbd5f5;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  background: white;
}

.metadata-empty {
  color: #64748b;
  font-size: 0.9rem;
}

.task-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.task-form__actions {
  display: flex;
  justify-content: flex-end;
}

button {
  cursor: pointer;
  border-radius: 0.75rem;
  border: 1px solid #0f172a;
  padding: 0.5rem 1rem;
  background: transparent;
  color: #0f172a;
}

button.primary {
  background: #1d4ed8;
  color: white;
  border-color: #1d4ed8;
}

button.ghost {
  border-color: #94a3b8;
  color: #475569;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
