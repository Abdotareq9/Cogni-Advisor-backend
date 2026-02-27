/*
  Warnings:

  - You are about to drop the `ADMIN` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ADVISOR` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CITIES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `COURSES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `COURSE_PREREQUISITES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DEPARTMENTS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ENROLLMENTS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FEEDBACK` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NOTIFICATIONS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PERMISSIONS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PLAN_DETAILS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ROLES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ROLE_PERMISSIONS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SEMESTERS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SEMESTER_RECORDS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `STUDENT` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `STUDY_PLANS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `USERS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `USER_PHONES` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STUDENT', 'ADVISOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- DropForeignKey
ALTER TABLE "ADMIN" DROP CONSTRAINT "ADMIN_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "ADVISOR" DROP CONSTRAINT "ADVISOR_advisor_id_fkey";

-- DropForeignKey
ALTER TABLE "ADVISOR" DROP CONSTRAINT "ADVISOR_dept_id_fkey";

-- DropForeignKey
ALTER TABLE "COURSE_PREREQUISITES" DROP CONSTRAINT "COURSE_PREREQUISITES_course_id_fkey";

-- DropForeignKey
ALTER TABLE "COURSE_PREREQUISITES" DROP CONSTRAINT "COURSE_PREREQUISITES_prereq_course_id_fkey";

-- DropForeignKey
ALTER TABLE "ENROLLMENTS" DROP CONSTRAINT "ENROLLMENTS_course_id_fkey";

-- DropForeignKey
ALTER TABLE "ENROLLMENTS" DROP CONSTRAINT "ENROLLMENTS_semester_id_fkey";

-- DropForeignKey
ALTER TABLE "ENROLLMENTS" DROP CONSTRAINT "ENROLLMENTS_student_id_fkey";

-- DropForeignKey
ALTER TABLE "FEEDBACK" DROP CONSTRAINT "FEEDBACK_advisor_id_fkey";

-- DropForeignKey
ALTER TABLE "FEEDBACK" DROP CONSTRAINT "FEEDBACK_student_id_fkey";

-- DropForeignKey
ALTER TABLE "NOTIFICATIONS" DROP CONSTRAINT "NOTIFICATIONS_recipient_id_fkey";

-- DropForeignKey
ALTER TABLE "PLAN_DETAILS" DROP CONSTRAINT "PLAN_DETAILS_course_id_fkey";

-- DropForeignKey
ALTER TABLE "PLAN_DETAILS" DROP CONSTRAINT "PLAN_DETAILS_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "ROLE_PERMISSIONS" DROP CONSTRAINT "ROLE_PERMISSIONS_perm_id_fkey";

-- DropForeignKey
ALTER TABLE "ROLE_PERMISSIONS" DROP CONSTRAINT "ROLE_PERMISSIONS_role_id_fkey";

-- DropForeignKey
ALTER TABLE "SEMESTER_RECORDS" DROP CONSTRAINT "SEMESTER_RECORDS_semester_id_fkey";

-- DropForeignKey
ALTER TABLE "SEMESTER_RECORDS" DROP CONSTRAINT "SEMESTER_RECORDS_student_id_fkey";

-- DropForeignKey
ALTER TABLE "STUDENT" DROP CONSTRAINT "STUDENT_dept_id_fkey";

-- DropForeignKey
ALTER TABLE "STUDENT" DROP CONSTRAINT "STUDENT_student_id_fkey";

-- DropForeignKey
ALTER TABLE "STUDY_PLANS" DROP CONSTRAINT "STUDY_PLANS_semester_id_fkey";

-- DropForeignKey
ALTER TABLE "STUDY_PLANS" DROP CONSTRAINT "STUDY_PLANS_student_id_fkey";

-- DropForeignKey
ALTER TABLE "USERS" DROP CONSTRAINT "USERS_city_id_fkey";

-- DropForeignKey
ALTER TABLE "USER_PHONES" DROP CONSTRAINT "USER_PHONES_user_id_fkey";

-- DropTable
DROP TABLE "ADMIN";

-- DropTable
DROP TABLE "ADVISOR";

-- DropTable
DROP TABLE "CITIES";

-- DropTable
DROP TABLE "COURSES";

-- DropTable
DROP TABLE "COURSE_PREREQUISITES";

-- DropTable
DROP TABLE "DEPARTMENTS";

-- DropTable
DROP TABLE "ENROLLMENTS";

-- DropTable
DROP TABLE "FEEDBACK";

-- DropTable
DROP TABLE "NOTIFICATIONS";

-- DropTable
DROP TABLE "PERMISSIONS";

-- DropTable
DROP TABLE "PLAN_DETAILS";

-- DropTable
DROP TABLE "ROLES";

-- DropTable
DROP TABLE "ROLE_PERMISSIONS";

-- DropTable
DROP TABLE "SEMESTERS";

-- DropTable
DROP TABLE "SEMESTER_RECORDS";

-- DropTable
DROP TABLE "STUDENT";

-- DropTable
DROP TABLE "STUDY_PLANS";

-- DropTable
DROP TABLE "USERS";

-- DropTable
DROP TABLE "USER_PHONES";

-- CreateTable
CREATE TABLE "Student" (
    "student_id" SERIAL NOT NULL,
    "dept_id" INTEGER,
    "major_type" VARCHAR(50),
    "level" INTEGER NOT NULL DEFAULT 1,
    "cumulative_gpa" DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    "total_earned_hours" INTEGER NOT NULL DEFAULT 0,
    "status" "StudentStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Student_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "Advisor" (
    "advisor_id" SERIAL NOT NULL,
    "dept_id" INTEGER,

    CONSTRAINT "Advisor_pkey" PRIMARY KEY ("advisor_id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "admin_id" SERIAL NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "City" (
    "city_id" SERIAL NOT NULL,
    "city_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("city_id")
);

-- CreateTable
CREATE TABLE "Department" (
    "dept_id" SERIAL NOT NULL,
    "dept_name" VARCHAR(100) NOT NULL,
    "dept_code" VARCHAR(10),

    CONSTRAINT "Department_pkey" PRIMARY KEY ("dept_id")
);

-- CreateTable
CREATE TABLE "User" (
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
    "role" "UserRole" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "UserPhone" (
    "phone_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,

    CONSTRAINT "UserPhone_pkey" PRIMARY KEY ("phone_id")
);

-- CreateTable
CREATE TABLE "Course" (
    "course_id" SERIAL NOT NULL,
    "course_code" VARCHAR(20) NOT NULL,
    "course_name" VARCHAR(150) NOT NULL,
    "credits" INTEGER NOT NULL,
    "required_hours_to_take" INTEGER,
    "is_available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("course_id")
);

-- CreateTable
CREATE TABLE "CoursePrerequisite" (
    "course_id" INTEGER NOT NULL,
    "prereq_course_id" INTEGER NOT NULL,

    CONSTRAINT "CoursePrerequisite_pkey" PRIMARY KEY ("course_id","prereq_course_id")
);

-- CreateTable
CREATE TABLE "Semester" (
    "semester_id" SERIAL NOT NULL,
    "semester_name" VARCHAR(50),
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),

    CONSTRAINT "Semester_pkey" PRIMARY KEY ("semester_id")
);

-- CreateTable
CREATE TABLE "StudyPlan" (
    "plan_id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "semester_id" INTEGER NOT NULL,
    "plan_status" VARCHAR(20),

    CONSTRAINT "StudyPlan_pkey" PRIMARY KEY ("plan_id")
);

-- CreateTable
CREATE TABLE "PlanDetail" (
    "plan_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,

    CONSTRAINT "PlanDetail_pkey" PRIMARY KEY ("plan_id","course_id")
);

-- CreateTable
CREATE TABLE "SemesterRecord" (
    "record_id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "semester_id" INTEGER NOT NULL,
    "semester_gpa" DECIMAL(3,2),
    "registered_hours" INTEGER,

    CONSTRAINT "SemesterRecord_pkey" PRIMARY KEY ("record_id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "feed_id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "advisor_id" INTEGER NOT NULL,
    "message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("feed_id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "notification_id" SERIAL NOT NULL,
    "recipient_id" INTEGER NOT NULL,
    "title" VARCHAR(150),
    "body" TEXT,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("notification_id")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "enrollment_id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "semester_id" INTEGER,
    "status" VARCHAR(20) NOT NULL DEFAULT 'ENROLLED',
    "grade" VARCHAR(2),

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("enrollment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "City_city_name_key" ON "City"("city_name");

-- CreateIndex
CREATE UNIQUE INDEX "Department_dept_name_key" ON "Department"("dept_name");

-- CreateIndex
CREATE UNIQUE INDEX "Department_dept_code_key" ON "Department"("dept_code");

-- CreateIndex
CREATE UNIQUE INDEX "User_national_id_key" ON "User"("national_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_personal_email_key" ON "User"("personal_email");

-- CreateIndex
CREATE UNIQUE INDEX "Course_course_code_key" ON "Course"("course_code");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_student_id_course_id_key" ON "Enrollment"("student_id", "course_id");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_dept_id_fkey" FOREIGN KEY ("dept_id") REFERENCES "Department"("dept_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advisor" ADD CONSTRAINT "Advisor_advisor_id_fkey" FOREIGN KEY ("advisor_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advisor" ADD CONSTRAINT "Advisor_dept_id_fkey" FOREIGN KEY ("dept_id") REFERENCES "Department"("dept_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("city_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPhone" ADD CONSTRAINT "UserPhone_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursePrerequisite" ADD CONSTRAINT "CoursePrerequisite_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursePrerequisite" ADD CONSTRAINT "CoursePrerequisite_prereq_course_id_fkey" FOREIGN KEY ("prereq_course_id") REFERENCES "Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlan" ADD CONSTRAINT "StudyPlan_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlan" ADD CONSTRAINT "StudyPlan_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "Semester"("semester_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanDetail" ADD CONSTRAINT "PlanDetail_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "StudyPlan"("plan_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanDetail" ADD CONSTRAINT "PlanDetail_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SemesterRecord" ADD CONSTRAINT "SemesterRecord_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SemesterRecord" ADD CONSTRAINT "SemesterRecord_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "Semester"("semester_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_advisor_id_fkey" FOREIGN KEY ("advisor_id") REFERENCES "Advisor"("advisor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "Semester"("semester_id") ON DELETE SET NULL ON UPDATE CASCADE;
