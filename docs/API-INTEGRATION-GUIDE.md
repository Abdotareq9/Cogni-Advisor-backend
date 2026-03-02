# دليل ربط Frontend مع Cogni-Advisor API

هذا الملف موجه لفريق الـ Frontend لتسهيل ربط الواجهة الأمامية مع الـ Backend API.

---

## 1. معلومات الاتصال الأساسية

| العنصر                 | القيمة                           |
| ---------------------- | -------------------------------- |
| Base URL (Development) | `http://localhost:5000`          |
| API Prefix             | `/api`                           |
| Swagger UI             | `http://localhost:5000/api-docs` |
| Content-Type           | `application/json`               |

---

## 2. المصادقة (Authentication)

### 2.1 تسجيل الدخول (Login)

**`POST /api/auth/login`**

لا يتطلب مصادقة — يستخدم للحصول على الـ Token.

**Request Body:**

```json
{
  "identifier": "رقم وطني (14 حرف على الأقل)",
  "password": "كلمة المرور (6 أحرف على الأقل)"
}
```

**Response (200):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "first_name": "أحمد",
    "last_name": "محمد",
    "role": "STUDENT"
  }
}
```

**الأدوار:** `STUDENT` | `ADVISOR` | `ADMIN`

**Error (401):**

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### 2.2 إرفاق Token في الطلبات

كل الـ endpoints (ما عدا Login و Health) تتطلب إرسال Token في الهيدر:

```
Authorization: Bearer <token>
```

---

### 2.3 فحص الدور الحالي

**`GET /api/auth/me`** — يتطلب مصادقة

**Response (200):**

```json
{
  "id": 1,
  "role": "STUDENT"
}
```

---

### 2.4 تغيير كلمة المرور

**`PATCH /api/auth/change-password`** — يتطلب مصادقة

**Request Body:**

```json
{
  "currentPassword": "كلمة المرور الحالية",
  "newPassword": "كلمة المرور الجديدة"
}
```

---

## 3. صيغة الردود والأخطاء

### نجاح (Success)

- معظم الردود تأتي كـ JSON مباشرة بدون غلاف `success`.
- بعض الردود تعيد `{ message: "..." }`.

### أخطاء (Errors)

```json
{
  "success": false,
  "message": "وصف الخطأ"
}
```

| HTTP Code | المعنى                                               |
| --------- | ---------------------------------------------------- |
| 400       | Bad Request — خطأ في البيانات المرسلة                |
| 401       | Unauthorized — Token غير صالح أو منتهي               |
| 403       | Forbidden — لا صلاحية للوصول                         |
| 404       | Not Found — المورد غير موجود                         |
| 409       | Conflict — تكرار قيمة (مثل course_code موجود مسبقاً) |
| 429       | Too Many Requests — تجاوز حد الطلبات                 |
| 500       | Internal Server Error                                |

---

## 4. CORS

الـ Backend يدعم الطلبات من الأصول التالية (من `ALLOWED_ORIGINS` في `.env`):

- `http://localhost:3000`
- `http://localhost:5173`

تأكد أن منشأ الـ Frontend مضاف في `.env` كقيمة لـ `ALLOWED_ORIGINS`.

---

## 5. ملخص الـ Endpoints حسب الدور

### 5.1 Health (بدون Token)

| Method | Path          | الوصف                          |
| ------ | ------------- | ------------------------------ |
| GET    | `/api/health` | فحص صحة النظام وقاعدة البيانات |

**Response (200):**

```json
{
  "status": "OK",
  "database": "connected"
}
```

---

### 5.2 مشترك بين الطلاب والمرشدين والأدمن

| Method | Path                          | الدور | الوصف                   |
| ------ | ----------------------------- | ----- | ----------------------- |
| GET    | `/api/notifications`          | أي    | إشعارات المستخدم        |
| PATCH  | `/api/notifications/read-all` | أي    | تحديد الكل كمقروء       |
| PATCH  | `/api/notifications/:id/read` | أي    | تحديد إشعار واحد كمقروء |

---

