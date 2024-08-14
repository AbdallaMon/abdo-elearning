import React from 'react';
import {Grid, Typography, Box} from '@mui/material';
import LessonCard from "@/app/UiComponents/Cards/LessonCard";
import {getLessonsByCategoryId} from "@/helpers/functions/getFunctions";
import ReviewCard from "@/app/UiComponents/Cards/ReviewLessonCard";


const LessonsComponent = async ({id, courseId, isReview}) => {
    const lessons = await getLessonsByCategoryId(id, courseId, isReview);
    return (
          <>

              <div className="container mx-auto">
                  {!lessons || lessons.length === 0 && <Typography variant="h4">
                      {isReview ? "لا يوجد مراجعات" :
                            "  لا يوجد محاضرات"
                      }
                  </Typography>}
                  <Grid container spacing={4}>
                      {lessons.map((lesson) => (
                            <Grid item xs={12} sm={6} md={4} key={lesson.id}>
                                {isReview ? (
                                      <ReviewCard review={lesson} catId={id}/>
                                ) : (
                                      <LessonCard lesson={lesson} catId={id}/>
                                )}
                            </Grid>
                      ))}
                  </Grid>
              </div>
          </>
    );
};

export default LessonsComponent;
