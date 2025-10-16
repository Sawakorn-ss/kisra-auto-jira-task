<template>
  <div class="app-shell">
    <header class="app-header">
      <h1>Kisra Auto Jira Task</h1>
      <nav>
        <NuxtLink to="/">
          Editor
        </NuxtLink>
        <NuxtLink to="/preview">
          Preview
        </NuxtLink>
        <NuxtLink to="/settings/jira">
          Jira Settings
        </NuxtLink>
        <NuxtLink to="/templates">
          Templates
        </NuxtLink>
      </nav>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: #0f172a;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
}

nav {
  display: flex;
  gap: 1rem;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: 600;
}

main {
  flex: 1;
  padding: 2rem;
}
</style>
