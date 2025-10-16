// src/integrations/n8n/n8n.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { N8nService } from './n8n.service';
import { N8nController } from './n8n.controller';
import * as http from 'http';
import * as https from 'https';

@Module({
  imports: [   HttpModule.register({
    timeout: 600000,           // ⬆️ เพิ่มเป็น 60s (ปรับตามต้องการ)
    maxRedirects: 3,
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true /*, rejectUnauthorized: false */ }),
  }),],
  providers: [N8nService],
  controllers: [N8nController],
  exports: [N8nService],
})
export class N8nModule {}
