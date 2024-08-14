import {editLesson} from "@/app/api/services/services";

export async function PUT(request, response) {
    const data = await request.json();
    const id = response.params.lessonId;

    const result = await editLesson(id, data);
    return Response.json(result, {status: result.status}
    );

}