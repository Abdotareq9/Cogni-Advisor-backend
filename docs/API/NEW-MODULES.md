# دليل الـ Modules الجديدة

تم إنشاء 5 modules جديدة للتحسينات الأكاديمية في نظام Cogni-Advisor.

---

## 1. AI Module (`/api/ai`)

### Endpoints:

#### 1.1 إرسال استفسار للذكاء الاصطناعي
```
POST /api/ai/chat
Role: STUDENT
```

**Request Body:**
```json
{
  "message": "ما هي أفضل المواد للتسجيل في الفصل القادم؟"
}
```

**Response:**
```json
{
  "interaction_id": 1,
  "message": "تم إرسال استفسارك بنجاح. سيتم معالجته قريباً",
  "status": "PENDING"
}
```

---

#### 1.2 طلب اقتراح خطة دراسية
```
POST /api/ai/suggest-plan
Role: STUDENT
```

**Request Body:**
```json
{
  "semester_id": 5,
  "preferences": {
    "max_hours": 18,
    "difficulty_level": "MODERATE",
    "priority_areas": ["تخصص", "اختياري"]
  }
}
```

**Response:**
```json
{
  "interaction_id": 2,
  "message": "جاري إنشاء خطة دراسية مقترحة. سيتم إشعارك عند الانتهاء",
  "status": "PENDING"
}
```

---

#### 1.3 توقع المعدل التراكمي
```
POST /api/ai/predict-gpa
Role: STUDENT
```

**Request Body:**
```json
{
  "semester_id": 5,
  "planned_courses": [
    {
      "course_id": 10,
      "expected_grade": "A"
    },
    {
      "course_id": 12,
      "expected_grade": "B+"
    }
  ]
}
```

**Response:**
```json
{
  "interaction_id": 3,
  "message": "جاري حساب التوقع. سيتم إشعارك بالنتيجة",
  "status": "PENDING"
}
```

---

#### 1.4 تحليل المخاطر الأكاديمية
```
GET /api/ai/risk-analysis/:studentId
Role: ADMIN, ADVISOR
```

**Response:**
```json
{
  "interaction_id": 4,
  "message": "جاري تحليل المخاطر الأكاديمية",
  "status": "PENDING",
  "preliminary_data": {
    "cumulative_gpa": "2.50",
    "active_alerts": 2,
    "failed_courses": 1
  }
}
```

---

#### 1.5 سجل التفاعلات مع الذكاء الاصطناعي
```
GET /api/ai/history
Role: STUDENT
```

**Response:**
```json
{
  "total": 10,
  "interactions": [
    {
      "interaction_id": 1,
      "query_type": "CHAT",
      "status": "COMPLETED",
      "created_at": "2026-03-01T10:00:00.000Z",
      "has_response": true
    }
  ]
}
```

---

## 2. Alerts Module (`/api/alerts`)

### Endpoints:

#### 2.1 الحصول على جميع التنبيهات
```
GET /api/alerts
Role: ADMIN, ADVISOR
Query Parameters: ?isResolved=false&severity=HIGH&alertType=LOW_GPA
```

**Response:**
```json
{
  "total": 25,
  "unresolved": 15,
  "alerts": [
    {
      "alert_id": 1,
      "student_id": 5,
      "alert_type": "LOW_GPA",
      "severity": "HIGH",
      "title": "معدل تراكمي منخفض",
      "message": "المعدل التراكمي الحالي 1.85 أقل من 2.0",
      "is_resolved": false,
      "created_at": "2026-03-01T10:00:00.000Z",
      "student": {
        "user": {
          "first_name": "أحمد",
          "last_name": "محمد"
        }
      }
    }
  ]
}
```

---

#### 2.2 تنبيهات طالب معين
```
GET /api/alerts/student/:studentId
Role: ADMIN, ADVISOR
```

**Response:**
```json
{
  "student_id": 5,
  "total": 3,
  "unresolved": 2,
  "alerts": [...]
}
```

---

#### 2.3 فحص وإنشاء تنبيهات لطالب
```
POST /api/alerts/check/:studentId
Role: ADMIN, ADVISOR
```

