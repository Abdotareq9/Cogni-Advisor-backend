-- CreateTable
CREATE TABLE "CITIES" (
    "city_id" SERIAL NOT NULL,
    "city_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "CITIES_pkey" PRIMARY KEY ("city_id")
);

-- CreateTable
CREATE TABLE "DEPARTMENTS" (
    "dept_id" SERIAL NOT NULL,
    "dept_name" VARCHAR(100) NOT NULL,
    "dept_code" VARCHAR(10),

    CONSTRAINT "DEPARTMENTS_pkey" PRIMARY KEY ("dept_id")
);

-- CreateTable
CREATE TABLE "USERS" (
    "user_id" SERIAL NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "middle_name" VARCHAR(50),
    "last_name" VARCHAR(50) NOT NULL,
    "national_id" VARCHAR(20) NOT NULL,
    "personal_email" VARCHAR(100) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "gender" VARCHAR(10),
    "city_id" INTEGER,
    "street_address" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "USERS_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "USER_PHONES" (
    "phone_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,

    CONSTRAINT "USER_PHONES_pkey" PRIMARY KEY ("phone_id")
);

-- CreateTable
CREATE TABLE "ROLES" (
    "role_id" SERIAL NOT NULL,
    "role_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "ROLES_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "PERMISSIONS" (
    "perm_id" SERIAL NOT NULL,
    "perm_key" VARCHAR(50) NOT NULL,

    CONSTRAINT "PERMISSIONS_pkey" PRIMARY KEY ("perm_id")
);

-- CreateTable
CREATE TABLE "ROLE_PERMISSIONS" (
    "role_id" INTEGER NOT NULL,
    "perm_id" INTEGER NOT NULL,

    CONSTRAINT "ROLE_PERMISSIONS_pkey" PRIMARY KEY ("role_id","perm_id")
);

-- CreateTable
CREATE TABLE "STUDENT" (
    "student_id" INTEGER NOT NULL,
    "dept_id" INTEGER,
    "major_type" VARCHAR(50),
    "level" INTEGER NOT NULL DEFAULT 1,
    "cumulative_gpa" DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    "total_earned_hours" INTEGER NOT NULL DEFAULT 0,
    "status" VARCHAR(20),

    CONSTRAINT "STUDENT_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "ADVISOR" (
    "advisor_id" INTEGER NOT NULL,
    "dept_id" INTEGER,

    CONSTRAINT "ADVISOR_pkey" PRIMARY KEY ("advisor_id")
);

-- CreateTable
CREATE TABLE "ADMIN" (
    "admin_id" INTEGER NOT NULL,

    CONSTRAINT "ADMIN_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "COURSES" (
    "course_id" SERIAL NOT NULL,
    "course_code" VARCHAR(20) NOT NULL,
    "course_name" VARCHAR(150) NOT NULL,
    "credits" INTEGER NOT NULL,
    "required_hours_to_take" INTEGER,
    "is_available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "COURSES_pkey" PRIMARY KEY ("course_id")
);

-- CreateTable
CREATE TABLE "COURSE_PREREQUISITES" (
    "course_id" INTEGER NOT NULL,
    "prereq_course_id" INTEGER NOT NULL,

    CONSTRAINT "COURSE_PREREQUISITES_pkey" PRIMARY KEY ("course_id","prereq_course_id")
);

-- CreateTable
CREATE TABLE "SEMESTERS" (
    "semester_id" SERIAL NOT NULL,
    "semester_name" VARCHAR(50),
    "start_date" DATE,
    "end_date" DATE,

    CONSTRAINT "SEMESTERS_pkey" PRIMARY KEY ("semester_id")
);

-- CreateTable
CREATE TABLE "STUDY_PLANS" (
    "plan_id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "semester_id" INTEGER NOT NULL,
    "plan_status" VARCHAR(20),

    CONSTRAINT "STUDY_PLANS_pkey" PRIMARY KEY ("plan_id")
);

-- CreateTable
CREATE TABLE "PLAN_DETAILS" (
    "plan_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,

    CONSTRAINT "PLAN_DETAILS_pkey" PRIMARY KEY ("plan_id","course_id")
);

-- CreateTable
CREATE TABLE "SEMESTER_RECORDS" (
    "record_id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "semester_id" INTEGER NOT NULL,
    "semester_gpa" DECIMAL(3,2),
    "registered_hours" INTEGER,

    CONSTRAINT "SEMESTER_RECORDS_pkey" PRIMARY KEY ("record_id")
);

-- CreateTable
CREATE TABLE "FEEDBACK" (
    "feed_id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "advisor_id" INTEGER NOT NULL,
    "message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FEEDBACK_pkey" PRIMARY KEY ("feed_id")
);

-- CreateTable
CREATE TABLE "NOTIFICATIONS" (
    "notification_id" SERIAL NOT NULL,
    "recipient_id" INTEGER NOT NULL,
    "title" VARCHAR(150),
    "body" TEXT,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NOTIFICATIONS_pkey" PRIMARY KEY ("notification_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CITIES_city_name_key" ON "CITIES"("city_name");

-- CreateIndex
CREATE UNIQUE INDEX "DEPARTMENTS_dept_name_key" ON "DEPARTMENTS"("dept_name");

-- CreateIndex
CREATE UNIQUE INDEX "DEPARTMENTS_dept_code_key" ON "DEPARTMENTS"("dept_code");

-- CreateIndex
CREATE UNIQUE INDEX "USERS_national_id_key" ON "USERS"("national_id");

-- CreateIndex
CREATE UNIQUE INDEX "USERS_personal_email_key" ON "USERS"("personal_email");

-- CreateIndex
CREATE UNIQUE INDEX "ROLES_role_name_key" ON "ROLES"("role_name");

-- CreateIndex
CREATE UNIQUE INDEX "PERMISSIONS_perm_key_key" ON "PERMISSIONS"("perm_key");

-- CreateIndex
CREATE UNIQUE INDEX "COURSES_course_code_key" ON "COURSES"("course_code");

-- AddForeignKey
ALTER TABLE "USERS" ADD CONSTRAINT "USERS_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "CITIES"("city_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "USER_PHONES" ADD CONSTRAINT "USER_PHONES_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USERS"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ROLE_PERMISSIONS" ADD CONSTRAINT "ROLE_PERMISSIONS_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "ROLES"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ROLE_PERMISSIONS" ADD CONSTRAINT "ROLE_PERMISSIONS_perm_id_fkey" FOREIGN KEY ("perm_id") REFERENCES "PERMISSIONS"("perm_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "STUDENT" ADD CONSTRAINT "STUDENT_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "USERS"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "STUDENT" ADD CONSTRAINT "STUDENT_dept_id_fkey" FOREIGN KEY ("dept_id") REFERENCES "DEPARTMENTS"("dept_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ADVISOR" ADD CONSTRAINT "ADVISOR_advisor_id_fkey" FOREIGN KEY ("advisor_id") REFERENCES "USERS"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ADVISOR" ADD CONSTRAINT "ADVISOR_dept_id_fkey" FOREIGN KEY ("dept_id") REFERENCES "DEPARTMENTS"("dept_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ADMIN" ADD CONSTRAINT "ADMIN_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "USERS"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "COURSE_PREREQUISITES" ADD CONSTRAINT "COURSE_PREREQUISITES_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "COURSES"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "COURSE_PREREQUISITES" ADD CONSTRAINT "COURSE_PREREQUISITES_prereq_course_id_fkey" FOREIGN KEY ("prereq_course_id") REFERENCES "COURSES"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "STUDY_PLANS" ADD CONSTRAINT "STUDY_PLANS_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "STUDENT"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "STUDY_PLANS" ADD CONSTRAINT "STUDY_PLANS_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "SEMESTERS"("semester_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PLAN_DETAILS" ADD CONSTRAINT "PLAN_DETAILS_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "STUDY_PLANS"("plan_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PLAN_DETAILS" ADD CONSTRAINT "PLAN_DETAILS_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "COURSES"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SEMESTER_RECORDS" ADD CONSTRAINT "SEMESTER_RECORDS_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "STUDENT"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SEMESTER_RECORDS" ADD CONSTRAINT "SEMESTER_RECORDS_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "SEMESTERS"("semester_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FEEDBACK" ADD CONSTRAINT "FEEDBACK_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "STUDENT"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FEEDBACK" ADD CONSTRAINT "FEEDBACK_advisor_id_fkey" FOREIGN KEY ("advisor_id") REFERENCES "ADVISOR"("advisor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NOTIFICATIONS" ADD CONSTRAINT "NOTIFICATIONS_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "USERS"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
