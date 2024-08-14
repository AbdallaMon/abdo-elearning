import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import prisma from "../../../../lib/pirsma/prisma";

const SECRET_KEY = process.env.SECRET_KEY;

export async function POST(request) {
  let body = await request.json();
  const cookieStore = cookies();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
      select:{
        id:true,
        role:true,
        emailConfirmed:true,
        password:true,
      }
    });

    if (!user) {
      return Response.json({
        status: 500,
        message: "لا يوجد حساب بهذا البريد",
      });
    }

    const validPassword = await bcrypt.compare(body.password, user.password);

    if (!validPassword) {
      return Response.json({
        status: 500,
        message: "كلمة المرور غير صحيحة",
      });
    }

    const token = jwt.sign({ id: user.id,            role: user.role,emailConfirmed:user.emailConfirmed
    }, SECRET_KEY, {
      expiresIn: '8h',
    });

    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return Response.json({
      status: 200,
      message: "تم تسجيل الدخول بنجاح وجاري اعادة التوجية...",
      user,
    });
  } catch (error) {
    console.log(error,"error")
    return Response.json({
      status: 500,
      message: "حدث خطاءاثناء تسجيل الدخول" ,
    });
  }
}
