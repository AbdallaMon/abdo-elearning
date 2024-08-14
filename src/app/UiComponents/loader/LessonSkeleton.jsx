import React from 'react';
import {Grid, Card, CardContent, Skeleton} from '@mui/material';

const LessonCardSkeleton = () => {
    return (
          <Grid container spacing={4}>
              {[...Array(6)].map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{background: 'white', borderRadius: 2, boxShadow: 3}}>
                            <Skeleton variant="rectangular" height={200}/>
                            <CardContent>
                                <Skeleton variant="text" sx={{fontSize: '1.5rem', mb: 1}}/>
                                <Skeleton variant="text" sx={{fontSize: '1rem', mb: 2}}/>
                                <Skeleton variant="rectangular" height={40}/>
                            </CardContent>
                        </Card>
                    </Grid>
              ))}
          </Grid>
    );
};

export default LessonCardSkeleton;
