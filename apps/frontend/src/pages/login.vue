<template>
  <section class="login">
    <div class="login__logo">
      <div class="logo-placeholder">
        Kisra Auto Jira Task
      </div>
    </div>

    <header class="login__header">
      <h1>Log in</h1>
    </header>

    <form class="login__form" @submit.prevent="handleSubmit">
      <label>
        Email
        <input
          v-model="credentials.email"
          type="email"
          inputmode="email"
          autocomplete="email"
          placeholder="you@company.com"
          required
        >
      </label>

      <label class="password-field">
        Password
        <div class="password-field__input">
          <input
            v-model="credentials.password"
            :type="passwordVisible ? 'text' : 'password'"
            autocomplete="current-password"
            placeholder="••••••••"
            required
          >
          <button type="button" class="password-toggle" @click="togglePasswordVisibility">
            <Icon :name="passwordVisible ? 'heroicons:eye-slash' : 'heroicons:eye'" class="toggle-icon" />
            {{ passwordVisible ? 'Hide' : 'Show' }}
          </button>
        </div>
      </label>

      <button type="submit" class="primary" :disabled="isSubmitting">
        {{ isSubmitting ? 'Logging in…' : 'Log in' }}
      </button>

      <p v-if="errorMessage" class="login__feedback login__feedback--error">
        {{ errorMessage }}
      </p>
      <p v-if="successMessage" class="login__feedback login__feedback--success">
        {{ successMessage }}
      </p>
    </form>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

definePageMeta({
  layout: 'auth'
})

const credentials = reactive({
  email: 'admin@mail.com',
  password: '1234'
})

const passwordVisible = ref(false)
const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

function togglePasswordVisibility () {
  passwordVisible.value = !passwordVisible.value
}

async function handleSubmit () {
  if (isSubmitting.value) {
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await new Promise((resolve) => {
      setTimeout(resolve, 400)
    })

    if (credentials.email.trim().toLowerCase() === 'admin@mail.com' && credentials.password === '1234') {
      successMessage.value = 'Log in successful. Redirecting to your workspace…'
      // TODO: replace with navigation to dashboard once auth flow is wired.
      setTimeout(() => {
        navigateTo('/dashboard')
      }, 900)
    } else {
      errorMessage.value = 'Invalid email or password. Please try again.'
    }
  } finally {
    isSubmitting.value = false
  }
}

//onmount log token
onMounted(() => {
  const runtimePublic = useRuntimeConfig().public;
  console.log('Token:', runtimePublic.token);
});
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.login__logo {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.logo-placeholder {
  padding: 0.5rem 1rem;
  font-size: 32px;
  font-weight: 600;
  color: #6b7280;
  text-align: center;
}

.login__header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  margin-bottom: 0.5rem;
}

.login__header h1 {
  font-size: 2rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.login__form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 500;
  color: #374151;
  font-size: 0.9rem;
}

input {
  border-radius: 0.75rem;
  border: 2px solid rgba(148, 163, 184, 0.7);
  padding: 0.875rem 1rem;
  font-size: 1rem;
  background: rgba(248, 250, 252, 0.92);
  color: #374151;
  transition: all 0.2s ease;
}

input::placeholder {
  color: rgba(107, 114, 128, 0.7);
}

input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  outline: none;
}

.password-field__input {
  position: relative;
  display: flex;
  align-items: center;
}

.password-field__input input {
  flex: 1;
  background: rgba(248, 250, 252, 0.92);
  padding-right: 4rem;
}

.password-toggle {
  position: absolute;
  right: 0.75rem;
  border: none;
  background: transparent;
  color: #6b7280;
  font-weight: 500;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.password-toggle:hover {
  background: rgba(107, 114, 128, 0.1);
}

.toggle-icon {
  width: 1rem;
  height: 1rem;
}

button.primary {
  width: 100%;
  border-radius: 1.5rem;
  border: none;
  padding: 0.875rem 1rem;
  font-weight: 600;
  background: #000000;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;
  margin-top: 0.5rem;
}

button.primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

button.primary:not(:disabled):hover {
  background: #1f2937;
  transform: translateY(-1px);
}

.login__feedback {
  margin: 0;
  font-size: 0.95rem;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
}

.login__feedback--error {
  color: #b91c1c;
  background: rgba(239, 68, 68, 0.12);
}

.login__feedback--success {
  color: #047857;
  background: rgba(16, 185, 129, 0.12);
}
</style>
