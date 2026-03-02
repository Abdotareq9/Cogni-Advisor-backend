# نظرة عامة على مشروع Cogni-Advisor

## مقدمة

**Cogni-Advisor** هو نظام إرشاد أكاديمي Backend API مبني على Node.js و Express و TypeScript و PostgreSQL. يهدف إلى دعم الجامعات في إدارة العملية الأكاديمية وربط الطلاب بالمرشدين وتوفير أدوات تخطيط وتوصيات ذكية.

---

## الأهداف الرئيسية

1. **إدارة الطلاب** — ملفات شخصية، تتبع أكاديمي، GPA، إلغاء/إعادة تفعيل
2. **الإرشاد الأكاديمي** — ربط الطلاب بالمرشدين، مراجعة الخطط الدراسية، التواصل عبر الرسائل والـ Feedback
3. **إدارة المنهج** — كورسات، متطلبات سابقة (prerequisites)، تسجيل، تحديد المواد كمكتملة
4. **خطط دراسية** — إنشاء، تقديم، مراجعة واعتماد خطط من المرشد
5. **الذكاء الاصطناعي** — بنية تحتية جاهزة للربط مع فريق AI (Chat، Suggest Plan، Predict GPA، Risk Analysis)

---

## التقنيات المستخدمة

| المكون | التقنية |
|--------|---------|
| Runtime | Node.js 20 LTS |
| Framework | Express.js 5 |
| Language | TypeScript 5.9 |
| Database | PostgreSQL 16 |
| ORM | Prisma 6 |
| Authentication | JWT (jsonwebtoken) |
| Validation | Zod 4 |
| Testing | Vitest 4 + Supertest |
| Documentation | Swagger/OpenAPI 3.0 |

---

## هيكل المشروع

```
Cogni-Advisor/
├── src/
│   ├── app.ts              # تكوين Express
│   ├── config/             # إعدادات (Prisma, Logger, Swagger)
│   ├── middlewares/        # مصفيات الطلب (Auth, Role, Validate, Error)
│   ├── routes/             # مسجل مركزي للـ routes (registry.ts)
│   ├── modules/            # وحدات الميزات
│   └── utils/              # أدوات مساعدة (AppError, asyncHandler, gpaCalculator)
├── prisma/
│   ├── schema.prisma       # تعريف قاعدة البيانات
│   └── migrations/         # سجلات التغييرات
├── tests/                  # اختبارات Vitest (unit + integration)
├── postman/
│   └── collection.json    # مجموعة Postman للـ API
├── docs/                   # التوثيق
└── ecosystem.config.cjs    # إعدادات PM2 للإنتاج
```

---

## نظرة معمارية عالية المستوى

يوضّح الرسم التالي المكوّنات الرئيسية للتطبيق وتدفّق الطلبات بين العملاء (Clients)، طبقة الـ API، وقاعدة البيانات:

```mermaid
flowchart TB
    subgraph clients [العملاء]
        Admin[Admin]
        Advisor[Advisor]
        Student[Student]
    end
    subgraph api [API Layer]
        Auth[/api/auth]
        Users[/api/users]
        Courses[/api/courses]
        Students[/api/students]
        StudyPlan[/api/study-plan]
        Recommendations[/api/recommendations]
        AdvisorApi[/api/advisor]
        Messages[/api/advisor/messages]
        Notifications[/api/notifications]
        AdminApi[/api/admin]
        AI[/api/ai]
    end
    subgraph db [قاعدة البيانات]
        Prisma[(Prisma + PostgreSQL)]
    end
    Admin --> Users
    Advisor --> StudyPlan
    Advisor --> AdvisorApi
    Advisor --> Messages
    Student --> Auth
    Student --> Students
    Student --> StudyPlan
    Student --> Recommendations
    Student --> AI
    Auth --> Prisma
    Users --> Prisma
    Courses --> Prisma
    Students --> Prisma
    StudyPlan --> Prisma
    Recommendations --> Prisma
    AdvisorApi --> Prisma
    Messages --> Prisma
    Notifications --> Prisma
    AdminApi --> Prisma
    AI --> Prisma
```

يمكن الرجوع إلى ملف الجذر `README.md` أو توثيق Swagger للحصول على تفاصيل أدق لكل مسار.

