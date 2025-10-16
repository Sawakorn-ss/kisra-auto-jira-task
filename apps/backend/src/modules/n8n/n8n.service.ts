// src/integrations/n8n/n8n.service.ts
import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, timeout } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class N8nService {
  constructor(private readonly http: HttpService) {}

  async triggerWebhook(payload: any) {
    const url = process.env.N8N_WEBHOOK_URL;
    const secret = process.env.N8N_WEBHOOK_SECRET;

    if (!url) throw new HttpException('N8N_WEBHOOK_URL is not defined', 500);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (secret) headers['X-Signature'] = secret;

    try {
      const res$ = this.http.post(url, payload, { headers }).pipe(timeout(15000));
      const { data, status } = await firstValueFrom(res$);
      return { status, data, forwarded: payload }; // แนบสิ่งที่ส่งไปช่วยดีบัก
    } catch (e) {
      const err = e as AxiosError<any>;
      const status = err.response?.status ?? 502;
      const upstream = err.response?.data ?? { message: err.message };
      // ดูสาเหตุจริงจากฝั่ง n8n
      // eslint-disable-next-line no-console
      console.error('n8n webhook error:', status, upstream);
      throw new HttpException({ message: 'n8n webhook error', upstream }, status);
    }
  }
}
