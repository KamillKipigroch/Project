import { createContext, useState, useMemo } from "react";
import { createTheme, ThemeOptions } from "@mui/material/styles";
import { PaletteMode, Theme } from "@mui/material";

// color design tokens export
export const tokens = (mode: PaletteMode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#d0d0d0",
          200: "#a0a0a0",
          300: "#717171",
          400: "#1c1b1b",
          500: "#121212",
          600: "#0e0e0e",
          700: "#0b0b0b",
          800: "#070707",
          900: "#040404",
        },
        green: {
          100: "#dcf0cc",
          200: "#bae09a",
          300: "#97d167",
          400: "#75c135",
          500: "#52b202",
          600: "#428e02",
          700: "#316b01",
          800: "#214701",
          900: "#102400",
        },
        red: {
          100: "#fdd9d7",
          200: "#fbb4af",
          300: "#f88e86",
          400: "#f6695e",
          500: "#f44336",
          600: "#c3362b",
          700: "#922820",
          800: "#621b16",
          900: "#310d0b",
        },
        blue: {
          100: "#d3eafd",
          200: "#a6d5fa",
          300: "#7ac0f8",
          400: "#4dabf5",
          500: "#2196f3",
          600: "#1a78c2",
          700: "#145a92",
          800: "#0d3c61",
          900: "#071e31",
        },
        realized: {
          100: "#214701",
          200: "#325812",
        }
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#040404",
          200: "#070707",
          300: "#0b0b0b",
          400: "#f2f0f0",
          500: "#121212",
          600: "#1c1b1b",
          700: "#717171",
          800: "#a0a0a0",
          900: "#d0d0d0",
        },
        green: {
          100: "#102400",
          200: "#214701",
          300: "#316b01",
          400: "#428e02",
          500: "#52b202",
          600: "#75c135",
          700: "#97d167",
          800: "#bae09a",
          900: "#dcf0cc",
        },
        red: {
          100: "#310d0b",
          200: "#621b16",
          300: "#922820",
          400: "#c3362b",
          500: "#f44336",
          600: "#f6695e",
          700: "#f88e86",
          800: "#fbb4af",
          900: "#fdd9d7",
        },
        blue: {
          100: "#071e31",
          200: "#0d3c61",
          300: "#145a92",
          400: "#1a78c2",
          500: "#2196f3",
          600: "#4dabf5",
          700: "#7ac0f8",
          800: "#a6d5fa",
          900: "#d3eafd",
        },
        realized: {
          100: "#dcf2bc",
          200: "#D6ECB6",
        }
      }),
});

// mui theme settings
export const themeSettings = (mode: PaletteMode): ThemeOptions | undefined => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[100],
            },
            success: {
              main: colors.green[500],
              contrastText: colors.grey[100],
            },
            error: {
              main: colors.red[600],
              contrastText: colors.grey[100],
            },
            secondary: {
              main: colors.blue[500],
              contrastText: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            success: {
              main: colors.green[500],
              contrastText: colors.grey[100],
            },
            error: {
              main: colors.red[600],
              contrastText: colors.grey[100],
            },
            secondary: {
              main: colors.blue[500],
              contrastText: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
  };
};

type IUseMemo = [Theme, { toggleColorMode: () => void }];

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState<PaletteMode>("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev: PaletteMode) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode] as IUseMemo;
};
