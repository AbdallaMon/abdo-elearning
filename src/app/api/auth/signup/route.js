import bcrypt from "bcrypt";
import prisma from "../../../../lib/pirsma/prisma";
import { sendEmail } from "../../utlis/sendMail";
import crypto from "crypto";
import {pageUrl} from "@/Urls/urls";

export async function POST(request) {
  let body = await request.json();
  if (body.password !== body.confirmPassword) {
    return Response.json({ message: "كلمات المرور غير متطابقة", status: 500 });
  }
  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;
    delete body.confirmPassword;
    const token = crypto.randomBytes(20).toString("hex");
    await prisma.user.create({
      data: {
        ...body,
        confirmationToken: token,
        confirmationExpires: new Date(Date.now() + 3600000),
      },
    });

    const confirmLink = `${pageUrl}/confirm?token=${token}`;
    const emailSubject = "طلب تأكيد البريد الإلكتروني";
    const emailText = `
      <p>لقد استلمت هذه الرسالة لأنك (أو شخصًا آخر) طلبت تأكيد البريد الإلكتروني لحسابك.</p>
      <p>يرجى النقر على الرابط التالي، أو لصقه في متصفحك لإكمال العملية في غضون ساعة من استلامها:</p>
      <p><a href="${confirmLink}">${confirmLink}</a></p>
      <p>إذا لم تطلب ذلك، يرجى تجاهل هذه الرسالة وسيظل بريدك الإلكتروني غير مؤكد.</p>
    `;

    await sendEmail(body.email, emailSubject, emailText);

    return Response.json({
      status: 200,
      message: "تم إرسال رابط التأكيد إلى " + body.email,
    });
  } catch (error) {
    if (error.code === "P2002") {
      return Response.json({
        status: 500,
        message: "البريد الإلكتروني مستخدم بالفعل",
      });
    } else {
      return Response.json({
        status: 500,
        message: "حدث خطأ أثناء إنشاء المستخدم",
      });
    }
  }
}
