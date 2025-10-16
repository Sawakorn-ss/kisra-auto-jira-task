// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: true,
  srcDir: 'src',
  modules: ['@pinia/nuxt', '@vueuse/nuxt', 'nuxt-icon', '@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      token: process.env.token ,
      email: process.env.email ,
      apiBaseUrl: process.env.apiBaseUrl,
      JIRA_CLIENT_ID: process.env.JIRA_CLIENT_ID,
      JIRA_CLIENT_SECRET: process.env.JIRA_CLIENT_SECRET,
      JIRA_BASE_URL: process.env.JIRA_BASE_URL,
      JIRA_REDIRECT_URI: process.env.JIRA_REDIRECT_URI,
      JIRA_AUTH_URL: process.env.JIRA_AUTH_URL,
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
})
