import {createPurchase} from "@/app/api/services/studentServices";

export async function POST(request, response) {
    const data = await request.json()
    const res = await createPurchase(data)
    return Response.json(res, {status: res.status})
}