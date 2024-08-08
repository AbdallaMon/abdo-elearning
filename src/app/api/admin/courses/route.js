import {createCourse, fetchCourses} from "@/app/api/services/services";

export async function GET(request) {
    const url=request.nextUrl;
    const searchParams=url.searchParams;
    const page=searchParams.get('page');
    const limit=searchParams.get('limit');
    const filters = JSON.parse(searchParams.get('filters') || '{}');
    const categoryId = filters.categoryId;
    const result=await fetchCourses(+page,+limit,categoryId);
    return Response.json(result,     { status: 200 })

}

export async function POST(request) {
    const data  = await request.json();
    try {
        const result=await createCourse(data);
        return Response.json(result,     { status: 200 })
    } catch (error) {
        return Response.json({
            message: "Failed to create course",
        },         { status: 500 }
        );
    }
}