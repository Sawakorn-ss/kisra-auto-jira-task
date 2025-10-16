<template>
  <dialog ref="dialog" class="diff-modal">
    <header>
      <h2>{{ title }}</h2>
      <button type="button" @click="close">Close</button>
    </header>
    <section>
      <slot />
    </section>
    <footer>
      <button type="button" class="primary" @click="emitApply">Apply to Jira</button>
    </footer>
  </dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
  open: boolean;
  title: string;
}>();

const emit = defineEmits<{
  (event: 'close'): void;
  (event: 'apply'): void;
}>();

const dialog = ref<HTMLDialogElement | null>(null);

function close() {
  dialog.value?.close();
  emit('close');
}

function emitApply() {
  emit('apply');
}

watch(
  () => props.open,
  (value) => {
    if (!dialog.value) return;
    if (value) {
      if (!dialog.value.open) dialog.value.showModal();
    } else if (dialog.value.open) {
      dialog.value.close();
      emit('close');
    }
  }
);

onMounted(() => {
  if (props.open && dialog.value && !dialog.value.open) {
    dialog.value.showModal();
  }
  dialog.value?.addEventListener('cancel', () => emit('close'));
});
</script>

<style scoped>
.diff-modal {
  padding: 0;
  border: none;
  border-radius: 1rem;
  width: min(720px, 90vw);
  background: #f8fafc;
}

header,
footer {
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
}

section {
  padding: 1.5rem;
  max-height: 60vh;
  overflow: auto;
}

.primary {
  background: #2563eb;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 9999px;
  font-weight: 600;
}
</style>
