"use client";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
    direction: "rtl", // Set the direction to RTL
    typography: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
    },
    palette: {
        primary: {
            main: "#1AB69D", // Your primary color
            contrastText: "#ffffff", // Set the text color for primary background to white

        },
        secondary: {
            main: "#EE4A62", // Your secondary color
            contrastText: "#ffffff", // Set the text color for secondary background to white

        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    fontFamily: "inherit",
                },
            },
        },
    },
});
// Create rtl cache
const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
});

export function Rtl(props) {
    return (
          <CacheProvider value={cacheRtl}>
              <ThemeProvider theme={theme}>
                  <CssBaseline />
                  {props.children}
              </ThemeProvider>
          </CacheProvider>
    );
}
