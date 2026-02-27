/*
  Warnings:

  - Added the required column `role` to the `USERS` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "USERS" ADD COLUMN     "role" VARCHAR(20) NOT NULL;
