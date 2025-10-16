# Kisra Auto Jira Task

เริ่มต้นโปรเจกต์ด้วยโครงสร้าง Monorepo (Nuxt 3 + NestJS) พร้อมสเปกผลิตภัณฑ์เพื่อให้เดินหน้าพัฒนาได้ทันที

## โครงสร้างโปรเจกต์

```
.
├── apps
│   ├── backend   # NestJS API สำหรับ OAuth, AI orchestration, Jira automation
│   └── frontend  # Nuxt 3 UI สำหรับ requirement authoring และ review flow
├── package.json  # สคริปต์รวม dev/build/lint ทั้งสองฝั่ง
└── README.md     # สเปกผลิตภัณฑ์และบันทึกสถาปัตยกรรม
```

## การติดตั้งและการรัน (Getting Started)

### ข้อกำหนดเบื้องต้น

- Node.js เวอร์ชัน 18 ขึ้นไป (แนะนำ LTS ล่าสุด)
- npm 9 ขึ้นไป (มากับ Node.js LTS)

### ขั้นตอนติดตั้ง

1. ติดตั้ง dependencies ทั้ง monorepo ด้วยคำสั่งจาก root

   ```bash
   npm install
   ```

2. (ไม่บังคับ) ตั้งค่าตัวแปรสภาพแวดล้อมสำหรับ backend โดยสร้างไฟล์ `.env` ใน `apps/backend` หรือกำหนดจาก shell ตามคีย์ด้านล่าง

   ```bash
   # ตัวอย่างค่าที่ต้องการเมื่อเชื่อม Jira/AI จริง
   PORT=3001
   CORS_ORIGIN=http://localhost:3000
   JIRA_BASE_URL=https://your-domain.atlassian.net
   JIRA_CLIENT_ID=...
   JIRA_CLIENT_SECRET=...
   JIRA_REDIRECT_URI=http://localhost:3001/auth/callback
   AI_PROVIDER=openai
   AI_MODEL=gpt-4.1-mini
   ```

   หากไม่กำหนดค่าดังกล่าว เซิร์ฟเวอร์ backend จะใช้ค่าเริ่มต้นที่ตั้งไว้ใน `configuration.ts` ซึ่งเพียงพอสำหรับการรัน stub API เพื่อพัฒนา UI เบื้องต้น

### โหมดพัฒนา

เปิดเซิร์ฟเวอร์ frontend และ backend ในเทอร์มินัลแยกกัน

```bash
npm run dev:frontend   # Nuxt 3 dev server (ค่าเริ่มต้นที่พอร์ต 3000)
npm run dev:backend    # NestJS dev server (ค่าเริ่มต้นที่พอร์ต 3001)
```

### สร้างสำหรับโปรดักชัน

```bash
npm run build:frontend
npm run build:backend
```

### ตรวจสอบคุณภาพโค้ด

```bash
npm run lint
npm run format      # ตรวจสอบรูปแบบโค้ด (ไม่แก้ไขอัตโนมัติ)
npm --prefix apps/frontend run format:write
npm --prefix apps/backend run format:write
```

### สคริปต์สำคัญ

- `npm run dev:frontend` – เปิด Nuxt dev server
- `npm run dev:backend` – เปิด NestJS dev server (ts-node-dev)
- `npm run build:frontend` / `npm run build:backend` – สร้าง production bundle
- `npm run lint` – เรียก lint ทั้งสองฝั่ง (ต้องติดตั้ง dependencies ก่อน)

### การตั้งค่าการเชื่อมต่อ Jira (API Token + REST)

1. กำหนดค่า environment สำหรับ Nuxt ให้ชี้กลับไปยัง backend (ค่าเริ่มต้นคือ `http://localhost:3001`)

   ```bash
   export NUXT_PUBLIC_API_BASE_URL=http://localhost:3001
   ```

   ฝั่ง NestJS สามารถตั้ง `JIRA_BASE_URL=https://your-domain.atlassian.net` เพื่อใช้เป็นค่าเริ่มต้น หากไม่ส่ง header `X-Jira-Site` มาจาก frontend

