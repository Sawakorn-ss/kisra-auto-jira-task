<template>
  <section class="page">
    <header class="page-header">
      <h2>Jira Integration</h2>
      <button type="button" @click="connect">{{ connectLabel }}</button>
    </header>

    <form class="form" @submit.prevent>
      <label>
        Jira Site URL
        <input type="url" v-model="jira.siteUrl" placeholder="https://your-domain.atlassian.net" />
      </label>
      <label>
        Project Key
        <input type="text" v-model="jira.projectKey" placeholder="ABC" />
      </label>
    </form>

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
import { computed } from 'vue';
import JiraFieldMapper from '../../../components/JiraFieldMapper.vue';
import StatusToasts from '../../../components/StatusToasts.vue';
import { useRequirementStore } from '../../../stores/requirementStore';
import { useStatusStore } from '../../../stores/statusStore';

const requirementStore = useRequirementStore();
const statusStore = useStatusStore();
const { jira } = storeToRefs(requirementStore);

const connectLabel = computed(() => (jira.value.isConnected ? 'Reconnect' : 'Connect to Jira'));

function connect() {
  requirementStore.updateJiraState({ isConnected: true });
  statusStore.pushToast({
    title: 'Jira connected',
    message: 'OAuth handshake completed successfully (simulated).',
    variant: 'success'
  });
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
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

input {
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid #cbd5f5;
}
</style>
