# Enxero Platform Backend (NestJS)

A robust backend service for the Enxero Platform built with NestJS, TypeScript, and PostgreSQL.

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (RBAC)
  - Refresh token mechanism for secure session management
  - Password hashing and history tracking
  - Account status management (active, suspended, deactivated)
  - Password reset via email
  - Email verification

- **User Management**
  - User profile management (CRUD)
  - Password history
  - Advanced user listing, filtering, and sorting
  - Account status updates

- **Role, Company, Employee, Payroll, Leave, Forms, File, Notification, Audit, Integration, System Management**
  - All core modules from the ExpressJS version, now in a modular NestJS structure

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** NestJS
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT
- **Validation:** class-validator
- **Testing:** Jest
- **Documentation:** Swagger (OpenAPI)

## 📁 Project Structure

```
enxero-platform-backend-nest/
├── README.md
├── prisma/
│   ├── migrations/            # Database migrations
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seeding
├── src/
│   ├── app.module.ts          # Root NestJS module
│   ├── main.ts                # Entry point
│   ├── prisma/                # Prisma service
│   ├── auth/                  # Auth module (controllers, services, DTOs)
│   ├── users/                 # User management
│   └── mailer.service.ts      # Simple mailer service (replace for production)
├── test/                      # Automated tests
├── package.json
├── tsconfig.json
└── ...
```

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

- Swagger/OpenAPI docs available at `/api` (if enabled in main.ts)

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📝 License

[MIT](LICENSE)
