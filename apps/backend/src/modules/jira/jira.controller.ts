import { Body, Controller, Headers, Post } from '@nestjs/common';
import { IsObject } from 'class-validator';
import { JiraService } from './jira.service';

class CreateIssueDto {
  @IsObject()
  fields!: Record<string, unknown>;
}

@Controller('jira')
export class JiraController {
  constructor(private readonly jiraService: JiraService) {}

  @Post('issues')
  async create(@Body() body: CreateIssueDto, @Headers('authorization') authHeader: string | undefined) {
    const token = authHeader?.replace('Bearer ', '') ?? '';
    return this.jiraService.createIssue(body, token);
  }
}
