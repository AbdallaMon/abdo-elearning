import prisma from "@/lib/pirsma/prisma";

// Fetch courses with pagination
export async function fetchCategories() {
    const categories = await prisma.category.findMany();
    return categories;
}

export async function fetchCourses(page = 0, limit = 10, categoryId = null) {
    try {

        const where = categoryId ? {categoryId: parseInt(categoryId, 10)} : {};
        const courses = await prisma.course.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit,
            include: {
                category: true,
            },
        });
        const total = await prisma.course.count(
              {where}
        );
        return {
            data: courses,
            total,
            status: 200
        };
    } catch (e) {
        return {
            message: "something wrong happened",
            status: 400
        };
    }
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
            status: 200
        };
    } catch (error) {
        console.log(error, "error")
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
            where: {id: parseInt(id, 10)},
            data,
            include: {
                category: true,
            },
        });
        return {
            message: "Course edited successfully",
            data: updatedCourse,
            status: 200
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
export async function fetchLessonsByCourseId(courseId, page = 0, limit = 10) {
    const where = {};
    if (courseId) where.courseId = parseInt(courseId, 10);

    const lessons = await prisma.lesson.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit, orderBy: {
            order: 'asc'
        }
    });
    const total = await prisma.lesson.count({where});

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
    data.order = parseInt(data.order, 10);
    try {
        const newLesson = await prisma.lesson.create({
            data,
        });
        return {
            message: "تم إنشاء الدرس بنجاح",
            data: newLesson,
            status: 200
        };
    } catch (error) {
        console.log(error);
        return {
            message: "فشل انشاء الدرس",
            status: 400
        };
    }
}

export async function editLesson(id, data) {
    if (data.order) {
        data.order = parseInt(data.order, 10);
    }
    try {
        const updatedLesson = await prisma.lesson.update({
            where: {id: parseInt(id, 10)},
            data,
        });
        return {
            message: "تم تعديل الدرس بنجاح",
            data: updatedLesson,
            status: 200
        };
    } catch (error) {
        return {
            message: "فشل تعديل الدرس",
            status: 500,
        };
    }
}

export async function getIndexedData(index, filters) {
    const model = prisma[index];

    const where = filters ? filters : {};
    const select = {
        id: true,
    }
    if (index === "category") {
        select.name = true
    } else {
        select.title = true
    }
    const data = await model.findMany({
        where,
        select,
    });
    return {data};
}

export async function createMediaForLesson(lessonId, mediaData) {
    mediaData.order = parseInt(mediaData.order, 10);
    mediaData.isFree = mediaData.isFree ? true : false;
    mediaData.expectedDuration = parseInt(mediaData.expectedDuration, 10);
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
            status: 200
        }
    } catch (error) {
        console.error("Error creating media for lesson:", error);
        throw error;
    }
}

export async function fetchAllMediaByLessonId(lessonId) {
    try {
        const media = await prisma.media.findMany({
            where: {
                lessonId
            },
            orderBy: {
                order: 'asc'
            }
        });
        return {
            data: media,
            status: 200
        }
    } catch (error) {
        console.error("Error fetching media for lesson:", error);
        throw error;
    }
}

export async function updateMedia(mediaId, data) {
    if (data.order) {
        data.order = +data.order
    }
    if (data.expectedDuration) {
        data.expectedDuration = +data.expectedDuration
    }
    try {
        const media = await prisma.media.update({
            where: {
                id: +mediaId
            }, data
        })
        return {
            data: media,
            status: 200
        }
    } catch (error) {
        console.error("Error updating media :", error);
        throw error;
    }
}

export async function deleteMedia(mediaId) {
    try {
        const deletedMedia = await prisma.media.delete({
            where: {
                id: +mediaId
            }
        })
        return {
            data: deletedMedia,
            status: 200
        }
    } catch (error) {
        console.error("Error deleting media :", error);
        throw error;
    }
}


///quizez

