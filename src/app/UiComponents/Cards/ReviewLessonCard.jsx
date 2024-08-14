import React from 'react';
import {Card, CardContent, Typography, Button, CardMedia} from '@mui/material';
import {MotionWrapper} from "@/app/components/AnimationsWrapper/CardAnimation";
import Link from "next/link";
import BuyButton from "@/app/UiComponents/Buttons/BuyButton";

const ReviewCard = ({review, catId}) => {
    return (
          <MotionWrapper>
              <Card sx={{position: 'relative', background: 'white', overflow: 'hidden', borderRadius: 2, boxShadow: 3}}>
                  <CardMedia
                        component="img"
                        image={review.image}
                        alt={review.title}
                        sx={{height: '250px', objectFit: 'cover'}}
                  />
                  <Link
                        className="
                        absolute top-4 left-4 bg-tertiary text-primaryAlt py-1.5 px-3 rounded-md text-sm font-semibold
                        shadow-lg transform transition-transform duration-300 hover:scale-105
                    "
                        href={`?courseId=${review.course.id}`}
                  >
                      {review.course.title}
                  </Link>

                  <CardContent className="p-4">
                      <Typography variant="h5" sx={{mb: 1, fontWeight: 500}}>
                          {review.title}
                      </Typography>
                      <Typography variant="body2" sx={{mb: 2, color: 'textSecondary'}}>
                          {review.description}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{mb: 2}}>
                          Price: ${review.price}
                      </Typography>
                      <BuyButton item={review} catId={catId}/>
                  </CardContent>
              </Card>
          </MotionWrapper>
    );
};

export default ReviewCard;
