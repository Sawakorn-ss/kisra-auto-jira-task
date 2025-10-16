import { defineStore } from 'pinia';
import type { BreakdownTree, JiraConnectionState, JiraFieldMapping } from '../types';

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
};

const defaultJiraState: JiraConnectionState = {
  siteUrl: '',
  projectKey: '',
  isConnected: false,
  availableIssueTypes: [],
  fieldMapping: {} as Partial<JiraFieldMapping>
};

export const useRequirementStore = defineStore('requirement', {
  state: (): RequirementDraftState => ({
    rawText: '',
    breakdown: { ...emptyBreakdown },
    dryRun: true,
    jira: { ...defaultJiraState }
  }),
  actions: {
    setRawText(text: string) {
      this.rawText = text;
    },
    setBreakdown(breakdown: BreakdownTree) {
      this.breakdown = breakdown;
    },
    setDryRun(value: boolean) {
      this.dryRun = value;
    },
    updateJiraState(partial: Partial<JiraConnectionState>) {
      this.jira = { ...this.jira, ...partial };
    }
  }
});
