# 📮 دليل سريع: استيراد المجموعة إلى Postman

## 🎯 الهدف
استيراد جميع الـ 64 API endpoint إلى Postman في 5 دقائق فقط!

---

## ⚡ الخطوات السريعة (3 خطوات)

### 1️⃣ تشغيل الـ Server

```bash
cd D:\Cogni-Advisor
npm run dev
```

انتظر حتى ترى: ✅ `Server running on http://localhost:5000`

---

### 2️⃣ استيراد المجموعة إلى Postman

#### أ. افتح Postman

```
┌─────────────────────────────────────┐
│  Postman                      × □ ─  │
├─────────────────────────────────────┤
│  [Import] [New] [Runner]            │ ← اضغط على Import
├──────┬──────────────────────────────┤
│ Col  │                              │
│ lec  │                              │
│ tio  │                              │
│ ns   │                              │
└──────┴──────────────────────────────┘
```

#### ب. اختر الملف

```
┌──────────────────────────────────────┐
│  Import                              │
│  ┌────────────────────────────────┐  │
│  │  Drop files here               │  │
│  │         OR                     │  │
│  │  [Choose Files] [Link]         │  │ ← اضغط هنا
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

**المسار**: `D:\Cogni-Advisor\test\api-test-collection.json`

#### ج. تأكيد الاستيراد

```
┌──────────────────────────────────────┐
│  Import Elements                      │
│  ──────────────────────────────────  │
│  ✓ Cogni-Advisor API Test Collection│
│    64 requests                       │
│    18 folders                        │
│  ──────────────────────────────────  │
│              [Import]                │ ← اضغط هنا
└──────────────────────────────────────┘
```

✅ **تم!** المجموعة الآن في Postman

---

### 3️⃣ إعداد Environment (اختياري لكن موصى به)

#### أ. إنشاء Environment جديد

```
Postman → Environments (في الشريط الجانبي)
→ [+ Create Environment]
```

**الاسم**: `Cogni-Advisor Local`

#### ب. إضافة المتغيرات

| Variable | Initial Value | Current Value |
|----------|---------------|---------------|
| BASE_URL | http://localhost:5000 | http://localhost:5000 |
| ADMIN_TOKEN | | (فارغ - سيتم ملؤه بعد Login) |
| ADVISOR_TOKEN | | (فارغ) |
| STUDENT_TOKEN | | (فارغ) |

#### ج. حفظ وتفعيل

1. اضغط **Save** (Ctrl+S)
2. من القائمة في الأعلى، اختر: **Cogni-Advisor Local**

```
┌─────────────────────────────────────┐
│  [No Environment ▼] → [Cogni-Advisor Local ▼] │
└─────────────────────────────────────┘
```

---

## 🎮 ابدأ الاستخدام

### الخطوة الأولى: Health Check

```
Collections
└─ Cogni-Advisor API Test Collection
   └─ Health Check
      └─ فحص صحة النظام - System Health Check
```

1. **افتح الطلب**: System Health Check
2. **اضغط "Send"**
3. **النتيجة المتوقعة**:
   ```json
   {
     "status": "healthy",
     "database": "connected"
   }
   ```

✅ **النظام يعمل!**

---

### الخطوة الثانية: Login

```
Collections
└─ Cogni-Advisor API Test Collection
   └─ Authentication
      └─ تسجيل الدخول - User Login
```

1. **افتح الطلب**: User Login
2. **عدّل Body**:
   ```json
   {
     "identifier": "12345678901234",
     "password": "password123"
   }
   ```
   > استخدم بيانات مستخدم حقيقي من قاعدة البيانات

3. **اضغط "Send"**
4. **من Response، انسخ الـ token**:
   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   }
   ```

5. **احفظه في Environment**:
   - اضغط أيقونة العين 👁️ في الأعلى
   - Edit → الصق الـ token في `STUDENT_TOKEN`
   - Save

---

### الخطوة الثالثة: اختبر أي طلب آخر!

```
Collections
└─ Cogni-Advisor API Test Collection
   └─ Students
      └─ ملفي الشخصي - Get My Profile
```

1. **افتح الطلب**: Get My Profile
2. **اضغط "Send"**
3. **ستحصل على بيانات ملفك الشخصي**

