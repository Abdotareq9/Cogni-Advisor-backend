# 🔄 سير العمل المنطقي للنظام (Workflow Order)

## 📖 نظرة عامة

الـ API endpoints في هذه المجموعة مرتبة بشكل منطقي حسب سير العمل الطبيعي للنظام.  
هذا الترتيب يساعدك على فهم كيفية استخدام النظام خطوة بخطوة.

---

## 🎯 الترتيب المنطقي للاستخدام

### المرحلة 0️⃣: التحقق من النظام

```
🏥 Health Check
└─ فحص صحة النظام
```

**الهدف**: التأكد من أن الـ API يعمل بشكل صحيح.

**ما تحتاجه**: لا شيء (public endpoint)

**مثال**:
```bash
curl http://localhost:5000/api/health
```

---

### المرحلة 1️⃣: المصادقة والدخول

```
🔐 Authentication
├─ تسجيل الدخول (Admin/Advisor/Student)
└─ تغيير كلمة المرور
```

**الهدف**: الحصول على JWT token للمصادقة.

**ما تحتاجه**: 
- الرقم الوطني (national_id)
- كلمة المرور (password)

**مثال**:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier": "12345678901234", "password": "password123"}'
```

**الناتج**: 
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": 1, "role": "STUDENT" }
}
```

> 💡 **احفظ الـ token!** ستحتاجه في جميع الطلبات القادمة.

---

### المرحلة 2️⃣: إعداد النظام (Admin فقط)

#### A. إدارة المستخدمين

```
👥 User Management
├─ قائمة المستخدمين
├─ إنشاء مستخدم جديد (Admin/Advisor/Student)
├─ تفاصيل مستخدم
├─ تحديث مستخدم
└─ حذف مستخدم
```

**الترتيب الموصى به**:
1. إنشاء Admins أولاً
2. ثم إنشاء Advisors
3. ثم إنشاء Students

**مثال**:
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

#### B. إنشاء الأقسام والفصول

```
🏢 Departments
├─ قائمة الأقسام
├─ إنشاء قسم (مثل: علوم الحاسب، الرياضيات)
└─ حذف قسم

📅 Semesters
├─ قائمة الفصول
├─ إنشاء فصل دراسي (مثل: الفصل الأول 2024/2025)
├─ تفاصيل فصل
├─ تحديث فصل
└─ حذف فصل
```

**الترتيب**:
1. إنشاء الأقسام (Departments) أولاً
2. ثم إنشاء الفصول الدراسية (Semesters)

#### C. إدارة المقررات

```
📚 Course Management
├─ قائمة المقررات
├─ إنشاء مقرر (مثل: CS101)
├─ تفاصيل مقرر
├─ تفاصيل مع المتطلبات السابقة
├─ تحديث مقرر
├─ حذف مقرر
├─ تفعيل/تعطيل مقرر
└─ إضافة متطلب سابق (مثل: CS201 يتطلب CS101)
```

**الترتيب**:
1. إنشاء المقررات الأساسية أولاً (CS101, MATH101)
2. ثم إنشاء المقررات المتقدمة (CS201, CS301)
3. ثم إضافة المتطلبات السابقة (Prerequisites)

**مثال**:
```json
// إنشاء CS101
{
  "course_code": "CS101",
  "course_name": "مقدمة في علوم الحاسب",
  "credits": 3,
  "is_available": true
}

// إنشاء CS201
{
  "course_code": "CS201",
  "course_name": "هياكل البيانات",
  "credits": 3,
  "is_available": true
}

// إضافة متطلب: CS201 يتطلب CS101
{
  "courseId": 2,      // CS201
  "prerequisiteId": 1  // CS101
}
```

---

### المرحلة 3️⃣: عمليات الطالب (Student)

#### A. الملف الشخصي

```
👨‍🎓 Student Portal
├─ ملفي الشخصي
├─ ملخصي الأكاديمي (مع GPA)
├─ تحديث ملفي
├─ طالب محدد (Admin)
├─ تحديث طالب (Admin)
└─ تعطيل طالب (Admin)
```

**سير العمل**:
1. **عرض الملف**: Get My Profile
2. **عرض الملخص الأكاديمي**: Get My Academic Summary (GPA, الساعات المكتملة، إلخ)
3. **تحديث البيانات**: Update My Profile (العنوان، الهاتف، إلخ)

#### B. تصفح وتسجيل المقررات

```
📚 Courses (للطالب)
└─ قائمة المقررات المتاحة

📝 Enrollments
├─ التسجيل في مقرر
└─ تحديد كمجتاز (Admin)
```

**سير العمل**:
1. **تصفح المقررات**: List Available Courses
2. **اختيار مقرر**: (راجع المتطلبات السابقة)
3. **التسجيل**: Enroll in Course

**مثال**:
```json
// التسجيل في CS101
{
  "course_id": 1
}
```

#### C. الخطة الدراسية

```
📋 Study Plans (للطالب)
├─ إنشاء خطة دراسية
├─ خطتي الحالية
├─ توليد توصيات AI
├─ إضافة مقرر للخطة
├─ تقديم الخطة للمراجعة
```

