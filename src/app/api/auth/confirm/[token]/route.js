import prisma from "../../../../../lib/pirsma/prisma"; // adjust the path according to your project structure
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

export async function POST(request, { params }) {
  const { token: confirmationToken } = params;

  const cookieStore = cookies();
  if (!confirmationToken)
    return Response.json({
      message: "هذا الرابط غير صالح",
      status: 500,
    });
  try {
    const user = await prisma.User.findUnique({
      where: {
        confirmationToken: confirmationToken,
      },
    });

    if (!user || Date.now() > user.confirmationExpires) {
      return Response.json({
        message: "انتهت صلاحية هذا الرابط",
        status: 500,
      });
    }
    if (user.emailConfirmed) {
      return Response.json({
        message: "هذا البريط مفعل من قبل",
        status: 400,
      });
    }
    await prisma.User.update({
      where: {
        confirmationToken: confirmationToken,
      },
      data: {
        confirmationToken: null,
        confirmationExpires: null,
        emailConfirmed: true,
      },
    });
    const token = jwt.sign({ id: user.id,            role: user.role,emailConfirmed:user.emailConfirmed
    }, SECRET_KEY, {
      expiresIn: '8h',
    });

    await cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return Response.json({
      message: "تم تفعيل الحساب جاري تحويلك  ",
      user,
      redirect: true,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "حدثت مشكلة ما" });
  }
}
