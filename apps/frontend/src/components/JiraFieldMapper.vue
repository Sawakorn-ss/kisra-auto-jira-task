<template>
  <section class="mapper">
    <header>
      <h2>Jira Field Mapping</h2>
      <button type="button" @click="$emit('save', localMapping)">Save Mapping</button>
    </header>
    <div class="grid">
      <label v-for="(value, key) in localMapping" :key="key">
        {{ formatKey(key) }}
        <input v-model="localMapping[key as keyof typeof localMapping]" type="text" />
      </label>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { JiraConnectionState, JiraFieldMapping } from '../types';

const props = defineProps<{
  value: Partial<JiraFieldMapping>;
  connection: JiraConnectionState;
}>();

const emit = defineEmits<{ (event: 'update:value', value: Partial<JiraFieldMapping>): void }>();

const localMapping = reactive({ ...props.value });

watch(
  () => props.value,
  (newValue) => {
    Object.assign(localMapping, newValue);
  }
);

watch(
  localMapping,
  (newValue) => {
    emit('update:value', { ...newValue });
  },
  { deep: true }
);

function formatKey(key: string) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase());
}
</script>

<style scoped>
.mapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  border: 1px solid #cbd5f5;
}

input {
  border: 1px solid #94a3b8;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
}
</style>
