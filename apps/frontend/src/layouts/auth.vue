<template>
  <div class="auth-shell">
    <main class="auth-card">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.auth-shell {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at top, #dbeafe, #f1f5f9 55%);
  padding: 2rem 1rem;
}

.auth-card {
  width: min(420px, 100%);
  background: white;
  border-radius: 1rem;
  padding: 2.5rem 2rem;
  box-shadow: 0 30px 80px rgba(15, 23, 42, 0.15);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
