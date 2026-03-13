# Cogni-Advisor Backend Architecture

## Overview

Cogni-Advisor is a backend API for an academic advising system. It serves three primary roles:

- **ADMIN** – manages users, courses, semesters, system settings, and high‑level configuration.
- **ADVISOR** – manages assigned students, reviews study plans, sends feedback and messages.
- **STUDENT** – views profile and progress, manages study plans, receives recommendations and notifications, and interacts with advisors and AI features.

The core bounded contexts are:

- **Auth & Users** – authentication, authorization, user lifecycle.
- **Students & Advisors** – academic entities and profiles.
- **Courses & Semesters & Enrollments** – catalogue and academic records.
- **Study Plans & Recommendations** – planning and advising workflows.
- **Notifications & Messages & Feedback** – communication layer.
- **Admin & System Settings** – configuration and observability.
- **AI** – infrastructure for AI‑driven interactions and analytics.

## Folder Structure (src/)

At a high level, the project is layered into routing, HTTP handlers, business logic, validation, and infrastructure:

```text
src/
  app.ts             # Express app wiring (middlewares, routes, swagger)
  server.ts          # HTTP server bootstrap

  config/            # Infrastructure configuration
    prisma.ts        # Prisma client
    logger.ts        # Winston logger
    swagger.ts       # OpenAPI spec

  middlewares/       # Cross‑cutting HTTP concerns
    auth.middleware.ts         # JWT auth (extracts user from token)
    role.middleware.ts         # Role‑based access control
    validate.middleware.ts     # Zod-based request validation
    errorHandler.middleware.ts # Central error handling
    requestId.middleware.ts    # Per-request correlation id

  routes/            # Express routers per feature (HTTP routes only)
  controllers/       # HTTP handlers per feature (no DB access)
  services/          # Business logic + data access (Prisma)
  validations/       # Zod schemas grouping request contracts
  generators/        # Complex domain generators (e.g. study plan)
  types/             # Global TypeScript declarations (e.g. express.d.ts)
  utils/             # Shared utilities (AppError, asyncHandler, gpaCalculator)
  generated/         # Prisma generated client
```

### Request Lifecycle

The typical request flow is:

```mermaid
flowchart LR
  Client --> Route[Express Route (src/routes)]
  Route --> Controller[Controller (src/controllers)]
  Controller --> Service[Service (src/services)]
  Service --> Prisma[(Prisma Client)]
  Prisma --> DB[(PostgreSQL)]

  Route --> MWAuth[Auth / Role / Validate Middlewares]
  MWAuth --> Controller
  Controller --> MWError[Global Error Handler]
```

1. **Route** – defines the HTTP method and path, attaches middlewares and controller handler.
2. **Middlewares** – `authenticate`, `authorize`, and `validate` guard and normalize the request.
3. **Controller** – reads from `req` (body, params, query, user), calls the appropriate service, and shapes the HTTP response.
4. **Service** – implements business rules and uses `config/prisma.ts` to access the database.
5. **Error handling** – any thrown `AppError` or unexpected error is caught by `globalErrorHandler` and converted to a JSON error response.

## Feature Modules (by layer)

Each feature is expressed across four main folders:

- `routes/*.routes.ts`
- `controllers/*.controller.ts`
- `services/*.service.ts`
- `validations/*.validation.ts`

### Auth & Users

- **Routes**
  - `src/routes/auth.routes.ts` → `/api/auth`
  - `src/routes/user.routes.ts` → `/api/users`
- **Controllers**
  - `auth.controller.ts` – `loginHandler`, `meHandler`, `changePasswordHandler`
  - `user.controller.ts` – CRUD for users (ADMIN only)
- **Services**
  - `auth.service.ts`
    - Verifies credentials, enforces optional role, issues JWT.
  - `user.service.ts`
    - Creates users with hashed passwords, manages roles and profile data.
- **Validations**
  - `auth.validation.ts` – `loginSchema`, `changePasswordSchema`
  - `user.validation.ts` – create/update/delete user schemas

### Students, Advisors & Admin

- **Students**
  - Routes: `student.routes.ts` → `/api/students`
  - Controller: `student.controller.ts` – profile, summary, activate/deactivate, “me” endpoints.
  - Service: `student.service.ts` – joins `Student` with `User`, academic summary, profile updates.
  - Validation: `student.validation.ts`

- **Advisors**
  - Routes: `advisor.routes.ts` → `/api/advisor`
  - Controller: `advisor.controller.ts` – advisor profile, dashboard, assigned students.
  - Service: `advisor.service.ts` – queries advisor’s students and dashboard metrics.
  - Validation: `advisor.validation.ts`

- **Admin**
  - Routes: `admin.routes.ts` → `/api/admin`
  - Controller: `admin.controller.ts` – system overview and settings endpoints.
  - Service: `admin.service.ts` – aggregates KPIs, manages `SystemSetting`, writes `AuditLog`.
  - Validation: `admin.validation.ts`

### Courses, Semesters, Enrollments & Progress

- **Courses**
  - Routes: `course.routes.ts` → `/api/courses`
  - Controller: `course.controller.ts` – CRUD, toggle availability, prerequisites CRUD.
  - Service: `course.service.ts` – encapsulates invariants around course creation and update.
  - Validation: `course.validation.ts`

- **Semesters**
  - Routes: `semester.routes.ts` → `/api/semesters`
  - Controller: `semester.controller.ts`
  - Service: `semester.service.ts` – parses dates, enforces correctness via `AppError`.
  - Validation: `semester.validation.ts`

- **Enrollments**
  - Routes: `enrollment.routes.ts` → `/api/enrollments`
  - Controller: `enrollment.controller.ts` – student enroll / admin mark‑passed.
  - Service: `enrollment.service.ts` – prerequisite checks, grade updates, GPA recalculation.
  - Validation: `enrollment.validation.ts`

