import {fetchCategories} from "@/app/api/services/services";

export async function GET(){
    const categories=await fetchCategories();
    return Response.json(categories);
}