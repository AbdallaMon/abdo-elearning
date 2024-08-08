"use client";
import useDataFetcher from "@/helpers/hooks/useDataFetcher";
import CardGrid from "@/app/components/CardGrid";
import CreateModal from "@/app/UiComponents/Models/CreateModal";
import FilterSelect from "@/app/UiComponents/FilterSelect";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ExtraComponent from "@/app/UiComponents/ExtraComponet";

const LessonsPage = ({ params }) => {
    const { id: courseId, categoryId } = params;
    const router = useRouter();

    const {
        data,
        loading,
        setData,
        page,
        setPage,
        limit,
        setLimit,
        total,
        setFilters,
        filters,
        setRender
    } = useDataFetcher(`admin/courses/${courseId}/lessons`, false);

    const [courses, setCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);

    const fetchAllCoursesByCatId = async () => {
        const response = await fetch(`/api/indexes?index=course&filters={"categoryId":${categoryId}}`);
        const result = await response.json();
        return { data: result.data };
    };

    useEffect(() => {
        async function fetchFilterData() {
            const response = await fetchAllCoursesByCatId();
            setCourses(response.data);
            setLoadingCourses(false);
        }
        fetchFilterData();
    }, [categoryId]);


    const inputs = [
        { data: { id: 'title', type: 'text', label: 'عنوان الدرس' } },
        { data: { id: 'description', type: 'text', label: 'الوصف' } },
        { data: { id: 'order', type: 'number', label: 'الترتيب' } },
        { data: { id: 'image', type: 'text', label:"لينك الصوره" } },
        { data: { id: 'published', type: 'switch', label: 'نشره؟' } },
    ];

    const multimediaInputs = [
        { data: { id: 'title', type: 'text', label: 'عنوان الوسائط' } },
        { data: { id: 'description', type: 'text', label: 'الوصف' } },
        { data: { id: 'link', type: 'text', label: 'الرابط' } },
        { data: { id: 'type', type: 'SelectField', label: 'النوع', options: [{ value: 'صورة', id: 'IMAGE' }, { value: 'فيديو', id: 'VIDEO' }] }


        },
        { data: { id: 'isFree', type: 'switch', label: 'مجاني؟' } },
        { data: { id: 'expectedDuration', type: 'number', label: 'المدة المتوقعة' } },
        { data: { id: 'order', type: 'number', label: 'الترتيب' } },
    ];

    const properties = [
        { name: 'title', label: 'عنوان الدرس' },
        { name: 'description', label: 'الوصف' },
        { name: 'order', label: 'الترتيب' },
        { name: 'published', label: 'منشور؟' },
    ];

    const handleCourseChange = (event) => {
        const id = event.target.value;
        if (courseId == id) return;
        if (!id) {
            router.push(`all`);
        } else {
            router.push(`${id}`);
        }
    };

    return (
          <>
              <FilterSelect
                    label="الوحدة"
                    options={courses?.map(course => ({ name: course.title, id: course.id }))}
                    value={courseId}
                    onChange={handleCourseChange}
                    loading={loadingCourses}
              />
              <CreateModal
                    setData={setData}
                    label={"درس جديد"}
                    inputs={inputs}
                    href={`/api/admin/courses/${courseId}/lessons`}
                    extraProps={{ formTitle: 'درس جديد', btnText: 'انشاء' }}
                    multimedia={true}
              />
              <CardGrid
                    withEdit={true}
                    data={data}
                    properties={properties}
                    page={page}
                    setPage={setPage}
                    limit={limit}
                    setLimit={setLimit}
                    total={total}
                    inputs={inputs}
                    setData={setData}
                    loading={loading}
                    editHref={`/api/admin/courses/${courseId}/lessons`}
                    extraComponent={ExtraComponent}
                    extraComponentProps={{
                        inputs: multimediaInputs,
                        href: `/api/admin/courses/${courseId}/media`,
                        setData
                    }}
              />
          </>
    );
};

export default LessonsPage;
