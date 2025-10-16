import { Injectable, Logger } from '@nestjs/common';

interface AuditEvent {
  actor: string;
  action: string;
  payload: Record<string, unknown>;
  timestamp: Date;
}

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);
  private readonly events: AuditEvent[] = [];

  record(event: Omit<AuditEvent, 'timestamp'>) {
    const entry: AuditEvent = { ...event, timestamp: new Date() };
    this.events.push(entry);
    this.logger.debug(`Audit event recorded: ${event.action}`);
  }

  list() {
    return this.events;
  }
}
