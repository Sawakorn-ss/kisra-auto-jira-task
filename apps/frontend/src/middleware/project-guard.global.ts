export default defineNuxtRouteMiddleware((to) => {
  if (to.path.startsWith('/project-')) {
    return navigateTo('/dashboard', { replace: true })
  }
})
