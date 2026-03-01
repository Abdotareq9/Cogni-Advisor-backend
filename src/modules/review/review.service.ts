import prisma from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";

export const createOrUpdateReview = async (
  studentId: number,
  data: {
    course_id: number;
    rating: number;
    difficulty: number;
    workload: number;
    would_recommend: boolean;
    comment?: string;
    is_anonymous?: boolean;
  }
) => {
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      student_id_course_id: {
        student_id: studentId,
        course_id: data.course_id
      }
    },
    include: {
      course: true
    }
  });

  if (!enrollment) {
    throw new AppError("لم تسجل في هذه المادة", 404);
  }

  if (enrollment.status !== "PASSED") {
    throw new AppError("يمكنك تقييم المادة فقط بعد اجتيازها", 400);
  }

  const existingReview = await prisma.courseReview.findUnique({
    where: {
      student_id_course_id: {
        student_id: studentId,
        course_id: data.course_id
      }
    }
  });

  let review;
  if (existingReview) {
    review = await prisma.courseReview.update({
      where: {
        student_id_course_id: {
          student_id: studentId,
          course_id: data.course_id
        }
      },
      data: {
        rating: data.rating,
        difficulty: data.difficulty,
        workload: data.workload,
        would_recommend: data.would_recommend,
        comment: data.comment,
        is_anonymous: data.is_anonymous ?? false
      },
      include: {
        course: {
          select: {
            course_code: true,
            course_name: true
          }
        }
      }
    });
  } else {
    review = await prisma.courseReview.create({
      data: {
        student_id: studentId,
        course_id: data.course_id,
        rating: data.rating,
        difficulty: data.difficulty,
        workload: data.workload,
        would_recommend: data.would_recommend,
        comment: data.comment,
        is_anonymous: data.is_anonymous ?? false
      },
      include: {
        course: {
          select: {
            course_code: true,
            course_name: true
          }
        }
      }
    });
  }

  return {
    message: existingReview ? "تم تحديث التقييم بنجاح" : "تم إضافة التقييم بنجاح",
    review
  };
};

export const getCourseReviews = async (courseId: number) => {
  const course = await prisma.course.findUnique({
    where: { course_id: courseId },
    include: {
      courseReviews: {
        include: {
          student: {
            include: {
              user: {
                select: {
                  first_name: true,
                  last_name: true
                }
              }
            }
          }
        },
        orderBy: { created_at: "desc" }
      }
    }
  });

  if (!course) {
    throw new AppError("المادة غير موجودة", 404);
  }

  const reviews = course.courseReviews.map(review => ({
    review_id: review.review_id,
    student_name: review.is_anonymous
      ? "مجهول"
      : `${review.student.user.first_name} ${review.student.user.last_name}`,
    rating: review.rating,
    difficulty: review.difficulty,
    workload: review.workload,
    would_recommend: review.would_recommend,
    comment: review.comment,
    created_at: review.created_at
  }));

  const stats = calculateCourseStats(course.courseReviews);

  return {
    course: {
      course_id: course.course_id,
      course_code: course.course_code,
      course_name: course.course_name
    },
    stats,
    total_reviews: reviews.length,
    reviews
  };
};

export const getMyReviews = async (studentId: number) => {
  const reviews = await prisma.courseReview.findMany({
    where: { student_id: studentId },
    include: {
      course: {
        select: {
          course_code: true,
          course_name: true
        }
      }
    },
    orderBy: { created_at: "desc" }
  });

  return {
    total: reviews.length,
    reviews: reviews.map(r => ({
      review_id: r.review_id,
      course: {
        course_id: r.course_id,
        course_code: r.course.course_code,
        course_name: r.course.course_name
      },
      rating: r.rating,
      difficulty: r.difficulty,
      workload: r.workload,
      would_recommend: r.would_recommend,
      comment: r.comment,
      is_anonymous: r.is_anonymous,
      created_at: r.created_at
    }))
  };
};

export const deleteReview = async (reviewId: number, studentId: number) => {
  const review = await prisma.courseReview.findUnique({
    where: { review_id: reviewId }
  });

  if (!review) {
    throw new AppError("التقييم غير موجود", 404);
  }

  if (review.student_id !== studentId) {
    throw new AppError("غير مصرح لك بحذف هذا التقييم", 403);
  }

  await prisma.courseReview.delete({
    where: { review_id: reviewId }
  });

  return {
    message: "تم حذف التقييم بنجاح"
  };
};

export const getCourseStats = async (courseId: number) => {
  const course = await prisma.course.findUnique({
    where: { course_id: courseId },
    include: {
      courseReviews: true
    }
  });

  if (!course) {
    throw new AppError("المادة غير موجودة", 404);
  }

  const stats = calculateCourseStats(course.courseReviews);

  return {
    course: {
      course_id: course.course_id,
      course_code: course.course_code,
      course_name: course.course_name
    },
    total_reviews: course.courseReviews.length,
    stats
  };
};

function calculateCourseStats(reviews: any[]) {
  if (reviews.length === 0) {
    return {
      average_rating: 0,
      average_difficulty: 0,
      average_workload: 0,
      recommendation_percentage: 0
    };
  }

  const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
  const totalDifficulty = reviews.reduce((sum, r) => sum + r.difficulty, 0);
  const totalWorkload = reviews.reduce((sum, r) => sum + r.workload, 0);
  const recommendCount = reviews.filter(r => r.would_recommend).length;

  return {
    average_rating: Number((totalRating / reviews.length).toFixed(2)),
    average_difficulty: Number((totalDifficulty / reviews.length).toFixed(2)),
    average_workload: Number((totalWorkload / reviews.length).toFixed(2)),
    recommendation_percentage: Number(((recommendCount / reviews.length) * 100).toFixed(2))
  };
}
