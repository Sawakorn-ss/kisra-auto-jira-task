<template>
  <div class="auth-shell" :style="{ '--auth-background': backgroundImage }">
    <main class="auth-card">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import backgroundAsset from '~/assets/images/background.png?url'

const backgroundImage = computed(() => `url('${backgroundAsset}')`)
</script>

<style scoped>
.auth-shell {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  position: relative;
  overflow: hidden;
  background: radial-gradient(circle at top, #dbeafe, #f1f5f9 65%);
  background: var(--auth-background), radial-gradient(circle at top, #dbeafe, #f1f5f9 65%);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.auth-shell::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.08);
  pointer-events: none;
  z-index: 0;
}

.auth-card {
  width: min(500px, 90%);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 2rem;
  padding: 3.5rem 3rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1), 0 8px 32px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
}
</style>
