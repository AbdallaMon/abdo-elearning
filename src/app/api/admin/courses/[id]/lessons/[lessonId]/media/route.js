import {createMediaForLesson, fetchAllMediaByLessonId} from "@/app/api/services/services";
export async function GET(request,response){
    const lessonId = response.params.lessonId
    try {
        const result = await fetchAllMediaByLessonId(+lessonId);
        return  Response.json(result, { status: result.status });
    } catch (error) {
        return  Response.json({ message: error.message }, { status: 500 });
    }
}


export async function POST(request,response) {
    const data = await request.json();
    const lessonId = response.params.lessonId
    try {
        const result = await createMediaForLesson(+lessonId,data);
        return  Response.json(result, { status: 200 });
    } catch (error) {
        return  Response.json({ message: error.message }, { status: 500 });
    }
}
