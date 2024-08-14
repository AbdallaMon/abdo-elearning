import HeroSection from "@/app/components/HomePage/HeroSection";
import CourseLevelsGrid from "@/app/components/HomePage/CourseLevelsGrid";


export const metadata = {
    title: "مراجعات مسيو عبدالرحمن عبدالصبور لمادة اللغة الفرنسية لجميع المراحل الدراسية"
}
export default function Home() {
    return (
          <main>
              <HeroSection/>
              <CourseLevelsGrid/>
          </main>
    );
}
