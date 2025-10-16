// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  ssr: true,
  srcDir: 'src',
  modules: ['@pinia/nuxt', '@vueuse/nuxt'],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3001',
      jiraApiBaseUrl: '',
      jiraOAuthClientId: ''
    }
  },
  typescript: {
    typeCheck: true,
    strict: true
  },
  app: {
    head: {
      title: 'Kisra Auto Jira Task',
      meta: [
        { name: 'description', content: 'AI-assisted requirement authoring with Jira automation' }
      ]
    }
  }
});
