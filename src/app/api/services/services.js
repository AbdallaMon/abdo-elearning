import prisma from "@/lib/pirsma/prisma";

// Fetch courses with pagination
export async function fetchCategories() {
    const categories=await prisma.category.findMany();
    return categories;
}
export async function fetchCourses(page = 0, limit = 10, categoryId = null) {
    const where = categoryId ? { categoryId: parseInt(categoryId, 10) } : {};
    const courses = await prisma.course.findMany({
        where,
        skip: (page-1 )* limit,
        take: limit,
        include: {
            category: true,
        },
    });
    const total = await prisma.course.count(
        { where}
    );
    return {
        data: courses,
        total,
    };
}

// Create a new course
export async function createCourse(data) {
    try {
        const newCourse = await prisma.course.create({
            data: data,
            include: {
                category: true,
            },
        });
        return {
            message: "Course created successfully",
            data: newCourse,
        };
    } catch (error) {
        return {
            message: "Failed to create course",
            status: 500,
        };
    }
}

// Edit an existing course
export async function editCourse(id, data) {
    try {
        const updatedCourse = await prisma.course.update({
            where: { id: parseInt(id, 10) },
            data,
            include: {
                category: true,
            },
        });
        return {
            message: "Course edited successfully",
            data: updatedCourse,
        };
    } catch (error) {
        return {
            message: "Failed to edit course",
            status: 500,
        };
    }
}

// Purchase a lesson
export async function purchaseLesson(userId, lessonId) {
    try {
        const purchase = await prisma.lessonPurchase.create({
            data: {
                userId,
                lessonId,
                status: 'PENDING',
            },
        });
        return {
            message: "Lesson purchase request submitted successfully",
            status: 200,
            data: purchase,
        };
    } catch (error) {
        return {
            message: "Failed to submit lesson purchase request",
            status: 500,
        };
    }
}

// Get lessons related to a category
export async function fetchLessonsByCourseId( courseId, page = 0, limit = 10) {
    const where = {};
    if (courseId) where.courseId = parseInt(courseId, 10);

    const lessons = await prisma.lesson.findMany({
        where,
        skip: (page-1) * limit,
        take: limit,
    });
    const total = await prisma.lesson.count({ where });

    return {
        data: lessons,
        total,
    };
}

// Approve or reject lesson purchase
export async function updateLessonPurchaseStatus(userId, lessonId, status) {
    try {
        const updatedPurchase = await prisma.lessonPurchase.update({
            where: {
                userId_lessonId: {
                    userId,
                    lessonId,
                },
            },
            data: {
                status,
            },
        });
        return {
            message: `Lesson purchase ${status.toLowerCase()} successfully`,
            status: 200,
            data: updatedPurchase,
        };
    } catch (error) {
        return {
            message: `Failed to ${status.toLowerCase()} lesson purchase`,
            status: 500,
        };
    }
}

// create a new lesson
export async function createLesson(data) {
    data.order=parseInt(data.order,10);
    try {
        const newLesson = await prisma.lesson.create({
            data,
        });
        return {
            message: "تم إنشاء الدرس بنجاح",
            data: newLesson,
        };
    } catch (error) {
        console.log(error);
  throw new Error("فشل في إنشاء الدرس");
    }
}
export async function editLesson(id, data) {
    if(data.order){
        data.order=parseInt(data.order,10);
    }
    try {
        const updatedLesson = await prisma.lesson.update({
            where: { id: parseInt(id, 10) },
            data,
        });
        return {
            message: "Lesson edited successfully",
            data: updatedLesson,
        };
    } catch (error) {
        return {
            message: "Failed to edit lesson",
            status: 500,
        };
    }
}
export async function getIndexedData(index,filters){
    const model = prisma[index];
    const where=filters?filters:{};

    const data = await model.findMany({
        where,
        select: {
            id: true,
            title: true,
        },
    });
    return {data};
}
export async function createMediaForLesson(lessonId, mediaData) {
    mediaData.order=parseInt(mediaData.order,10);
    mediaData.isFree=mediaData.isFree?true:false;
    mediaData.expectedDuration=parseInt(mediaData.expectedDuration,10);
    delete mediaData.media;

    try {
        const newMedia = await prisma.media.create({
            data: {
                ...mediaData,
                lessonId,
            },
        });
        return {
            message: "Media created successfully",
            data: newMedia,
        }
    } catch (error) {
        console.error("Error creating media for lesson:", error);
        throw error;
    }
}
export async function fetchAllMediaByLessonId(lessonId){
    try {
        const media = await prisma.media.findMany({
           where:{
               lessonId
           },
            orderBy: {
                order: 'desc'
            }
        });
        return {
            data: media,
            status:200
        }
    } catch (error) {
        console.error("Error fetching media for lesson:", error);
        throw error;
    }
}
export async function updateMedia(mediaId,data){
    if(data.order){
        data.order=+data.order
    }
    if(data.expectedDuration){
        data.expectedDuration=+data.expectedDuration
    }
    try {
        const media=await prisma.media.update({
            where:{
                id:+mediaId
            },data
        })
        return {
            data: media,
            status:200
        }
    } catch (error) {
        console.error("Error updating media :", error);
        throw error;
    }
}