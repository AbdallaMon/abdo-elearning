import LessonsComponent from "@/app/UiComponents/dataView/Lessons";
import React, {Suspense} from "react";
import {Typography} from "@mui/material";
import {stages} from "@/app/constants";
import LessonCardSkeleton from "@/app/UiComponents/loader/LessonSkeleton";
import FilterByCategoriesAsLinks from "@/app/UiComponents/filters/FilterByCategoriesLinks";

export async function generateMetadata({params: {id}, searchParams: {courseId}}) {
    const currentStage = stages.find((level) => level.id == id);

    const title = `محاضرات اللغة الفرنسية${currentStage.title} مع مسيو عبدالرحمن عبدالصبور`;
    const description = `استعرض مراجعات ${currentStage.title} وتعرف على تفسيرات مفصلة ومحتوى تعليمي شيق مع مسيو عبدالرحمن عبدالصبور.`;

    return {
        title,
        description,
        icons: {
            icon: currentStage.imageUrl
        },
    }
}

export default function ReviewsPage({params: {id}, searchParams: {courseId}}) {

    const currentStage = stages.find((level) => level.id == id)
    return (
          <div className="py-16 bg-bgPrimary px-4">
              <Typography variant="h4" component="h1" className="text-center " sx={{
                  my: 3,
                  fontWeight: 600
              }}>
                  مراجعات {currentStage.title}
              </Typography>
              <FilterByCategoriesAsLinks isReview={true} id={id}/>
              <Suspense fallback={<LessonCardSkeleton/>}>
                  <LessonsComponent
                        id={id}
                        courseId={courseId}
                        isReview={true}
                  />
              </Suspense>
          </div>
    )
}