**Response:**
```json
{
  "student_id": 5,
  "checks_performed": ["LOW_GPA", "MISSING_HOURS", "OVERLOAD"],
  "new_alerts": 2,
  "alerts": [
    {
      "alert_id": 10,
      "alert_type": "LOW_GPA",
      "severity": "HIGH",
      "title": "معدل تراكمي منخفض",
      "message": "المعدل التراكمي الحالي 1.85 أقل من 2.0"
    }
  ]
}
```

**Business Logic:**
- `LOW_GPA`: cumulative_gpa < 2.0 (CRITICAL if < 1.5)
- `MISSING_HOURS`: أقل من المتوقع بـ 12 ساعة للمستوى
- `OVERLOAD`: أكثر من 21 ساعة في الفصل الحالي

---

#### 2.4 تحديد تنبيه كمحلول
```
PATCH /api/alerts/:id/resolve
Role: ADMIN, ADVISOR
```

**Request Body (optional):**
```json
{
  "resolution_note": "تمت متابعة الطالب"
}
```

**Response:**
```json
{
  "message": "تم تحديد التنبيه كمحلول",
  "alert": {
    "alert_id": 1,
    "is_resolved": true,
    "resolved_at": "2026-03-01T12:00:00.000Z",
    "resolved_by": 2
  }
}
```

---

#### 2.5 تنبيهات طلاب المرشد
```
GET /api/alerts/advisor/alerts
Role: ADVISOR
```

**Response:**
```json
{
  "advisor_id": 2,
  "total_students": 15,
  "total_alerts": 8,
  "critical_alerts": 2,
  "high_alerts": 3,
  "alerts": [...]
}
```

---

## 3. Graduation Module (`/api/graduation`)

### Endpoints:

#### 3.1 نظرة عامة على التخرج
```
GET /api/graduation/:studentId
Role: ADMIN, ADVISOR, STUDENT
```

**Response:**
```json
{
  "student": {
    "student_id": 5,
    "name": "أحمد محمد",
    "level": 3,
    "cumulative_gpa": "3.20"
  },
  "progress": {
    "total_required_hours": 144,
    "earned_hours": 75,
    "remaining_hours": 69,
    "completion_percentage": 52.08
  },
  "estimation": {
    "average_hours_per_semester": 15,
    "estimated_semesters_remaining": 5
  },
  "requirements_progress": [
    {
      "requirement": "متطلبات التخصص",
      "category": "MAJOR_COURSES",
      "required_hours": 90,
      "completed_hours": 45,
      "percentage": 50
    }
  ]
}
```

---

#### 3.2 متطلبات التخرج المفصلة
```
GET /api/graduation/:studentId/requirements
Role: ADMIN, ADVISOR, STUDENT
```

**Response:**
```json
{
  "student_id": 5,
  "summary": {
    "total_requirements": 5,
    "completed_requirements": 1,
    "in_progress_requirements": 3,
    "not_started_requirements": 1
  },
  "requirements": [
    {
      "requirement_id": 1,
      "requirement_name": "متطلبات التخصص",
      "category": "MAJOR_COURSES",
      "description": "مواد التخصص الإلزامية",
      "required_hours": 90,
      "completed_hours": 45,
      "remaining_hours": 45,
      "completion_percentage": 50,
      "is_completed": false
    }
  ]
}
```

---

#### 3.3 تدقيق الدرجة (Degree Audit)
```
GET /api/graduation/:studentId/audit
Role: ADMIN, ADVISOR, STUDENT
```

**Response:**
```json
{
  "student": {
    "student_id": 5,
    "name": "أحمد محمد",
    "level": 3,
    "cumulative_gpa": "3.20",
    "total_earned_hours": 75
  },
  "audit_summary": {
    "total_courses_taken": 30,
    "courses_passed": 25,
    "courses_failed": 2,
    "courses_in_progress": 3,
    "total_earned_hours": 75,
    "remaining_hours": 69
  },
  "courses_by_category": {
    "غير محدد": [
      {
        "course_code": "CS101",
        "course_name": "مقدمة في البرمجة",
        "credits": 3,
        "grade": "A"
      }
    ]
  },
  "failed_courses": [],
  "in_progress_courses": [],
  "requirements_status": []
}
```

---

#### 3.4 إنشاء متطلب تخرج جديد
```
POST /api/graduation/requirements
Role: ADMIN
```

