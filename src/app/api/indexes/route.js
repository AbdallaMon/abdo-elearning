import {getIndexedData} from "@/app/api/services/services";

export async function GET(request){
    const url=request.nextUrl;
    const searchParams=url.searchParams;
    const index=searchParams.get('index');
    const filters = JSON.parse(searchParams.get('filters') || '{}');
    try {
    const result=await getIndexedData(index,filters);
    return Response.json(result,     { status: 200 })
    } catch (error) {
        return Response.json({
            message: "Failed to fetch data",
        },         { status: 500 }
        );
    }

}