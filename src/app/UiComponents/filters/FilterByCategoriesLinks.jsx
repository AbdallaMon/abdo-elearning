import {Box, Grid} from "@mui/material";
import {colors, stages} from "@/app/constants";
import Link from "next/link";
import React from "react";

export default function FilterByCategoriesAsLinks({isReview, id}) {
    return (
          <Box className="container mx-auto mb-8">
              <Grid container spacing={2} justifyContent="center">
                  {stages.map((stage) => (
                        <Grid item key={stage.id}>
                            <Link href={`/${isReview ? "reviews" : "lessons"}/${stage.id}/${stage.title}`} style={{
                                padding: '8px 16px',
                                borderRadius: '4px',
                                backgroundColor: stage.id === parseInt(id) ? colors.tertiary : colors.secondary,
                                color: 'white',
                                textAlign: 'center',
                                fontWeight: stage.id === parseInt(id) ? 'bold' : 'normal',
                                textDecoration: 'none',
                                display: 'flex',
                            }}>
                                {stage.title}
                            </Link>
                        </Grid>
                  ))}
              </Grid>
          </Box>
    )
}