---

## الوحدات (Modules)

كل وحدة تحتوي على:
- `*.routes.ts` — تعريف المسارات
- `*.controller.ts` — معالجة الطلبات
- `*.service.ts` — منطق الأعمال
- `*.validation.ts` — قواعد التحقق (Zod)

### قائمة الوحدات الحالية

| الوحدة | المسار | الوصف |
|--------|--------|-------|
| Auth | `/api/auth` | تسجيل الدخول، تغيير كلمة المرور، `/me` |
| Users | `/api/users` | إدارة المستخدمين (Admin) |
| Students | `/api/students` | ملف الطالب، تفعيل/إلغاء تفعيل |
| Courses | `/api/courses` | الكورسات، المتطلبات السابقة |
| Semesters | `/api/semesters` | الفصول الدراسية |
| Enrollments | `/api/enrollments` | التسجيل، mark-passed لتسجيل الدرجة |
| Progress | `/api/progress` | التقدم الأكاديمي و GPA |
| Study Plan | `/api/study-plan` | الخطط الدراسية، التقديم، المراجعة |
| Recommendations | `/api/recommendations` | توصيات المواد |
| Advisor | `/api/advisor` | لوحة المرشد، الطلاب |
| Messages | `/api/advisor/messages` | المحادثات |
| Notifications | `/api/notifications` | الإشعارات |
| Feedback | `/api/feedback` | feedback من المرشد للطالب |
| Semester Records | `/api/semester-records` | سجلات الفصول |
| Admin | `/api/admin` | لوحة التحكم، الإعدادات |
| AI | `/api/ai` | بنية تحتية للذكاء الاصطناعي |

### ملخص مسارات الـ API حسب الوحدة

الجدول التالي يوضح أمثلة لأهم المسارات لكل وحدة (القائمة الكاملة موجودة في `README.md` و Swagger):

| الوحدة | أمثلة على المسارات الأساسية |
|--------|-----------------------------|
| Auth | `POST /api/auth/login`، `GET /api/auth/me`، `PATCH /api/auth/change-password` |
| Users | `GET /api/users`، `POST /api/users`، `PATCH /api/users/:id`، `DELETE /api/users/:id` |
| Students | `GET /api/students/me`، `GET /api/students/me/summary`، `PATCH /api/students/me` |
| Courses | `GET /api/courses`، `GET /api/courses/:id`، `POST /api/courses`، `PATCH /api/courses/:id/toggle` |
| Semesters | `GET /api/semesters`، `POST /api/semesters`، `PUT /api/semesters/:id` |
| Enrollments | `POST /api/enrollments`، `PATCH /api/enrollments/mark-passed` |
| Progress | `GET /api/progress/:studentId` |
| Study Plan | `POST /api/study-plan`، `GET /api/study-plan/me/current`، `PATCH /api/study-plan/:id/submit`، `PATCH /api/study-plan/:id/review` |
| Recommendations | `GET /api/recommendations/me` (قد تختلف التسمية حسب التنفيذ الفعلي) |
| Advisor | `GET /api/advisor/me`، `GET /api/advisor/dashboard`، `GET /api/advisor/students` |
| Messages | مسارات للمحادثات بين الطالب والمرشد تحت `/api/advisor/messages` |
| Notifications | `GET /api/notifications`، `PATCH /api/notifications/read-all`، `PATCH /api/notifications/:id/read` |
| Feedback | `POST /api/feedback`، `GET /api/feedback/student/:studentId`، `GET /api/feedback/my` |
| Semester Records | `POST /api/semester-records`، `GET /api/semester-records/student/:studentId` |
| Admin | `GET /api/admin/overview`، `GET /api/admin/system-settings`، `PATCH /api/admin/system-settings` |
| AI | `POST /api/ai/chat`، `POST /api/ai/suggest-plan`، `POST /api/ai/predict-gpa`، `GET /api/ai/risk-analysis/:studentId` |

---

## تدفق العمل النموذجي

1. **Admin** ينشئ المستخدمين والكورسات والفصول ويعيّن مرشدين للطلاب
2. **Student** يسجّل دخول، ينشئ خطة دراسية، يضيف كورسات، يقدّم الخطة للمراجعة
3. **Advisor** يراجع الخطط، يوافق أو يرفض، يرسل feedback للطلاب
4. **Admin** أو **Advisor** يسجّل الدرجات عبر `PATCH /api/enrollments/mark-passed`
5. **Student** يعرض التقدم والتوصيات عبر `/api/progress` و `/api/recommendations`

