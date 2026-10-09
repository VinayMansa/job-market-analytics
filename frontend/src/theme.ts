import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: "#0F6E56", dark: "#0A3D31", contrastText: "#FFFFFF" },
    secondary: { main: "#BA7517" },
    text: { primary: "#0F1A17", secondary: "#5B6B66" },
    background: { default: "#F6F8F7" },
  },
  typography: {
    fontFamily: '"Montserrat", system-ui, sans-serif',
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 999, padding: "8px 22px" },
        sizeLarge: { padding: "12px 30px", fontSize: "1rem" },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500 },
      },
    },
  },
});