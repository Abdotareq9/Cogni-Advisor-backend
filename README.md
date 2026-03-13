# 🎓 Cogni-Advisor Backend

A production-ready academic advising system built with Node.js, Express, TypeScript, and PostgreSQL. This system provides comprehensive student management, academic planning, and advisor-student communication tools.

## ✨ Key Features

### Core Functionality
- 🔐 **Authentication & Authorization** - JWT-based with role-based access control (ADMIN, ADVISOR, STUDENT)
- 📚 **Course Management** - Complete CRUD operations for courses, prerequisites, and enrollment
- 👨‍🎓 **Student Portal** - Profile management, academic progress tracking, GPA calculation
- 👨‍🏫 **Advisor Portal** - Plan reviews, student oversight, direct messaging
- 🏛️ **Admin Portal** - System overview, user management, configurable system settings
- 🤖 **AI-Powered Recommendations** - Smart course suggestions based on academic history
- 📊 **Progress Tracking** - Real-time academic progress and degree completion monitoring
- 💬 **Messaging System** - Secure communication between students and advisors
- 🔔 **Smart Notifications** - Context-aware notification system
- 📝 **Study Plan Management** - Create, submit, review, and approve academic plans

### Code Quality & Professional Standards
- ✅ **Clean Code** - Organized modules, no redundant code, DRY principles
- ✅ **Type Safety** - Full TypeScript with strict type checking
- ✅ **Comprehensive Testing** - Unit and integration tests with Vitest
- ✅ **API Documentation** - Complete Swagger/OpenAPI documentation
- ✅ **Production-Ready** - Docker setup, CI/CD workflows, PM2 configuration

## 🛠️ Tech Stack

- **Runtime:** Node.js 20 (LTS)
- **Framework:** Express.js 5
- **Language:** TypeScript 5.9
- **Database:** PostgreSQL 16
- **ORM:** Prisma 6
- **Authentication:** JWT (jsonwebtoken)
- **Validation:** Zod 4
- **Testing:** Vitest 4 + Supertest
- **Documentation:** Swagger/OpenAPI 3.0
- **Logging:** Winston + Morgan
- **Security:** Helmet, CORS, Rate Limiting
- **Process Manager:** PM2 (cluster mode)
- **Containerization:** Docker + Docker Compose

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL 16+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Cogni-Advisor
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. **Run database migrations**
```bash
npx prisma migrate dev
npx prisma generate
```

5. **Start development server**
```bash
npm run dev
```

Server will be running at `http://localhost:5000`

## 🐳 Docker Setup

```bash
# Start with Docker Compose
docker-compose up --build

# Stop
docker-compose down
```

## 📚 API Documentation

