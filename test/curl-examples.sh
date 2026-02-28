#!/bin/bash

# Cogni-Advisor API - cURL Test Examples
# هذا الملف يحتوي على أمثلة اختبار سريعة باستخدام cURL

# الألوان للعرض
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:5000"

echo -e "${BLUE}=== Cogni-Advisor API Test Examples ===${NC}\n"

# 1. Health Check
echo -e "${GREEN}1. Health Check (لا يتطلب مصادقة)${NC}"
echo "curl -X GET $BASE_URL/api/health"
echo ""

# 2. Login
echo -e "${GREEN}2. Login - تسجيل الدخول${NC}"
echo "curl -X POST $BASE_URL/api/auth/login \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{"
echo "    \"identifier\": \"12345678901234\","
echo "    \"password\": \"password123\""
echo "  }'"
echo ""

# 3. Change Password
echo -e "${GREEN}3. Change Password - تغيير كلمة المرور${NC}"
echo "curl -X PATCH $BASE_URL/api/auth/change-password \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'Authorization: Bearer YOUR_TOKEN_HERE' \\"
echo "  -d '{"
echo "    \"currentPassword\": \"password123\","
echo "    \"newPassword\": \"newPassword456\""
echo "  }'"
echo ""

# 4. List Users (Admin)
echo -e "${GREEN}4. List Users - قائمة المستخدمين (Admin فقط)${NC}"
echo "curl -X GET '$BASE_URL/api/users?role=STUDENT&page=1&limit=10' \\"
echo "  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN'"
echo ""

# 5. Create User (Admin)
echo -e "${GREEN}5. Create User - إنشاء مستخدم جديد (Admin فقط)${NC}"
echo "curl -X POST $BASE_URL/api/users \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN' \\"
echo "  -d '{"
echo "    \"first_name\": \"محمد\","
echo "    \"last_name\": \"علي\","
echo "    \"national_id\": \"30012250101234\","
echo "    \"personal_email\": \"mohamed.ali@example.com\","
echo "    \"password\": \"securePass123\","
echo "    \"role\": \"STUDENT\""
echo "  }'"
echo ""

# 6. Get My Profile (Student)
echo -e "${GREEN}6. Get My Profile - ملفي الشخصي (Student)${NC}"
echo "curl -X GET $BASE_URL/api/students/me \\"
echo "  -H 'Authorization: Bearer YOUR_STUDENT_TOKEN'"
echo ""

# 7. List Courses
echo -e "${GREEN}7. List Courses - قائمة المقررات${NC}"
echo "curl -X GET '$BASE_URL/api/courses?is_available=true' \\"
echo "  -H 'Authorization: Bearer YOUR_TOKEN'"
echo ""

# 8. Create Course (Admin)
echo -e "${GREEN}8. Create Course - إنشاء مقرر (Admin فقط)${NC}"
echo "curl -X POST $BASE_URL/api/courses \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN' \\"
echo "  -d '{"
echo "    \"course_code\": \"CS101\","
echo "    \"course_name\": \"مقدمة في علوم الحاسب\","
echo "    \"credits\": 3,"
echo "    \"is_available\": true"
echo "  }'"
echo ""

# 9. Enroll in Course (Student)
echo -e "${GREEN}9. Enroll in Course - التسجيل في مقرر (Student)${NC}"
echo "curl -X POST $BASE_URL/api/enrollments \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'Authorization: Bearer YOUR_STUDENT_TOKEN' \\"
echo "  -d '{"
echo "    \"course_id\": 1"
echo "  }'"
echo ""

# 10. Create Study Plan (Student)
echo -e "${GREEN}10. Create Study Plan - إنشاء خطة دراسية (Student)${NC}"
echo "curl -X POST $BASE_URL/api/study-plan \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'Authorization: Bearer YOUR_STUDENT_TOKEN' \\"
echo "  -d '{"
echo "    \"semester_id\": 1"
echo "  }'"
echo ""

# 11. Get AI Recommendations (Student)
echo -e "${GREEN}11. Get AI Recommendations - توصيات ذكية (Student)${NC}"
echo "curl -X GET '$BASE_URL/api/study-plan/generate' \\"
echo "  -H 'Authorization: Bearer YOUR_STUDENT_TOKEN'"
echo ""

# 12. Get Advisor Dashboard (Advisor)
echo -e "${GREEN}12. Get Advisor Dashboard - لوحة تحكم المرشد (Advisor)${NC}"
echo "curl -X GET $BASE_URL/api/advisor/dashboard \\"
echo "  -H 'Authorization: Bearer YOUR_ADVISOR_TOKEN'"
echo ""

# 13. Send Message to Student (Advisor)
echo -e "${GREEN}13. Send Message to Student - إرسال رسالة (Advisor)${NC}"
echo "curl -X POST $BASE_URL/api/messages/conversations/1/messages \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'Authorization: Bearer YOUR_ADVISOR_TOKEN' \\"
echo "  -d '{"
echo "    \"body\": \"مرحباً، كيف حالك؟\""
echo "  }'"
echo ""

# 14. Get Notifications
echo -e "${GREEN}14. Get Notifications - إشعاراتي${NC}"
echo "curl -X GET '$BASE_URL/api/notifications?unread=true' \\"
echo "  -H 'Authorization: Bearer YOUR_TOKEN'"
echo ""

# 15. Get System Settings (Admin)
echo -e "${GREEN}15. Get System Settings - إعدادات النظام (Admin فقط)${NC}"
echo "curl -X GET $BASE_URL/api/admin/system-settings \\"
echo "  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN'"
echo ""

echo -e "\n${BLUE}=== ملاحظات مهمة ===${NC}"
echo "1. استبدل YOUR_TOKEN و YOUR_ADMIN_TOKEN و YOUR_ADVISOR_TOKEN و YOUR_STUDENT_TOKEN بالـ tokens الحقيقية"
echo "2. احصل على الـ token من طلب Login"
echo "3. جميع الطلبات تتطلب مصادقة عدا Health Check و Login"
echo "4. للحصول على وثائق كاملة، زر: http://localhost:5000/api-docs"
echo ""
