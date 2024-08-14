import bcrypt from "bcrypt";
import prisma from "../../../../../lib/pirsma/prisma";

export async function POST(request, { params }) {
  let body = await request.json();
  const { token } = params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        resetPasswordToken: token,
      },
    });
    if (!user || Date.now() > user.resetPasswordExpires) {
      return Response.json({
        status: 500,
        message: "انتهت صلاحية الرابط",
      });
    }

    const hashedPassword = bcrypt.hashSync(body.password, 8);

    await prisma.user.update({
      where: {
        resetPasswordToken: token,
      },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    return Response.json({
      status: 200,
      message: "تم اعادة تعين كلمة المرور يمكنك تسجيل الدخول الان",
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      status: 500,
      message: "حدثت مشكلة اثناء اعادة تعين كلمة المرور " + error.message,
    });
  }
}
