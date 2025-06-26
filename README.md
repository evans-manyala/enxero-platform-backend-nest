# Enxero Platform Backend (NestJS)

A robust, production-grade backend service for the Enxero Platform built with NestJS, TypeScript, and PostgreSQL.

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (RBAC)
  - Refresh token mechanism for secure session management
  - Password hashing and history tracking
  - Account status management (active, suspended, deactivated)
  - Password reset via email
  - Email verification
- **Strict Validation & Error Handling**
  - All endpoints use strict DTO validation (type, length, object, array, required/optional)
  - Robust error handling (NotFound, Conflict, BadRequest, relation/uniqueness errors)
- **Comprehensive E2E Test Coverage**
  - All modules and endpoints are covered by automated E2E tests (CRUD, validation, edge cases, error handling)
- **Automated API Documentation**
  - Swagger UI at `/api` (non-production) with live, interactive docs for all endpoints
  - Bearer authentication supported in Swagger
- **Modular Architecture**
  - All core modules from the ExpressJS version, now in a modular NestJS structure

## 📦 Modules

- **Auth:** JWT, RBAC, password reset, email verification, strict validation, E2E tested
- **Roles:** Role CRUD, permissions, strict validation, E2E tested
- **Companies:** Company CRUD, strict validation, E2E tested
- **Users:** User CRUD, profile, strict validation, E2E tested
- **Employees:** Employee CRUD, object fields, strict validation, E2E tested
- **Forms:** Dynamic forms, strict validation, E2E tested
- **Payroll:** Payroll records, strict validation, E2E tested
- **Leave:** Leave requests/types, strict validation, E2E tested
- **Notifications:** Notification CRUD, strict validation, E2E tested
- **Files:** File CRUD, strict validation, E2E tested
- **Integrations:** Integration CRUD/logs, strict validation, E2E tested
- **Audit:** Audit logs, strict validation, E2E tested
- **System:** System config/logs, strict validation, E2E tested

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** NestJS
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT
- **Validation:** class-validator
- **Testing:** Jest (unit & E2E)
- **Documentation:** Swagger (OpenAPI)

## 📁 Project Structure

```
.                                  # Project root
├── README.md                      # Project documentation
├── db-backup-before-reset.sql     # Database backup (manual)
├── dist                           # Compiled output (ignored in dev)
│   └── ...                        # Compiled JS files
├── eslint.config.mjs              # ESLint configuration
├── nest-cli.json                  # NestJS CLI config
├── package-lock.json              # NPM lockfile
├── package.json                   # Project dependencies and scripts
├── prisma                         # Prisma ORM config and migrations
│   ├── migrations                 # Database migration scripts
│   ├── migrations-backup          # Backup of previous migrations
│   ├── schema.prisma              # Prisma schema (DB models)
│   └── seed.ts                    # Database seeding script
├── src                            # Application source code
│   ├── app.controller.ts          # Root controller
│   ├── app.module.ts              # Root NestJS module
│   ├── app.service.ts             # Root service
│   ├── main.ts                    # Application entry point
│   ├── prisma/                    # Prisma service provider
│   ├── audit/                     # Audit logs module
│   ├── auth/                      # Authentication & security module
│   ├── companies/                 # Company management module
│   ├── employees/                 # Employee management module
│   ├── files/                     # File upload/storage module
│   ├── forms/                     # Dynamic forms module
│   ├── integrations/              # Integrations & logs module
│   ├── leave/                     # Leave management module
│   ├── notifications/             # Notifications module
│   ├── payroll/                   # Payroll management module
│   ├── roles/                     # Role/permission management module
│   ├── system/                    # System config/logs module
│   ├── users/                     # User management module
│   └── mailer.service.ts          # Email/mailer service (stub)
├── test                           # Automated E2E and unit tests
│   ├── *.e2e-spec.ts              # E2E test files for each module
│   └── jest-e2e.json              # Jest E2E config
├── tsconfig.build.json            # TypeScript build config
└── tsconfig.json                  # TypeScript project config
```

- Each module directory (e.g., `auth/`, `users/`, `companies/`) contains its own controllers, services, DTOs, and module definition for clear separation of concerns.
- The `test/` directory contains E2E tests for every major module, ensuring full coverage and robustness.
- The `prisma/` directory manages all database schema, migrations, and seeding.
- The `dist/` directory is generated after building the project and should not be edited directly.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/evans-manyala/enxero-platform-backend-nest.git
   cd enxero-platform-backend-nest
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up the database:**

   ```bash
   npx prisma migrate deploy
   npx prisma generate
   npx prisma db seed
   ```

5. **Run the application:**

   ```bash
   # development
   npm run start

   # watch mode
   npm run start:dev

   # production
   npm run start:prod
   ```

## 🧪 Testing

- All modules are covered by comprehensive E2E tests (CRUD, validation, edge cases, error handling).
- To run all E2E tests:

  ```bash
  npm run test:e2e
  # or
  npx jest --config test/jest-e2e.json --runInBand --detectOpenHandles
  ```

- E2E tests cover:
  - All CRUD operations for every module
  - Validation errors (missing, too-long, invalid types, extra fields)
  - Not found, duplicate, and relation errors
  - Edge cases for all DTOs and business logic

## 🔑 Authentication & Security

- JWT-based authentication (access & refresh tokens)
- Password reset and email verification flows
- Role-based access control
- Secure password storage (bcrypt)

## 📬 Password Reset & Email Verification

- **Request password reset:** `POST /auth/request-password-reset` (body: `{ email }`)
- **Reset password:** `POST /auth/reset-password` (body: `{ token, newPassword, confirmPassword }`)
- **Request email verification:** `POST /auth/request-email-verification` (body: `{ email }`)
- **Verify email:** `POST /auth/verify-email` (body: `{ token }`)

> The mailer service is a stub. Integrate with a real provider for production use.

## 📖 API Documentation

- **Swagger UI:**
  - Available at [`/api`](http://localhost:3000/api) when running in non-production environments
  - Interactive documentation for all endpoints, including request/response schemas
  - Bearer authentication supported for testing secured endpoints
  - Docs are auto-generated from code and DTOs—keep them up to date by maintaining your controllers and DTOs

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📝 License

[MIT](LICENSE)
