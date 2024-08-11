import {editCourse} from "@/app/api/services/services";

export async function PUT(request, response) {
    const data  = await request.json();
    const id=response.params.id
    try {
        const result=await editCourse(id,data);
        return Response.json(result,     { status: 200 }
        );
    } catch (error) {
        return Response.json({
            message: "Failed to create course",
        },         { status: 500 }
        );
    }
}