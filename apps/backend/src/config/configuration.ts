export default () => ({
  http: {
    port: parseInt(process.env.PORT ?? '3001', 10),
    corsOrigin: process.env.CORS_ORIGIN ?? '*'
  },
  jira: {
    baseUrl: process.env.JIRA_BASE_URL ?? '',
    clientId: process.env.JIRA_CLIENT_ID ?? '',
    clientSecret: process.env.JIRA_CLIENT_SECRET ?? '',
    redirectUri: process.env.JIRA_REDIRECT_URI ?? ''
  },
  ai: {
    provider: process.env.AI_PROVIDER ?? 'openai',
    model: process.env.AI_MODEL ?? 'gpt-4.1-mini'
  }
});
