
import {deleteQuestion, updateAQuestion} from "@/app/api/services/services";


export async function PUT(request,response) {
    const quizId = response.params.quizId
    const questionId = response.params.questionId
    const data=await request.json()

    const result = await updateAQuestion(data,questionId,quizId)
    return Response.json(result, { status: result.status });

}

export async function DELETE(request,response){
    const questionId = response.params.questionId

    const result = await deleteQuestion(questionId)
    return Response.json(result, { status: result.status });
}