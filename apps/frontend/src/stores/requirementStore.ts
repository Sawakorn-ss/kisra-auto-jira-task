import { defineStore } from 'pinia'
import { jiraApiRequest } from '../services/jiraClient'
import type {
  BreakdownTree,
  JiraAssignableUser,
  JiraBoardSummary,
  JiraConnectionState,
  JiraCreateMeta,
  JiraFieldMapping
} from '../types'

interface RequirementDraftState {
  rawText: string;
  breakdown: BreakdownTree;
  dryRun: boolean;
  jira: JiraConnectionState;
}

const emptyBreakdown: BreakdownTree = {
  productVision: undefined,
  goals: [],
  scopeIn: [],
  scopeOut: [],
  epics: []
}

const defaultJiraState: JiraConnectionState = {
  siteUrl: '',
  projectKey: '',
  email: '',
  apiToken: '',
  authMethod: 'apiToken',
  accessToken: undefined,
  selectedBoardId: undefined,
  selectedAssigneeId: undefined,
  boards: [],
  assignableUsers: [],
  createMeta: undefined,
  isConnected: false,
  availableIssueTypes: [],
  fieldMapping: {} as Partial<JiraFieldMapping>
}

export const useRequirementStore = defineStore('requirement', {
  state: (): RequirementDraftState => ({
    rawText: '',
    breakdown: { ...emptyBreakdown },
    dryRun: true,
    jira: { ...defaultJiraState }
  }),
  actions: {
    setRawText (text: string) {
      this.rawText = text
    },
    setBreakdown (breakdown: BreakdownTree) {
      this.breakdown = breakdown
    },
    setDryRun (value: boolean) {
      this.dryRun = value
    },
    updateJiraState (partial: Partial<JiraConnectionState>) {
      this.jira = { ...this.jira, ...partial }
    },
    async fetchJiraBoards (apiBaseUrl: string) {
      const response = await jiraApiRequest<{
        values?: Array<{ id: number; name: string; type: string; location?: { projectKey?: string; projectId?: number } }>;
      }>(apiBaseUrl, this.jira, '/jira/boards', {
        query: { projectKeyOrId: this.jira.projectKey || undefined }
      })

      const boards: JiraBoardSummary[] =
        response.values?.map(board => ({
          id: board.id,
          name: board.name,
          type: board.type,
          location: {
            projectKey: board.location?.projectKey,
            projectId: board.location?.projectId ? String(board.location.projectId) : undefined
          }
        })) ?? []

      this.jira = { ...this.jira, boards }
      return boards
    },
    async fetchAssignableUsers (apiBaseUrl: string) {
      if (!this.jira.projectKey) {
        throw new Error('Project key is required to fetch assignable users')
      }

      const response = await jiraApiRequest<
        Array<{ accountId: string; displayName: string; emailAddress?: string; avatarUrls?: Record<string, string> }>
      >(apiBaseUrl, this.jira, '/jira/users/assignable', {
        query: { projectKey: this.jira.projectKey }
      })

      const users: JiraAssignableUser[] = response.map(user => ({
        accountId: user.accountId,
        displayName: user.displayName,
        emailAddress: user.emailAddress,
        avatarUrls: user.avatarUrls
      }))

      this.jira = { ...this.jira, assignableUsers: users }
      return users
    },
    async fetchCreateMeta (apiBaseUrl: string) {
      if (!this.jira.projectKey) {
        throw new Error('Project key is required to fetch issue metadata')
      }

      const meta = await jiraApiRequest<{
        projects?: Array<{
          key: string;
          issuetypes: Array<{ id: string; name: string; subtask: boolean; description?: string }>;
        }>;
      }>(apiBaseUrl, this.jira, '/jira/issue/createmeta', {
        query: { projectKey: this.jira.projectKey }
      })

      const projectMeta = meta.projects?.find(project => project.key === this.jira.projectKey)
      const issueTypes: JiraCreateMeta['issueTypes'] =
        projectMeta?.issuetypes.map(type => ({
          id: type.id,
          name: type.name,
          subtask: type.subtask,
          description: type.description
        })) ?? []

      const createMeta: JiraCreateMeta = {
        issueTypes
      }

      this.jira = {
        ...this.jira,
        createMeta,
        availableIssueTypes: issueTypes.map(type => type.name)
      }

      return createMeta
    },
    async createJiraTask (
      apiBaseUrl: string,
      payload: {
        summary: string;
        description?: string;
        issueTypeId: string;
        assigneeId?: string;
        additionalFields?: Record<string, unknown>;
      }
    ) {
      if (!this.jira.projectKey) {
        throw new Error('Project key is required to create Jira issues')
      }

      const fields: Record<string, unknown> = {
        project: { key: this.jira.projectKey },
        summary: payload.summary,
        issuetype: { id: payload.issueTypeId },
        ...payload.additionalFields
      }

      if (payload.description) {
        fields.description = {
          type: 'doc',
          version: 1,
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: payload.description }]
            }
          ]
        }
      }

      if (payload.assigneeId) {
        fields.assignee = { id: payload.assigneeId }
      }

      const response = await jiraApiRequest<{ key: string; id: string; self: string }>(
        apiBaseUrl,
        this.jira,
        '/jira/issues',
        {
          method: 'POST',
          body: { fields }
        }
      )

      return response
    }
  }
})
