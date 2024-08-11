"use client";
import useDataFetcher from "@/helpers/hooks/useDataFetcher";
import CreateModal from "@/app/UiComponents/Models/CreateModal";
import FilterSelect from "@/app/UiComponents/FilterSelect";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminTable from "@/app/components/CardGrid";
import {Button} from "@mui/material";
import MediaDrawer from "@/app/UiComponents/ExtraComponet";

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

    } = useDataFetcher(`admin/courses/${courseId}/lessons`, false);

    const [courses, setCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [lessonId, setSelectedLesson] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const handleRowClick = (userId) => {
        setSelectedLesson(userId);
        setDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setDrawerOpen(false);
        setSelectedLesson(null);
    };
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
        { data: { id: 'title', type: 'text', label: 'عنوان الدرس' } , pattern: {
                required: {
                    value: true,
                    message: "Required field",
                }
            }
            },
        { data: { id: 'description', type: 'text', label: 'الوصف' }, pattern: {
                required: {
                    value: true,
                    message: "Required field",
                }
            } },
        { data: { id: 'order', type: 'number', label: 'الترتيب' } , pattern: {
                required: {
                    value: true,
                    message: "Required field",
                }
            }},
        {data:{id:"quiz",type: "text",label:"لينك الواجب"}, pattern: {
                required: {
                    value: true,
                    message: "Required field",
                }
            }},
        { data: { id: 'image', type: 'text', label:"لينك الصوره" }, pattern: {
                required: {
                    value: true,
                    message: "Required field",
                }
            } },
        { data: { id: 'published', type: 'switch', label: 'نشره؟' }, pattern: {
                required: {
                    value: true,
                    message: "Required field",
                }
            } },
    ];

    const columns = [
        {name:"image",label: "صورة الدرس",type:"image"},
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
              <AdminTable
                    withEdit={true}
                    data={data}
                    columns={columns}
                    page={page}
                    setPage={setPage}
                    limit={limit}
                    setLimit={setLimit}
                    total={total}
                    inputs={inputs}
                    setData={setData}
                    loading={loading}
                    editHref={`/api/admin/courses/${courseId}/lessons`}
                    extraComponent={({ item }) => (
                              <Button onClick={() => handleRowClick(item.id)} >
                                  Media
                              </Button>
                    )}
                   />
                    {drawerOpen && (
                           <MediaDrawer
                            lessonId={lessonId}
                             courseId={courseId}
                              handleCloseDrawer={handleCloseDrawer}
                  />)
                    }
          </>
    );
};

export default LessonsPage;
