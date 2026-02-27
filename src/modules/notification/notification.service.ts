import prisma from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";

export const getByRecipientId = async (recipientId: number) => {
  return prisma.notification.findMany({
    where: { recipient_id: recipientId },
    orderBy: { sent_at: "desc" }
  });
};

export const markAsRead = async (notificationId: number, recipientId: number) => {
  const n = await prisma.notification.findFirst({
    where: { notification_id: notificationId, recipient_id: recipientId }
  });
  if (!n) throw new AppError("Notification not found", 404);
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
