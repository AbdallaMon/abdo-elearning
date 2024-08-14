"use client";
import { handleRequestSubmit } from "../../../../helpers/functions/handleSubmit";
import Link from "next/link";
import { pageUrl } from "../../../../Urls/urls";
import { useAuth } from "@/providers/AuthProvider";
import { useToastContext } from "@/providers/ToastLoadingProvider";
import { loginInputs } from "./data";
import AuthForm from "@/app/UiComponents/FormComponents/Forms/AuthFrom/AuthForm";

export default function LoginPage() {
  const { setLoading } = useToastContext();
  const { setRedirect } = useAuth();

  async function handleLogin(data) {
    await handleRequestSubmit(
          data,
          setLoading,
          "auth/login",
          false,
          "جاري تسجيل الدخول",
          setRedirect,
    );
  }

  const subTitle = <Link href={ "/signup"} className="font-[500] flex justify-center mb-2 mt-1">انشاء حساب جديد؟</Link>;
  return (
        <>
          <AuthForm
                btnText={"تسجيل الدخول"}
                inputs={loginInputs}
                formTitle={"تسجيل الدخول الي المنصة"}
                onSubmit={handleLogin}
                subTitle={subTitle}
          >
            <Link href={  "/reset"} className={"mb-2 flex justify-end "}>نسيت كلمة السر؟</Link>
          </AuthForm>
        </>
  );
}
