// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  ssr: true,
  srcDir: 'src',
  modules: ['@pinia/nuxt', '@vueuse/nuxt'],
  runtimeConfig: {
    public: {
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