Interactive API documentation available at:
```
http://localhost:5000/api-docs
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📖 System Documentation

**التوثيق الشامل (عربي):** [`docs/README.md`](docs/README.md) — ملف واحد يشرح المشروع بالكامل: الأهداف، التقنيات، الهيكل، المصادقة، الـ API حسب الأدوار، قاعدة البيانات، التثبيت والتشغيل، ودليل ربط الـ Frontend.

## 📊 Project Structure

The codebase is organized by technical layers with clear separation of concerns:

```
src/
├── app.ts              # Express app configuration (mounts routes, middlewares, swagger)
├── server.ts           # HTTP server bootstrap
├── config/             # Configuration files (DB, logger, swagger, etc.)
│   ├── prisma.ts       # Prisma client configuration
│   ├── logger.ts       # Winston logger setup
│   └── swagger.ts      # OpenAPI specification
├── middlewares/        # Express middlewares
│   ├── auth.middleware.ts         # JWT authentication
│   ├── role.middleware.ts         # Role-based authorization
│   ├── validate.middleware.ts     # Zod validation wrapper
│   ├── errorHandler.middleware.ts # Global error handler
│   └── requestId.middleware.ts    # Request tracking
├── routes/             # Express routers per feature (HTTP routes only)
│   ├── auth.routes.ts
│   ├── user.routes.ts
│   ├── student.routes.ts
│   ├── advisor.routes.ts
│   ├── admin.routes.ts
│   ├── course.routes.ts
│   ├── semester.routes.ts
│   ├── enrollment.routes.ts
│   ├── studyPlan.routes.ts
│   ├── progress.routes.ts
│   ├── notification.routes.ts
│   ├── feedback.routes.ts
│   ├── semesterRecord.routes.ts
│   ├── message.routes.ts
│   ├── recommendations.routes.ts
│   └── ai.routes.ts
├── controllers/        # Route handlers (HTTP layer per feature)
│   ├── auth.controller.ts
│   ├── user.controller.ts
│   ├── student.controller.ts
│   ├── advisor.controller.ts
│   ├── admin.controller.ts
│   ├── course.controller.ts
│   ├── semester.controller.ts
│   ├── enrollment.controller.ts
│   ├── studyPlan.controller.ts
│   ├── progress.controller.ts
│   ├── notification.controller.ts
│   ├── feedback.controller.ts
│   ├── semesterRecord.controller.ts
│   ├── message.controller.ts
│   ├── recommendations.controller.ts
│   └── ai.controller.ts
├── services/           # Business logic & data access (Prisma)
│   ├── auth.service.ts
│   ├── user.service.ts
│   ├── student.service.ts
│   ├── advisor.service.ts
│   ├── admin.service.ts
│   ├── course.service.ts
│   ├── semester.service.ts
│   ├── enrollment.service.ts
│   ├── studyPlan.service.ts
│   ├── progress.service.ts
│   ├── notification.service.ts
│   ├── feedback.service.ts
│   ├── semesterRecord.service.ts
│   ├── message.service.ts
│   ├── recommendations.service.ts
│   └── ai.service.ts
├── validations/        # Zod schemas for request validation
│   ├── auth.validation.ts
│   ├── user.validation.ts
│   ├── student.validation.ts
│   ├── advisor.validation.ts
│   ├── admin.validation.ts
│   ├── course.validation.ts
│   ├── semester.validation.ts
│   ├── enrollment.validation.ts
│   ├── studyPlan.validation.ts
│   ├── progress.validation.ts
│   ├── notification.validation.ts
│   ├── feedback.validation.ts
│   ├── semesterRecord.validation.ts
│   ├── message.validation.ts
│   ├── recommendations.validation.ts
│   └── ai.validation.ts
├── generators/         # Complex generators (e.g. study plan generation)
│   └── studyPlan.generator.ts
├── types/              # Global TypeScript type declarations
│   └── express.d.ts
├── utils/              # Utility functions & helpers
│   ├── AppError.ts          # Custom error class
│   ├── asyncHandler.ts      # Async route wrapper
│   └── gpaCalculator.ts     # GPA calculation utilities
└── generated/          # Prisma generated client (do not edit manually)
```

For a deeper architectural overview (request lifecycle, feature modules and data flow), see `docs/ARCHITECTURE.md`. For a comprehensive Arabic walkthrough of the system and APIs, see `docs/README.md`.

## 🔐 Environment Variables

```env
# Server
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/cogni_advisor

# Security
JWT_SECRET=your-super-secret-jwt-key
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

## 📖 API Endpoints

### 🔐 Authentication
- `POST /api/auth/login` - User login with credentials
- `GET /api/auth/me` - Current user info (id, role)
- `PATCH /api/auth/change-password` - Change user password

### 👥 Users (Admin Only)
- `GET /api/users` - List all users with filtering
- `POST /api/users` - Create new user (any role)
- `GET /api/users/:id` - Get user details
- `PATCH /api/users/:id` - Update user information
- `DELETE /api/users/:id` - Delete user (cascading delete)

### 👨‍🎓 Students
- `GET /api/students/me` - Get current student profile
- `GET /api/students/me/summary` - Get academic summary with GPA
- `PATCH /api/students/me` - Update student profile
- `GET /api/students/:id` - Get student by ID (Admin)
- `PUT /api/students/:id` - Update student (Admin)
- `PATCH /api/students/:id/deactivate` - Deactivate student (Admin)
- `PATCH /api/students/:id/activate` - Reactivate student (Admin)

### 📚 Courses
- `GET /api/courses` - List all courses
- `POST /api/courses` - Create course (Admin)
- `GET /api/courses/:id` - Get course details
- `GET /api/courses/:id/details` - Get course with prerequisites
- `PUT /api/courses/:id` - Update course (Admin)
- `DELETE /api/courses/:id` - Delete course (Admin)
- `PATCH /api/courses/:id/toggle` - Toggle availability (Admin)
- `POST /api/courses/add-prerequisite` - Add prerequisite (Admin)
- `DELETE /api/courses/remove-prerequisite` - Remove prerequisite (Admin)

