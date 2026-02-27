import prisma from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";

/** List conversations for advisor: students assigned to this advisor with last message. */
export const getConversationsForAdvisor = async (advisorId: number) => {
  const students = await prisma.student.findMany({
    where: { advisor_id: advisorId },
    include: {
      user: { select: { user_id: true, first_name: true, last_name: true } }
    }
  });

  const studentUserIds = students.map((s) => s.student_id);

  const lastMessages = await prisma.message.findMany({
    where: {
      OR: [
        { sender_id: advisorId, recipient_id: { in: studentUserIds } },
        { sender_id: { in: studentUserIds }, recipient_id: advisorId }
      ]
    },
    orderBy: { sent_at: "desc" }
  });

  const lastByOther = new Map<number, { body: string; sent_at: Date; is_from_me: boolean }>();
  for (const m of lastMessages) {
    const otherId = m.sender_id === advisorId ? m.recipient_id : m.sender_id;
    if (!lastByOther.has(otherId)) {
      lastByOther.set(otherId, {
        body: m.body,
        sent_at: m.sent_at,
        is_from_me: m.sender_id === advisorId
      });
    }
  }

  return students.map((s) => {
    const last = lastByOther.get(s.student_id) ?? null;
    return {
      user_id: s.student_id,
      student_id: s.student_id,
      full_name: `${s.user.first_name} ${s.user.last_name}`,
      last_message: last?.body ?? null,
      last_message_at: last?.sent_at ?? null,
      last_message_from_me: last?.is_from_me ?? null
    };
  });
};

/** Get messages between advisor and a student (by student's user_id = student_id). */
export const getMessagesWithStudent = async (
  advisorId: number,
  studentUserId: number
) => {
  const student = await prisma.student.findFirst({
    where: { student_id: studentUserId, advisor_id: advisorId }
  });
  if (!student)
    throw new AppError("Student not found or not assigned to you", 404);

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { sender_id: advisorId, recipient_id: studentUserId },
        { sender_id: studentUserId, recipient_id: advisorId }
      ]
    },
    orderBy: { sent_at: "asc" },
    include: {
      sender: { select: { user_id: true, first_name: true, last_name: true } }
    }
  });

  return messages.map((m) => ({
    message_id: m.message_id,
    body: m.body,
    sent_at: m.sent_at,
    is_read: m.is_read,
    from_advisor: m.sender_id === advisorId,
    sender_name: `${m.sender.first_name} ${m.sender.last_name}`
  }));
};

/** Send message from advisor to a student. */
export const sendMessageToStudent = async (
  advisorId: number,
  recipientUserId: number,
  body: string
) => {
  const student = await prisma.student.findFirst({
    where: { student_id: recipientUserId, advisor_id: advisorId }
  });
  if (!student)
    throw new AppError("Student not found or not assigned to you", 404);

  const message = await prisma.message.create({
    data: {
      sender_id: advisorId,
      recipient_id: recipientUserId,
      body: body.trim()
    }
  });

  return {
    message_id: message.message_id,
    body: message.body,
    sent_at: message.sent_at
  };
};
