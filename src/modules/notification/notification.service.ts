import prisma from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";

export const getByRecipientId = async (recipientId: number) => {
  return prisma.notification.findMany({
    where: { recipient_id: recipientId },
    orderBy: { sent_at: "desc" }
  });
};

export const markAsRead = async (notificationId: number, recipientId: number) => {
  if (!Number.isInteger(notificationId) || notificationId < 1) {
    throw new AppError("معرف الإشعار غير صالح", 400);
  }

  const n = await prisma.notification.findUnique({
    where: { notification_id: notificationId }
  });

  if (!n) {
    throw new AppError("الإشعار غير موجود", 404);
  }

  if (n.recipient_id !== recipientId) {
    throw new AppError("هذا الإشعار لا يخص حسابك", 403);
  }

  return prisma.notification.update({
    where: { notification_id: notificationId },
    data: { is_read: true }
  });
};

export const markAllAsRead = async (recipientId: number) => {
  await prisma.notification.updateMany({
    where: { recipient_id: recipientId },
    data: { is_read: true }
  });
  return { message: "All notifications marked as read" };
};

export const createNotification = async (data: {
  recipient_id: number;
  title?: string;
  body?: string;
}) => {
  return prisma.notification.create({
    data: {
      recipient_id: data.recipient_id,
      title: data.title ?? null,
      body: data.body ?? null
    }
  });
};
