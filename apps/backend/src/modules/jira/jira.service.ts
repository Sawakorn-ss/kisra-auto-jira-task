import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { Injectable, Logger, UnauthorizedException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

interface JiraIssue {
  fields: Record<string, unknown>;
}

interface JiraRequestOptions {
  authHeader: string | undefined;
  siteUrl?: string;
  params?: Record<string, unknown>;
}

@Injectable()
export class JiraService {
  private readonly logger = new Logger(JiraService.name);

  constructor(private readonly http: HttpService, private readonly config: ConfigService) {}

  async getBoards(options: JiraRequestOptions & { projectKeyOrId?: string }) {
    const params = {
      ...(options.projectKeyOrId ? { projectKeyOrId: options.projectKeyOrId } : undefined)
    };
    return this.request<any>('get', '/rest/agile/1.0/board', { ...options, params });
  }

  async getSprints(boardId: string, options: JiraRequestOptions) {
    return this.request<any>('get', `/rest/agile/1.0/board/${boardId}/sprint`, options);
  }

  async getAssignableUsers(projectKey: string, options: JiraRequestOptions) {
    const params = { project: projectKey };
    return this.request<any>('get', `/rest/api/3/user/assignable/search`, { ...options, params });
  }

  async getProjects(options: JiraRequestOptions) {
    return this.request<any>('get', `/rest/api/3/project/search`, options);
  }

  async getCreateMeta(projectKey: string, options: JiraRequestOptions) {
    const params = { projectKeys: projectKey, expand: 'projects.issuetypes.fields' };
    return this.request<any>('get', `/rest/api/3/issue/createmeta`, { ...options, params });
  }

  async getFields(options: JiraRequestOptions) {
    return this.request<any>('get', `/rest/api/3/field`, options);
  }

  async createIssue(issue: JiraIssue, options: JiraRequestOptions) {
    const response = await this.request<any>('post', '/rest/api/3/issue', options, issue);
    this.logger.log(`Created issue ${response.key}`);
    return response;
  }

  private async request<T>(
    method: 'get' | 'post',
    endpoint: string,
    options: JiraRequestOptions,
    data?: unknown
  ): Promise<T> {
    const baseUrl = this.getBaseUrl(options.siteUrl);
    const headers = this.getAuthHeaders(options.authHeader);
    try {
      const response$ = this.http.request<T>({
        method,
        url: `${baseUrl}${endpoint}`,
        headers,
        params: options.params,
        data
      });
      const { data: payload } = await firstValueFrom(response$);
      return payload;
    } catch (error) {
      this.handleJiraError(error);
      throw error;
    }
  }

  private getBaseUrl(siteUrl?: string) {
    const configured = this.config.get<string>('jira.baseUrl');
    const base = siteUrl || configured;
    if (!base) {
      throw new BadRequestException('Jira base URL not configured');
    }
    return base.replace(/\/$/, '');
  }

  private getAuthHeaders(authHeader: string | undefined) {
    // If header not provided, try to build Basic auth from env-configured credentials
    if (!authHeader) {
      const email = this.config.get<string>('jira.email');
      const apiToken = this.config.get<string>('jira.apiToken');
      if (email && apiToken) {
        const basic = Buffer.from(`${email}:${apiToken}`).toString('base64');
        authHeader = `Basic ${basic}`;
      } else {
        throw new UnauthorizedException('Missing Authorization header for Jira request');
      }
    }
    const header = authHeader.startsWith('Bearer ') || authHeader.startsWith('Basic ')
      ? authHeader
      : `Bearer ${authHeader}`;
    return {
      Authorization: header,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
  }

  private handleJiraError(error: unknown) {
    if (error instanceof AxiosError) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data ?? error.message;
      this.logger.error(`Jira API error: ${status} ${JSON.stringify(message)}`);
      if (status === 401 || status === 403) {
        throw new UnauthorizedException('Jira authentication failed');
      }
      if (status >= 400 && status < 500) {
        throw new BadRequestException(message);
      }
      throw new InternalServerErrorException('Unexpected Jira API error');
    }
  }
}
