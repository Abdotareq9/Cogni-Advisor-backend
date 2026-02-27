/*
  Warnings:

  - A unique constraint covering the columns `[student_id,semester_id]` on the table `StudyPlan` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "StudyPlan" ADD COLUMN     "advisor_id" INTEGER,
ADD COLUMN     "feedback" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "StudyPlan_student_id_semester_id_key" ON "StudyPlan"("student_id", "semester_id");

-- AddForeignKey
ALTER TABLE "StudyPlan" ADD CONSTRAINT "StudyPlan_advisor_id_fkey" FOREIGN KEY ("advisor_id") REFERENCES "Advisor"("advisor_id") ON DELETE SET NULL ON UPDATE CASCADE;
