<template>
  <div class="toast-stack" aria-live="polite" aria-atomic="true">
    <transition-group name="toast" tag="div">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast"
        :class="toast.variant"
      >
        <strong>{{ toast.title }}</strong>
        <p>{{ toast.message }}</p>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStatusStore } from '../stores/statusStore';

const statusStore = useStatusStore();
const toasts = computed(() => statusStore.toasts);
</script>

<style scoped>
.toast-stack {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  z-index: 40;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.2s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.toast {
  background: white;
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  box-shadow: 0 10px 30px -20px rgba(15, 23, 42, 0.4);
  min-width: 240px;
}

.toast.success {
  border-left: 6px solid #22c55e;
}

.toast.error {
  border-left: 6px solid #ef4444;
}

.toast.info {
  border-left: 6px solid #3b82f6;
}
</style>
