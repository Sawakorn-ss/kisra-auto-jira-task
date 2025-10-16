export interface TaskNode {
  id: string;
  title: string;
  definitionOfDone?: string;
  estimateHours?: number;
  labels?: string[];
  components?: string[];
}

export interface StoryNode {
  id: string;
  title: string;
  description: string;
  acceptanceCriteria?: string[];
  gherkin?: string;
  tasks: TaskNode[];
}

export interface EpicNode {
  id: string;
  title: string;
  description: string;
  businessValue?: string;
  risk?: 'low' | 'medium' | 'high';
  stories: StoryNode[];
}

export interface BreakdownTree {
  productVision?: string;
  goals?: string[];
  scopeIn?: string[];
  scopeOut?: string[];
  epics: EpicNode[];
}

export interface JiraFieldMapping {
  summary: string;
  description: string;
  issueType: string;
  labelsField?: string;
  componentsField?: string;
  storyPointsField?: string;
  sprintField?: string;
}

export interface JiraBoardSummary {
  id: number;
  name: string;
  type: string;
  location?: {
    projectKey?: string;
    projectId?: string;
  };
}

export interface JiraAssignableUser {
  accountId: string;
  displayName: string;
  emailAddress?: string;
  avatarUrls?: Record<string, string>;
}

export interface JiraIssueTypeSummary {
  id: string;
  name: string;
  subtask: boolean;
  description?: string;
}

export interface JiraCreateMeta {
  issueTypes: JiraIssueTypeSummary[];
}

export interface JiraConnectionState {
  siteUrl: string;
  projectKey: string;
  email: string;
  apiToken: string;
  authMethod: 'apiToken' | 'oauth';
  accessToken?: string;
  selectedBoardId?: number;
  selectedAssigneeId?: string;
  boards: JiraBoardSummary[];
  assignableUsers: JiraAssignableUser[];
  createMeta?: JiraCreateMeta;
  isConnected: boolean;
  availableIssueTypes: string[];
  fieldMapping: Partial<JiraFieldMapping>;
}