---

## المصادقة والصلاحيات

- **تسجيل الدخول**: `POST /api/auth/login` بـ `identifier` (الرقم الوطني) و `password`
- **استخدام Token**: `Authorization: Bearer <token>`
- **الأدوار**: ADMIN، ADVISOR، STUDENT — كل endpoint له صلاحيات محددة
- **فحص الدور الحالي**: `GET /api/auth/me` يعيد `id` و `role`

---

## قاعدة البيانات

النظام يستخدم Prisma لتوليد طبقة الوصول للبيانات فوق PostgreSQL. أهم النماذج:

| النموذج | الوصف المختصر |
|--------|----------------|
| User | الكيان الأساسي لكل مستخدم (بيانات الدخول والهوية والدور) |
| Student | بيانات الطالب الأكاديمية (GPA، الساعات المكتسبة، الحالة، الربط مع User و Advisor) |
| Advisor | بيانات المرشد الأكاديمي وربطه بالمستخدم والطلاب |
| Admin | حسابات مسؤولي النظام المرتبطة بـ User |
| Course | تعريف المقرر الدراسي (الكود، الاسم، الساعات، التوفر) |
| Semester | الفصول الدراسية وتعريف السنوات الأكاديمية |
| Enrollment | تسجيل الطالب في المقررات وحفظ الدرجة والحالة (PASSED/FAILED/IN_PROGRESS) |
| StudyPlan | الخطط الدراسية للطالب عبر الفصول |
| SystemSetting | إعدادات النظام (مقسّمة لفئات مثل الأكاديمية، الأداء، الإشعارات...) |
| AuditLog | سجل العمليات الحساسة في النظام (من قام بأي إجراء ومتى) |
| Feedback | ملاحظات المرشد على الطالب أو الخطة الدراسية |
| Notification | الإشعارات المرسلة للمستخدمين |
| SemesterRecord | ملخص أداء الطالب لكل فصل دراسي (GPA فصلي، الساعات، ... ) |
| AIInteraction | سجلات التفاعلات مع وحدات الذكاء الاصطناعي (نوع الطلب، البيانات المدخلة، الحالة) |

لإدارة قاعدة البيانات أثناء التطوير:

- تشغيل آخر الـ migrations: `npx prisma migrate dev`
- فتح واجهة رسومية للبيانات: `npx prisma studio`

---

## التوثيق والاختبار

- **Swagger**: `http://localhost:5000/api-docs` — توثيق تفاعلي لجميع المسارات مع أمثلة للطلبات/الردود.
- **Health Check**: `GET /api/health` — فحص صحة النظام (جاهزية السيرفر وقاعدة البيانات).

### استخدام Postman

1. افتح Postman واختر **Import**.
2. استورد الملف `postman/collection.json` من جذر المشروع.
3. أنشئ Environment يحتوي على المتغيرات:
   - `BASE_URL` (مثلاً: `http://localhost:5000`)
   - `ADMIN_TOKEN`، `ADVISOR_TOKEN`، `STUDENT_TOKEN` بعد تسجيل الدخول من مسار `/api/auth/login`.
4. جرّب الطلبات بالترتيب (Auth، ثم Users/Students، ثم Study Plan وغيرها).

### تشغيل الاختبارات

- تشغيل جميع الاختبارات:

```bash
npm test
```

- تشغيل الاختبارات في وضع المراقبة (watch):

```bash
npm run test:watch
```

- توليد تقرير التغطية:

```bash
npm run test:coverage
```

---

## التشغيل والتثبيت

```bash
npm install
cp .env.example .env   # تعديل DATABASE_URL و JWT_SECRET
npx prisma migrate dev
npm run dev            # التطوير على المنفذ 5000
```

للإنتاج:
```bash
npm run build
pm2 start ecosystem.config.cjs --env production
```

---

**آخر تحديث:** 2026-03
**الإصدار:** يعكس الحالة بعد إزالة موديولات Alerts، Graduation، Reviews، Analytics، Grades