### 📅 Semesters
- `GET /api/semesters` - List all semesters
- `POST /api/semesters` - Create semester (Admin)
- `GET /api/semesters/:id` - Get semester details
- `PUT /api/semesters/:id` - Update semester (Admin)
- `DELETE /api/semesters/:id` - Delete semester (Admin)

### 📝 Enrollments
- `POST /api/enrollments` - Enroll in course (Student)
- `PATCH /api/enrollments/mark-passed` - Mark course as passed (Admin)

### 📊 Academic Progress
- `GET /api/progress/:studentId` - Get student progress with GPA distribution

### 📋 Study Plans
- `POST /api/study-plan` - Create new study plan (Student)
- `GET /api/study-plan/me/current` - Get current active plan (Student)
- `GET /api/study-plan/generate` - Generate AI recommendations (Student)
- `POST /api/study-plan/:id/add-course` - Add course to plan (Student)
- `PATCH /api/study-plan/:id/submit` - Submit plan for review (Student)
- `PATCH /api/study-plan/:id/review` - Approve/Reject plan (Advisor)
- `GET /api/study-plan/advisor/pending` - Get pending plans (Advisor)

### 👨‍🏫 Advisor Portal
- `GET /api/advisor/me` - Get advisor profile
- `PATCH /api/advisor/me` - Update advisor profile
- `GET /api/advisor/dashboard` - Get advisor dashboard metrics
- `GET /api/advisor/students` - Get assigned students list
- `GET /api/advisor/students/:studentId` - Get student details

### 🔔 Notifications
- `GET /api/notifications` - Get user notifications
- `POST /api/notifications` - Create notification (System)
- `PATCH /api/notifications/read-all` - Mark all as read
- `PATCH /api/notifications/:id/read` - Mark one as read

### 💬 Feedback
- `POST /api/feedback` - Create feedback (Advisor)
- `GET /api/feedback/student/:studentId` - Get student feedback
- `GET /api/feedback/my` - Get my feedback (Advisor)

### 📑 Semester Records
- `POST /api/semester-records` - Create semester record (Admin)
- `GET /api/semester-records/student/:studentId` - Get student records
- `GET /api/semester-records/semester/:semesterId` - Get semester records
- `PATCH /api/semester-records/:id` - Update record (Admin)

### 🏛️ Admin Portal
- `GET /api/admin/overview` - System overview dashboard
- `GET /api/admin/system-settings` - Get all system settings (5 categories)
- `PATCH /api/admin/system-settings` - Update system settings (with audit logging)

### 🏥 Health Check
- `GET /api/health` - System health check

### 🤖 AI Module (Infrastructure)
- `POST /api/ai/chat` - Send query (Student)
- `POST /api/ai/suggest-plan` - Request plan suggestion (Student)
- `POST /api/ai/predict-gpa` - Predict GPA (Student)
- `GET /api/ai/risk-analysis/:studentId` - Risk analysis (Admin/Advisor)
- `GET /api/ai/history` - Interaction history (Student)

**📚 Full API Documentation:** Visit `/api-docs` for interactive Swagger UI

**🧪 Test Collection:** Import `postman/collection.json` (Postman v2.1 format)

## 🏗️ Database Schema

The database schema is managed through Prisma migrations. Key models include:

- **User** - Base user with authentication
- **Student** - Student-specific data and academic records
- **Advisor** - Advisor profiles
- **Course** - Course catalog
- **Enrollment** - Student course enrollments
- **StudyPlan** - Student study plans
- **SystemSetting** - System configuration
- **AuditLog** - System activity tracking

## 🔒 Security Features

### Authentication & Authorization
- ✅ **JWT Authentication** - Secure token-based auth with configurable expiry
- ✅ **Role-Based Access Control** - Fine-grained permissions (ADMIN, ADVISOR, STUDENT)
- ✅ **Password Security** - Bcrypt hashing with salt rounds

### Input & Request Protection
- ✅ **Input Validation** - Zod schema validation on all endpoints
- ✅ **Rate Limiting** - Express-rate-limit to prevent abuse
- ✅ **CORS Protection** - Configurable allowed origins
- ✅ **Helmet Security Headers** - HTTP security headers
- ✅ **SQL Injection Prevention** - Prisma parameterized queries

