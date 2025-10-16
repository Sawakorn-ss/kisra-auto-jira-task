<template>
  <section class="login">
    <header class="login__header">
      <h1>Kisra Auto Jira Task</h1>
      <p>Sign in to orchestrate AI-assisted requirements and Jira automation.</p>
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
        />
      </label>

      <label class="password-field">
        Password
        <div class="password-field__input">
          <input
            :type="passwordVisible ? 'text' : 'password'"
            v-model="credentials.password"
            autocomplete="current-password"
            placeholder="••••••••"
            required
          />
          <button type="button" class="ghost" @click="togglePasswordVisibility">
            {{ passwordVisible ? 'Hide' : 'Show' }}
          </button>
        </div>
      </label>

      <button type="submit" class="primary" :disabled="isSubmitting">
        {{ isSubmitting ? 'Signing in…' : 'Sign in' }}
      </button>
    </form>

    <footer class="login__footer">
      <small>Need access? Contact your workspace administrator.</small>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

definePageMeta({
  layout: 'auth'
});

const credentials = reactive({
  email: '',
  password: ''
});

const passwordVisible = ref(false);
const isSubmitting = ref(false);

function togglePasswordVisibility() {
  passwordVisible.value = !passwordVisible.value;
}

async function handleSubmit() {
  if (isSubmitting.value) {
    return;
  }

  isSubmitting.value = true;
  try {
    // TODO: replace with real authentication call once backend endpoint is ready.
    await new Promise((resolve) => {
      setTimeout(resolve, 600);
    });
    // Placeholder: log credentials for now; replace with navigate/auth store logic.
    console.info('Login not yet implemented', credentials);
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.login__header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
}

.login__header h1 {
  font-size: 1.6rem;
  font-weight: 700;
  color: #0f172a;
}

.login__header p {
  color: #475569;
  font-size: 0.95rem;
}

.login__form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-weight: 600;
  color: #0f172a;
}

input {
  border-radius: 0.75rem;
  border: 1px solid #cbd5f5;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  background: #f8fafc;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  outline: none;
}

.password-field__input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.password-field__input input {
  flex: 1;
  background: #f8fafc;
}

button.primary {
  width: 100%;
  border-radius: 0.75rem;
  border: 1px solid #1d4ed8;
  padding: 0.75rem 1rem;
  font-weight: 600;
  background: #1d4ed8;
  color: white;
  cursor: pointer;
  transition: transform 0.2s ease;
}

button.primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

button.primary:not(:disabled):hover {
  transform: translateY(-1px);
}

button.ghost {
  border: none;
  background: transparent;
  color: #2563eb;
  font-weight: 600;
  cursor: pointer;
  padding: 0.35rem 0.6rem;
  border-radius: 0.6rem;
}

button.ghost:hover {
  background: rgba(37, 99, 235, 0.08);
}

.login__footer {
  text-align: center;
  color: #64748b;
  font-size: 0.9rem;
}
</style>
