import {getLessonsByCategoryId} from "@/app/api/services/studentServices";

export async function GET(request, response) {
    const searchParams = request.nextUrl.searchParams
    const categoryId = searchParams.get("categoryId")
    const courseId = searchParams.get("courseId")
    const isReview = searchParams.get("isReview")
    const res = await getLessonsByCategoryId(categoryId, courseId, isReview)
    return Response.json(res, {status: res.status})
}