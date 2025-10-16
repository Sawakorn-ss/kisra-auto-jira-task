# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Starting Development Servers
- `npm run dev:frontend` - Start Nuxt 3 dev server (default port 3000)
- `npm run dev:backend` - Start NestJS dev server with ts-node-dev (default port 3001)

### Building for Production
- `npm run build:frontend` - Build Nuxt 3 frontend to `.output/`
- `npm run build:backend` - Compile TypeScript backend to `dist/`

### Code Quality
- `npm run lint` - Run ESLint across both frontend and backend workspaces
- `npm run format` - Check Prettier formatting without fixing
- `npm --prefix apps/frontend run format:write` - Apply Prettier fixes to frontend
- `npm --prefix apps/backend run format:write` - Apply Prettier fixes to backend

### Testing
- Backend: `npm --prefix apps/backend test` (currently placeholder - "No tests yet")
- Frontend: No test script configured yet

## Architecture Overview

This is a TypeScript monorepo with two main applications:

### Frontend (`apps/frontend`)
- **Framework**: Nuxt 3 with Vue 3 composition API
- **State Management**: Pinia stores (`useRequirementStore`, `useStatusStore`)
- **Key Pages**:
  - `/` - Requirement Editor with AI refine/breakdown functionality
  - `/preview` - Breakdown tree display with diff modal
  - `/settings/jira` - Jira integration configuration
  - `/templates` - Prompt/field template management
- **Core Components**: `RequirementEditor.vue`, `BreakdownTree.vue`, `JiraFieldMapper.vue`, `DiffModal.vue`

### Backend (`apps/backend`)
- **Framework**: NestJS with TypeScript
- **Key Modules**:
  - `AuthModule` - Jira OAuth 3LO authentication
  - `AIModule` - AI orchestration (`/ai/refine`, `/ai/breakdown` endpoints)
  - `JiraModule` - Jira REST API client (v3)
  - `ParserModule` - Requirement text to BreakdownTree conversion
  - `MappingModule` - Field mapping presets management
  - `JobsModule` - Queue management for Jira operations
  - `AuditModule` - Audit trail logging

## Environment Configuration

### Backend Environment Variables
```bash
PORT=3001
CORS_ORIGIN=http://localhost:3000
JIRA_BASE_URL=https://your-domain.atlassian.net
JIRA_CLIENT_ID=...
JIRA_CLIENT_SECRET=...
JIRA_REDIRECT_URI=http://localhost:3001/auth/callback
AI_PROVIDER=openai
AI_MODEL=gpt-4.1-mini
```

### Frontend Environment Variables
```bash
NUXT_PUBLIC_API_BASE_URL=http://localhost:3001
NUXT_PUBLIC_JIRA_DEFAULT_SITE_URL=https://kisratech.atlassian.net
NUXT_PUBLIC_JIRA_DEFAULT_PROJECT_KEY=MHT
NUXT_PUBLIC_JIRA_DEFAULT_EMAIL=...
NUXT_PUBLIC_JIRA_DEFAULT_API_TOKEN=...
```

## Code Style & Conventions

- **TypeScript** everywhere with strict type checking
- **Prettier** (2-space indent, trailing commas) for formatting
- **ESLint** with Vue/Nuxt standards (frontend) and NestJS recommendations (backend)
- **Vue Components**: Use `PascalCase.vue` naming
- **Pinia Stores**: Follow `use{Feature}Store.ts` pattern
- **NestJS Files**: Follow `*.module.ts`, `*.service.ts`, `*.controller.ts` in `kebab-case` directories

## Key Integration Points

### Jira API Integration
- Uses Jira Cloud REST API v3 (`/rest/api/3/*`)
- Supports OAuth 2.0 (3LO) and API token authentication
- Key endpoints: `/jira/boards`, `/jira/users/assignable`, `/jira/issues`
- Handles Epic/Story/Task relationships via Epic Link or parent fields

### AI Orchestration
- Requirement refinement and breakdown functionality
- Converts user input to structured Epic/Story/Task hierarchy
- Supports regeneration and partial regeneration workflows

## Development Workflow

1. Install dependencies: `npm install` (from root)
2. Start both servers in separate terminals
3. Frontend communicates with backend via configured API base URL
4. All changes must pass `npm run lint` before commit
5. Follow Conventional Commits format (`feat(scope): summary`)