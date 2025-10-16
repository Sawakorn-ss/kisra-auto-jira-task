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

export interface JiraConnectionState {
  siteUrl: string;
  projectKey: string;
  isConnected: boolean;
  availableIssueTypes: string[];
  fieldMapping: Partial<JiraFieldMapping>;
}
