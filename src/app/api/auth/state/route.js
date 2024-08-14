import {cookies} from "next/headers";
import prisma from "../../../../lib/pirsma/prisma";
import {jwtVerify} from "jose";

export async function GET() {
    const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY);
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
        return Response.json({auth: false, message: "No token provided"});
    }
    try {
        const {payload: decoded} = await jwtVerify(token, SECRET_KEY);
        if (decoded) {
            const user = decoded
            if (!user) {
                return Response.json({
                    message: "حدث خطاء ما يرجي اعادة تسجيل الدخول",
                    auth: false,
                });
            }
            if (!user.emailConfirmed) {
                return Response.json({
                    message: "البريد الالكتروني الخاص بهذا الحساب غير مفعل يرجي تفعيل حتي تتمكن من استخادم جميع مميزات المنصة",
                    auth: true,
                    ...user
                });
            }
            return Response.json({
                message: "تم التاكيد من الصلاحيات",
                auth: true,
                ...user
            });
        }
    } catch (error) {
        console.log(error);
        return Response.json({
            message: "حدث خطاء اثناء التاكد من صلاحيات الدخول يرجي تسجيل الدخول مره اخري",
            error: error.message,
        });
    }
}
