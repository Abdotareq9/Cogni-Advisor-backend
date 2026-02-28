# 📚 دليل استخدام API - Cogni-Advisor

## المحتويات

- [نظرة عامة](#نظرة-عامة)
- [البدء السريع](#البدء-السريع)
- [أمثلة الطلبات](#أمثلة-الطلبات)
- [الأخطاء الشائعة](#الأخطاء-الشائعة)

---

## نظرة عامة

هذا الدليل يحتوي على أمثلة عملية لاستخدام جميع الـ API endpoints في نظام Cogni-Advisor.

**إجمالي الـ Endpoints**: 64  
**عدد الـ Modules**: 18  
**Base URL**: `http://localhost:5000`

---

## البدء السريع

### 1️⃣ تشغيل الـ Server

```bash
npm run dev
```

### 2️⃣ فحص صحة النظام

```bash
curl http://localhost:5000/api/health
```

**الاستجابة المتوقعة:**
```json
{
  "status": "healthy",
  "timestamp": "2024-02-28T12:00:00Z",
  "database": "connected",
  "uptime": 86400
}
```

### 3️⃣ تسجيل الدخول والحصول على Token

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "12345678901234",
    "password": "password123"
  }'
```

**الاستجابة المتوقعة:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "role": "STUDENT",
    "first_name": "أحمد",
    "last_name": "محمد"
  }
}
```

> 💡 **نصيحة**: احفظ الـ `token` واستخدمه في جميع الطلبات القادمة.

---

## أمثلة الطلبات

### 🔐 المصادقة (Authentication)

#### تسجيل الدخول
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "12345678901234",
    "password": "password123"
  }'
```

#### تغيير كلمة المرور
```bash
curl -X PATCH http://localhost:5000/api/auth/change-password \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "currentPassword": "password123",
    "newPassword": "newPassword456"
  }'
```

---

### 👥 المستخدمين (Users - Admin فقط)

#### قائمة المستخدمين
```bash
curl -X GET "http://localhost:5000/api/users?role=STUDENT&page=1&limit=10" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

#### إنشاء مستخدم جديد
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "first_name": "محمد",
    "middle_name": "أحمد",
    "last_name": "علي",
    "national_id": "30012250101234",
    "personal_email": "mohamed.ali@example.com",
    "password": "securePass123",
    "gender": "Male",
    "city_id": 1,
    "street_address": "123 شارع الجامعة، الجيزة",
    "role": "STUDENT"
  }'
```

#### تحديث مستخدم
```bash
curl -X PATCH http://localhost:5000/api/users/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "first_name": "محمد المحدّث",
    "personal_email": "updated.email@example.com"
  }'
```

#### حذف مستخدم
```bash
curl -X DELETE http://localhost:5000/api/users/1 \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

---

### 👨‍🎓 الطلاب (Students)

#### ملفي الشخصي
```bash
curl -X GET http://localhost:5000/api/students/me \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN"
```

#### ملخصي الأكاديمي
```bash
curl -X GET http://localhost:5000/api/students/me/summary \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN"
```

#### تحديث ملفي الشخصي
```bash
curl -X PATCH http://localhost:5000/api/students/me \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN" \
  -d '{
    "first_name": "أحمد المحدّث",
    "street_address": "123 شارع النيل",
    "city_id": 2,
    "phones": ["+201234567890", "+201098765432"]
  }'
```

---

### 📚 المقررات (Courses)

#### قائمة المقررات
```bash
curl -X GET "http://localhost:5000/api/courses?is_available=true" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### إنشاء مقرر (Admin)
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "course_code": "CS101",
    "course_name": "مقدمة في علوم الحاسب",
    "credits": 3,
    "required_hours_to_take": 0,
    "is_available": true
  }'
```

#### تفاصيل مقرر مع المتطلبات
```bash
curl -X GET http://localhost:5000/api/courses/1/details \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### إضافة متطلب سابق (Admin)
```bash
curl -X POST http://localhost:5000/api/courses/add-prerequisite \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "courseId": 2,
    "prerequisiteId": 1
  }'
```

---

### 📝 التسجيل في المقررات (Enrollments)

#### التسجيل في مقرر
```bash
curl -X POST http://localhost:5000/api/enrollments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN" \
  -d '{
    "course_id": 1
  }'
```

---

### 📋 الخطط الدراسية (Study Plans)

#### إنشاء خطة دراسية
```bash
curl -X POST http://localhost:5000/api/study-plan \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN" \
  -d '{
    "semester_id": 1
  }'
```

#### توليد توصيات ذكية
```bash
curl -X GET http://localhost:5000/api/study-plan/generate \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN"
```

#### إضافة مقرر للخطة
```bash
curl -X POST http://localhost:5000/api/study-plan/1/add-course \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN" \
  -d '{
    "course_id": 1
  }'