### 5.3 الطالب (STUDENT)

| Method | Path                             | Request Body                                                        | الوصف                                              |
| ------ | -------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------- |
| GET    | `/api/students/me`               | -                                                                   | الملف الشخصي                                       |
| GET    | `/api/students/me/summary`       | -                                                                   | الملخص الأكاديمي مع GPA                            |
| PATCH  | `/api/students/me`               | `{ first_name?, last_name?, street_address?, phones? }`             | تحديث الملف                                        |
| POST   | `/api/enrollments`               | `{ course_id }`                                                     | التسجيل في مادة                                    |
| GET    | `/api/progress/:studentId`       | -                                                                   | التقدم الأكاديمي (studentId = الطالب الحالي عادةً) |
| GET    | `/api/recommendations`           | Query: `semesterId?`                                                | توصيات المواد                                      |
| POST   | `/api/study-plan`                | `{ semester_id }`                                                   | إنشاء خطة دراسية                                   |
| GET    | `/api/study-plan/me/current`     | -                                                                   | الخطة الحالية                                      |
| GET    | `/api/study-plan/generate`       | -                                                                   | توليد اقتراحات للخطة                               |
| POST   | `/api/study-plan/:id/add-course` | `{ course_id }`                                                     | إضافة مادة للخطة                                   |
| PATCH  | `/api/study-plan/:id/submit`     | -                                                                   | تقديم الخطة للمراجعة                               |
| POST   | `/api/ai/chat`                   | `{ message }`                                                       | استفسار للـ AI                                     |
| POST   | `/api/ai/suggest-plan`           | `{ semester_id, preferences? }`                                     | اقتراح خطة                                         |
| POST   | `/api/ai/predict-gpa`            | `{ semester_id, planned_courses: [{ course_id, expected_grade }] }` | توقع المعدل                                        |
| GET    | `/api/ai/history`                | -                                                                   | سجل تفاعلات الـ AI                                 |
| GET    | `/api/students/me/messages`      | -                                                                   | رسائلي مع مرشدي                                   |
| POST   | `/api/students/me/messages`     | `{ body \| message \| content \| text: "نص الرسالة" }`             | إرسال رسالة للمرشد                                |

**AI — مثال suggest-plan:**

```json
{
  "semester_id": 1,
  "preferences": {
    "max_hours": 18,
    "difficulty_level": "MODERATE",
    "priority_areas": ["Math", "CS"]
  }
}
```

**AI — مثال predict-gpa:**

```json
{
  "semester_id": 1,
  "planned_courses": [
    { "course_id": 1, "expected_grade": "A" },
    { "course_id": 2, "expected_grade": "B+" }
  ]
}
```

---

### 5.4 المرشد (ADVISOR)

| Method | Path                                                      | Request Body                                      | الوصف                         |
| ------ | --------------------------------------------------------- | ------------------------------------------------- | ----------------------------- |
| GET    | `/api/advisor/me`                                         | -                                                 | ملف المرشد                    |
| PATCH  | `/api/advisor/me`                                         | بيانات التحديث                                    | تحديث الملف                   |
| GET    | `/api/advisor/dashboard`                                  | -                                                 | لوحة التحكم                   |
| GET    | `/api/advisor/students`                                   | -                                                 | قائمة الطلاب المرتبطين        |
| GET    | `/api/advisor/students/:studentId`                        | -                                                 | تفاصيل طالب                   |
| GET    | `/api/advisor/messages/conversations`                     | -                                                 | المحادثات                     |
| GET    | `/api/advisor/messages/conversations/:studentId/messages` | -                                                 | رسائل مع طالب                 |
| POST   | `/api/advisor/messages/conversations/:studentId/messages` | `{ body \| message \| content \| text: "نص الرسالة" }` | إرسال رسالة                   |
| PATCH  | `/api/study-plan/:id/review`                              | `{ status: "APPROVED" \| "REJECTED", feedback? }` | مراجعة الخطة                  |
| GET    | `/api/study-plan/advisor/pending`                         | -                                                 | الخطط المعلقة                 |
| POST   | `/api/feedback`                                           | `{ student_id, advisor_id?, message? }`           | إنشاء feedback                |
| GET    | `/api/feedback/student/:studentId`                        | -                                                 | feedback طالب                 |
| GET    | `/api/feedback/my`                                        | -                                                 | feedback المرشد الحالي        |
| GET    | `/api/ai/risk-analysis/:studentId`                        | -                                                 | تحليل المخاطر (Advisor/Admin) |

