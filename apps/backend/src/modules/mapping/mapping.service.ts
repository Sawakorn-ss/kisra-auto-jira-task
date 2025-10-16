import { Injectable } from '@nestjs/common';

interface FieldMapping {
  summary: string;
  description: string;
  issueType: string;
  labelsField?: string;
}

@Injectable()
export class MappingService {
  private presets = new Map<string, FieldMapping>();

  upsertPreset(projectKey: string, mapping: FieldMapping) {
    this.presets.set(projectKey, mapping);
  }

  getPreset(projectKey: string) {
    return this.presets.get(projectKey);
  }
}
