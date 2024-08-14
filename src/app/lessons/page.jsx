import CourseLevelsGrid from "@/app/components/HomePage/CourseLevelsGrid";


export const metadata = {
    title: "دروس ومحاضرات مسيو عبدالرحمن عبدالصبور لمادة اللغة الفرنسية لجميع المراحل الدراسية",
    description: "تصفح الدروس والمحاضرات لمادة اللغة الفرنسية لجميع المراحل الدراسية مع مسيو عبدالرحمن عبدالصبور. احصل على تعليم عالي الجودة واستعد للتفوق الأكاديمي."
};
export default function Page() {
    return <div className={"mt-10"}>
        <CourseLevelsGrid/>
    </div>
}