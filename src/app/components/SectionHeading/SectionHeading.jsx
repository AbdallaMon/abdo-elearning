import {Typography, Box} from "@mui/material";

export default function SectionHeading({title, subTitle, center = true}) {
    return (
          <Box
                className={
                      (center ? "text-center" : "") + " flex flex-col items-center mb-16"
                }
          >
              <Typography
                    variant="h6"
                    color="secondary"
                    sx={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        letterSpacing: "0.1em",
                        mb: -1,
                        borderBottom: "3px solid",
                        borderColor: "secondary.main",
                        display: "inline-block",
                        paddingBottom: "0.5rem",
                    }}
              >
                  {subTitle}
              </Typography>
              <Typography
                    variant="h3"
                    className="font-bold text-heading relative"
                    sx={{
                        position: "relative",
                        fontSize: {xs: "2rem", md: "3rem"},
                        fontWeight: "bold",
                    }}
              >
                  {title}

              </Typography>
          </Box>
    );
}