```

#### تقديم الخطة للمراجعة
```bash
curl -X PATCH http://localhost:5000/api/study-plan/1/submit \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN"
```

#### مراجعة الخطة (Advisor)
```bash
curl -X PATCH http://localhost:5000/api/study-plan/1/review \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADVISOR_TOKEN" \
  -d '{
    "status": "APPROVED",
    "feedback": "الخطة موافق عليها، استمر في العمل الجيد"
  }'
```

---

### 👨‍🏫 بوابة المرشد الأكاديمي (Advisor Portal)

#### لوحة التحكم
```bash
curl -X GET http://localhost:5000/api/advisor/dashboard \
  -H "Authorization: Bearer YOUR_ADVISOR_TOKEN"
```

#### قائمة طلابي
```bash
curl -X GET "http://localhost:5000/api/advisor/students?search=أحمد&level=3" \
  -H "Authorization: Bearer YOUR_ADVISOR_TOKEN"
```

#### إنشاء تغذية راجعة
```bash
curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADVISOR_TOKEN" \
  -d '{
    "student_id": 1,
    "message": "أداء ممتاز في هذا الفصل، استمر في العمل الجيد"
  }'
```

---

### 💬 الرسائل (Messages)

#### قائمة المحادثات (Advisor)
```bash
curl -X GET http://localhost:5000/api/messages/conversations \
  -H "Authorization: Bearer YOUR_ADVISOR_TOKEN"
```

#### إرسال رسالة (Advisor)
```bash
curl -X POST http://localhost:5000/api/messages/conversations/1/messages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADVISOR_TOKEN" \
  -d '{
    "body": "مرحباً، أود مناقشة خطتك الدراسية القادمة."
  }'
```

---

### 🔔 الإشعارات (Notifications)

#### إشعاراتي
```bash
curl -X GET "http://localhost:5000/api/notifications?unread=true&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### تحديد الكل كمقروء
```bash
curl -X PATCH http://localhost:5000/api/notifications/read-all \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### 🏛️ بوابة الإدارة (Admin Portal)

#### نظرة عامة على النظام
```bash
curl -X GET http://localhost:5000/api/admin/overview \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

#### إعدادات النظام
```bash
curl -X GET http://localhost:5000/api/admin/system-settings \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

#### تحديث إعدادات النظام
```bash
curl -X PATCH http://localhost:5000/api/admin/system-settings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "general": {
      "systemName": "نظام الإرشاد الأكاديمي الذكي",
      "academicYear": "2024/2025",
      "defaultCreditLimit": 18,
      "semesterDurationWeeks": 16
    },
    "aiEngine": {
      "recommendationSensitivity": 0.75,
      "riskDetectionLevel": "Medium",
      "gpaWarningThreshold": 2.5,
      "aiModelStatus": "active"
    }
  }'
```

---

## الأخطاء الشائعة

### ❌ 401 Unauthorized
**السبب**: Token غير صحيح أو منتهي الصلاحية  
**الحل**: سجل دخول مرة أخرى واحصل على token جديد

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier": "YOUR_ID", "password": "YOUR_PASSWORD"}'
```

### ❌ 403 Forbidden
**السبب**: ليس لديك صلاحية للوصول لهذا الـ endpoint  
**الحل**: تأكد من استخدام token بالدور المناسب (ADMIN, ADVISOR, STUDENT)

### ❌ 400 Bad Request
**السبب**: البيانات المرسلة غير صحيحة  
**الحل**: راجع البيانات المطلوبة في الملف `api-test-collection.json`

**مثال على رسالة خطأ:**
```json
{
  "success": false,
  "errors": [
    {
      "field": "body.identifier",
      "message": "Invalid national ID"
    }
  ]
}
```

### ❌ 429 Too Many Requests
**السبب**: تجاوزت معدل الطلبات المسموح  
**الحل**: انتظر 15 دقيقة ثم حاول مرة أخرى

**معدلات الطلبات:**
- Login: 10 طلبات كل 15 دقيقة
- باقي الـ API: 100 طلب كل 15 دقيقة

---

## 📚 مصادر إضافية

- [API Test Collection](./api-test-collection.json) - ملف JSON شامل لجميع الـ endpoints
- [Swagger Documentation](http://localhost:5000/api-docs) - وثائق تفاعلية
- [cURL Examples](./curl-examples.sh) - أمثلة سريعة باستخدام cURL
- [Project README](../README.md) - دليل المشروع الكامل

---

**تم إنشاؤه بواسطة Cogni-Advisor Team** 🎓
