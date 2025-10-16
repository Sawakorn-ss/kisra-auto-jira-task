import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  async enqueueCreateIssues(payload: Record<string, unknown>) {
    this.logger.log('Enqueued CreateInJira job');
    return { status: 'queued', payload };
  }
}
