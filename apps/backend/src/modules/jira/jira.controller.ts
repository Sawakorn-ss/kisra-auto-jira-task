import { Body, Controller, Get, Headers, Param, Post, Query } from '@nestjs/common';
import { IsObject, IsOptional, IsString } from 'class-validator';
import { JiraService } from './jira.service';

class CreateIssueDto {
  @IsObject()
  fields!: Record<string, unknown>;
}

class BoardsQueryDto {
  @IsOptional()
  @IsString()
  projectKeyOrId?: string;
}

class AssignableUsersQueryDto {
  @IsString()
  projectKey!: string;
}

class CreateMetaQueryDto {
  @IsString()
  projectKey!: string;
}

@Controller('jira')
export class JiraController {
  constructor(private readonly jiraService: JiraService) {}

  @Get('boards')
  getBoards(
    @Query() query: BoardsQueryDto,
    @Headers('authorization') authHeader: string | undefined,
    @Headers('x-jira-site') siteHeader: string | undefined
  ) {
    return this.jiraService.getBoards({
      authHeader,
      siteUrl: siteHeader,
      projectKeyOrId: query.projectKeyOrId
    });
  }

  @Get('boards/:boardId/sprints')
  getSprints(
    @Param('boardId') boardId: string,
    @Headers('authorization') authHeader: string | undefined,
    @Headers('x-jira-site') siteHeader: string | undefined
  ) {
    return this.jiraService.getSprints(boardId, {
      authHeader,
      siteUrl: siteHeader
    });
  }

  @Get('users/assignable')
  getAssignableUsers(
    @Query() query: AssignableUsersQueryDto,
    @Headers('authorization') authHeader: string | undefined,
    @Headers('x-jira-site') siteHeader: string | undefined
  ) {
    return this.jiraService.getAssignableUsers(query.projectKey, {
      authHeader,
      siteUrl: siteHeader
    });
  }

  @Get('projects')
  getProjects(
    @Headers('authorization') authHeader: string | undefined,
    @Headers('x-jira-site') siteHeader: string | undefined
  ) {
    return this.jiraService.getProjects({
      authHeader,
      siteUrl: siteHeader
    });
  }

  @Get('issue/createmeta')
  getCreateMeta(
    @Query() query: CreateMetaQueryDto,
    @Headers('authorization') authHeader: string | undefined,
    @Headers('x-jira-site') siteHeader: string | undefined
  ) {
    return this.jiraService.getCreateMeta(query.projectKey, {
      authHeader,
      siteUrl: siteHeader
    });
  }

  @Get('fields')
  getFields(
    @Headers('authorization') authHeader: string | undefined,
    @Headers('x-jira-site') siteHeader: string | undefined
  ) {
    return this.jiraService.getFields({
      authHeader,
      siteUrl: siteHeader
    });
  }

  @Post('issues')
  async create(
    @Body() body: CreateIssueDto,
    @Headers('authorization') authHeader: string | undefined,
    @Headers('x-jira-site') siteHeader: string | undefined
  ) {
    return this.jiraService.createIssue(body, {
      authHeader,
      siteUrl: siteHeader
    });
  }
}
