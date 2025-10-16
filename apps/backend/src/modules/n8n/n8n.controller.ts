// src/integrations/n8n/n8n.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { N8nService } from './n8n.service';

type User = { id: string; name: string; roles?: string[] };

@Controller('n8n')
export class N8nController {
  constructor(private readonly n8n: N8nService) {}

  @Post('trigger')
  async trigger(@Body() dto: any) {
    // 1) ดึง requirement รองรับชื่อสำรอง (req, prompt)
    const requirement =
      dto?.requirement ?? dto?.req ?? dto?.prompt ?? null;

    if (!requirement) {
      // แจ้งกลับชัด ๆ ถ้าไม่มี
      return {
        statusCode: 400,
        message:
          "Missing 'requirement'. Expect JSON body with { requirement: string }",
      };
    }

    // 2) รวมทีมเป็น users[]
    const users: User[] = [];

    const pushWithRole = (arr: any[] | undefined, role: string) => {
      (arr ?? []).forEach((u) =>
        users.push({
          id: String(u.id ?? ''),
          name: String(u.name ?? ''),
          roles: [role],
        }),
      );
    };

    pushWithRole(dto.users_team_frontend, 'frontend');
    pushWithRole(dto.user_team_backend ?? dto.users_team_backend, 'backend');
    pushWithRole(dto.user_team_ba ?? dto.users_team_ba, 'ba');

    // ถ้ามี dto.users อยู่แล้วก็รวมด้วย
    if (Array.isArray(dto.users)) {
      dto.users.forEach((u) =>
        users.push({ id: String(u.id ?? ''), name: String(u.name ?? '') }),
      );
    }

    // 3) payload ที่จะส่งให้ n8n (แบนเรียบชัดเจน)
    const payload = { requirement, users };

    // 4) ส่งไป n8n
    return this.n8n.triggerWebhook(payload);
  }
}
