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
      "Logging in...",
      setRedirect,
    );
  }

  const subTitle = <Link href={pageUrl + "/signup"}>Create an account?</Link>;
  return (
    <>
      <AuthForm
        btnText={"Login"}
        inputs={loginInputs}
        formTitle={"Login to EDU"}
        onSubmit={handleLogin}
        subTitle={subTitle}
      >
        <Link href={pageUrl + "/reset"}>Forgot password?</Link>
      </AuthForm>
    </>
  );
}