**سير العمل**:
1. **إنشاء خطة جديدة**: Create Study Plan
   ```json
   { "semester_id": 1 }
   ```

2. **الحصول على توصيات ذكية**: Generate AI Recommendations
   - النظام يحلل سجلك الأكاديمي
   - يقترح المقررات المناسبة

3. **إضافة مقررات للخطة**: Add Course to Plan
   ```json
   { "course_id": 1 }
   ```

4. **مراجعة الخطة**: Get My Current Plan

5. **تقديم للمراجعة**: Submit Plan for Review

#### D. التقدم الأكاديمي

```
📊 Academic Progress
└─ التقدم الأكاديمي (GPA، الساعات، التوزيع)

🤖 AI Recommendations
└─ توصيات ذكية بناءً على الأداء
```

---

### المرحلة 4️⃣: عمليات المرشد الأكاديمي (Advisor)

#### A. لوحة التحكم

```
👨‍🏫 Advisor Portal
├─ ملفي كمرشد
├─ تحديث ملفي (office_hours, bio)
├─ لوحة التحكم (إحصائيات)
├─ قائمة طلابي
└─ تفاصيل طالب محدد
```

**سير العمل**:
1. **عرض اللوحة**: Advisor Dashboard
   - عدد الطلاب
   - الخطط المعلقة
   - متوسط GPA
   - الطلاب المعرضين للخطر

2. **عرض الطلاب**: My Students List

3. **عرض تفاصيل طالب**: Get Student Details
   - السجل الأكاديمي
   - المقررات الحالية
   - الخطط الدراسية

#### B. مراجعة الخطط الدراسية

```
📋 Study Plans (للمرشد)
├─ الخطط المعلقة
└─ مراجعة الخطة (موافقة/رفض)
```

**سير العمل**:
1. **عرض الخطط المعلقة**: Get Pending Plans

2. **مراجعة كل خطة**: 
   - تحقق من المقررات المختارة
   - تحقق من المتطلبات السابقة
   - تحقق من الحمل الدراسي (Credit Hours)

3. **الموافقة أو الرفض**: Review Plan
   ```json
   {
     "status": "APPROVED",
     "feedback": "الخطة موافق عليها، استمر في العمل الجيد"
   }
   ```
   أو
   ```json
   {
     "status": "REJECTED",
     "feedback": "الحمل الدراسي كبير جداً (21 ساعة). أنصح بتقليله إلى 18 ساعة."
   }
   ```

#### C. التواصل مع الطلاب

```
💬 Messaging
├─ قائمة المحادثات
├─ رسائل مع طالب محدد
└─ إرسال رسالة

💬 Feedback
├─ إنشاء تغذية راجعة
├─ تغذية طالب
└─ تغذيتي الراجعة
```

**سير العمل**:
1. **عرض المحادثات**: Get Conversations

2. **عرض رسائل مع طالب**: Get Messages with Student

3. **إرسال رسالة**: Send Message
   ```json
   {
     "body": "مرحباً أحمد، أود مناقشة خطتك الدراسية للفصل القادم."
   }
   ```

4. **إنشاء تغذية راجعة**: Create Feedback
   ```json
   {
     "student_id": 1,
     "message": "أداء ممتاز في هذا الفصل، استمر في العمل الجيد"
   }
   ```

#### D. إدارة الدرجات

```
🎓 Grades
└─ تعيين درجة
```

**مثال**:
```json
{
  "student_id": 1,
  "course_id": 1,
  "grade": "A"
}
```

---

### المرحلة 5️⃣: الإشعارات (للجميع)

```
🔔 Notifications
├─ إشعاراتي
├─ إنشاء إشعار (Admin)
├─ تحديد الكل كمقروء
└─ تحديد واحد كمقروء
```

**سير العمل**:
1. **عرض الإشعارات**: Get My Notifications
   - إشعارات غير مقروءة
   - إشعارات الموافقات
   - رسائل جديدة

2. **تحديد كمقروء**: Mark as Read

---

### المرحلة 6️⃣: الإدارة المتقدمة (Admin)

#### A. لوحة التحكم

```
🏛️ Admin Portal
├─ نظرة عامة على النظام
├─ إعدادات النظام
└─ تحديث الإعدادات
```

**سير العمل**:
1. **نظرة عامة**: System Overview
   - عدد المستخدمين
   - عدد الطلاب/المرشدين
   - عدد المقررات
   - صحة النظام

2. **عرض الإعدادات**: Get System Settings
   - General (اسم النظام، السنة الأكاديمية)
   - AI Engine (حساسية التوصيات، كشف المخاطر)
   - Permissions (صلاحيات الأدوار)
   - Security (كلمات المرور، الجلسات)

3. **تحديث الإعدادات**: Update System Settings

#### B. سجلات الفصول الدراسية

```
📑 Semester Records
├─ إنشاء سجل فصل
├─ سجلات طالب
├─ سجلات فصل دراسي
└─ تحديث سجل
```