2. สร้าง Atlassian API token จาก https://id.atlassian.com/manage-profile/security/api-tokens แล้วจด email + token ไว้สำหรับใส่ในหน้า `/settings/jira`
3. รันทั้ง frontend/backend และเปิดหน้า **Settings → Jira Integration**
4. กรอกข้อมูล
   - Jira Site URL: `https://<tenant>.atlassian.net`
   - Project Key: คีย์โปรเจกต์ (เช่น `ABC`)
   - Account Email + API Token ที่สร้างในข้อ 2
5. กด **Load Jira Metadata** เพื่อดึงรายการ board, ผู้ใช้ที่ assign ได้ และ issue type ของโปรเจกต์
6. เลือก board/assignee ที่ต้องการ จากนั้นใส่ Summary/Description แล้วกด **Create Jira Task** เพื่อสร้าง issue จริงผ่าน REST API (`POST /rest/api/3/issue`)

> Endpoint ฝั่ง backend ที่เตรียมไว้:  
> - `GET /jira/boards?projectKeyOrId=...`  
> - `GET /jira/boards/:boardId/sprints`  
> - `GET /jira/users/assignable?projectKey=...`  
> - `GET /jira/issue/createmeta?projectKey=...`  
> - `GET /jira/fields`  
> - `POST /jira/issues` (รองรับ `fields` ตามสเปก Jira REST v3)

## 1. เป้าหมาย (Product Goals)
- รับ requirement จากผู้ใช้ (ไทย/อังกฤษ) แล้วระบบช่วยเกลาภาษาและจัดรูปแบบเป็นสเปกที่อ่านง่าย
- สรุปและแตกโครงงานเป็น Roadmap → Epics → User Stories → Tasks/Subtasks
- แม็ปฟิลด์ให้ตรงกับโครงการใน Jira และสร้างรายการอัตโนมัติ
- รองรับกระบวนการแก้/วนรอบ (review-approve-edit) ก่อนกดยืนยันสร้างใน Jira
- เก็บ template/prompt และ mapping ต่อโปรเจกต์เพื่อใช้ซ้ำได้

## 2. ขอบเขตฟีเจอร์ (Functional Requirements)

### 2.1 Requirement Authoring & AI Orchestration
- Rich editor รองรับ Markdown, การ mention @roles, และ code blocks
- ปุ่ม "Refine" ให้ AI ปรับภาษากระชับ พร้อมเพิ่ม Acceptance Criteria / Non-functional Requirements
- ปุ่ม "Breakdown" ให้ AI สร้างโครงสร้าง Product Vision → Goals → Scope in/out → Epics → User Stories → Tasks/Subtasks
- รองรับโหมด Regen / Partial Regen (เลือกเฉพาะบาง epic หรือ story ให้ AI สร้างใหม่)
- ตั้งค่า granularity ได้ (เช่น epic ขนาด ~2–4 สัปดาห์, task ~0.5–2 วัน)

โครงสร้างรายละเอียดที่ต้องสร้าง:
- Epics: title, description, business value, risk
- User Stories: As a…, I want…, So that…, Acceptance Criteria แบบ Gherkin
- Tasks/Subtasks: title, DoD, estimate, labels, components

### 2.2 Jira Integration
- เลือก Jira Site/Project/Issue Type Scheme จาก UI
- แม็ปฟิลด์มาตรฐาน: summary, description, issuetype, labels, components, assignee, priority, story points (custom field), sprint (ถ้ามี)
- จัดการความสัมพันธ์ Epic ⇄ Story/Task ด้วย Epic Link หรือ parent ตามโปรเจกต์
- ฟังก์ชันหลัก:
  - Create Issues (REST API v3) ทีละตัวหรือแบบ bulk
  - Link Parent/Child (Epic ↔ Story/Task)
  - Search/Validate ด้วย JQL เพื่อตรวจสอบ duplication ก่อนสร้าง
- การยืนยันตัวตน: OAuth 2.0 (3LO) กับ Jira Cloud พร้อม scopes อย่างน้อย read:jira-work และ write:jira-work
- ใช้ endpoint Jira Cloud REST API v3 เช่น `/rest/api/3/issue` สำหรับสร้าง และ `/rest/api/3/search/jql` สำหรับค้นหา
- จัดการการอ้างอิง Epic/child ให้ตรงตามประเภทโปรเจกต์ (classic/next-gen)

