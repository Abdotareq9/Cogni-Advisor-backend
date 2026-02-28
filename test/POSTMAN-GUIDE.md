# 📮 دليل استخدام Postman - Cogni-Advisor API

## 📋 المحتويات
- [التثبيت والإعداد](#التثبيت-والإعداد)
- [استيراد المجموعة](#استيراد-المجموعة)
- [إعداد المتغيرات](#إعداد-المتغيرات)
- [سير العمل الموصى به](#سير-العمل-الموصى-به)
- [نصائح وحلول](#نصائح-وحلول)

---

## 🚀 التثبيت والإعداد

### 1. تحميل Postman

إذا لم يكن لديك Postman مثبتاً:

1. **قم بزيارة**: https://www.postman.com/downloads/
2. **حمّل النسخة** المناسبة لنظام التشغيل لديك (Windows, Mac, Linux)
3. **ثبّت البرنامج** واتبع خطوات التثبيت
4. **افتح Postman** وسجل دخولك (اختياري لكن موصى به)

### 2. تشغيل الـ Server

قبل استخدام Postman، تأكد من تشغيل الـ API server:

```bash
# في terminal مشروع Cogni-Advisor
npm run dev
```

انتظر حتى ترى:
```
✅ Server running on http://localhost:5000
✅ Database connected
```

---

## 📥 استيراد المجموعة

### الطريقة 1: استيراد سريع

1. **افتح Postman**

2. **اضغط على "Import"** في الزاوية العلوية اليسرى:
   ```
   [Postman Window]
   ├─ [Import] ← اضغط هنا
   ├─ Collections
   └─ ...
   ```

3. **اختر الملف**:
   - اضغط على "Upload Files"
   - انتقل إلى مجلد المشروع: `D:\Cogni-Advisor\test\`
   - اختر ملف: `api-test-collection.json`
   - اضغط "Open"

4. **راجع المحتوى**:
   - ستظهر لك معاينة للمجموعة
   - تحقق من عدد الـ endpoints (يجب أن يكون 64)
   - اضغط "Import" للتأكيد

5. **✅ تم بنجاح!**
   - ستجد المجموعة في قائمة "Collections" على اليسار
   - اسمها: "Cogni-Advisor API Test Collection"

### الطريقة 2: السحب والإفلات (Drag & Drop)

1. **افتح مستكشف الملفات** (File Explorer)
2. **انتقل إلى**: `D:\Cogni-Advisor\test\`
3. **اسحب ملف** `api-test-collection.json` **إلى نافذة Postman**
4. **اضغط Import**

---

## ⚙️ إعداد المتغيرات (Variables)

بعد استيراد المجموعة، يجب إعداد المتغيرات:

### 1. إنشاء Environment

1. **اضغط على "Environments"** (أيقونة العين 👁️ في الأعلى)
2. **اضغط "+ Create Environment"**
3. **اسم البيئة**: `Cogni-Advisor Local`

### 2. إضافة المتغيرات

أضف المتغيرات التالية:

| Variable | Type | Initial Value | Current Value |
|----------|------|---------------|---------------|
| `BASE_URL` | default | `http://localhost:5000` | `http://localhost:5000` |
| `ADMIN_TOKEN` | secret | (فارغ) | (سيتم ملؤه بعد Login) |
| `ADVISOR_TOKEN` | secret | (فارغ) | (سيتم ملؤه بعد Login) |
| `STUDENT_TOKEN` | secret | (فارغ) | (سيتم ملؤه بعد Login) |

### 3. حفظ وتفعيل

1. **اضغط Save** (Ctrl+S)
2. **اختر البيئة** من القائمة المنسدلة في الأعلى
3. **تأكد من تفعيلها** (يجب أن ترى "Cogni-Advisor Local" محددة)

---

## 🔄 سير العمل الموصى به

### المرحلة 1️⃣: فحص النظام

#### 1. Health Check (لا يتطلب authentication)

```
📁 Collection
  └─ 📂 00 - System Health
      └─ ✅ Health Check
```

- **افتح الطلب**: Health Check
- **اضغط "Send"**
- **النتيجة المتوقعة**: 200 OK
  ```json
  {
    "status": "healthy",
    "database": "connected"
  }
  ```

✅ إذا رأيت هذه النتيجة، الـ server يعمل بنجاح!

---

### المرحلة 2️⃣: تسجيل الدخول والحصول على Tokens

#### 2. Login كـ Admin

```
📁 Collection
  └─ 📂 01 - Authentication
      └─ 🔐 Login - Admin
```

1. **افتح الطلب**: Login - Admin
2. **تحقق من Body**:
   ```json
   {
     "identifier": "ADMIN_NATIONAL_ID",
     "password": "admin_password"
   }
   ```
   > غيّر البيانات حسب بيانات الـ admin في قاعدة البيانات

3. **اضغط Send**
4. **من Response، انسخ الـ token**:
   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   }
   ```

5. **احفظ الـ Token في Environment**:
   - اضغط على أيقونة العين 👁️ (Environments)
   - اضغط "Edit" بجانب "Cogni-Advisor Local"
   - الصق الـ token في خانة `ADMIN_TOKEN` (Current Value)
   - اضغط Save

#### 3. Login كـ Advisor

كرر نفس الخطوات مع:
- الطلب: Login - Advisor
- احفظ في: `ADVISOR_TOKEN`

#### 4. Login كـ Student

كرر نفس الخطوات مع:
- الطلب: Login - Student
- احفظ في: `STUDENT_TOKEN`

---

### المرحلة 3️⃣: إعداد النظام (Admin)

بعد تسجيل دخول Admin، يمكنك إعداد النظام:

#### 5. إنشاء الأقسام (Departments)

```
📁 Collection
  └─ 📂 04 - Setup: Departments & Semesters
      └─ ➕ Create Department
```

- **Body**:
  ```json
  {
    "dept_name": "قسم علوم الحاسب",
    "dept_code": "CS"
  }
  ```

#### 6. إنشاء الفصول الدراسية (Semesters)

```
📁 Collection
  └─ 📂 04 - Setup: Departments & Semesters
      └─ ➕ Create Semester
```

- **Body**:
  ```json
  {
    "semester_name": "الفصل الدراسي الأول 2024/2025",
    "start_date": "2024-09-15",
    "end_date": "2025-01-30"
  }
  ```

#### 7. إنشاء المقررات (Courses)

```
📁 Collection
  └─ 📂 05 - Course Management
      └─ ➕ Create Course
```

- **Body**:
  ```json
  {
    "course_code": "CS101",
    "course_name": "مقدمة في علوم الحاسب",
    "credits": 3,
    "is_available": true
  }
  ```

#### 8. إنشاء مستخدمين (Users)

```
📁 Collection
  └─ 📂 02 - User Management (Admin)
      └─ ➕ Create User (Student)
```

- **Body**:
  ```json
  {
    "first_name": "محمد",
    "last_name": "علي",
    "national_id": "30012250101234",
    "personal_email": "mohamed.ali@example.com",
    "password": "student123",
    "role": "STUDENT"
  }
  ```

---

### المرحلة 4️⃣: عمليات الطالب (Student)

#### 9. الملف الشخصي

```
📁 Collection
  └─ 📂 03 - Student Portal
      └─ 👤 Get My Profile
```

#### 10. قائمة المقررات المتاحة

```
📁 Collection
  └─ 📂 05 - Course Management
      └─ 📚 List Available Courses
```

#### 11. التسجيل في مقرر

```
📁 Collection
  └─ 📂 06 - Enrollment & Grades
      └─ ➕ Enroll in Course
```

- **Body**:
  ```json
  {
    "course_id": 1
  }
  ```

#### 12. إنشاء خطة دراسية

```
📁 Collection
  └─ 📂 07 - Study Plans
      └─ ➕ Create Study Plan
```

#### 13. توليد توصيات ذكية

```
📁 Collection
  └─ 📂 07 - Study Plans
      └─ 🤖 Generate AI Recommendations
```

#### 14. تقديم الخطة للمراجعة

```
📁 Collection
  └─ 📂 07 - Study Plans
      └─ 📤 Submit Plan for Review
```

---

### المرحلة 5️⃣: عمليات المرشد الأكاديمي (Advisor)

#### 15. لوحة التحكم

```
📁 Collection
  └─ 📂 08 - Advisor Portal
      └─ 📊 Dashboard
```

#### 16. قائمة الطلاب

```
📁 Collection
  └─ 📂 08 - Advisor Portal
      └─ 👥 My Students
```

#### 17. مراجعة الخطط المعلقة

```
📁 Collection
  └─ 📂 07 - Study Plans
      └─ 📋 Pending Plans (Advisor)
```

#### 18. الموافقة على خطة

```
📁 Collection
  └─ 📂 07 - Study Plans
      └─ ✅ Approve/Reject Plan
```

- **Body**:
  ```json
  {
    "status": "APPROVED",
    "feedback": "الخطة موافق عليها"
  }
  ```

#### 19. إرسال رسالة للطالب

```
📁 Collection
  └─ 📂 10 - Messaging
      └─ 💬 Send Message
```

#### 20. إنشاء تغذية راجعة

```
📁 Collection
  └─ 📂 09 - Feedback & Notifications
      └─ 📝 Create Feedback
```

---

## 💡 نصائح وحلول

### نصيحة 1: استخدام Tests للحفظ التلقائي للـ Tokens

في tab "Tests" لكل طلب Login، أضف:

```javascript
// احفظ الـ token تلقائياً
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    pm.environment.set("STUDENT_TOKEN", jsonData.token);
}
```

### نصيحة 2: Pre-request Scripts

للتحقق من وجود الـ token قبل إرسال الطلب:

```javascript
// في Pre-request Script
if (!pm.environment.get("STUDENT_TOKEN")) {
    throw new Error("❌ Please login first to get token!");
}
```

### نصيحة 3: استخدام Collection Runner

لتشغيل عدة طلبات متتالية:

1. **اضغط على المجموعة** (Collection)
2. **اضغط "Run"**
3. **اختر الطلبات** التي تريد تشغيلها
4. **اضغط "Run Cogni-Advisor..."**

### نصيحة 4: حفظ Responses

- **اضغط "Save Response"** بعد كل طلب ناجح
- يمكنك استخدامها كـ Examples لاحقاً

---

## 🐛 حل المشاكل الشائعة

### ❌ مشكلة: Could not send request

**السبب**: Server غير مشغل  
**الحل**:
```bash
cd D:\Cogni-Advisor
npm run dev
```

### ❌ مشكلة: 401 Unauthorized

**السبب**: Token منتهي أو غير موجود  
**الحل**:
1. سجل دخول مرة أخرى
2. تأكد من حفظ الـ token في Environment
3. تأكد من تفعيل البيئة الصحيحة

### ❌ مشكلة: 403 Forbidden

**السبب**: تستخدم token بدور خاطئ  
**الحل**: استخدم الـ token الصحيح (ADMIN_TOKEN للعمليات الإدارية، إلخ)

### ❌ مشكلة: 400 Bad Request

**السبب**: البيانات المرسلة غير صحيحة  
**الحل**: راجع Body وتأكد من مطابقة البيانات للـ validation rules

---

## 📚 الترتيب الموصى به للمجلدات

```
📁 Cogni-Advisor API Test Collection
├─ 📂 00 - System Health
│  └─ Health Check
│
├─ 📂 01 - Authentication
│  ├─ Login - Admin
│  ├─ Login - Advisor
│  ├─ Login - Student
│  └─ Change Password
│
├─ 📂 02 - User Management (Admin)
│  ├─ List Users
│  ├─ Create User (Admin)
│  ├─ Create User (Advisor)
│  ├─ Create User (Student)
│  ├─ Get User Details
│  ├─ Update User
│  └─ Delete User
│
├─ 📂 03 - Student Portal
│  ├─ Get My Profile
│  ├─ Get My Academic Summary
│  ├─ Update My Profile
│  ├─ Get Student (Admin)
│  ├─ Update Student (Admin)
│  └─ Deactivate Student (Admin)
│
├─ 📂 04 - Setup: Departments & Semesters
│  ├─ List Departments
│  ├─ Create Department
│  ├─ Delete Department
│  ├─ List Semesters
│  ├─ Create Semester
│  ├─ Get Semester Details
│  ├─ Update Semester
│  └─ Delete Semester
│
├─ 📂 05 - Course Management
│  ├─ List Courses
│  ├─ List Available Courses (Student)
│  ├─ Create Course (Admin)
│  ├─ Get Course Details
│  ├─ Get Course with Prerequisites
│  ├─ Update Course (Admin)
│  ├─ Delete Course (Admin)
│  ├─ Toggle Course Availability
│  └─ Add Prerequisite
│
├─ 📂 06 - Enrollment & Grades
│  ├─ Enroll in Course (Student)
│  ├─ Mark Course as Passed (Admin)
│  ├─ Assign Grade (Advisor)
│  └─ Get Student Progress
│
├─ 📂 07 - Study Plans
│  ├─ Create Study Plan (Student)
│  ├─ Get My Current Plan (Student)
│  ├─ Generate AI Recommendations (Student)
│  ├─ Add Course to Plan (Student)
│  ├─ Submit Plan for Review (Student)
│  ├─ Pending Plans (Advisor)
│  └─ Approve/Reject Plan (Advisor)
│
├─ 📂 08 - Advisor Portal
│  ├─ Get My Advisor Profile
│  ├─ Update My Advisor Profile
│  ├─ Advisor Dashboard
│  ├─ My Students List
│  └─ Get Student Details
│
├─ 📂 09 - Feedback & Notifications
│  ├─ Create Feedback (Advisor)
│  ├─ Get Student Feedback
│  ├─ Get My Feedback (Advisor)
│  ├─ Get My Notifications
│  ├─ Create Notification (Admin)
│  ├─ Mark All Notifications as Read
│  └─ Mark One Notification as Read
│
├─ 📂 10 - Messaging
│  ├─ Get Conversations (Advisor)
│  ├─ Get Messages with Student (Advisor)
│  └─ Send Message to Student (Advisor)
│
├─ 📂 11 - AI Recommendations
│  └─ Get AI Course Recommendations (Student)
│
├─ 📂 12 - Semester Records (Admin)
│  ├─ Create Semester Record
│  ├─ Get Student Records
│  ├─ Get Semester Records
│  └─ Update Record
│
└─ 📂 13 - Admin Dashboard
   ├─ System Overview
   ├─ Get System Settings
   └─ Update System Settings
```

---

## 🎯 سيناريوهات استخدام كاملة

### سيناريو 1: تسجيل طالب جديد ومتابعته

1. **Admin**: Login
2. **Admin**: Create User (Student) → محمد علي
3. **Admin**: Create Semester → الفصل الأول 2024
4. **Admin**: Create Courses → CS101, CS102
5. **Student**: Login (محمد علي)
6. **Student**: Get My Profile
7. **Student**: List Available Courses
8. **Student**: Enroll in Course (CS101)
9. **Student**: Create Study Plan
10. **Student**: Add Course to Plan (CS102)
11. **Student**: Submit Plan for Review
12. **Advisor**: Login
13. **Advisor**: Get Pending Plans
14. **Advisor**: Approve Plan
15. **Advisor**: Send Message to Student
16. **Advisor**: Create Feedback

### سيناريو 2: إدارة المقررات والمتطلبات

1. **Admin**: Login
2. **Admin**: Create Course (CS101 - مبادئ البرمجة)
3. **Admin**: Create Course (CS201 - هياكل البيانات)
4. **Admin**: Add Prerequisite (CS201 يتطلب CS101)
5. **Admin**: List Courses
6. **Admin**: Get Course with Prerequisites
7. **Student**: Login
8. **Student**: List Available Courses (سيرى CS101 فقط)
9. **Student**: Enroll in Course (CS101)
10. **Admin**: Mark Course as Passed
11. **Student**: List Available Courses (الآن سيرى CS201 أيضاً)

---

## 📖 مصادر إضافية

- **API Documentation**: http://localhost:5000/api-docs (Swagger)
- **cURL Examples**: `test/curl-examples.sh`
- **Complete Guide**: `test/API-GUIDE.md`
- **Collection File**: `test/api-test-collection.json`

---

**🎓 تم إنشاؤه بواسطة Cogni-Advisor Team**

**آخر تحديث**: فبراير 2024
