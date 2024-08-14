import CourseLevelsGrid from "@/app/components/HomePage/CourseLevelsGrid";

export const metadata = {
    title: "مراجعات مسيو عبدالرحمن عبدالصبور لمادة اللغة الفرنسية لجميع المراحل الدراسية",
    description: "استمتع بمراجعات شاملة وفعّالة لمادة اللغة الفرنسية لجميع المراحل الدراسية مع مسيو عبدالرحمن عبدالصبور. تحقق من المراجعات المتوفرة لكل مستوى واستعد للنجاح في امتحاناتك."
};
export default function Page() {
    return <div className={"mt-10"}>
        <CourseLevelsGrid isReview={true}/>
    </div>
}