- **Academic Progress**
  - Routes: `progress.routes.ts` → `/api/progress/:studentId`
  - Controller: `progress.controller.ts`
  - Service: `progress.service.ts` + `utils/gpaCalculator.ts` – aggregates enrollments and GPA.
  - Validation: `progress.validation.ts`

### Study Plans & Generators

- **Study Plans**
  - Routes: `studyPlan.routes.ts` → `/api/study-plan`
  - Controller: `studyPlan.controller.ts`
    - Student: create plan, add course, submit, get current plan, generate plan, etc.
    - Advisor: review plan (`approve`/`reject` with feedback), see pending plans.
  - Service: `studyPlan.service.ts`
    - Owns main study plan workflow:
      - Ensures one active plan per semester.
      - Enforces ownership and state transitions.
  - Validation: `studyPlan.validation.ts`

- **Generator**
  - `src/generators/studyPlan.generator.ts`
    - Encapsulates logic for automatically suggesting a study plan for a student based on:
      - Completed courses and grades.
      - Prerequisites defined on courses.
      - Current or target semester.
    - Called from `generatePlanHandler` in `studyPlan.controller.ts`:

```ts
// simplified flow
const studentId = req.user.id;
const result = await generateStudyPlan(studentId);
return res.json({ success: true, data: result });
```

The separation between `studyPlan.service.ts` and `studyPlan.generator.ts` makes it easy to:

- Swap generation strategy (e.g. plug in an AI engine).
- Test deterministic generation logic in isolation.

### Notifications, Feedback, Messages

- **Notifications**
  - Routes: `notification.routes.ts` → `/api/notifications`
  - Controller: `notification.controller.ts` – list, mark read/all‑read, create.
  - Service: `notification.service.ts`
  - Validation: `notification.validation.ts`

- **Feedback**
  - Routes: `feedback.routes.ts` → `/api/feedback`
  - Controller: `feedback.controller.ts` – advisor feedback for students.
  - Service: `feedback.service.ts`
  - Validation: `feedback.validation.ts`

- **Messages**
  - Routes:
    - Advisor side: `message.routes.ts` → `/api/advisor/messages`
    - Student side: part of `student.routes.ts` (`/api/students/me/messages`)
  - Controller: `message.controller.ts` – conversation and message endpoints.
  - Service: `message.service.ts` – ensures only related advisor/student pairs can exchange messages.
  - Validation: `message.validation.ts`

### Recommendations & AI

- **Recommendations**
  - Routes: `recommendations.routes.ts` → `/api/recommendations`
  - Controller: `recommendations.controller.ts`
  - Service: `recommendations.service.ts` – computes safe suggestions based on:
    - Completed courses (non‑F).
    - Current study plan (to avoid duplicates).
  - Validation: `recommendations.validation.ts`

- **AI**
  - Routes: `ai.routes.ts` → `/api/ai`
  - Controller: `ai.controller.ts` – chat, suggest plan, predict GPA, risk analysis, history.
  - Service: `ai.service.ts` – persists `AIInteraction` rows and orchestrates AI‑related workflows.
  - Validation: `ai.validation.ts`

## Data Access & Prisma

All database access happens inside `services/*` via Prisma:

- `config/prisma.ts` exports a singleton Prisma client.
- Services import it and perform typed queries.

Key models (from `prisma/schema.prisma`):

- `User`, `Student`, `Advisor`, `Course`, `Semester`, `Enrollment`
- `StudyPlan`, `StudyPlanDetail`
- `Notification`, `Feedback`, `SemesterRecord`
- `SystemSetting`, `AuditLog`
- `AIInteraction`

This separation keeps controllers thin and pushes business logic and persistence concerns into the service layer.

## Validation & Error Handling

- **Validation**
  - Each route uses a Zod schema from `validations/*` via `validate` middleware.
  - Common patterns:
    - `body` schemas for POST/PATCH.
    - `params` schemas for IDs.
    - `query` schemas where relevant.

- **Errors**
  - Domain / input errors are raised as `new AppError(message, statusCode)`.
  - Unhandled errors are caught by `globalErrorHandler`, which:
    - Logs via Winston.
    - Returns a normalized JSON error:
      - `success: false`
      - `message: string`

## Adding a New Feature (How‑To)

When implementing a new feature (e.g. `transcripts` or `degree-audit`), follow this pattern:

1. **Design the API**
   - Decide on paths and methods (e.g. `GET /api/transcripts/:studentId`).
   - Add them to Swagger (`config/swagger.ts`) if you maintain it manually.
2. **Create validation**
   - Add `transcript.validation.ts` under `validations/`.
   - Export Zod schemas for `params`, `query`, and `body` as needed.
3. **Create service**
   - Add `transcript.service.ts` under `services/`.
   - Implement business logic using Prisma and `AppError` for domain rules.
4. **Create controller**
   - Add `transcript.controller.ts` under `controllers/`.
   - Implement handlers that:
     - Read from `req` (including `req.user` if authenticated).
     - Call the corresponding service.
     - Return appropriate status codes and JSON payloads.
5. **Create routes**
   - Add `transcript.routes.ts` under `routes/`.
   - Wire middlewares: `authenticate`, `authorize`, `validate`, `asyncHandler`.
   - Mount the router in `app.ts` (e.g. `app.use("/api/transcripts", transcriptRoutes);`).
6. **Test**
   - Add Postman requests in `postman/collection.json`.
   - Add Vitest unit tests for the service and optional integration tests for the controller/route.

Following this path keeps the architecture consistent and makes the codebase easy to navigate for any new contributor.

