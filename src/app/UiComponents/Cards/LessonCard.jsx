import React from 'react';
import {Card, CardContent, Typography, Button, CardMedia, Box} from '@mui/material';
import {MotionWrapper} from "@/app/components/AnimationsWrapper/CardAnimation";
import Link from "next/link";
import BuyButton from "@/app/UiComponents/Buttons/BuyButton";

const LessonCard = ({lesson, catId}) => {
    return (
          <MotionWrapper>
              <Card sx={{position: 'relative', background: 'white', overflow: 'hidden', borderRadius: 2, boxShadow: 3}}>
                  <CardMedia
                        component="img"
                        image={lesson.image}
                        alt={lesson.title}
                        sx={{height: '250px', objectFit: 'cover'}}
                  />
                  <Link className="
            absolute top-4 left-4 bg-tertiary text-primaryAlt  py-1.5 px-3 rounded-md text-sm font-semibold
            shadow-lg transform transition-transform duration-300 hover:scale-105
          "
                        href={`?courseId=${lesson.course.id}`}
                  >
                      {lesson.course.title}
                  </Link>

                  <CardContent className="p-4">
                      <Typography variant="h5" sx={{mb: 1, fontWeight: 500}}>
                          {lesson.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{mb: 2}}>
                          Price: ${lesson.price}
                      </Typography>
                      <BuyButton item={lesson} catId={catId}/>
                  </CardContent>
              </Card>
          </MotionWrapper>
    );
};

export default LessonCard;
