<template>
  <section>
    <header class="tree-header">
      <h2>Breakdown</h2>
      <div class="filters">
        <label>
          Granularity
          <select v-model="granularity">
            <option value="coarse">2-4 week epics</option>
            <option value="balanced">Balanced</option>
            <option value="detailed">0.5-2 day tasks</option>
          </select>
        </label>
      </div>
    </header>
    <ul class="tree">
      <li v-for="epic in value.epics" :key="epic.id">
        <details open>
          <summary>
            <strong>{{ epic.title }}</strong>
            <small>Business value: {{ epic.businessValue ?? 'TBD' }}</small>
          </summary>
          <p>{{ epic.description }}</p>
          <ul>
            <li v-for="story in epic.stories" :key="story.id">
              <details>
                <summary>{{ story.title }}</summary>
                <p>{{ story.description }}</p>
                <ul>
                  <li v-for="task in story.tasks" :key="task.id">
                    <span>{{ task.title }}</span>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </details>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { BreakdownTree } from '../types';

const props = defineProps<{
  value: BreakdownTree;
  granularity?: 'coarse' | 'balanced' | 'detailed';
}>();

const emit = defineEmits<{
  (event: 'update:granularity', value: 'coarse' | 'balanced' | 'detailed'): void;
}>();

const granularity = computed({
  get: () => props.granularity ?? 'balanced',
  set: (value: 'coarse' | 'balanced' | 'detailed') => emit('update:granularity', value)
});

const value = computed(() => props.value);
</script>

<style scoped>
.tree-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.tree {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0;
}

details {
  background: white;
  border-radius: 0.75rem;
  border: 1px solid #cbd5f5;
  padding: 1rem 1.25rem;
  box-shadow: 0 10px 30px -20px rgba(15, 23, 42, 0.3);
}

summary {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

summary strong {
  font-size: 1.1rem;
}
</style>
