"use client";
import {CacheProvider} from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {colors} from "@/app/constants";

export const theme = createTheme({
    direction: "rtl", // Set the direction to RTL
    typography: {
        fontFamily: ["Cairo", "sans-serif"].join(","),
    },
    palette: {
        primary: {
            main: colors.primary,
            contrastText: "#ffffff", // Set the text color for primary background to white
        },
        white: {
            main: "#ffffff",
            contrastText: "#000000", // Set the text color for primary background to white

        },
        secondary: {
            main: colors.secondary,
            contrastText: "#ffffff", // Set the text color for secondary background to white
        },
        background: {
            default: colors.bgPrimary,
            paper: colors.bgSecondary,
        },
        text: {
            primary: colors.heading,
            secondary: colors.body,
        },
        tertiary: {
            main: colors.tertiary,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    fontFamily: "inherit",
                    backgroundColor: colors.bgPrimary,
                    color: colors.body,
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
                  <CssBaseline/>
                  {props.children}
              </ThemeProvider>
          </CacheProvider>
    );
}