export async function fetchQuizzes(page = 1, limit = 10, filters = {}) {
    const offset = (page - 1) * limit;
    const whereClause = {};

    if (filters.courseId) {
        whereClause.courseId = +filters.courseId;
    }
    if (filters.categoryId) {
        whereClause.OR = [
            {categoryId: +filters.categoryId}, // Quizzes directly related to the category
            {
                course: {
                    categoryId: +filters.categoryId, // Quizzes related to courses under the category
                },
            },
        ];
    }

    try {
        const quizzes = await prisma.quiz.findMany({
            skip: offset,
            take: limit,
            where: whereClause,
            select: {
                id: true,
                title: true,
                description: true,
                course: {
                    select: {
                        title: true,
                        id: true,
                        category: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    },
                },
            },
        });
        const total = await prisma.quiz.count({
            where: whereClause,
        });

        return {
            data: quizzes,
            total,
            status: 200,
        };
    } catch (error) {
        console.error("Error fetching quizzes:", error);
        return {
            message: "Failed to fetch quizzes",
            status: 500,
        };
    }
}

export async function createQuiz(data) {
    const {title, description, courseId, categoryId, questions} = data;
    try {
        const quiz = await prisma.quiz.create({
            data: {
                title,
                description,
                course: courseId ? {connect: {id: courseId}} : undefined,
                category: categoryId ? {connect: {id: categoryId}} : undefined,
                questions: {
                    create: questions.map((q) => ({
                        title: q.title,
                        description: q.description,
                        questionType: q.questionType,
                        questionText: q.questionText,
                        order: q.order,
                        correctAnswerBoolean: q.questionType === 'TRUE_FALSE' ? q.correctAnswerBoolean : null,
                        questionChoices: q.questionType === 'MULTIPLE_CHOICE' ? {
                            create: q.questionChoices.map((choice) => ({
                                title: choice.title,
                                correct: choice.correct,  // Ensure correct is set
                            })),
                        } : undefined,
                        sectionQuestions: q.sectionQuestions
                              ? {
                                  create: q.sectionQuestions.map((sq) => ({
                                      title: sq.title,
                                      questionChoices: {
                                          create: sq.questionChoices.map((choice) => ({
                                              title: choice.title,
                                              correct: choice.correct,  // Ensure correct is set
                                          })),
                                      },
                                      order: sq.order,
                                  })),
                              }
                              : undefined,
                    })),
                },
            },
        });

        return {
            data: quiz,
            message: "Quiz created successfully",
            status: 200,
        };
    } catch (error) {
        console.error("Error creating quiz:", error);
        return {
            message: "Failed to create quiz",
            status: 500,
        };
    }
}

// Fetch a quiz by its ID, including all related data
export async function fetchQuizById(quizId) {
    try {
        const quiz = await prisma.quiz.findUnique({
            where: {id: quizId},
            include: {
                course: {
                    select: {
                        title: true,
                    },
                },
                questions: {
                    include: {
                        sectionQuestions: {
                            include: {
                                questionChoices: true,
                            },
                        },
                        questionChoices: true,
                    },
                },
            },
        });

        if (!quiz) {
            return {
                message: "Quiz not found",
                status: 404,
            };
        }

        return {
            data: quiz,
            status: 200,
        };
    } catch (error) {
        console.error("Error fetching quiz:", error);
        return {
            message: "Failed to fetch quiz",
            status: 500,
        };
    }
}

