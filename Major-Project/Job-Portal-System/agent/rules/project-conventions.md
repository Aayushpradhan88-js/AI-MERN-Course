# Job Portal System: Mandatory Project Conventions

These rules apply to every feature, bug fix, refactor, and review in this repository. If a request conflicts with a rule, stop and ask for explicit approval before proceeding.

## 1. Architecture and Code Organization

1. **TypeScript only.** All new backend and frontend application code must use TypeScript. Do not add JavaScript source files for application logic.
2. **Preserve the existing architecture.** Follow the repository's established layering, naming, module boundaries, routing, state-management, validation, and error-handling patterns. Do not restructure the application without approval.
3. **Use feature-based organization.** Place feature-specific code inside its feature folder. Keep UI, API/client calls, types, hooks, validation, tests, and feature-local utilities together when they exist.
4. **Reuse before creating.** Search for existing components, hooks, services, helpers, types, and constants before adding new ones. Extend or compose an existing implementation whenever suitable.
5. **Maintain shared code deliberately.**
   - Backend reusable, cross-feature code belongs in the backend `shared/` folder.
   - Frontend reusable, cross-feature code belongs in the frontend `shared/` folder.
   - Code belongs in `shared/` only when genuinely reusable and independent of a single feature.
   - Shared code must never import feature-specific code.
6. **Avoid unnecessary dependencies.** Do not install or introduce a new library, framework, or runtime package unless the existing codebase and platform cannot reasonably meet the requirement. Obtain approval before adding a dependency.
7. **Keep boundaries explicit.** Frontend code must not contain backend-only concerns, and backend code must not depend on frontend modules. Share contracts only through the established type/API boundary.

## 2. Database Protection

1. **Schema changes require approval first.** Never create, alter, replace, or remove tables, columns, indexes, relations, constraints, enums, or schema configuration without explaining the proposed change and receiving explicit approval.
2. **Protect migrations.** Never delete, rewrite, reorder, or modify an existing migration unless explicitly instructed. New migrations that change the schema require prior approval.
3. **Protect data.** Never delete, truncate, reset, seed over, or destructively modify existing data unless explicitly instructed. Use the least destructive, reversible approach possible.
4. **No hidden database side effects.** Call out every operation that can alter persistent data before running it.

## 3. Security and Configuration

1. **Never expose secrets.** Do not write API keys, passwords, tokens, private keys, credentialed connection strings, or other sensitive values into source files, committed environment files, logs, documentation, tests, screenshots, or responses.
2. **Use safe environment templates.** Commit only non-sensitive examples such as `.env.example`, with placeholders. Real secrets remain in ignored local environment files or the approved secret-management system.
3. **Validate configuration.** Access environment variables through the established configuration layer and validate required values at startup where that pattern exists.
4. **Apply least exposure.** Do not send backend secrets to the frontend or expose private server configuration in client bundles or public API responses.

## 4. Implementation Expectations

1. Keep changes scoped to the requested feature; do not mix unrelated cleanup or refactors into a task.
2. Match existing linting, formatting, testing, accessibility, error-handling, and API-response conventions.
3. Prefer small, composable functions and strongly typed public interfaces. Avoid `any` unless there is a documented, unavoidable reason.
4. Before completing a change, run the relevant existing checks when feasible and report anything that could not be verified.
5. If a convention is unclear, inspect comparable code first. If uncertainty remains or a rule would be broken, ask before changing the design.

## 5. Pre-Change Checklist

Before making a change, confirm:

- The change uses TypeScript and fits the existing architecture.
- Existing reusable code has been checked.
- Feature code is placed correctly; only cross-feature code goes in `shared/`.
- No new library is needed, or approval has been obtained.
- No schema, migration, or existing data will change without explicit approval.
- No secret or sensitive configuration will be written or exposed.
