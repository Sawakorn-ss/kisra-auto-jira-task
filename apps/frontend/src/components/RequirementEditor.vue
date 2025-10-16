<template>
  <section class="editor">
    <header>
      <h2>Requirement Editor</h2>
      <div class="actions">
        <button type="button" @click="$emit('refine')">Refine</button>
        <button type="button" @click="$emit('breakdown')">Breakdown</button>
      </div>
    </header>
    <textarea
      v-model="localValue"
      class="editor__input"
      placeholder="Describe the product requirements here..."
    />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{ (event: 'update:modelValue', value: string): void }>();

const localValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value)
});
</script>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.actions {
  display: flex;
  gap: 0.75rem;
}

textarea {
  min-height: 320px;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid #cbd5f5;
  resize: vertical;
  font-family: 'Fira Code', monospace;
}
</style>
