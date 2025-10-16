import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuditModule } from './modules/audit/audit.module';
import { AIModule } from './modules/ai/ai.module';
import { AuthModule } from './modules/auth/auth.module';
import { JiraModule } from './modules/jira/jira.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { MappingModule } from './modules/mapping/mapping.module';
import { ParserModule } from './modules/parser/parser.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    AuthModule,
    AIModule,
    ParserModule,
    JiraModule,
    MappingModule,
    JobsModule,
    AuditModule
  ]
})
export class AppModule {}
