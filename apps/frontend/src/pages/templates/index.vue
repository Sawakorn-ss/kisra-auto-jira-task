<template>
  <section class="page">
    <header class="page-header">
      <h2>Templates</h2>
      <button type="button" @click="createTemplate">New Template</button>
    </header>

    <ul class="template-list">
      <li v-for="template in templates" :key="template.id">
        <article>
          <header>
            <h3>{{ template.name }}</h3>
            <small>v{{ template.version }}</small>
          </header>
          <p>{{ template.description }}</p>
        </article>
      </li>
    </ul>
    <StatusToasts />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import StatusToasts from '../../components/StatusToasts.vue';
import { useStatusStore } from '../../stores/statusStore';

interface TemplateSummary {
  id: string;
  name: string;
  description: string;
  version: number;
}

const statusStore = useStatusStore();
const templates = ref<TemplateSummary[]>([
  {
    id: 'vision-led',
    name: 'Vision-led Breakdown',
    description: 'Product vision to tasks with strong Gherkin acceptance criteria.',
    version: 1
  }
]);

function createTemplate() {
  statusStore.pushToast({
    title: 'Template creation',
    message: 'Template builder coming soon.',
    variant: 'info'
  });
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.template-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  padding: 0;
}

article {
  background: white;
  border-radius: 0.75rem;
  border: 1px solid #cbd5f5;
  padding: 1.25rem;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}
</style>
