import { Injectable } from '@nestjs/common';
import type { BreakdownTree } from '../parser/dto/breakdown-tree.dto';

@Injectable()
export class AIService {
  async refineRequirement(rawText: string): Promise<string> {
    return `${rawText.trim()}\n\n_refined by AI stub_`;
  }

  async generateBreakdown(rawText: string): Promise<BreakdownTree> {
    return {
      productVision: 'Deliver AI-assisted specification authoring',
      goals: ['Streamline requirement authoring', 'Automate Jira issue creation'],
      scopeIn: ['New requirement capture', 'Jira Cloud projects'],
      scopeOut: ['On-prem Jira Server support'],
      epics: []
    };
  }
}
