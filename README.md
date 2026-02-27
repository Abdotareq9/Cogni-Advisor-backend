# 🎓 Cogni-Advisor Backend

Academic advising system built with Node.js, Express, TypeScript, and PostgreSQL.

## 📋 Features

- 🔐 **Authentication & Authorization** - JWT-based with role-based access control (ADMIN, ADVISOR, STUDENT)
- 📚 **Course Management** - Complete CRUD for courses, prerequisites, and enrollment
- 👨‍🎓 **Student Management** - Academic progress tracking, GPA calculation, study plans
- 👨‍🏫 **Advisor Portal** - Plan reviews, student oversight, messaging system
- 🏛️ **Admin Portal** - System overview, user management, system settings
- 🤖 **AI Recommendations** - Course recommendations based on academic history
- 📊 **Progress Tracking** - Real-time academic progress and degree completion tracking
- 💬 **Messaging System** - Direct communication between students and advisors
- 🔔 **Notifications** - System-wide notification system
- 📝 **Study Plans** - Create, review, and approve study plans

## 🛠️ Tech Stack

- **Runtime:** Node.js 20
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL 16
- **ORM:** Prisma
- **Authentication:** JWT
- **Validation:** Zod
- **Testing:** Vitest + Supertest
- **Documentation:** Swagger/OpenAPI 3.0
- **Logging:** Winston + Morgan
- **Process Manager:** PM2
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

## 📊 Project Structure

```
src/
├── config/           # Configuration files (DB, logger, swagger)
├── middlewares/      # Express middlewares (auth, validation, error handling)
├── modules/          # Feature modules
│   ├── auth/        # Authentication
│   ├── user/        # User management
│   ├── student/     # Student operations
│   ├── advisor/     # Advisor operations
│   ├── admin/       # Admin operations
│   ├── course/      # Course management
│   ├── enrollment/  # Student enrollments
│   ├── studyPlan/   # Study plan management
│   └── ...
├── utils/           # Utility functions
└── app.ts           # Express app setup
```

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

### Authentication
- `POST /api/auth/login` - User login
- `PATCH /api/auth/change-password` - Change password

### Users (Admin only)
- `GET /api/users` - List all users
- `POST /api/users` - Create user
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Students
- `GET /api/students/me` - Get current student profile
- `GET /api/students/me/summary` - Get academic summary
- `PATCH /api/students/me` - Update profile

### Courses
- `GET /api/courses` - List all courses
- `POST /api/courses` - Create course (Admin)
- `GET /api/courses/:id` - Get course details
- `PUT /api/courses/:id` - Update course (Admin)
- `DELETE /api/courses/:id` - Delete course (Admin)

### Study Plans
- `POST /api/study-plan` - Create study plan
- `GET /api/study-plan/me/current` - Get current plan
- `GET /api/study-plan/generate` - Generate recommendations
- `POST /api/study-plan/:id/add-course` - Add course to plan
- `PATCH /api/study-plan/:id/submit` - Submit for review
- `PATCH /api/study-plan/:id/review` - Approve/Reject (Advisor)

### Admin Portal
- `GET /api/admin/overview` - System overview
- `GET /api/admin/system-settings` - Get system settings
- `PATCH /api/admin/system-settings` - Update settings

[See full API documentation at `/api-docs`]

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

- ✅ JWT authentication
- ✅ Role-based authorization
- ✅ Input validation (Zod)
- ✅ Rate limiting
- ✅ CORS configuration
- ✅ Helmet security headers
- ✅ Password hashing (Bcrypt)
- ✅ SQL injection protection (Prisma)

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

Import `test/api-test-collection.json` into Postman/Insomnia for:
- 64 endpoints
- 202 test scenarios
- Pre-configured authentication

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm test             # Run tests
npm run lint         # Lint code
npm run format       # Format code with Prettier
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

[Add your license here]

## 👥 Authors

[Add your team information here]

## 📞 Support

For support, email [your-email] or open an issue.

---

**Made with ❤️ by the Cogni-Advisor Team**
