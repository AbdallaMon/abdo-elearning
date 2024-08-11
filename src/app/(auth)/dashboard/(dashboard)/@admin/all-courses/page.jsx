// src/app/admin/all-courses/page.jsx
"use client";
import useDataFetcher from "@/helpers/hooks/useDataFetcher";
import CardGrid from "@/app/components/CardGrid";
import CreateModal from "@/app/UiComponents/Models/CreateModal";
import FilterSelect from "@/app/UiComponents/FilterSelect";
import { useEffect, useState } from "react";
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
    { data: { id: "title", type: "text", label: "عنوان الوحدة" } },
    { data: { id: "description", type: "text", label: "الوصف" } },
    {
      data: { id: "categoryId", type: "select", label: "المرحلة",       options: [],
        loading: true, },
      pattern: {
        required: {value: true, message: "Please select a Category"},
      },    },
    { data: { id: "image", type: "text", label: "لينك الصوره" } },
    { data: { id: "published", type: "switch", label: "نشره؟" } },
  ];
  const [inputs, setInputs] = useState(defaultInputs);
  const fetchCategories = async () => {
    const response = await fetch("/api/categories"); // Adjust URL to your categories endpoint
    const result = await response.json();
    const newInputs = [...inputs];
    newInputs[2].data.options = result
    newInputs[2].data.loading = false;
    setInputs(newInputs);
    return { data: result };
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
    {name:"image",label: "غلاف الوحده",type:"image"},
    { name: "title", label: "عنوان الوحدة" },
    { name: "description", label: "الوصف" },
    { name: "category.name", label: "المرحلة" },
    { name: "published", label: "منشور؟" },
  ];
  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setFilters((prevFilters) => ({ ...prevFilters, categoryId }));
  };
  return (
    <>
      <FilterSelect
        label="المرحلة"
        options={categories}
        value={filters?.categoryId !== undefined ? filters.categoryId : ""}
        onChange={handleCategoryChange}
        loading={loadingCategories}
      />
      <CreateModal
        setData={setData}
        label={"وحدة جديدة"}
        inputs={inputs}
        href="/api/admin/courses"
        extraProps={{ formTitle: "Create New Course", btnText: "Submit" }}

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
        editHref={"/api/admin/courses"}
        extraComponent={({ item }) => (
                <Link href={`/dashboard/all-courses/${item.categoryId}/${item.id}`}>
              <Button >

                Add lessons
              </Button>
                </Link>
        )}
      />
    </>
  );
};

export default DataPage;