export async function updateAQuestion(data, questionId, quizId) {
    try {
        // Start with updating the main question data
        const updateData = {
            title: data.title,
            description: data.description,
            questionType: data.questionType,
            questionText: data.questionText,
            order: data.order,
            correctAnswerBoolean: data.questionType === 'TRUE_FALSE' ? data.correctAnswerBoolean : null,
        };

        // Update the main question data
        await prisma.question.update({
            where: {id: parseInt(questionId)},
            data: updateData,
        });

        // Update or delete the question choices for MULTIPLE_CHOICE questions
        if (data.questionType === 'MULTIPLE_CHOICE' && data.questionChoices) {
            for (const choice of data.questionChoices) {
                if (choice.id) {
                    // Update existing choice
                    await prisma.choice.update({
                        where: {id: choice.id},
                        data: {title: choice.title, correct: choice.correct},
                    });
                } else {
                    // Create new choice if no ID is provided
                    await prisma.choice.create({
                        data: {
                            title: choice.title,
                            correct: choice.correct,
                            questionId: parseInt(questionId),
                        },
                    });
                }
            }
        }

        // Update the section questions and their choices for SECTION questions
        if (data.questionType === 'SECTION' && data.sectionQuestions) {
            for (const sectionQuestion of data.sectionQuestions) {
                if (sectionQuestion.id) {
                    // Update existing section question
                    await prisma.sectionQuestion.update({
                        where: {id: sectionQuestion.id},
                        data: {title: sectionQuestion.title, order: sectionQuestion.order},
                    });

                    // Update the choices within the section question
                    for (const choice of sectionQuestion.questionChoices) {
                        if (choice.id) {
                            // Update existing choice
                            await prisma.choice.update({
                                where: {id: choice.id},
                                data: {title: choice.title, correct: choice.correct},
                            });
                        } else {
                            // Create new choice if no ID is provided
                            await prisma.choice.create({
                                data: {
                                    title: choice.title,
                                    correct: choice.correct,
                                    sectionQuestionId: sectionQuestion.id,
                                },
                            });
                        }
                    }
                } else {
                    // Create new section question and its choices
                    const newSectionQuestion = await prisma.sectionQuestion.create({
                        data: {
                            title: sectionQuestion.title,
                            order: sectionQuestion.order,
                            parentQuestionId: parseInt(questionId),
                        },
                    });

                    for (const choice of sectionQuestion.questionChoices) {
                        await prisma.choice.create({
                            data: {
                                title: choice.title,
                                correct: choice.correct,
                                sectionQuestionId: newSectionQuestion.id,
                            },
                        });
                    }
                }
            }
        }

        return {
            status: 200,
            message: "Updated successfully",
        };
    } catch (error) {
        console.error("Error updating quiz:", error);
        return {
            message: "Failed to update quiz",
            status: 500,
        };
    }
}

export async function createQuizQuestion(quizId, questionData) {
    const {
        title,
        questionType,
        questionText,
        description,
        order,
        questionChoices,
        sectionQuestions,
        correctAnswerBoolean
    } = questionData;

    try {
        const updatedQuiz = await prisma.quiz.update({
            where: {id: quizId},
            data: {
                questions: {
                    create: {
                        title,
                        questionType,
                        description: description,
                        questionText,
                        order,
                        correctAnswerBoolean: questionType === 'TRUE_FALSE' ? correctAnswerBoolean : null,
                        questionChoices: questionType === 'MULTIPLE_CHOICE' ? {
                            create: questionChoices.map((choice) => ({
                                title: choice.title,
                                correct: choice.correct,  // Ensure the correct choice is stored
                            })),
                        } : undefined,
                        sectionQuestions: sectionQuestions
                              ? {
                                  create: sectionQuestions.map((sq) => ({
                                      title: sq.title,
                                      order: sq.order,
                                      questionChoices: {
                                          create: sq.questionChoices.map((choice) => ({
                                              title: choice.title,
                                              correct: choice.correct,  // Ensure the correct choice is stored
                                          })),
                                      },
                                  })),
                              }
                              : undefined,
                    },
                },
            },
            include: {
                questions: {
                    include: {
                        questionChoices: true,
                        sectionQuestions: {
                            include: {
                                questionChoices: true,
                            },
                        },
                    },
                },
            },
        });

        return {
            data: updatedQuiz,
            message: "Question added successfully",
            status: 200,
        };
    } catch (error) {
        console.error("Error adding question to quiz:", error);
        return {
            message: "Failed to add question",
            status: 500,
        };
    }
}


export async function deleteQuestion(questionId) {
    try {
        await prisma.question.delete({
            where: {id: parseInt(questionId)},
        });
        return {
            status: 200,
            message: "deleted successfully"
        }
    } catch (error) {
        console.error("Error updateing quiz:", error);
        return {
            message: "Failed to delete quiz",
            status: 500,
        };
    }
}