**Request Body:**
```json
{
  "requirement_name": "متطلبات التخصص",
  "required_hours": 90,
  "category": "MAJOR_COURSES",
  "description": "مواد التخصص الإلزامية"
}
```

**Response:**
```json
{
  "message": "تم إنشاء متطلب التخرج بنجاح",
  "requirement": {
    "requirement_id": 1,
    "requirement_name": "متطلبات التخصص",
    "required_hours": 90,
    "category": "MAJOR_COURSES"
  }
}
```

---

## 4. Reviews Module (`/api/reviews`)

### Endpoints:

#### 4.1 إنشاء/تحديث تقييم مادة
```
POST /api/reviews
Role: STUDENT
```

**Request Body:**
```json
{
  "course_id": 10,
  "rating": 4,
  "difficulty": 3,
  "workload": 4,
  "would_recommend": true,
  "comment": "مادة ممتازة والدكتور شرحه واضح",
  "is_anonymous": false
}
```

**Response:**
```json
{
  "message": "تم إضافة التقييم بنجاح",
  "review": {
    "review_id": 1,
    "student_id": 5,
    "course_id": 10,
    "rating": 4,
    "difficulty": 3,
    "workload": 4,
    "would_recommend": true,
    "comment": "مادة ممتازة والدكتور شرحه واضح",
    "is_anonymous": false,
    "created_at": "2026-03-01T10:00:00.000Z"
  }
}
```

**Validation:**
- يمكن تقييم المادة فقط إذا `status = PASSED`
- تقييم واحد لكل طالب لكل مادة
- `rating`, `difficulty`, `workload`: 1-5

---

#### 4.2 تقييمات مادة معينة
```
GET /api/reviews/course/:courseId
Role: STUDENT, ADVISOR, ADMIN (Authenticated)
```

**Response:**
```json
{
  "course": {
    "course_id": 10,
    "course_code": "CS201",
    "course_name": "هياكل البيانات"
  },
  "stats": {
    "average_rating": 4.2,
    "average_difficulty": 3.5,
    "average_workload": 3.8,
    "recommendation_percentage": 85.5
  },
  "total_reviews": 20,
  "reviews": [
    {
      "review_id": 1,
      "student_name": "أحمد محمد",
      "rating": 4,
      "difficulty": 3,
      "workload": 4,
      "would_recommend": true,
      "comment": "مادة ممتازة",
      "created_at": "2026-03-01T10:00:00.000Z"
    }
  ]
}
```

---

#### 4.3 تقييماتي
```
GET /api/reviews/my
Role: STUDENT
```

**Response:**
```json
{
  "total": 5,
  "reviews": [
    {
      "review_id": 1,
      "course": {
        "course_id": 10,
        "course_code": "CS201",
        "course_name": "هياكل البيانات"
      },
      "rating": 4,
      "difficulty": 3,
      "workload": 4,
      "would_recommend": true,
      "comment": "مادة ممتازة",
      "is_anonymous": false,
      "created_at": "2026-03-01T10:00:00.000Z"
    }
  ]
}
```

---

#### 4.4 حذف تقييم
```
DELETE /api/reviews/:id
Role: STUDENT
```

**Response:**
```json
{
  "message": "تم حذف التقييم بنجاح"
}
```

---

#### 4.5 إحصائيات مادة
```
GET /api/courses/:id/stats
Role: STUDENT, ADVISOR, ADMIN (Authenticated)
```

**Response:**
```json
{
  "course": {
    "course_id": 10,
    "course_code": "CS201",
    "course_name": "هياكل البيانات"
  },
  "total_reviews": 20,
  "stats": {
    "average_rating": 4.2,
    "average_difficulty": 3.5,
    "average_workload": 3.8,
    "recommendation_percentage": 85.5
  }
}
```

---

## 5. Analytics Module (`/api/analytics`)

### Endpoints:

#### 5.1 نظرة عامة على أداء الطالب
```
GET /api/analytics/:studentId/overview
Role: ADMIN, ADVISOR, STUDENT
```

