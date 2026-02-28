# API Test Collection

## 📋 نظرة عامة

هذا المجلد يحتوي على مجموعة شاملة من جميع الـ API endpoints للمشروع (64 endpoint).

### 📁 الملفات

1. **`api-test-collection.json`** (49 KB)
   - مجموعة كاملة من 64 endpoint مع أمثلة طلبات JSON
   - جاهزة للاستيراد إلى Postman/Insomnia/Thunder Client

2. **`POSTMAN-QUICK-START.md`** ⭐ **ابدأ من هنا!**
   - دليل سريع (5 دقائق) لاستيراد المجموعة إلى Postman
   - خطوات مبسطة مع رسوم توضيحية
   - سير عمل موصى به حسب الدور

3. **`POSTMAN-GUIDE.md`**
   - دليل شامل ومفصل لاستخدام Postman
   - سيناريوهات استخدام كاملة
   - نصائح متقدمة وحلول للمشاكل

4. **`API-GUIDE.md`**
   - دليل شامل بالعربية مع أمثلة cURL
   - أمثلة لكل module
   - حل الأخطاء الشائعة

5. **`curl-examples.sh`**
   - ملف Bash قابل للتنفيذ
   - 15 مثال سريع لأهم الـ endpoints

6. **`api-test-collection-backup.json`**
   - نسخة احتياطية من الملف الأصلي

## 🚀 كيفية الاستخدام

### ⚡ البداية السريعة (موصى به)

**اقرأ**: [`POSTMAN-QUICK-START.md`](./POSTMAN-QUICK-START.md)

دليل سريع (5 دقائق) يشرح:
1. تشغيل الـ Server
2. استيراد المجموعة إلى Postman (3 خطوات)
3. إعداد Environment والمتغيرات
4. تجربة أول طلب (Health Check & Login)

### 📖 الدليل الكامل

**اقرأ**: [`POSTMAN-GUIDE.md`](./POSTMAN-GUIDE.md)

دليل شامل يحتوي على:
- التثبيت والإعداد التفصيلي
- سير العمل الموصى به حسب كل دور
- سيناريوهات استخدام كاملة
- نصائح متقدمة (Tests, Pre-request Scripts)
- حل جميع المشاكل الشائعة

### 1. استخدام الملف JSON مباشرة

يمكنك استيراد ملف `api-test-collection.json` إلى:
- **Postman**: File → Import → اختر الملف
- **Insomnia**: Application → Import/Export → Import Data → اختر الملف
- **Thunder Client** (VS Code): Collections → Import → اختر الملف

### 2. استخدام cURL

#### مثال: تسجيل الدخول

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "12345678901234",
    "password": "password123"
  }'
```

#### مثال: الحصول على قائمة المقررات (يتطلب token)

```bash
curl -X GET http://localhost:5000/api/courses \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### مثال: إنشاء مقرر جديد (Admin فقط)

```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "course_code": "CS101",
    "course_name": "مقدمة في علوم الحاسب",
    "credits": 3,
    "is_available": true
  }'
```

### 3. استخدام JavaScript/Node.js

```javascript
// تسجيل الدخول
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    identifier: '12345678901234',
    password: 'password123'
  })
});

const { token, user } = await response.json();
console.log('Token:', token);

// استخدام الـ token في طلبات أخرى
const coursesResponse = await fetch('http://localhost:5000/api/courses', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const courses = await coursesResponse.json();
console.log('Courses:', courses);
```

## 📊 إحصائيات المجموعة

- **إجمالي الـ Endpoints**: 64
- **عدد الـ Modules**: 18
- **الأدوار المدعومة**: ADMIN, ADVISOR, STUDENT, public

### توزيع الـ Endpoints حسب Module

| Module | عدد الـ Endpoints |
|--------|------------------|
| Authentication | 2 |
| Users | 5 |
| Students | 6 |
| Courses | 8 |
| Departments | 3 |
| Semesters | 5 |
| Enrollments | 2 |
| Grades | 1 |
| Academic Progress | 1 |
| Study Plans | 7 |
| Advisor Portal | 5 |
| Notifications | 4 |
| Feedback | 3 |
| Semester Records | 4 |
| Admin Portal | 3 |
| Messages | 3 |
| Recommendations | 1 |
| Health Check | 1 |

## 🔑 متغيرات البيئة

يحتوي الملف على متغيرات يمكن استخدامها:

```json
{
  "BASE_URL": "http://localhost:5000",
  "ADMIN_TOKEN": "",
  "ADVISOR_TOKEN": "",
  "STUDENT_TOKEN": ""
}
```

### الحصول على Tokens

1. **تسجيل دخول كـ Admin:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier": "ADMIN_NATIONAL_ID", "password": "admin_password"}'
```

2. **تسجيل دخول كـ Advisor:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier": "ADVISOR_NATIONAL_ID", "password": "advisor_password"}'
```

3. **تسجيل دخول كـ Student:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier": "STUDENT_NATIONAL_ID", "password": "student_password"}'
```

احفظ الـ `token` من كل response واستخدمه في `Authorization: Bearer <token>`.

## 📝 ملاحظات مهمة

### المصادقة (Authentication)

- جميع الـ endpoints تتطلب `Authorization: Bearer <token>` باستثناء:
  - `POST /api/auth/login`
  - `GET /api/health`

### معدل الطلبات (Rate Limiting)

- **Login endpoint**: 10 طلبات كل 15 دقيقة
- **باقي الـ API**: 100 طلب كل 15 دقيقة

### صيغة الأخطاء

عند حدوث خطأ، يكون الرد بهذا الشكل:

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

## 🧪 اختبار سريع

للتحقق من عمل الـ API:

```bash
# فحص صحة النظام (لا يتطلب مصادقة)
curl http://localhost:5000/api/health

# النتيجة المتوقعة:
# {
#   "status": "healthy",
#   "timestamp": "2024-02-28T12:00:00Z",
#   "database": "connected",
#   "uptime": 86400
# }
```

## 📚 المراجع

- [API Documentation (Swagger)](http://localhost:5000/api-docs)
- [Project README](../README.md)

---

**تم إنشاء هذه المجموعة بواسطة Cogni-Advisor Team**