الـ `{{STUDENT_TOKEN}}` سيتم استبداله تلقائياً من Environment!

---

## 📚 بنية المجموعة

```
📁 Cogni-Advisor API Test Collection (64 endpoints)
│
├─ 🏥 Health Check (1)
│  └─ فحص صحة النظام
│
├─ 🔐 Authentication (2)
│  ├─ تسجيل الدخول
│  └─ تغيير كلمة المرور
│
├─ 👥 Users (5) - Admin فقط
│  ├─ قائمة المستخدمين
│  ├─ إنشاء مستخدم جديد
│  ├─ تفاصيل مستخدم
│  ├─ تحديث مستخدم
│  └─ حذف مستخدم
│
├─ 👨‍🎓 Students (6)
│  ├─ ملفي الشخصي
│  ├─ ملخصي الأكاديمي
│  ├─ تحديث ملفي
│  ├─ طالب محدد (Admin)
│  ├─ تحديث طالب (Admin)
│  └─ تعطيل طالب (Admin)
│
├─ 📚 Courses (8)
│  ├─ قائمة المقررات
│  ├─ إنشاء مقرر (Admin)
│  ├─ تفاصيل مقرر
│  ├─ تفاصيل مع المتطلبات
│  ├─ تحديث مقرر (Admin)
│  ├─ حذف مقرر (Admin)
│  ├─ تبديل الإتاحة (Admin)
│  └─ إضافة متطلب سابق (Admin)
│
├─ 🏢 Departments (3)
│  ├─ قائمة الأقسام
│  ├─ إنشاء قسم (Admin)
│  └─ حذف قسم (Admin)
│
├─ 📅 Semesters (5)
│  ├─ قائمة الفصول
│  ├─ إنشاء فصل (Admin)
│  ├─ تفاصيل فصل
│  ├─ تحديث فصل (Admin)
│  └─ حذف فصل (Admin)
│
├─ 📝 Enrollments (2)
│  ├─ التسجيل في مقرر (Student)
│  └─ تحديد كمجتاز (Admin)
│
├─ 🎓 Grades (1)
│  └─ تعيين درجة (Advisor)
│
├─ 📊 Academic Progress (1)
│  └─ التقدم الأكاديمي
│
├─ 📋 Study Plans (7)
│  ├─ إنشاء خطة (Student)
│  ├─ خطتي الحالية (Student)
│  ├─ توصيات AI (Student)
│  ├─ إضافة مقرر (Student)
│  ├─ تقديم للمراجعة (Student)
│  ├─ مراجعة الخطة (Advisor)
│  └─ الخطط المعلقة (Advisor)
│
├─ 👨‍🏫 Advisor Portal (5)
│  ├─ ملفي كمرشد
│  ├─ تحديث ملفي
│  ├─ لوحة التحكم
│  ├─ قائمة طلابي
│  └─ تفاصيل طالب
│
├─ 🔔 Notifications (4)
│  ├─ إشعاراتي
│  ├─ إنشاء إشعار (Admin)
│  ├─ تحديد الكل كمقروء
│  └─ تحديد واحد كمقروء
│
├─ 💬 Feedback (3)
│  ├─ إنشاء تغذية راجعة (Advisor)
│  ├─ تغذية طالب
│  └─ تغذيتي الراجعة (Advisor)
│
├─ 📑 Semester Records (4) - Admin
│  ├─ إنشاء سجل
│  ├─ سجلات طالب
│  ├─ سجلات فصل
│  └─ تحديث سجل
│
├─ 💬 Messages (3) - Advisor
│  ├─ قائمة المحادثات
│  ├─ رسائل مع طالب
│  └─ إرسال رسالة
│
├─ 🤖 Recommendations (1) - Student
│  └─ توصيات ذكية
│
└─ 🏛️ Admin Portal (3)
   ├─ نظرة عامة
   ├─ إعدادات النظام
   └─ تحديث الإعدادات
```

---

## 🎯 سير العمل الموصى به

### للمطورين (Testing Full Flow)

