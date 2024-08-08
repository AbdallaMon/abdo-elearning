import {createLesson, fetchLessonsByCourseId} from "@/app/api/services/services";

export async function GET(request,response) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 10;
    const id = response.params.id
    const result = await fetchLessonsByCourseId(+id,+page, +limit, );

    return  Response.json(result, { status: 200 });
}

export async function POST(request,response) {
    const data = await request.json();
    const params = response.params;
    data.courseId = +params.id;
    try {
        const result = await createLesson(data);
        return  Response.json(result, { status: 200 });
    } catch (error) {
        return  Response.json({ message: error.message }, { status: 500 });
    }
}
