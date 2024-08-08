import "./globals.css";
import Navbar from "@/app/components/Navbar/Navbar";

import { League_Spartan } from "next/font/google";
import AuthProvider from "@/providers/AuthProvider";
import ToastProvider from "@/providers/ToastLoadingProvider";
import {Rtl} from "@/app/components/Rtl/Rtl";
import ReduxProvider from "@/providers/ReduxProvider";

const inter = League_Spartan({ subsets: ["latin"] });

export const metadata = {
  title: "Mr Abdelrahman Abdelsabour ",
  description:
        "Mr Abdelrahman Abdelsabour is a platform for learning and teaching online french courses, mr abdelrahman is a french teacher with 5 years of experience in teaching french language,we provide lectures ,quizez ,follow up , final revisions and more",
};

export default function RootLayout({ children }) {
  return (
        <html lang="ar" >
        <body className={inter.className}>
        <Rtl>
        <ReduxProvider>
          <ToastProvider>
            <AuthProvider>
                <Navbar />
                {children}
            </AuthProvider>
          </ToastProvider>
        </ReduxProvider>
        </Rtl>
        </body>
        </html>
  );
}
