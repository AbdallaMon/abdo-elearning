import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();

  try {
    cookieStore.set({
      name: "token",
      value: "",
      path: "/",
      maxAge: -1,
    });

    return Response.json({
      status: 200,
      message: "تم تسجيل الخروج بنجاح",
      auth: false,
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      status: 500,
      message: "حدث خطاء اثناء تسجيل الخروج "
    });
  }
}