---

### 5.5 الأدمن (ADMIN)

| Method | Path                               | Request Body                                                                    | الوصف                                                   |
| ------ | ---------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------- |
| GET    | `/api/users`                       | -                                                                               | قائمة المستخدمين                                        |
| POST   | `/api/users`                       | `{ first_name, last_name, national_id, personal_email, password, role }`        | إنشاء مستخدم                                            |
| GET    | `/api/users/:id`                   | -                                                                               | تفاصيل مستخدم                                           |
| PATCH  | `/api/users/:id`                   | `{ first_name?, last_name?, personal_email?, gender?, street_address? }`        | تحديث مستخدم                                            |
| DELETE | `/api/users/:id`                   | -                                                                               | حذف مستخدم                                              |
| GET    | `/api/students/:id`                | -                                                                               | تفاصيل طالب                                             |
| PUT    | `/api/students/:id`                | -                                                                               | تحديث طالب                                              |
| PATCH  | `/api/students/:id/deactivate`     | -                                                                               | إلغاء تفعيل طالب                                        |
| PATCH  | `/api/students/:id/activate`       | -                                                                               | إعادة تفعيل طالب                                        |
| POST   | `/api/courses`                     | `{ course_code, course_name, credits, required_hours_to_take?, is_available? }` | إنشاء مادة                                              |
| PUT    | `/api/courses/:id`                 | بيانات التحديث                                                                  | تحديث مادة                                              |
| DELETE | `/api/courses/:id`                 | -                                                                               | حذف مادة                                                |
| PATCH  | `/api/courses/:id/toggle`          | -                                                                               | تفعيل/إلغاء تفعيل مادة                                  |
| POST   | `/api/courses/add-prerequisite`    | `{ courseId, prerequisiteId }`                                                  | إضافة متطلب سابق                                        |
| DELETE | `/api/courses/remove-prerequisite` | `{ courseId, prerequisiteId }`                                                  | إزالة متطلب سابق                                        |
| POST   | `/api/semesters`                   | `{ semester_name?, start_date?, end_date? }`                                    | إنشاء فصل                                               |
| PUT    | `/api/semesters/:id`               | بيانات التحديث                                                                  | تحديث فصل                                               |
| DELETE | `/api/semesters/:id`               | -                                                                               | حذف فصل                                                 |
| PATCH  | `/api/enrollments/mark-passed`     | `{ student_id, course_id, grade: "A"\|"B"\|"C"\|"D"\|"F" }`                     | تسجيل درجة ومكتملة (يُنشئ enrollment إن لم يكن موجوداً) |
| POST   | `/api/semester-records`            | بيانات السجل                                                                    | إنشاء سجل فصل                                           |
| PATCH  | `/api/semester-records/:id`        | -                                                                               | تحديث سجل                                               |
| POST   | `/api/notifications`               | بيانات الإشعار                                                                  | إنشاء إشعار                                             |
| GET    | `/api/admin/overview`              | -                                                                               | نظرة عامة على النظام                                    |
| GET    | `/api/admin/system-settings`       | -                                                                               | إعدادات النظام                                          |
| PATCH  | `/api/admin/system-settings`       | `{ general?, aiEngine?, permissions?, security? }` أو `{ key, value }` لتحديث قسم واحد | تحديث الإعدادات                                         |

---

## 6. Endpoints بدون مصادقة (أو مصادقة محدودة)