**سير العمل**:
1. **إنشاء سجل لطالب**: Create Semester Record
   ```json
   {
     "student_id": 1,
     "semester_id": 1,
     "semester_gpa": 3.5,
     "registered_hours": 15
   }
   ```

2. **عرض سجلات طالب**: Get Student Records

3. **عرض سجلات فصل**: Get Semester Records

4. **تحديث سجل**: Update Record

---

## 🎯 سيناريوهات استخدام كاملة

### سيناريو 1: طالب جديد يسجل في النظام

```
1. Admin: Create User (Student) → محمد علي
2. محمد: Login → احصل على TOKEN
3. محمد: Get My Profile → اعرض ملفي
4. محمد: Get My Academic Summary → GPA = 0 (طالب جديد)
5. محمد: List Available Courses → اعرض المقررات
6. محمد: Enroll in Course (CS101)
7. محمد: Create Study Plan
8. محمد: Add Course to Plan (CS102, MATH101)
9. محمد: Generate AI Recommendations
10. محمد: Submit Plan for Review
11. Advisor: Login
12. Advisor: Get Pending Plans
13. Advisor: Review Plan → APPROVED
14. محمد: Get My Notifications → "تم الموافقة على خطتك"
```

### سيناريو 2: إعداد نظام جديد

```
1. Admin: Login
2. Admin: Create Departments → CS, Math, Physics
3. Admin: Create Semesters → Fall 2024, Spring 2025
4. Admin: Create Courses → CS101, CS102, CS201, MATH101
5. Admin: Add Prerequisites → CS201 requires CS101
6. Admin: Create Users (Advisors) → د. أحمد، د. فاطمة
7. Admin: Create Users (Students) → 50 طالب
8. Admin: System Overview → تحقق من الإحصائيات
9. Admin: Update System Settings → تفعيل AI Engine
```

### سيناريو 3: مرشد يراجع خطط الطلاب

```
1. Advisor: Login
2. Advisor: Advisor Dashboard → 25 طالب، 5 خطط معلقة
3. Advisor: Get Pending Plans
4. Advisor: لكل خطة:
   a. Review Plan Details
   b. Check Prerequisites
   c. Check Credit Hours Load
   d. Approve or Reject with Feedback
5. Advisor: My Students List
6. Advisor: Get Student Details → محمد علي
7. Advisor: Send Message → "مرحباً محمد..."
8. Advisor: Create Feedback → "أداء ممتاز"
```

### سيناريو 4: طالب يستخدم التوصيات الذكية

```
1. Student: Login
2. Student: Get My Academic Summary → GPA = 3.2, 45 ساعة مكتملة
3. Student: Generate AI Recommendations
   → النظام يقترح: CS301, CS302, MATH201
   → السبب: بناءً على أدائك الممتاز في CS201
4. Student: Create Study Plan
5. Student: Add Courses (من التوصيات)
6. Student: Get My Current Plan → مراجعة
7. Student: Submit Plan for Review
8. Student: Get My Notifications → انتظار الموافقة
```

---

## 📊 الترتيب حسب الأولوية

### للمطورين (Testing)

```
الأولوية 1 (ضروري):
✅ Health Check
✅ Authentication (Login)
✅ Create User
✅ Create Department
✅ Create Semester
✅ Create Course
✅ Enroll in Course

الأولوية 2 (مهم):
✅ Create Study Plan
✅ Submit Plan
✅ Review Plan (Advisor)
✅ Assign Grade
✅ Get Progress

الأولوية 3 (إضافي):
✅ Generate AI Recommendations
✅ Messaging
✅ Notifications
✅ Feedback
✅ Admin Dashboard
```

### للمستخدمين النهائيين

```
للطلاب:
1. Login
2. My Profile
3. List Courses
4. Enroll
5. Study Plan
6. Notifications

للمرشدين:
1. Login
2. Dashboard
3. My Students
4. Pending Plans
5. Review Plans
6. Messages

للإداريين:
1. Login
2. System Overview
3. Manage Users
4. Manage Courses
5. System Settings
```

---

## 💡 نصائح للترتيب المنطقي

### ✨ نصيحة 1: ابدأ بالإعداد

```
قبل اختبار عمليات الطلاب/المرشدين:
1. أنشئ الأقسام (Departments)
2. أنشئ الفصول (Semesters)
3. أنشئ المقررات (Courses)
4. أنشئ المستخدمين (Users)
```

### ✨ نصيحة 2: اتبع الترتيب الطبيعي

```
الترتيب الصحيح:
Department → Semester → Course → User → Enrollment → Study Plan

ليس:
User → Course → Department ❌
```

### ✨ نصيحة 3: راعِ المتطلبات السابقة

```
الترتيب الصحيح:
1. أنشئ CS101
2. أنشئ CS201
3. أضف Prerequisite: CS201 requires CS101
4. الطالب يسجل في CS101 أولاً
5. بعد اجتياز CS101، يسجل في CS201

ليس:
1. الطالب يسجل في CS201 مباشرة ❌
```

---

**🎓 Cogni-Advisor Team**  
**آخر تحديث**: فبراير 2024
