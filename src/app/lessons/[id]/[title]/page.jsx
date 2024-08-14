import LessonsComponent from "@/app/UiComponents/dataView/Lessons";
import React, {Suspense} from "react";
import {Box, Grid, Typography} from "@mui/material";
import {colors, stages} from "@/app/constants";
import LessonCardSkeleton from "@/app/UiComponents/loader/LessonSkeleton";
import Link from "next/link";
import FilterByCategoriesAsLinks from "@/app/UiComponents/filters/FilterByCategoriesLinks";

export async function generateMetadata({params: {id}, searchParams: {courseId}}) {

    const currentStage = stages.find((level) => level.id == id)
    const description = `Explore the lessons for ${currentStage.title}. Find detailed explanations and engaging content.`;

    return {
        title: currentStage.title,
        description,
        icons: {
            icon: currentStage.imageUrl
        },
    }
}

export default function LessonPage({params: {id}, searchParams: {courseId}}) {

    const currentStage = stages.find((level) => level.id == id)
    return (
          <div className="py-16 bg-bgPrimary px-4">
              <Typography variant="h4" component="h1" className="text-center " sx={{
                  my: 3,
                  fontWeight: 600
              }}>
                  محاضرات {currentStage.title}
              </Typography>
              <FilterByCategoriesAsLinks isReview={false} id={id}/>
              <Suspense fallback={<LessonCardSkeleton/>}>
                  <LessonsComponent
                        id={id}
                        courseId={courseId}
                  />
              </Suspense>
          </div>
    )
}