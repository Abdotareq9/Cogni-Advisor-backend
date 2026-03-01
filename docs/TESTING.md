# اختبار الـ Endpoints الجديدة

## المتطلبات
1. تشغيل السيرفر: `npm run dev`
2. الحصول على JWT token من endpoint `/api/auth/login`
3. إضافة الـ token في header: `Authorization: Bearer YOUR_TOKEN`

---

## 1. AI Module Tests

### 1.1 Chat
```bash
POST http://localhost:3000/api/ai/chat
Authorization: Bearer YOUR_STUDENT_TOKEN
Content-Type: application/json

{
  "message": "ما هي أفضل المواد للتسجيل في الفصل القادم؟"
}
```

### 1.2 Suggest Plan
```bash
POST http://localhost:3000/api/ai/suggest-plan
Authorization: Bearer YOUR_STUDENT_TOKEN
Content-Type: application/json

{
  "semester_id": 1,
  "preferences": {
    "max_hours": 18,
    "difficulty_level": "MODERATE"
  }
}
```

### 1.3 Predict GPA
```bash
POST http://localhost:3000/api/ai/predict-gpa
Authorization: Bearer YOUR_STUDENT_TOKEN
Content-Type: application/json

{
  "semester_id": 1,
  "planned_courses": [
    {
      "course_id": 1,
      "expected_grade": "A"
    }
  ]
}
```

### 1.4 Risk Analysis
```bash
GET http://localhost:3000/api/ai/risk-analysis/1
Authorization: Bearer YOUR_ADMIN_TOKEN
```

### 1.5 History
```bash
GET http://localhost:3000/api/ai/history
Authorization: Bearer YOUR_STUDENT_TOKEN
```

---

## 2. Alerts Module Tests

### 2.1 Get All Alerts
```bash
GET http://localhost:3000/api/alerts
Authorization: Bearer YOUR_ADMIN_TOKEN
```

### 2.2 Get All Alerts (Filtered)
```bash
GET http://localhost:3000/api/alerts?isResolved=false&severity=HIGH
Authorization: Bearer YOUR_ADMIN_TOKEN
```

### 2.3 Get Student Alerts
```bash
GET http://localhost:3000/api/alerts/student/1
Authorization: Bearer YOUR_ADMIN_TOKEN
```

### 2.4 Check Student
```bash
POST http://localhost:3000/api/alerts/check/1
Authorization: Bearer YOUR_ADMIN_TOKEN
```

### 2.5 Resolve Alert
```bash
PATCH http://localhost:3000/api/alerts/1/resolve
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json

{
  "resolution_note": "تمت متابعة الطالب"
}
```

### 2.6 Advisor Alerts
```bash
GET http://localhost:3000/api/alerts/advisor/alerts
Authorization: Bearer YOUR_ADVISOR_TOKEN
```

---

## 3. Graduation Module Tests

### 3.1 Graduation Overview
```bash
GET http://localhost:3000/api/graduation/1
Authorization: Bearer YOUR_STUDENT_TOKEN
```

### 3.2 Requirements
```bash
GET http://localhost:3000/api/graduation/1/requirements
Authorization: Bearer YOUR_STUDENT_TOKEN
```

### 3.3 Degree Audit
```bash
GET http://localhost:3000/api/graduation/1/audit
Authorization: Bearer YOUR_STUDENT_TOKEN
```

### 3.4 Create Requirement
```bash
POST http://localhost:3000/api/graduation/requirements
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json

{
  "requirement_name": "متطلبات التخصص",
  "required_hours": 90,
  "category": "MAJOR_COURSES",
  "description": "مواد التخصص الإلزامية"
}
```

---

## 4. Reviews Module Tests

### 4.1 Create Review
```bash
POST http://localhost:3000/api/reviews
Authorization: Bearer YOUR_STUDENT_TOKEN
Content-Type: application/json

{
  "course_id": 1,
  "rating": 5,
  "difficulty": 3,
  "workload": 4,
  "would_recommend": true,
  "comment": "مادة ممتازة",
  "is_anonymous": false
}
```

