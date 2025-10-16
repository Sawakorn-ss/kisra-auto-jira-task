<template>
  <div class="app-shell">
    <header class="app-header">
      <div class="app-header__inner">
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
      </div>
    </header>
    <main class="app-main">
      <div class="app-main__inner">
        <slot />
      </div>
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
  padding: 1.5rem 0;
}

.app-header__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.app-header h1 {
  font-size: clamp(1.5rem, 1.2vw + 1rem, 2rem);
  margin: 0;
}

nav {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: opacity 0.2s ease;
}

nav a:hover {
  opacity: 0.8;
}

.app-main {
  flex: 1;
  padding: 2rem 0 3rem;
  min-height: 0;
}

.app-main__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

@media (min-width: 1600px) {
  .app-header__inner,
  .app-main__inner {
    max-width: 1440px;
  }
}

@media (min-width: 1920px) {
  .app-header__inner,
  .app-main__inner {
    max-width: 1600px;
  }
}
</style>
