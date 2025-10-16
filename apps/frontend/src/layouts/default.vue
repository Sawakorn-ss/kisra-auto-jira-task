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

<script setup lang="ts">
import Sidebar from '~/components/Sidebar.vue'
</script>