### 4.2 Get Course Reviews
```bash
GET http://localhost:3000/api/reviews/course/1
Authorization: Bearer YOUR_STUDENT_TOKEN
```

### 4.3 Get My Reviews
```bash
GET http://localhost:3000/api/reviews/my
Authorization: Bearer YOUR_STUDENT_TOKEN
```

### 4.4 Delete Review
```bash
DELETE http://localhost:3000/api/reviews/1
Authorization: Bearer YOUR_STUDENT_TOKEN
```

### 4.5 Course Stats
```bash
GET http://localhost:3000/api/courses/1/stats
Authorization: Bearer YOUR_STUDENT_TOKEN
```

---

## 5. Analytics Module Tests

### 5.1 Overview
```bash
GET http://localhost:3000/api/analytics/1/overview
Authorization: Bearer YOUR_STUDENT_TOKEN
```

### 5.2 GPA Trend
```bash
GET http://localhost:3000/api/analytics/1/gpa-trend
Authorization: Bearer YOUR_STUDENT_TOKEN
```

### 5.3 Grade Distribution
```bash
GET http://localhost:3000/api/analytics/1/grade-distribution
Authorization: Bearer YOUR_STUDENT_TOKEN
```

### 5.4 Hours Progress
```bash
GET http://localhost:3000/api/analytics/1/hours-progress
Authorization: Bearer YOUR_STUDENT_TOKEN
```

---

## ملاحظات الاختبار

### تجهيز البيانات
قبل الاختبار، تأكد من:
1. وجود طلاب في قاعدة البيانات
2. وجود مواد دراسية
3. وجود تسجيلات (enrollments)
4. وجود سجلات فصلية (semester records)

### الصلاحيات
- `STUDENT` - طالب
- `ADVISOR` - مرشد أكاديمي
- `ADMIN` - مدير النظام

### الحصول على Token
```bash
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "national_id": "1234567890",
  "password": "your_password"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "role": "STUDENT"
  }
}
```

### الأخطاء الشائعة

#### 401 Unauthorized
- تأكد من إضافة الـ token في header
- تأكد من أن الـ token صحيح وغير منتهي

#### 403 Forbidden
- تأكد من أن المستخدم لديه الصلاحيات المطلوبة
- STUDENT لا يمكنه الوصول لـ endpoints الخاصة بـ ADMIN

#### 404 Not Found
- تأكد من أن الـ ID موجود في قاعدة البيانات
- تأكد من أن الـ route صحيح

#### 400 Bad Request
- تحقق من الـ validation errors
- تأكد من أن البيانات المرسلة صحيحة

---

## Postman Collection

يمكنك إنشاء Postman Collection للاختبار السريع:

1. إنشاء Collection جديد: "Cogni-Advisor - New Modules"
2. إضافة Environment variables:
   - `base_url`: http://localhost:3000
   - `student_token`: YOUR_STUDENT_TOKEN
   - `advisor_token`: YOUR_ADVISOR_TOKEN
   - `admin_token`: YOUR_ADMIN_TOKEN
3. استخدام `{{base_url}}` و `{{student_token}}` في الـ requests

---

## اختبار سريع

### Test 1: AI Chat
```bash
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"message": "مرحباً"}'
```

### Test 2: Check Alerts
```bash
curl -X POST http://localhost:3000/api/alerts/check/1 \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### Test 3: Graduation Overview
```bash
curl http://localhost:3000/api/graduation/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Test 4: Create Review
```bash
curl -X POST http://localhost:3000/api/reviews \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "course_id": 1,
    "rating": 5,
    "difficulty": 3,
    "workload": 4,
    "would_recommend": true,
    "comment": "ممتاز"
  }'
```

### Test 5: Analytics Overview
```bash
curl http://localhost:3000/api/analytics/1/overview \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## تشغيل السيرفر

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

---

## الصحة (Health Check)

```bash
GET http://localhost:3000/api/health
```

Response:
```json
{
  "status": "OK",
  "database": "connected"
}
```

---

✨ جاهز للاختبار! ✨
