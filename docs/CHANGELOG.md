# Changelog

## [2026-03-01] - إضافة التحسينات الأكاديمية (5 Modules جديدة)

### Added

#### 1️⃣ AI Integration Module (`src/modules/ai/`)
**البنية التحتية فقط - للربط لاحقاً مع فريق AI**

##### Models
- `AIInteraction` - تتبع تفاعلات الطلاب مع AI
  - `interaction_id`, `student_id`, `query_type`, `input_data`, `response_data`, `status`, `created_at`
  
##### Enums
- `AIQueryType`: `CHAT`, `SUGGEST_PLAN`, `PREDICT_GPA`, `RISK_ANALYSIS`
- `AIStatus`: `PENDING`, `PROCESSING`, `COMPLETED`, `FAILED`

##### Endpoints
- ✅ `POST /api/ai/chat` - إرسال استفسار للـ AI (Student)
- ✅ `POST /api/ai/suggest-plan` - طلب اقتراح خطة دراسية (Student)
- ✅ `POST /api/ai/predict-gpa` - توقع المعدل المستقبلي (Student)
- ✅ `GET /api/ai/risk-analysis/:studentId` - تحليل المخاطر الأكاديمية (Admin/Advisor)
- ✅ `GET /api/ai/history` - سجل التفاعلات (Student)

**ملاحظة:** حالياً يحفظ الطلبات بـ `status: PENDING` فقط. الربط مع AI سيكون عبر webhook لاحقاً.

---

#### 2️⃣ Early Warning System (`src/modules/alert/`)
**نظام الإنذار المبكر للطلاب المعرضين للخطر**

##### Models
- `Alert` - التنبيهات الأكاديمية
  - `alert_id`, `student_id`, `alert_type`, `severity`, `title`, `message`, `is_resolved`, `resolved_at`, `resolved_by`, `created_at`

##### Enums
- `AlertType`: `LOW_GPA`, `ACADEMIC_PROBATION`, `MISSING_HOURS`, `FAILED_COURSE`, `OVERLOAD`, `NO_ENROLLMENT`, `GRADUATION_DELAY`
- `AlertSeverity`: `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`

##### Endpoints
- ✅ `GET /api/alerts` - جميع التنبيهات (Admin/Advisor)
- ✅ `GET /api/alerts/student/:studentId` - تنبيهات طالب محدد (Admin/Advisor)
- ✅ `POST /api/alerts/check/:studentId` - فحص وإنشاء تنبيهات (Admin/Advisor)
- ✅ `PATCH /api/alerts/:id/resolve` - تحديد تنبيه كمحلول (Admin/Advisor)
- ✅ `GET /api/alerts/advisor/alerts` - تنبيهات طلاب المرشد (Advisor)

##### Business Logic
- **LOW_GPA**: `cumulative_gpa < 2.0` (CRITICAL إذا < 1.5)
- **MISSING_HOURS**: أقل من المتوقع بـ 12 ساعة
- **OVERLOAD**: أكثر من 21 ساعة في فصل

---

#### 3️⃣ Graduation Tracker (`src/modules/graduation/`)
**متتبع التخرج وحساب المتطلبات**

##### Models
- `GraduationRequirement` - متطلبات التخرج
  - `requirement_id`, `requirement_name`, `required_hours`, `category`, `description`
- `GraduationProgress` - تقدم الطالب في المتطلبات
  - `progress_id`, `student_id`, `requirement_id`, `completed_hours`

##### Enums
- `RequirementCategory`: `CORE_COURSES`, `MAJOR_COURSES`, `ELECTIVES`, `GENERAL_EDUCATION`, `CAPSTONE`

##### Endpoints
- ✅ `GET /api/graduation/:studentId` - نظرة عامة على التخرج
- ✅ `GET /api/graduation/:studentId/requirements` - متطلبات مفصلة
- ✅ `GET /api/graduation/:studentId/audit` - تدقيق الدرجة
- ✅ `POST /api/graduation/requirements` - إنشاء متطلب (Admin)

