-- CreateEnum
CREATE TYPE "SystemSettingCategory" AS ENUM ('GENERAL', 'AI_ENGINE', 'PERMISSIONS', 'SECURITY');

-- CreateTable
CREATE TABLE "SystemSetting" (
    "setting_id" SERIAL NOT NULL,
    "key" VARCHAR(100) NOT NULL,
    "category" "SystemSettingCategory" NOT NULL,
    "value" JSONB NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" INTEGER,

    CONSTRAINT "SystemSetting_pkey" PRIMARY KEY ("setting_id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "audit_id" SERIAL NOT NULL,
    "actor_id" INTEGER,
    "action" VARCHAR(60) NOT NULL,
    "entity_type" VARCHAR(60),
    "entity_id" VARCHAR(60),
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("audit_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SystemSetting_key_key" ON "SystemSetting"("key");

-- AddForeignKey
ALTER TABLE "SystemSetting" ADD CONSTRAINT "SystemSetting_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
