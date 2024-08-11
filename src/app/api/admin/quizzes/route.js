import {createQuiz, fetchQuizzes} from "@/app/api/services/services";
export async function GET(request) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 10;
    const filters = JSON.parse(searchParams.get('filters') || '{}');
    const result = await fetchQuizzes(+page, +limit, filters);
    return Response.json(result, { status: result.status });

}
export async function POST(request) {
    const data = await request.json();
    const result = await createQuiz(data);
    return Response.json(result, { status: result.status });
}