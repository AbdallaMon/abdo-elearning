import prisma from "@/lib/pirsma/prisma";

export async function getLessonsByCategoryId(categoryId, courseId, isReview) {
    const where = {}
    if (courseId && courseId !== "undefined") {
        where.id = +courseId
    }
    if (isReview && isReview !== "undefined") {
        where.type = "REVIEW"
    } else {
        where.type = "COURSE"
    }
    try {
        const lessons = await prisma.lesson.findMany({
            where: {
                course: {
                    categoryId: +categoryId
                    ,
                    published: true
                    , ...where
                }
            },
            select: {
                id: true,
                title: true,
                description: true,
                image: true,
                price: true,
                course: {
                    select: {
                        id: true,
                        title: true
                    }
                }
            }
        });

        return {data: lessons, status: 200};
    } catch (error) {
        return {message: "some thing wrong happened", status: 400};
    }
}

export async function createPurchase({userId, lessonId}) {
    try {

        // Check if the user already has a purchase for this lesson
        const existingPurchase = await prisma.lessonPurchase.findFirst({
            where: {
                userId,
                lessonId,
            },
        });

        if (existingPurchase) {
            let cardMessage = `لقد قمت بطلب شراء لهذا المحاضره من قبل. `;
            if (existingPurchase.status === 'APPROVED') {
                cardMessage += "وقد تم تفعيل الدرس من قبل المستر.";
            } else if (existingPurchase.status === 'REJECTED') {
                cardMessage += "ولكن المستر رفض عملية الشراء.";
            } else if (existingPurchase.status === 'PENDING') {
                cardMessage += `يرجى التواصل مع المستر لتفعيل الدرس، وأخبره برقم العملية: ${existingPurchase.id} ورقم الدرس: ${lessonId}.`;
            }


            return {
                message: "لقد قمت بشراء هذه المحاضره من قبل",
                cardMessage,
                status: 200
            };
        }

        // Create a new purchase
        const newPurchase = await prisma.lessonPurchase.create({
            data: {
                userId,
                lessonId,
            },
        });

        return {
            id: newPurchase.id,

            message: "تمت عملية طلب  تفعيل الدرس بنجاح. تواصل مع المستر بالبيانات الموجود بالاسقل",
            cardMessage: `تمت العملية`,
            status: 200

        };
    } catch (e) {
        console.log(e, "eee")
        return {message: "حدثت مشكلة ما", status: 400}
    }
}