##### Calculations
- **Total Required**: 144 hours
- **Remaining**: 144 - total_earned_hours
- **Estimated Graduation**: current_semester + (remaining / avg_per_semester)

---

#### 4️⃣ Course Reviews (`src/modules/review/`)
**تقييمات المقررات من الطلاب**

##### Models
- `CourseReview` - تقييمات المواد
  - `review_id`, `student_id`, `course_id`, `rating`, `difficulty`, `workload`, `would_recommend`, `comment`, `is_anonymous`, `created_at`, `updated_at`

##### Endpoints
- ✅ `POST /api/reviews` - إنشاء/تحديث تقييم (Student)
- ✅ `GET /api/reviews/course/:courseId` - تقييمات مادة
- ✅ `GET /api/reviews/my` - تقييماتي (Student)
- ✅ `DELETE /api/reviews/:id` - حذف تقييم (Student)
- ✅ `GET /api/courses/:id/stats` - إحصائيات مادة

##### Validation Rules
- يمكن التقييم فقط بعد اجتياز المادة (`status = PASSED`)
- تقييم واحد لكل طالب لكل مادة
- `rating`, `difficulty`, `workload`: 1-5

---

#### 5️⃣ Performance Analytics (`src/modules/analytics/`)
**تحليلات الأداء الأكاديمي**

##### Endpoints
- ✅ `GET /api/analytics/:studentId/overview` - نظرة عامة
- ✅ `GET /api/analytics/:studentId/gpa-trend` - منحنى المعدل
- ✅ `GET /api/analytics/:studentId/grade-distribution` - توزيع الدرجات
- ✅ `GET /api/analytics/:studentId/hours-progress` - تقدم الساعات

##### Calculations
- **GPA Trend**: SemesterRecord مع تحديد الاتجاه (تصاعدي/تنازلي/مستقر)
- **Grade Distribution**: COUNT من Enrollment GROUP BY grade
- **Hours Progress**: percentage = (earned / 144) * 100

---

### Database Changes
```bash
npx prisma db push --accept-data-loss
```

#### Models المضافة (5)
- `AIInteraction`
- `Alert`
- `GraduationRequirement`
- `GraduationProgress`
- `CourseReview`

#### Enums المضافة (5)
- `AIQueryType`
- `AIStatus`
- `AlertType`
- `AlertSeverity`
- `RequirementCategory`

#### Relations المضافة
- `Student` → `aiInteractions`, `alerts`, `graduationProgress`, `courseReviews`
- `User` → `resolvedAlerts`
- `Course` → `courseReviews`

---

### Files Created

#### 📁 Total: 20 ملف جديد

##### AI Module (4 files)
- `src/modules/ai/ai.routes.ts`
- `src/modules/ai/ai.controller.ts`
- `src/modules/ai/ai.service.ts`
- `src/modules/ai/ai.validation.ts`

##### Alert Module (4 files)
- `src/modules/alert/alert.routes.ts`
- `src/modules/alert/alert.controller.ts`
- `src/modules/alert/alert.service.ts`
- `src/modules/alert/alert.validation.ts`

##### Graduation Module (3 files)
- `src/modules/graduation/graduation.routes.ts`
- `src/modules/graduation/graduation.controller.ts`
- `src/modules/graduation/graduation.service.ts`

##### Review Module (4 files)
- `src/modules/review/review.routes.ts`
- `src/modules/review/review.controller.ts`
- `src/modules/review/review.service.ts`
- `src/modules/review/review.validation.ts`

##### Analytics Module (3 files)
- `src/modules/analytics/analytics.routes.ts`
- `src/modules/analytics/analytics.controller.ts`
- `src/modules/analytics/analytics.service.ts`

