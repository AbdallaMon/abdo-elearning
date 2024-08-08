import {createLesson, createMediaForLesson} from "@/app/api/services/services";


export async function POST(request) {
    const data = await request.json();
    const url=request.nextUrl;
    const lessonId = url.searchParams.get('extraId');
    try {
        const result = await createMediaForLesson(+lessonId,data);
        return  Response.json(result, { status: 200 });
    } catch (error) {
        return  Response.json({ message: error.message }, { status: 500 });
    }
}
