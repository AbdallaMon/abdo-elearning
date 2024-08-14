"use client";
import useDataFetcher from "@/helpers/hooks/useDataFetcher";
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
    } = useDataFetcher("admin/quizzes", false);
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);


    const fetchCategories = async () => {
        const response = await fetch("/api/categories"); // Adjust URL to your categories endpoint
        const result = await response.json();
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
        {name: "title", label: "عنوان الاختبار"},
        {name: "description", label: "الوصف"},
        {name: "course.title", label: "الوحدة"},
        {name: "course.category.name", label: "المرحلة"},
    ];
    const handleCategoryChange = (event) => {
        const categoryId = event.target.value;
        setFilters((prevFilters) => ({...prevFilters, categoryId}));
    };
    return (
          <>
              <div className={"grid grid-cols-2 gap-5 items-center w-full"}>

                  <FilterSelect
                        label="المرحلة"
                        options={categories}
                        value={filters?.categoryId !== undefined ? filters.categoryId : ""}
                        onChange={handleCategoryChange}
                        loading={loadingCategories}
                  />
                  <Link href={`/dashboard/quizez/create`}>

                      <Button variant="contained">
                          انشاء اختبار جديد
                      </Button>
                  </Link>
              </div>
              <AdminTable
                    data={data}
                    columns={columns}
                    page={page}
                    setPage={setPage}
                    limit={limit}
                    setLimit={setLimit}
                    total={total}
                    setData={setData}
                    loading={loading}
                    extraComponent={({item}) => (
                          <Link href={`/dashboard/quizez/${item.id}`}>
                              <Button>
                                  تعديل الاختبار
                              </Button>
                          </Link>
                    )}/>
          </>
    );
};

export default DataPage;