### 2.3 Review & Apply
- หน้า Diff/Preview แสดงรายการ epics/stories/tasks ที่จะสร้างใน Jira พร้อมแก้ไข inline ได้
- ปุ่ม Apply to Jira แสดงผลลัพธ์ (issue keys และลิงก์)
- Dry-run mode จำลองการสร้างโดยไม่ส่งไปยัง Jira จริง

### 2.4 Templates & Governance
- จัดเก็บ Prompt templates ต่อโปรเจกต์หรือทีม พร้อมรองรับเวอร์ชัน
- Field mapping presets ต่อ Project/Issue Type Scheme
- Role dictionary (เช่น Product Owner/Developer/QA) สำหรับให้ AI ใช้ใน user story

### 2.5 การค้นหา/อิมพอร์ต
- Import จาก Jira เพื่อดึง epics/stories ปัจจุบันมาให้ AI วิเคราะห์ช่องว่าง
- Search/Filter ด้วย JQL จากหน้า UI

## 3. ไม่ใช่ฟังก์ชัน (Non-Functional Requirements)
- Performance: เวลาการ breakdown ไม่เกิน 10 วินาทีต่อเอกสารขนาด ~2–4 หน้า (รองรับคิว)
- Scalability: รองรับผู้ใช้พร้อมกัน 50–200 คน โดยใช้ queue/worker แยกสำหรับสร้าง Jira
- Security:
  - เก็บ token แบบเข้ารหัส (KMS/Envelope)
  - ใช้ PKCE, short-lived tokens, และ refresh tokens
  - RBAC แยกสิทธิ์อ่าน/เขียน Jira
  - Audit log เก็บข้อมูลการสร้าง issue
- Reliability: รองรับ retries ด้วย exponential backoff เมื่อ Jira rate-limit หรือมีปัญหาชั่วคราว
- i18n: รองรับภาษาไทยและอังกฤษทั้งใน UI และ prompt

## 4. สถาปัตยกรรม (Architecture Overview)

### 4.1 Frontend (Nuxt 3)
- Pages:
  - `/` Requirement Editor พร้อมฟังก์ชัน AI refine/breakdown (stub หน้าแรกเชื่อม Pinia store)
  - `/preview` แสดง tree ของโครงสร้าง Epics/Stories/Tasks พร้อม Diff modal
  - `/settings/jira` เชื่อมต่อ Jira + field mapping preset UI
  - `/templates` จัดการ Prompt/Field Templates (stub สำหรับ governance)
- Components หลัก: `RequirementEditor.vue`, `BreakdownTree.vue`, `JiraFieldMapper.vue`, `DiffModal.vue`, `DryRunBanner.vue`, `StatusToasts.vue`
- State management: ใช้ Pinia store (`useRequirementStore`, `useStatusStore`) สำหรับ draft/mapping/toasts
- SSR: เปิดใช้งาน และใช้ runtimeConfig สำหรับค่า Jira OAuth ฝั่ง client

### 4.2 Backend (NestJS)
- Modules หลัก: `AuthModule`, `AIModule`, `ParserModule`, `JiraModule`, `MappingModule`, `JobsModule`, `AuditModule`
- `AuthModule` รองรับ Jira OAuth 3LO (stub call ไป Atlassian token endpoint)
- `AIModule` ให้ endpoint `/ai/refine` และ `/ai/breakdown` (stub orchestration + schema)
- `ParserModule` แปลง requirement text เป็น `BreakdownTree`
- `JiraModule` คลุม REST client `/rest/api/3/issue` และ logging
- `MappingModule` จัดการ field mapping presets ใน memory (เตรียมต่อฐานข้อมูล)
- `JobsModule` จำลอง BullMQ queue สำหรับ CreateInJiraJob
- `AuditModule` เก็บ audit trail in-memory และ logger
- Config: ใช้ `@nestjs/config` + runtime configuration (`PORT`, `JIRA_BASE_URL`, `AI_PROVIDER`, etc.)

## 5. สคีมา/สัญญา (Contracts & Schemas)
- (เว้นว่างไว้เพื่อเติม AI Output Schema ตัวอย่างในอนาคต)
