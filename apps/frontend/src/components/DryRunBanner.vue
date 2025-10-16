<template>
  <div class="banner" role="status">
    <strong>Dry-run enabled.</strong>
    <span>Actions will be simulated without creating Jira issues.</span>
    <button type="button" @click="$emit('disable')">Disable</button>
  </div>
</template>

<style scoped>
.banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: #fef3c7;
  border: 1px solid #facc15;
  border-radius: 0.75rem;
  padding: 1rem 1.5rem;
}

button {
  background: transparent;
  border: 1px solid #f97316;
  color: #c2410c;
  border-radius: 9999px;
  padding: 0.5rem 1rem;
}
</style>
