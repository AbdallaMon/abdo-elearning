import {deleteMedia, updateMedia} from "@/app/api/services/services";

export async function PUT(request,response){
    const data=await request.json()
    const mediaId=response.params.mediaId

    try {
        const res=await updateMedia(+mediaId,data)

        return  Response.json(res, { status: res.status });
    } catch (error) {
        return  Response.json({ message: error.message }, { status: 500 });
    }
}
export async function DELETE(request,response){
    const mediaId=response.params.mediaId
    try {
        const res=await deleteMedia(+mediaId)

        return  Response.json(res, { status: res.status });
    } catch (error) {
        return  Response.json({ message: error.message }, { status: 500 });
    }
}