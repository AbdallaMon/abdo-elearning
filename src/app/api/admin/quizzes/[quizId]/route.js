import {createQuizQuestion, fetchQuizById} from "@/app/api/services/services";

export async function GET(request,response) {
    const quizId = response.params.quizId


        const result = await fetchQuizById(+quizId);
    return Response.json(result, { status: result.status });

}


export async function POST(request,response){
    const quizId = response.params.quizId
const data=await request.json()

    const result=await createQuizQuestion(+quizId,data)
    return Response.json(result, { status: result.status });

}