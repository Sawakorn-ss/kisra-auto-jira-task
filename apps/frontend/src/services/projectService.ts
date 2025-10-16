import { useRuntimeConfig } from '#app'

export interface JiraProject {
  id: string
  key: string
  name: string
  description?: string
  projectTypeKey: string
  simplified: boolean
  style: string
  isPrivate: boolean
}

export interface JiraProjectsResponse {
  values: JiraProject[]
  total: number
  isLast?: boolean
  startAt?: number
  maxResults?: number
}

class ProjectService {
  private getBaseUrl () {
    const config = useRuntimeConfig()
    const baseUrl = config.public.apiBaseUrl
    return typeof baseUrl === 'string' && baseUrl.length > 0 ? baseUrl.replace(/\/$/, '') : ''
  }

  async getAllProjects (): Promise<JiraProject[]> {
    try {
      const baseURL = this.getBaseUrl()
      const response = await $fetch<JiraProjectsResponse>('/api/projects', baseURL ? { baseURL } : {})
      return response.values ?? []
    } catch (error) {
      console.error('Error fetching projects:', error)
      return [
        { id: '1', key: 'PROJ1', name: 'Project 1', projectTypeKey: 'software', simplified: false, style: 'classic', isPrivate: false },
        { id: '2', key: 'PROJ2', name: 'Project 2', projectTypeKey: 'software', simplified: false, style: 'classic', isPrivate: false },
        { id: '404', key: 'PROJ404', name: 'Project 404', projectTypeKey: 'software', simplified: false, style: 'classic', isPrivate: false }
      ]
    }
  }

  async getProject (projectId: string): Promise<JiraProject | null> {
    try {
      const baseURL = this.getBaseUrl()
      const response = await $fetch<JiraProject>(`/api/projects/${projectId}`, baseURL ? { baseURL } : {})
      return response
    } catch (error) {
      console.error('Error fetching project:', error)
      const fallback = await this.getAllProjects()
      return fallback.find(project => project.id === projectId || project.key === projectId) ?? null
    }
  }
}

export const projectService = new ProjectService()
