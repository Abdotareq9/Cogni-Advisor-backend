# Cogni-Advisor API Test Collection

## الملفات

- **`postman/collection.json`** - مجموعة Postman Collection كاملة لجميع API endpoints
- **`../SYSTEM-GUIDE.md`** - دليل شامل للنظام بالكامل
- **`NEW-MODULES.md`** - تفاصيل الـ modules الجديدة (AI, Alerts, Graduation, Reviews, Analytics)

## كيفية الاستخدام

### 1. استيراد Collection في Postman

```
1. افتح Postman
2. اضغط على Import
3. اختر Upload Files
4. اختر ملف postman/collection.json
5. Import
```

### 2. ضبط المتغيرات

المتغيرات الموجودة:
- `BASE_URL` - عنوان API (افتراضي: http://localhost:3000)
- `ADMIN_TOKEN` - يتم حفظه تلقائياً عند تسجيل دخول Admin
- `ADVISOR_TOKEN` - يتم حفظه تلقائياً عند تسجيل دخول Advisor
- `STUDENT_TOKEN` - يتم حفظه تلقائياً عند تسجيل دخول Student

### 3. تسجيل الدخول

**مهم:** استخدم `identifier` (الرقم الوطني 14 رقم) وليس البريد الإلكتروني:

```json
{
  "identifier": "12345678901234",
  "password": "كلمة_المرور"
}
```

يتم حفظ الـ token تلقائياً في المتغير المناسب حسب دور المستخدم.

### 4. سير العمل المقترح

1. **Health Check** - تحقق من عمل النظام (لا يتطلب authentication)
2. **Login** - سجّل دخول كـ Admin/Advisor/Student
3. **اختبار Endpoints** حسب الدور

## محتويات Collection

### 1. Health Check (1 endpoint)
- `GET /api/health` - فحص صحة النظام وقاعدة البيانات

### 2. Authentication (2 endpoints)
- `POST /api/auth/login` - تسجيل الدخول (identifier + password)
- `PATCH /api/auth/change-password` - تغيير كلمة المرور

### 3. Users (5 endpoints) - Admin Only
- `GET /api/users` - قائمة المستخدمين
- `POST /api/users` - إنشاء مستخدم (first_name, last_name, national_id, personal_email, password, role)
- `GET /api/users/:id` - تفاصيل مستخدم
- `PATCH /api/users/:id` - تحديث مستخدم
- `DELETE /api/users/:id` - حذف مستخدم

### 4. Students (7 endpoints)
- `GET /api/students/me` - ملف الطالب الشخصي
- `GET /api/students/me/summary` - ملخص أكاديمي
- `PATCH /api/students/me` - تحديث ملف شخصي
- `GET /api/students/:id` - تفاصيل طالب (Admin)
- `PUT /api/students/:id` - تحديث طالب (Admin)
- `PATCH /api/students/:id/deactivate` - إلغاء تفعيل طالب (Admin)
- `PATCH /api/students/:id/activate` - إعادة تفعيل طالب (Admin)

### 5. Courses (9 endpoints)
- `GET /api/courses` - قائمة الكورسات
- `POST /api/courses` - إنشاء كورس (course_code, course_name, credits)
- `GET /api/courses/:id` - تفاصيل كورس
- `GET /api/courses/:id/details` - تفاصيل مع prerequisites
- `GET /api/courses/:id/stats` - إحصائيات المادة (من التقييمات)
- `PUT /api/courses/:id` - تحديث كورس (Admin)
- `DELETE /api/courses/:id` - حذف كورس (Admin) - يحذف prerequisites تلقائياً
- `PATCH /api/courses/:id/toggle` - تغيير حالة التوفر (Admin)
- `POST /api/courses/add-prerequisite` - إضافة prerequisite (courseId, prerequisiteId)
- `DELETE /api/courses/remove-prerequisite` - حذف prerequisite (courseId, prerequisiteId)

### 6. Semesters (5 endpoints)
- `GET /api/semesters` - قائمة الفصول الدراسية
- `POST /api/semesters` - إنشاء فصل (semester_name, start_date, end_date)
- `GET /api/semesters/:id` - تفاصيل فصل
- `PUT /api/semesters/:id` - تحديث فصل (Admin)
- `DELETE /api/semesters/:id` - حذف فصل (Admin)

**التواريخ:** يمكن إدخالها بصيغة `YYYY-MM-DD` أو ISO-8601

### 7. Enrollments (2 endpoints)
- `POST /api/enrollments` - التسجيل في كورس (course_id)
- `PATCH /api/enrollments/mark-passed` - تحديد كورس كـ passed (student_id, course_id, grade)

### 8. Grades (1 endpoint)
- `POST /api/grades/assign` - إضافة درجة (student_id, course_id, grade)

### 9. Progress (1 endpoint)
- `GET /api/progress/:studentId` - تقدم الطالب الأكاديمي

### 10. Study Plans (7 endpoints)
- `POST /api/study-plan` - إنشاء خطة دراسية (Student)
- `GET /api/study-plan/me/current` - الخطة الحالية (Student)
- `GET /api/study-plan/generate` - توصيات AI (Student)
- `POST /api/study-plan/:id/add-course` - إضافة كورس للخطة (Student)
- `PATCH /api/study-plan/:id/submit` - تقديم الخطة للمراجعة (Student)
- `PATCH /api/study-plan/:id/review` - مراجعة الخطة (Advisor)
- `GET /api/study-plan/advisor/pending` - الخطط المعلقة (Advisor)

### 11. Recommendations (1 endpoint)
- `POST /api/recommendations` - الحصول على توصيات (Student)

### 12. Advisor Portal (5 endpoints)
- `GET /api/advisor/me` - ملف المرشد
- `PATCH /api/advisor/me` - تحديث الملف
- `GET /api/advisor/dashboard` - لوحة التحكم
- `GET /api/advisor/students` - قائمة الطلاب المسؤول عنهم
- `GET /api/advisor/students/:studentId` - تفاصيل طالب

### 13. Messages (3 endpoints)
- `GET /api/advisor/messages` - قائمة المحادثات
- `GET /api/advisor/messages/conversations/:id/messages` - رسائل محادثة
- `POST /api/advisor/messages/conversations/:id/messages` - إرسال رسالة

### 14. Notifications (4 endpoints)
- `GET /api/notifications` - قائمة الإشعارات
- `POST /api/notifications` - إنشاء إشعار
- `PATCH /api/notifications/read-all` - تحديد الكل كمقروء
- `PATCH /api/notifications/:id/read` - تحديد واحد كمقروء

### 15. Feedback (3 endpoints)
- `POST /api/feedback` - إنشاء feedback (student_id, message)
- `GET /api/feedback/student/:studentId` - feedback طالب محدد
- `GET /api/feedback/my` - feedback الخاصة بي (Advisor)

### 16. Semester Records (4 endpoints)
- `POST /api/semester-records` - إنشاء سجل (student_id, semester_id, semester_gpa, registered_hours)
- `GET /api/semester-records/student/:studentId` - سجلات طالب
- `GET /api/semester-records/semester/:semesterId` - سجلات فصل
- `PATCH /api/semester-records/:id` - تحديث سجل (semester_gpa, registered_hours)

### 17. Admin Portal (3 endpoints)
- `GET /api/admin/overview` - نظرة عامة على النظام
- `GET /api/admin/system-settings` - إعدادات النظام
- `PATCH /api/admin/system-settings` - تحديث الإعدادات

### 18. AI Module (5 endpoints) - بنية تحتية
- `POST /api/ai/chat` - إرسال استفسار (Student)
- `POST /api/ai/suggest-plan` - اقتراح خطة (Student)
- `POST /api/ai/predict-gpa` - توقع المعدل (Student)
- `GET /api/ai/risk-analysis/:studentId` - تحليل مخاطر (Admin/Advisor)
- `GET /api/ai/history` - سجل التفاعلات (Student)

### 19. Alerts (4 endpoints) - Early Warning System
- `GET /api/alerts` - جميع التنبيهات (Admin/Advisor)
- `GET /api/alerts/student/:studentId` - تنبيهات طالب (Admin/Advisor)
- `POST /api/alerts/check/:studentId` - فحص وإنشاء تنبيهات (Admin/Advisor)
- `PATCH /api/alerts/:id/resolve` - تحديد تنبيه كمحلول (Admin/Advisor)

### 20. Graduation (4 endpoints)
- `GET /api/graduation/:studentId` - نظرة عامة على التخرج
- `GET /api/graduation/:studentId/requirements` - متطلبات مفصلة
- `GET /api/graduation/:studentId/audit` - تدقيق الدرجة
- `POST /api/graduation/requirements` - إنشاء متطلب (Admin)

### 21. Reviews (4 endpoints) - Course Reviews
- `POST /api/reviews` - إنشاء/تحديث تقييم (Student)
- `GET /api/reviews/course/:courseId` - تقييمات مادة
- `GET /api/reviews/my` - تقييماتي (Student)
- `DELETE /api/reviews/:id` - حذف تقييم (Student)

### 22. Analytics (4 endpoints)
- `GET /api/analytics/:studentId/overview` - نظرة عامة
- `GET /api/analytics/:studentId/gpa-trend` - منحنى المعدل
- `GET /api/analytics/:studentId/grade-distribution` - توزيع الدرجات
- `GET /api/analytics/:studentId/hours-progress` - تقدم الساعات

## ملاحظات مهمة

### ما تم إزالته
- **Departments** - لم يعد موجوداً في النظام
- **City** - لم يعد مستخدماً

### تحديث الطالب (Admin)
استخدم: `advisor_id`, `level`, `major_type` - وليس departmentId أو currentLevel

### تحديث الملف الشخصي (Student)
استخدم: `first_name`, `last_name`, `street_address`, `phones`

## استكشاف الأخطاء

### خطأ: "Cannot GET /api/health"
- تأكد من تشغيل السيرفر على المنفذ الصحيح (افتراضي 3000)
- تحقق من قيمة `BASE_URL` في المتغيرات

### خطأ: "Unauthorized"
- تأكد من تسجيل الدخول أولاً
- تحقق من أن الـ token محفوظ في المتغير الصحيح
- تأكد من استخدام الدور الصحيح للـ endpoint

### خطأ: "Invalid credentials" عند Login
- استخدم `identifier` (الرقم الوطني) وليس البريد الإلكتروني
- تأكد من صحة كلمة المرور

### خطأ: "Record not found"
- تأكد من استخدام ID صحيح موجود
- استخدم GET endpoint أولاً لمعرفة الـ IDs المتاحة

### خطأ: Validation
- راجع صيغة الـ body المطلوبة في هذا الملف أو [NEW-MODULES.md](NEW-MODULES.md)
- تأكد من أسماء الحقول الصحيحة (snake_case في أغلب الـ endpoints)

## الموارد

- **دليل النظام الكامل:** `docs/SYSTEM-GUIDE.md`
- **دليل الـ Modules الجديدة:** `docs/API/NEW-MODULES.md`
- **Swagger UI:** `http://localhost:3000/api-docs`
- **Database:** PostgreSQL + Prisma

---

**آخر تحديث:** 2026-03-01  
**الإصدار:** 3.0  
**التحديثات:**
- إزالة Departments
- إضافة AI, Alerts, Graduation, Reviews, Analytics
- تصحيح صيغ Login و Create User و Create Course
- تصحيح Enrollment و Semester Record و Feedback
