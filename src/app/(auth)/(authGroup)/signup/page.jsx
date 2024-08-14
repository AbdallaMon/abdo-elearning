"use client";
import { signupInputs } from "./data";
import { handleRequestSubmit } from "@/helpers/functions/handleSubmit";
import Link from "next/link";
import { useToastContext } from "@/providers/ToastLoadingProvider";
import { useAuth } from "@/providers/AuthProvider";
import AuthForm from "@/app/UiComponents/FormComponents/Forms/AuthFrom/AuthForm";

export default function SignUpPage() {
  const { setLoading } = useToastContext();
  const { setRedirect } = useAuth();

  async function handleSignUp(data) {
    await handleRequestSubmit(
          data,
          setLoading,
          "auth/signup",
          false,
          "جاري انشاء الحساب",
          setRedirect,
    );
  }

    const subTitle = <Link href={ "/login"} className="font-[500] flex justify-center mb-2 mt-1"> تسجيل الدخول؟</Link>;

  return (
        <>
          <AuthForm
                btnText={"انشاء"}
                inputs={signupInputs}
                formTitle={"حساب جديد"}
                onSubmit={handleSignUp}
                subTitle={subTitle}
          />
        </>
  );
}