**Response:**
```json
{
  "student": {
    "student_id": 5,
    "name": "أحمد محمد",
    "level": 3,
    "major_type": "علوم الحاسب"
  },
  "academic_standing": {
    "cumulative_gpa": "3.20",
    "total_earned_hours": 75,
    "hours_progress_percentage": 52.08,
    "remaining_hours": 69,
    "current_semester_gpa": "3.50"
  },
  "courses_summary": {
    "total": 30,
    "passed": 25,
    "failed": 2,
    "in_progress": 3
  },
  "alerts": {
    "active_alerts": 1,
    "critical_alerts": 0
  }
}
```

---

#### 5.2 منحنى المعدل التراكمي
```
GET /api/analytics/:studentId/gpa-trend
Role: ADMIN, ADVISOR, STUDENT
```

**Response:**
```json
{
  "student_id": 5,
  "cumulative_gpa": "3.20",
  "total_semesters": 5,
  "trend_direction": "تصاعدي",
  "semester_records": [
    {
      "semester_id": 1,
      "semester_name": "خريف 2024",
      "semester_gpa": "3.00",
      "registered_hours": 15,
      "start_date": "2024-09-01T00:00:00.000Z"
    },
    {
      "semester_id": 2,
      "semester_name": "ربيع 2025",
      "semester_gpa": "3.30",
      "registered_hours": 18,
      "start_date": "2025-02-01T00:00:00.000Z"
    }
  ]
}
```

---

#### 5.3 توزيع الدرجات
```
GET /api/analytics/:studentId/grade-distribution
Role: ADMIN, ADVISOR, STUDENT
```

**Response:**
```json
{
  "student_id": 5,
  "total_graded_courses": 25,
  "distribution": [
    {
      "grade": "A+",
      "count": 5,
      "percentage": 20
    },
    {
      "grade": "A",
      "count": 8,
      "percentage": 32
    },
    {
      "grade": "B+",
      "count": 6,
      "percentage": 24
    },
    {
      "grade": "B",
      "count": 4,
      "percentage": 16
    },
    {
      "grade": "C+",
      "count": 2,
      "percentage": 8
    }
  ],
  "courses_by_grade": [
    {
      "course_code": "CS101",
      "course_name": "مقدمة في البرمجة",
      "credits": 3,
      "grade": "A+"
    }
  ]
}
```

---

#### 5.4 تقدم الساعات المنجزة
```
GET /api/analytics/:studentId/hours-progress
Role: ADMIN, ADVISOR, STUDENT
```

**Response:**
```json
{
  "student_id": 5,
  "current_status": {
    "total_required_hours": 144,
    "earned_hours": 75,
    "remaining_hours": 69,
    "progress_percentage": 52.08
  },
  "projection": {
    "average_hours_per_semester": 15,
    "estimated_semesters_to_graduate": 5
  },
  "progress_by_semester": [
    {
      "semester_id": 1,
      "semester_name": "خريف 2024",
      "hours_registered": 15,
      "cumulative_hours": 15,
      "progress_percentage": 10.42
    },
    {
      "semester_id": 2,
      "semester_name": "ربيع 2025",
      "hours_registered": 18,
      "cumulative_hours": 33,
      "progress_percentage": 22.92
    }
  ]
}
```

---

## ملاحظات مهمة

### Authentication & Authorization
- جميع الـ endpoints تتطلب authentication
- كل endpoint له صلاحيات محددة (STUDENT, ADVISOR, ADMIN)

### Error Handling
- جميع الأخطاء تستخدم `AppError` class
- يتم استخدام `asyncHandler` wrapper لجميع الـ handlers

### Validation
- استخدام Zod للـ validation في جميع الـ endpoints
- رسائل الأخطاء بالعربية

### Database
- استخدام Prisma ORM
- جميع العمليات asynchronous

### Next Steps
1. تشغيل `npm install` (إذا لزم الأمر)
2. تشغيل `npm run dev` لبدء السيرفر
3. اختبار الـ endpoints باستخدام Postman أو أي أداة مشابهة
4. الربط مع فريق AI لاحقاً لمعالجة الطلبات في AI Module

### الربط مع فريق AI
- حالياً: جميع طلبات AI تُحفظ بـ `status: PENDING`
- مستقبلاً: سيتم إضافة webhook أو background job لمعالجة الطلبات
- البيانات محفوظة في `AIInteraction` table جاهزة للمعالجة