| Method | Path                       | مصادقة          |
| ------ | -------------------------- | --------------- |
| GET    | `/api/health`              | لا              |
| POST   | `/api/auth/login`          | لا              |
| GET    | `/api/courses`             | لا (قائمة عامة) |
| GET    | `/api/courses/:id`         | لا              |
| GET    | `/api/courses/:id/details` | لا              |
| GET    | `/api/semesters`           | لا              |

---

## 7. بنية البيانات الشائعة

### إنشاء مستخدم (Admin)

```json
{
  "first_name": "أحمد",
  "middle_name": "محمد",
  "last_name": "علي",
  "national_id": "12345678901234",
  "personal_email": "ahmed@example.com",
  "password": "password123",
  "gender": "M",
  "street_address": "عنوان",
  "role": "STUDENT"
}
```

### إنشاء مادة

```json
{
  "course_code": "CS101",
  "course_name": "مقدمة في البرمجة",
  "credits": 3,
  "required_hours_to_take": null,
  "is_available": true
}
```

### إنشاء فصل

```json
{
  "semester_name": "الفصل الأول 2024/2025",
  "start_date": "2024-09-15",
  "end_date": "2025-01-30"
}
```

**ملاحظة:** التواريخ بصيغة ISO 8601 مثل `"2024-09-15"` أو `"2024-09-15T00:00:00.000Z"`.

### إنشاء إشعار (Admin)

```json
{
  "recipient_id": 5,
  "title": "تنبيه",
  "body": "نص الرسالة"
}
```

**ملاحظات:**

- `recipient_id` يجب أن يكون `user_id` المستلم (رقم صحيح غير سالب).
- إذا كانت القيمة `0` يتم إرسال الإشعار للمستخدم الحالي (مثلاً Admin يرسل إشعاراً لنفسه).
- الحقول `title` و `body` اختيارية.

### تحديد إشعار كمقروء

**`PATCH /api/notifications/:id/read`** — استخدم `id` أو `notification_id` من نتيجة `GET /api/notifications` كقيمة لـ `:id`.

**بنية رد GET /api/notifications:**

```json
[
  {
    "notification_id": 5,
    "id": 5,
    "recipient_id": 1,
    "title": "...",
    "body": "...",
    "is_read": false,
    "sent_at": "..."
  }
]
```

إذا ظهر "الإشعار غير موجود" — المعرف غير صحيح. إذا ظهر "هذا الإشعار لا يخص حسابك" — الإشعار مُرسل لمستخدم آخر.

---

## 8. أمثلة استدعاء (cURL)

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier":"12345678901234","password":"mypassword"}'
```

### طلب محمي بـ Token

```bash
curl -X GET http://localhost:5000/api/students/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 9. Swagger و Postman

- **Swagger:** افتح `http://localhost:5000/api-docs` لاستعراض وتجربة الـ API تفاعلياً.
- **Postman:** استورد ملف `postman/collection.json` من المشروع.

---

## 10. ملاحظات مهمة

1. **Rate Limiting:** الطلبات محدودة حسب الفترة الزمنية (مثلاً 100 طلب/15 دقيقة للـ API و 5 محاولات/15 دقيقة للـ login).
2. **Token Expiry:** الـ Token صالح لمدة يوم واحد (24 ساعة).
3. **مسار Messages:** رسائل المرشد للطلاب تحت `/api/advisor/messages`. الطالب يستخدم `/api/students/me/messages` لعرض وإرسال رسائل لمرشده (يتطلب أن يكون الطالب مُعيَّناً لمرشد).
4. **تحديث إعدادات النظام:** يمكن إرسال إما الصيغة الكاملة `{ general: {...}, aiEngine: {...}, ... }` أو صيغة مختصرة `{ key: "general", value: { systemName: "..." } }` حيث key أحد: general, aiEngine, permissions, security.
4. **مسارات Courses:** استخدم `course_code` و `course_name` في الجسم — لا يوجد حقل `name` أو `description` في مخطط الـ Course الأساسي (راجع Swagger للتفاصيل الدقيقة).

---

**آخر تحديث:** 2026-03  
**الإصدار:** يتوافق مع الحالة بعد إزالة موديولات Alerts، Graduation، Reviews، Analytics، Grades
