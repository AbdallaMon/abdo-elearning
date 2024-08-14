"use client";
import useDataFetcher from "@/helpers/hooks/useDataFetcher";
import CreateModal from "@/app/UiComponents/Models/CreateModal";
import FilterSelect from "@/app/UiComponents/filters/FilterSelect";
import {useEffect, useState} from "react";
import AdminTable from "@/app/components/CardGrid";
import {Button} from "@mui/material";
import Link from "next/link";

const DataPage = () => {
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
    } = useDataFetcher("admin/courses", false);
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);


    const defaultInputs = [
        {
            data: {id: "title", type: "text", label: "عنوان الوحدة"},
            pattern: {
                required: {value: true, message: "يجب كتابة عنوان للوحدة"},
            },
        },
        {
            data: {id: "description", type: "textarea", label: "الوصف"},
            pattern: {
                required: {value: true, message: "يجب كتابة وصف  للوحدة"},
            },
        },

        {
            data: {
                id: "categoryId", type: "select", label: "المرحلة", options: [],
                loading: true,
            },
            pattern: {
                required: {value: true, message: "من فضلك قم بانشاء مرحلة"},
            },
        },
        {
            data: {
                id: "type", type: "select", label: "النوع", options: [{
                    name: "وحدة", id: "COURSE",
                }, {
                    name: "مراجعة"
                    , id: "REVIEW"
                }],
                loading: false,
            },
            pattern: {
                required: {value: true, message: "من فضلك قم بانشاء مرحلة"},
            },
        },
        {
            data: {id: "image", type: "text", label: "رابط الصوره"},
            pattern: {
                required: {value: true, message: "يجب  وصع رابط  صورة  للوحدة"},
            },
        },
        {data: {id: "published", type: "switch", label: "نشره؟"}},
    ];
    const [inputs, setInputs] = useState(defaultInputs);
    const fetchCategories = async () => {
        const response = await fetch("/api/categories"); // Adjust URL to your categories endpoint
        const result = await response.json();
        const newInputs = [...inputs];
        newInputs[2].data.options = result
        newInputs[2].data.loading = false;
        setInputs(newInputs);
        return {data: result};
    };
    useEffect(() => {
        async function fetchFilterData() {
            const response = await fetchCategories();
            setCategories(response.data);
            setLoadingCategories(false);
        }

        fetchFilterData();
    }, []);
    const columns = [
        {name: "image", label: "غلاف الوحده", type: "image"},
        {name: "title", label: "عنوان الوحدة"},
        {name: "description", label: "الوصف"},
        {name: "type", label: "النوع"},
        {name: "category.name", label: "المرحلة"},
        {name: "published", label: "منشور؟"},
    ];
    const handleCategoryChange = (event) => {
        const categoryId = event.target.value;
        setFilters((prevFilters) => ({...prevFilters, categoryId}));
    };
    return (
          <>
              <div className={"grid grid-cols-2  gap-5 items-center"}>
                  <CreateModal
                        setData={setData}
                        label={"وحدة جديدة"}
                        inputs={inputs}
                        href="/admin/courses"
                        extraProps={{formTitle: "وحدة جديدة", btnText: "انشاء"}}

                  />
                  <FilterSelect
                        label="المرحلة"
                        options={categories}
                        value={filters?.categoryId !== undefined ? filters.categoryId : ""}
                        onChange={handleCategoryChange}
                        loading={loadingCategories}
                  />

              </div>
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
                    editHref={"admin/courses"}
                    extraComponent={({item}) => (
                          <Link href={`/dashboard/all-courses/${item.categoryId}/${item.id}`}>
                              <Button>
                                  انشاء دروس
                              </Button>
                          </Link>
                    )}
              />
          </>
    );
};

export default DataPage;