##### Documentation (2 files)
- `NEW_MODULES_GUIDE.md` - دليل شامل للـ endpoints
- `TESTING_GUIDE.md` - دليل الاختبار

---

### Files Updated

#### `src/app.ts`
- إضافة imports للـ 5 modules الجديدة
- تسجيل جميع الـ routes الجديدة:
  - `/api/ai`
  - `/api/alerts`
  - `/api/graduation`
  - `/api/reviews`
  - `/api/analytics`

#### `src/modules/course/course.routes.ts`
- إضافة endpoint: `GET /api/courses/:id/stats`

#### `prisma/schema.prisma`
- إضافة 5 models جديدة
- إضافة 5 enums جديدة
- تحديث relations في Student, User, Course

---

### API Summary

#### 📊 الإحصائيات
- **Modules جديدة:** 5
- **Endpoints جديدة:** 23
- **Models جديدة:** 5
- **Enums جديدة:** 5
- **Files جديدة:** 20

#### 🔒 Authentication
- جميع endpoints تتطلب authentication
- authorization حسب الدور (Student/Advisor/Admin)

#### ✅ Code Quality
- ✅ TypeScript types صحيحة
- ✅ Zod validation schemas
- ✅ Error handling مع AppError
- ✅ asyncHandler wrapper
- ✅ No linter errors
- ✅ رسائل الأخطاء بالعربية

---

### Impact

#### ✅ إيجابيات
- نظام إنذار مبكر للطلاب المعرضين للخطر
- متتبع تخرج دقيق مع حسابات تلقائية
- تقييمات المواد لمساعدة الطلاب في الاختيار
- تحليلات أداء شاملة
- بنية تحتية جاهزة للربط مع AI

#### 📌 ملاحظات
- **AI Module**: حالياً يحفظ الطلبات فقط، الربط سيكون لاحقاً
- **Alerts**: يُفضل إضافة cron job للفحص التلقائي
- **Analytics**: queries قد تكون heavy، يُفضل caching

---

### Next Steps

1. **Testing**: اختبار جميع endpoints
2. **Documentation**: تحديث Postman collection
3. **AI Integration**: الربط مع فريق AI عبر webhook
4. **Optimization**: إضافة caching للـ analytics
5. **Automation**: إضافة cron job للـ alerts

---

## [2026-03-01] - إزالة Department Model

### Changed
- ✅ حذف `Department` model من قاعدة البيانات
- ✅ إزالة `dept_id` من `Student` model
- ✅ إزالة `dept_id` من `Advisor` model
- ✅ حذف `/api/departments` endpoints
- ✅ تحديث جميع الـ services لإزالة department references

### Removed
- ❌ `Department` model
- ❌ `src/modules/department/` - المجلد بالكامل
- ❌ `POST /api/departments` - إنشاء قسم
- ❌ `GET /api/departments` - قائمة الأقسام
- ❌ `DELETE /api/departments/:id` - حذف قسم
- ❌ `tests/integration/departments.api.test.ts`

### Database Changes
- حذف foreign key `Student_dept_id_fkey`
- حذف foreign key `Advisor_dept_id_fkey`
- حذف عمود `dept_id` من جدول `Student`
- حذف عمود `dept_id` من جدول `Advisor`
- حذف جدول `Department` بالكامل

### Files Updated

#### Schema
- `prisma/schema.prisma`
  - حذف `Department` model
  - إزالة `dept_id` و `dept` relation من `Student`
  - إزالة `dept_id` و `dept` relation من `Advisor`

#### Services
- `src/modules/student/student.service.ts`
  - إزالة `dept` من `getMyProfile` include
  
- `src/modules/advisor/advisor.service.ts`
  - إزالة `dept_id` و `department` من `getMyProfile` response
  - إزالة `department` من `getMyStudents` response
  - إزالة `dept` من `getMyStudentById`

#### Routes
- `src/app.ts`
  - حذف `departmentRoutes` import
  - حذف `/api/departments` route

