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
  background: linear-gradient(135deg, #f0f1f3 0%, #e8dfc7 50%, #f5f3ef 100%);
  padding: 2rem 1rem;
}

.auth-card {
  width: min(400px, 100%);
  background: white;
  border-radius: 1.5rem;
  padding: 3rem 2.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
