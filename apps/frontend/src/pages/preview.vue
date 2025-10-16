<template>
  <section class="page">
    <header class="page-header">
      <h2>Preview Breakdown</h2>
      <div class="actions">
        <label>
          <input type="checkbox" v-model="dryRunModel" />
          Dry-run mode
        </label>
        <button type="button" @click="openDiff">Open Diff</button>
      </div>
    </header>
    <BreakdownTree
      :value="breakdown"
      v-model:granularity="granularity"
    />
    <DiffModal
      :open="diffOpen"
      title="Pending Jira Changes"
      @apply="applyChanges"
      @close="diffOpen = false"
    >
      <pre>{{ previewJson }}</pre>
    </DiffModal>
    <StatusToasts />
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import BreakdownTree from '../components/BreakdownTree.vue';
import DiffModal from '../components/DiffModal.vue';
import StatusToasts from '../components/StatusToasts.vue';
import { useRequirementStore } from '../stores/requirementStore';
import { useStatusStore } from '../stores/statusStore';

const requirementStore = useRequirementStore();
const statusStore = useStatusStore();

const { breakdown, dryRun } = storeToRefs(requirementStore);
const diffOpen = ref(false);
const granularity = ref<'coarse' | 'balanced' | 'detailed'>('balanced');

const previewJson = computed(() => JSON.stringify(breakdown.value, null, 2));

const dryRunModel = computed({
  get: () => dryRun.value,
  set: (value: boolean) => requirementStore.setDryRun(value)
});

function openDiff() {
  diffOpen.value = true;
}

function applyChanges() {
  diffOpen.value = false;
  statusStore.pushToast({
    title: 'Sync started',
    message: dryRun.value
      ? 'Dry-run mode: no issues will be created.'
      : 'The Jira job queue has started creating issues.',
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
  align-items: center;
  justify-content: space-between;
}

.actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

pre {
  background: #0f172a;
  color: #f8fafc;
  padding: 1rem;
  border-radius: 0.75rem;
  overflow: auto;
  max-height: 45vh;
}
</style>
