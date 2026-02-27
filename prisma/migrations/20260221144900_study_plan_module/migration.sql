/*
  Warnings:

  - The `plan_status` column on the `StudyPlan` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PlanStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "StudyPlan" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "total_hours" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "plan_status",
ADD COLUMN     "plan_status" "PlanStatus" NOT NULL DEFAULT 'PENDING';
