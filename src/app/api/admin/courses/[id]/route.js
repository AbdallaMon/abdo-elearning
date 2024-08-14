import {editCourse} from "@/app/api/services/services";

export async function PUT(request, response) {
    const data = await request.json();
    const id = response.params.id

    const result = await editCourse(id, data);
    return Response.json(result, {status: result.status})

}