```
1. Health Check ✅
2. Login as Admin → احفظ ADMIN_TOKEN
3. Create Departments → CS, Math
4. Create Semesters → Fall 2024
5. Create Courses → CS101, CS102, MATH101
6. Add Prerequisites → CS102 requires CS101
7. Create Users → Student, Advisor
8. Login as Student → احفظ STUDENT_TOKEN
9. Enroll in Courses → CS101
10. Create Study Plan
11. Generate AI Recommendations
12. Submit Plan for Review
13. Login as Advisor → احفظ ADVISOR_TOKEN
14. Review Pending Plans
15. Approve Plan
16. Send Message to Student
17. Create Feedback
```

### للطلاب (Student Workflow)

```
1. Login → احفظ Token
2. Get My Profile
3. Get My Academic Summary
4. List Available Courses
5. Enroll in Courses
6. Create Study Plan
7. Add Courses to Plan
8. Generate AI Recommendations
9. Submit Plan for Review
10. Get My Notifications
11. Get My Feedback
```

### للمرشدين (Advisor Workflow)

```
1. Login → احفظ Token
2. Get Advisor Dashboard
3. Get My Students List
4. Get Pending Study Plans
5. Review and Approve Plans
6. Send Messages to Students
7. Create Feedback
8. Get Conversations
```

### للإداريين (Admin Workflow)

```
1. Login → احفظ Token
2. System Overview Dashboard
3. List/Create Users
4. List/Create Departments
5. List/Create Semesters
6. List/Create Courses
7. Manage Prerequisites
8. Update System Settings
9. Create Notifications
10. View Semester Records
```

---

## 💡 نصائح سريعة

### ✨ نصيحة 1: استخدام Variables

بدلاً من كتابة `http://localhost:5000` في كل مرة، استخدم:
```
{{BASE_URL}}/api/courses
```

### ✨ نصيحة 2: حفظ التلقائي للـ Tokens

في tab "Tests" لطلب Login، أضف:

```javascript
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    pm.environment.set("STUDENT_TOKEN", jsonData.token);
    console.log("✅ Token saved automatically!");
}
```

### ✨ نصيحة 3: مسح Tokens سريع

```javascript
// في Console (Ctrl+Alt+C)
pm.environment.unset("ADMIN_TOKEN");
pm.environment.unset("ADVISOR_TOKEN");
pm.environment.unset("STUDENT_TOKEN");
```

### ✨ نصيحة 4: اختبار سريع لجميع الـ endpoints

1. اضغط على المجموعة (Collection)
2. اضغط "Run"
3. اختر جميع الطلبات
4. اضغط "Run Cogni-Advisor..."

---

## 🐛 حل المشاكل

### ❌ Could not send request

```
✅ الحل:
1. تأكد من تشغيل الـ server: npm run dev
2. تحقق من BASE_URL: http://localhost:5000
```

### ❌ 401 Unauthorized

```
✅ الحل:
1. سجل دخول مرة أخرى
2. احفظ الـ token الجديد في Environment
3. تأكد من تفعيل البيئة (Cogni-Advisor Local)
```

### ❌ 403 Forbidden

```
✅ الحل:
تستخدم token خاطئ! استخدم:
- ADMIN_TOKEN للعمليات الإدارية
- ADVISOR_TOKEN لعمليات المرشد
- STUDENT_TOKEN لعمليات الطالب
```

### ❌ Variables not working

```
✅ الحل:
1. تأكد من إنشاء Environment
2. تأكد من تفعيل Environment (من القائمة في الأعلى)
3. اضغط على أيقونة العين 👁️ للتحقق من القيم
```

---

## 📖 مصادر إضافية

- **الدليل الكامل**: [`test/POSTMAN-GUIDE.md`](./POSTMAN-GUIDE.md) - دليل مفصل مع سيناريوهات
- **دليل API**: [`test/API-GUIDE.md`](./API-GUIDE.md) - أمثلة cURL مفصلة
- **أمثلة سريعة**: [`test/curl-examples.sh`](./curl-examples.sh) - اختبار من Terminal
- **Swagger UI**: http://localhost:5000/api-docs - وثائق تفاعلية

---

## ✅ تم بنجاح!

الآن لديك:
- ✅ 64 endpoint جاهزة في Postman
- ✅ Environment مُعد للاستخدام
- ✅ Tokens محفوظة تلقائياً
- ✅ جاهز لاختبار الـ API!

---

**🎓 Cogni-Advisor Team**  
**آخر تحديث**: فبراير 2024
