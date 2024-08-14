"use client";

import HandleAuth from "./HandleAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Failed,
  Success,
} from "@/app/UiComponents/ToastUpdate/ToastUpdate";

export default function Layout({ children, admin, student }) {
  const [res, setRes] = useState(null);

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const toastId = toast.loading("جاري التاكد من صلاحيتك");
      const response = await fetch(`/api/auth/state`, { cache: "no-store" });
      const result = await response.json();
      if (result.auth === false) {
        router.push("/login");
        toast.update(toastId, Failed("انتهت الجلسة يجب عليك اعادة تسجيل الدخول"));
      }
      if (result.auth === true) {
        toast.update(
          toastId,
          Success("تم التاكد من الصلاحيات بامكانك وجاري تحميل البيانات"),
        );
      }
      setRes(result);
    }

    fetchData();
  }, []);
  if (!res || !res.role) return null;
  const role = res?.role;

  return (
    <HandleAuth>
      {role === "ADMIN" ? admin : role === "STUDENT" ? student : null}{" "}
    </HandleAuth>
  );
}
