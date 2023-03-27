import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// color design tokens
export const tokens = (mode) => ({
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
        100: "#d0d1d5",
        200: "#a1a4ab",
        300: "#727681",
        400: "#1F2A40",
        500: "#141b2d",
        600: "#101624",
        700: "#0c101b",
        800: "#080b12",
        900: "#040509",
      },
      green: {
        100: '#c8e6c9',
        200: '#a5d6a7',
        300: '#81c784',
        400: '#66bb6a',
        500: '#4caf50',
        600: '#43a047',
        700: '#388e3c',
        800: '#2e7d32',
        900: '#1b5e20',
      },
      greenAccent: {
        100: "#dbf5ee",
        200: "#b7ebde",
        300: "#94e2cd",
        400: "#70d8bd",
        500: "#4cceac",
        600: "#3da58a",
        700: "#2e7c67",
        800: "#1e5245",
        900: "#0f2922",
      },
      orange: {
        100: '#ffccbc',
        200: '#ffab91',
        300: '#ff8a65',
        400: '#ff7043',
        500: '#ff5722',
        600: '#f4511e',
        700: '#e64a19',
        800: '#d84315',
        900: '#bf360c',
      },
      red: {
        100: '#ffcdd2',
        200: '#ef9a9a',
        300: '#e57373',
        400: '#ef5350',
        500: '#f44336',
        600: '#e53935',
        700: '#d32f2f',
        800: '#c62828',
        900: '#b71c1c',
      },
      redAccent: {
        100: "#f8dcdb",
        200: "#f1b9b7",
        300: "#e99592",
        400: "#e2726e",
        500: "#db4f4a",
        600: "#af3f3b",
        700: "#832f2c",
        800: "#58201e",
        900: "#2c100f",
      },
      blue: {
        100: '#bbdefb',
        200: '#90caf9',
        300: '#64b5f6',
        400: '#42a5f5',
        500: '#2196f3',
        600: '#1e88e5',
        700: '#1976d2',
        800: '#1565c0',
        900: '#0d47a1',
      },
      blueAccent: {
        100: "#e1e2fe",
        200: "#c3c6fd",
        300: "#a4a9fc",
        400: "#868dfb",
        500: "#6870fa",
        600: "#535ac8",
        700: "#3e4396",
        800: "#2a2d64",
        900: "#151632",
      },
      sidebar: {
        sidebar: {
          backgroundColor: '#0b2948',
          color: '#8ba1b7',
        },
        menu: {
          menuContent: '#082440',
          icon: '#59d0ff',
          hover: {
            backgroundColor: '#00458b',
            color: '#b6c8d9',
          },
          active: {
            color: '#59d0ff',
          },
          disabled: {
            color: '#3e5e7e',
          },
        },
      },
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
        100: "#040509",
        200: "#080b12",
        300: "#0c101b",
        400: "#101624", // manually changed
        500: "#141b2d",
        600: "#1F2A40",
        700: "#727681",
        800: "#a1a4ab",
        900: "#d0d1d5",
      },
      green: {
        100: '#1b5e20',
        200: '#2e7d32',
        300: '#388e3c',
        400: '#43a047',
        500: '#4caf50',
        600: '#66bb6a',
        700: '#81c784',
        800: '#a5d6a7',
        900: '#c8e6c9',
      },
      greenAccent: {
        100: "#0f2922",
        200: "#1e5245",
        300: "#2e7c67",
        400: "#3da58a",
        500: "#4cceac",
        600: "#70d8bd",
        700: "#94e2cd",
        800: "#b7ebde",
        900: "#dbf5ee",
      },
      orange: {
        100: '#bf360c',
        200: '#d84315',
        300: '#e64a19',
        400: '#f4511e',
        500: '#ff5722',
        600: '#ff7043',
        700: '#ff8a65',
        800: '#ffab91',
        900: '#ffccbc',
      },
      red: {
        100: '#b71c1c',
        200: '#c62828',
        300: '#d32f2f',
        400: '#e53935',
        500: '#f44336',
        600: '#ef5350',
        700: '#e57373',
        800: '#ef9a9a',
        900: '#ffcdd2',
      },
      redAccent: {
        100: "#2c100f",
        200: "#58201e",
        300: "#832f2c",
        400: "#af3f3b",
        500: "#db4f4a",
        600: "#e2726e",
        700: "#e99592",
        800: "#f1b9b7",
        900: "#f8dcdb",
      },
      blue: {
        100: '#0d47a1',
        200: '#1565c0',
        300: '#1976d2',
        400: '#1e88e5',
        500: '#2196f3',
        600: '#42a5f5',
        700: '#64b5f6',
        800: '#90caf9',
        900: '#bbdefb',
      },
      blueAccent: {
        100: "#151632",
        200: "#2a2d64",
        300: "#3e4396",
        400: "#535ac8",
        500: "#6870fa",
        600: "#868dfb",
        700: "#a4a9fc",
        800: "#c3c6fd",
        900: "#e1e2fe",
      },
      sidebar: {
        sidebar: {
          backgroundColor: '#ececec',
          color: '#607489',
        },
        menu: {
          menuContent: '#fbfcfd',
          icon: '#0098e5',
          hover: {
            backgroundColor: '#c5e4ff',
            color: '#44596e',
          },
          active: {
            color: '#0098e5',
          },
          disabled: {
            color: '#9fb6cf',
          },
        },
      },
    }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          /*
           * palette values for light mode
           * Example
           * primary: { main: #aaabbb },
           * secondary: { main: #bababa },
           */
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[100],
          },
          background: {
            default: colors.primary[500],
          },
        }
        : {
          /*
           * palette values for light mode
           * Example
           * primary: { main: #aaabbb },
           * secondary: { main: #bababa },
           */
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[100],
          },
          background: {
            default: "#fcfcfc",
          },
        }),
    },
    typography: {
      fontFamily: ["Noto Sans Korean", "sans-serif"].join(","),
      fontSize: 12,
      allVariants: { color: colors.grey[100] },
      h1: {
        fontFamily: ["Noto Sans Korean", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Noto Sans Korean", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Noto Sans Korean", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Noto Sans Korean", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Noto Sans Korean", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Noto Sans Korean", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {}
});

export const useMode = () => {
  const isOSDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = useState(isOSDarkMode ? 'dark' : 'light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light"))
    }), []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
}