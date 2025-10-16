import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

interface JiraIssue {
  fields: Record<string, unknown>;
}

@Injectable()
export class JiraService {
  private readonly logger = new Logger(JiraService.name);

  constructor(private readonly http: HttpService, private readonly config: ConfigService) {}

  async createIssue(issue: JiraIssue, token: string) {
    const baseUrl = this.config.get<string>('jira.baseUrl');
    if (!baseUrl) {
      throw new Error('Jira base URL not configured');
    }

    const response$ = this.http.post(`${baseUrl}/rest/api/3/issue`, issue, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const { data } = await firstValueFrom(response$);
    this.logger.log(`Created issue ${data.key}`);
    return data;
  }
}
