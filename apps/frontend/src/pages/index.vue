<template>
  <div class="flex flex-col items-center justify-center h-full text-center">
    <h2 class="text-2xl font-semibold text-gray-800">Select a Project</h2>
    <p class="text-gray-500 text-sm mt-2">
      Pick a project to start adding new requirements<br />
      Keep everything connected and easy to track
    </p>

    <div class="flex flex-col items-center mt-6 space-y-4">
      <select
        v-model="selectedProject"
        class="border border-gray-300 rounded-lg px-4 py-2 w-64 text-gray-700 focus:ring-2 focus:ring-black"
      >
        <option disabled value="">Project Name</option>
        <option v-for="p in projects" :key="p.id" :value="p.key">
          {{ p.name }}
        </option>
      </select>

      <button
        @click="selectProject"
        class="bg-black text-white px-8 py-2.5 rounded-full hover:bg-gray-800 transition"
      >
        Select Project
      </button>
    </div>
  </div>
</template>

<script setup>
const selectedProject = ref('')
const projects = ref([])

const selectProject = () => {
  if (!selectedProject.value) {
    alert('Please select a project first.')
    return
  }
  alert(`Selected: ${selectedProject.value}`)
}

// ✅ Fetch projects from Jira
const getProjects = async () => {
  const { apiBaseUrl } = useRuntimeConfig().public
  try {
    const data = await $fetch(`${apiBaseUrl}/rest/api/3/project/search`)
    projects.value = Array.isArray(data?.values) ? data.values : (Array.isArray(data) ? data : [])
  } catch (err) {
    console.error('Failed to load projects', err)
  }
}

onMounted(() => {
  getProjects()
})
</script>

<style scoped>
div {
  color: black;
}
</style>
