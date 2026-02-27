-- AlterTable
ALTER TABLE "Advisor" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "office_hours" VARCHAR(200);

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "advisor_id" INTEGER;

-- CreateTable
CREATE TABLE "Message" (
    "message_id" SERIAL NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "recipient_id" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("message_id")
);

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_advisor_id_fkey" FOREIGN KEY ("advisor_id") REFERENCES "Advisor"("advisor_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
