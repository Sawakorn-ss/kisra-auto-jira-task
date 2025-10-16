<template>
  <div class="flex flex-col items-center justify-center h-full text-center">
    <h2 class="text-2xl font-semibold text-gray-800">Select a Project</h2>
    <p class="text-gray-500 text-sm mt-2">
      Pick a project to start adding new requirements<br />
      Keep everything connected and easy to track
    </p>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import RequirementEditor from '../components/RequirementEditor.vue'
import DryRunBanner from '../components/DryRunBanner.vue'
import StatusToasts from '../components/StatusToasts.vue'
import { useRequirementStore } from '../stores/requirementStore'
import { useStatusStore } from '../stores/statusStore'

const requirementStore = useRequirementStore()
const statusStore = useStatusStore()

const draft = storeToRefs(requirementStore)

function toggleDryRun () {
  requirementStore.setDryRun(false)
  statusStore.pushToast({
    title: 'Dry-run disabled',
    message: 'Changes will now be applied directly to Jira.',
    variant: 'info'
  })
}

function handleRefine () {
  statusStore.pushToast({
    title: 'Refine queued',
    message: 'The AI refinement service will update the draft shortly.',
    variant: 'info'
  })
}

function handleBreakdown () {
  statusStore.pushToast({
    title: 'Breakdown queued',
    message: 'The AI orchestrator will generate a structured plan.',
    variant: 'info'
  })
}
</script>

<style scoped>
div {
  color: black;
}
</style>
