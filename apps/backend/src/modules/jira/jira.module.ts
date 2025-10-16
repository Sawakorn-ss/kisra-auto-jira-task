import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { JiraService } from './jira.service';
import { JiraController } from './jira.controller';

@Module({
  imports: [ConfigModule, HttpModule.register({ timeout: 7000 })],
  providers: [JiraService],
  controllers: [JiraController],
  exports: [JiraService]
})
export class JiraModule {}
