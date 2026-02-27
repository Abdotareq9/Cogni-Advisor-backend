-- CreateTable
CREATE TABLE "ENROLLMENTS" (
    "enrollment_id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "semester_id" INTEGER,
    "status" VARCHAR(20) NOT NULL DEFAULT 'ENROLLED',
    "grade" VARCHAR(2),

    CONSTRAINT "ENROLLMENTS_pkey" PRIMARY KEY ("enrollment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ENROLLMENTS_student_id_course_id_key" ON "ENROLLMENTS"("student_id", "course_id");

-- AddForeignKey
ALTER TABLE "ENROLLMENTS" ADD CONSTRAINT "ENROLLMENTS_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "STUDENT"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ENROLLMENTS" ADD CONSTRAINT "ENROLLMENTS_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "COURSES"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ENROLLMENTS" ADD CONSTRAINT "ENROLLMENTS_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "SEMESTERS"("semester_id") ON DELETE SET NULL ON UPDATE CASCADE;
