import prisma from "@/lib/pirsma/prisma";

export async function GET(request, response) {
    const id = response.params.id;

    try {

        const category = await prisma.category.findUnique(
              {
                  where: {id: +id}
              }
        )
        return Response.json(category, {status: 200})
    } catch (e) {
        console.log(e, "error in fetch single cat")
        return Response.json({name: "لا يوجد"}, {status: 400})
    }
}