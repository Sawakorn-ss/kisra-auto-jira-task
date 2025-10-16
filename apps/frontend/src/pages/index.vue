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
        <!-- <option v-for="p in prlue?.valuejects" :key="p.id" :value="p.key">
          {{ p.name }}
        </option> -->
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
  const runtimePublic = useRuntimeConfig().public
  try {
    const { data, error } = await fetch (
      'https://kisratech.atlassian.net/rest/api/3/project/search',
      {
        headers: {
          'Content-Type': 'application/json',
          // 🧠 ต้องใส่ token จริงของคุณ (จาก  Atlassian OAuth หรือ API token)
          'Authorization': 'Basic ' + btoa(runtimePublic.email + ':' + runtimePublic.token)
        },
      }
    )

    if (error.value) {
      console.error('Jira Error:', error.value)
      return
    }
    console.log(data.value)
    // Jira response structure: { values: [...] }
    selectedProject.value = data.value|| []
  } catch (err) {
    console.error(err)
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
