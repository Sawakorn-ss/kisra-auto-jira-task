# Repository Guidelines

## Project Structure & Module Organization
- Root `package.json` coordinates workspace scripts for `apps/frontend` (Nuxt 3) and `apps/backend` (NestJS). Run shared tasks from the repo root.
- Frontend sources live in `apps/frontend/src`: routes in `pages/`, shared UI in `components/`, state in `stores/`, layouts in `layouts/`, types in `types/`.
- Backend code lives in `apps/backend/src`: `main.ts` boots NestJS, `app.module.ts` wires providers, feature logic belongs in `modules/`, configuration helpers in `config/`.

## Build, Test, and Development Commands
- `npm run dev:frontend` / `npm run dev:backend`: Start Nuxt and NestJS in watch mode.
- `npm run build:frontend` / `npm run build:backend`: Emit production bundles (`.output/`, `dist/`).
- `npm run lint`: Run ESLint across both workspaces; gate every PR.
- `npm run format`: Check Prettier formatting. Apply fixes with `npm --prefix apps/frontend run format:write` or the backend equivalent.

## Coding Style & Naming Conventions
- TypeScript + Prettier (2-space indent, trailing commas) everywhere. ESLint rulesets mirror Vue/Nuxt standards on the frontend and NestJS recommendations on the backend.
- Vue SFCs use `PascalCase.vue`; Pinia stores follow `use{Feature}Store.ts`. Nest files follow `*.module.ts`, `*.service.ts`, `*.controller.ts` inside `kebab-case` directories.
- Place shared types in `apps/frontend/types` or backend `interfaces/`. Access env vars through Nuxt runtime config or Nest `ConfigService`; avoid importing `.env` files.

## Testing Guidelines
- Backend `npm --prefix apps/backend test` is a placeholder; once Jest lands, keep unit specs alongside source (`*.spec.ts`) and integration suites in `apps/backend/test/`.
- Frontend specs belong in `apps/frontend/tests` or co-located `*.spec.ts`. Vitest + Vue Test Utils pair well for component coverage.
- Cover new Jira orchestration flows with smoke tests or documented manual steps until automated coverage matures.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (`feat(scope): summary`, `fix(module): message`) to express intent.
- PRs must summarize changes, link the Jira ticket, list manual verification (e.g., `npm run dev:frontend`, exercised breakdown flow), and attach screenshots or sample payloads for UX/API updates.
- Request review from the relevant frontend/back-end owner and wait for lint/build checks to pass before merging.

## Security & Configuration Tips
- Store secrets in ignored `.env.local` files and note required keys in documentation or PRs.
- Validate new environment variables via `apps/backend/src/config` helpers and `ConfigModule.forRoot` schemas. Keep OAuth credentials and Atlassian tokens out of Git.