### Audit & Monitoring
- ✅ **Audit Logging** - Track system changes with AuditLog model
- ✅ **Request Tracking** - UUID-based request IDs
- ✅ **Error Handling** - Centralized error handler with logging

## 📈 Monitoring & Logging

- **Winston** - Structured logging to files and console
- **Morgan** - HTTP request logging
- **Request ID** - UUID tracking for each request
- **PM2** - Process monitoring and management

## 🚢 Deployment

### Using PM2

```bash
npm run build
pm2 start ecosystem.config.cjs --env production
```

### Using Docker

```bash
docker-compose -f docker-compose.yml up -d
```

## 🧪 API Test Collection

A comprehensive test collection is available at `postman/collection.json`:

### Test Coverage
- Endpoints across all modules (Auth, Users, Students, Courses, Semesters, Enrollments, Progress, Study Plans, Advisor, Notifications, Feedback, Admin, AI)
- Test scenarios covering:
  - ✅ Success cases
  - ✅ Authentication/authorization failures
  - ✅ Validation errors
  - ✅ Not found scenarios
  - ✅ Duplicate/conflict cases

### How to Use
1. Import into Postman or Insomnia
2. Set environment variables (BASE_URL, tokens)
3. Run collection for comprehensive API testing

### Test Structure
```json
{
  "info": { "name": "Cogni-Advisor API Tests", "version": "1.0.0" },
  "variables": { "BASE_URL", "ADMIN_TOKEN", "STUDENT_TOKEN", "ADVISOR_TOKEN" },
  "modules": [ "auth", "users", "students", "courses", ... ]
}
```

## 📝 Available Scripts

```bash
npm run dev           # Start development server with tsx watch
npm run build         # Compile TypeScript to JavaScript
npm start             # Start production server (requires build)
npm test              # Run all tests with Vitest
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate test coverage report
```

### Database Scripts
```bash
npx prisma migrate dev    # Run migrations in development
npx prisma migrate deploy # Run migrations in production
npx prisma generate       # Generate Prisma Client
npx prisma studio        # Open Prisma Studio (database GUI)
```

### PM2 Production Scripts
```bash
pm2 start ecosystem.config.cjs --env production  # Start with PM2
pm2 stop cogni-advisor                           # Stop application
pm2 restart cogni-advisor                        # Restart application
pm2 logs cogni-advisor                           # View logs
pm2 monit                                        # Monitor processes
```

## 🎯 Code Quality Standards

This project follows professional development standards:

### Clean Code Principles
- ✅ **No Redundant Code** - Regular cleanup of unused imports and dead code
- ✅ **DRY Principle** - Shared utilities (e.g., `gpaCalculator.ts`)
- ✅ **Consistent Error Handling** - `asyncHandler` wrapper on all routes
- ✅ **Type Safety** - Strict TypeScript with no `any` abuse

### Testing Standards
- ✅ **Unit Tests** - Service layer functions (Vitest + mocks)
- ✅ **Integration Tests** - Full API endpoint coverage (Supertest)
- ✅ **Coverage Tracking** - Automated coverage reports

### Documentation
- ✅ **OpenAPI/Swagger** - Complete API specification
- ✅ **Code Comments** - Clear, non-obvious intent documentation
- ✅ **README** - Comprehensive setup and usage guide

## 🚀 Performance Optimizations

- **Database Queries** - Optimized Prisma queries with proper indexing
- **Connection Pooling** - Prisma connection pooling enabled
- **Async Operations** - Non-blocking async/await throughout
- **PM2 Cluster Mode** - Multi-process deployment for scalability
- **Caching Ready** - Structure supports Redis integration

## 🔄 Recent Updates

### Latest Improvements (Week 4)
- ✅ **Code Cleanup** - Removed all redundant code and unused dependencies
- ✅ **Package Optimization** - Moved TypeScript to devDependencies
- ✅ **GPA Calculation** - Unified utility function for consistency
- ✅ **Route Protection** - Added asyncHandler to all routes
- ✅ **Build Artifacts** - Removed compiled test files, updated .gitignore
- ✅ **Dependencies** - Removed unused nodemon and ts-node

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow existing code style and structure
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

**Cogni-Advisor Development Team**

For questions or support, please open an issue on GitHub.

## 🌟 Acknowledgments

Built with modern best practices and production-ready standards.

---

**Made with ❤️ by the Cogni-Advisor Team**