### API Changes
الـ endpoints التالية **لم تعد موجودة**:
- ❌ `POST /api/departments` - إنشاء قسم
- ❌ `GET /api/departments` - قائمة الأقسام
- ❌ `DELETE /api/departments/:id` - حذف قسم

الـ responses التالية **لم تعد تحتوي** على `department`:
- `GET /api/advisor/me` - لا يرجع `dept_id` أو `department`
- `GET /api/advisor/students` - لا يرجع `department` في قائمة الطلاب
- `GET /api/students/me` - لا يرجع `dept`

### Impact
- ✅ تبسيط هيكل قاعدة البيانات
- ✅ تركيز أكبر على عملية الإرشاد الأكاديمي
- ✅ تقليل التعقيد غير الضروري
- ❌ لن يكون بالإمكان تصنيف الطلاب والمرشدين حسب القسم

---

## [2026-03-01] - إزالة City Model

### Changed
- ✅ حذف `City` model من قاعدة البيانات
- ✅ إزالة `city_id` من `User` model
- ✅ تحديث جميع الـ services والـ validation schemas

### Database Migration
- **Migration:** `20260301054920_remove_city_model`
- **التغييرات:**
  - حذف foreign key constraint `User_city_id_fkey`
  - حذف عمود `city_id` من جدول `User`
  - حذف جدول `City` بالكامل

### Files Updated

#### Schema
- `prisma/schema.prisma`
  - حذف `City` model
  - إزالة `city_id` و `city` relation من `User` model

#### Services
- `src/modules/student/student.service.ts`
  - إزالة `city` من `getMyProfile` include
  - إزالة `city_id` من `updateMyProfile` parameters
  
- `src/modules/user/user.service.ts`
  - إزالة `city_id` من `createUser`
  
- `src/modules/advisor/advisor.service.ts`
  - إزالة `city_id` و `city` من `getMyProfile`
  - إزالة `city` من `getMyStudentById`

#### Validations
- `src/modules/student/student.validation.ts`
  - إزالة `city_id` من `updateMyProfileSchema`
  
- `src/modules/user/user.validation.ts`
  - إزالة `city_id` من `createUserSchema`
  - إزالة `city_id` من `updateUserSchema`

### Impact
- ❌ لن يكون بالإمكان تخزين معلومات المدينة للمستخدمين
- ✅ تبسيط هيكل قاعدة البيانات
- ✅ تقليل التعقيد في العلاقات
- ✅ حذف foreign key constraint مما يسهل إدارة البيانات

### API Changes
الـ endpoints التالية لم تعد تقبل أو ترجع `city_id`:
- `POST /api/users` - لا يقبل `city_id`
- `PATCH /api/users/:id` - لا يقبل `city_id`
- `PATCH /api/students/me` - لا يقبل `city_id`
- `GET /api/students/me` - لا يرجع `city` في الاستجابة
- `GET /api/advisor/me` - لا يرجع `city_id` أو `city`
- `GET /api/advisor/students/:studentId` - لا يرجع `city`

### Migration Command
```bash
npx prisma migrate dev --name remove_city_model
```

### Previous Updates (Same Session)

#### [2026-03-01] - إضافة Student Activation Endpoint
- ✅ `PATCH /api/students/:id/activate` - إعادة تفعيل الطالب

#### [2026-03-01] - إضافة Course Prerequisites Management
- ✅ `DELETE /api/courses/remove-prerequisite` - حذف prerequisite محدد
- ✅ حذف prerequisites تلقائياً عند حذف الكورس

#### [2026-03-01] - تحسين Date Handling
- ✅ دعم صيغة `YYYY-MM-DD` البسيطة للتواريخ في Semester endpoints
- ✅ تحويل تلقائي للتواريخ

#### [2026-03-01] - API Health Check
- ✅ `GET /api/health` - System health check endpoint
