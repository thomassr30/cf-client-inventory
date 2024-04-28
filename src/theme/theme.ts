import { createTheme } from "@mui/material";

const customColors = {
  darkBlue: "#1D4ED8", // Azul oscuro
  mediumBlue: "#3B82F6", // Azul medio
  lightBlue: "#93C5FD", // Azul claro
  extraLightBlue: "#DBEAFE", // Azul muy claro
};

export const theme = createTheme({
  palette: {
    primary: {
      main: "#34D399", // Azul primario
      dark: customColors.mediumBlue,
    },
    secondary: {
      main: "#047857", // Azul claro
    },
    success: {
      main: "#4CAF50", // Verde para indicar éxito
    },
    error: {
      main: "#FF5722", // Rojo para indicar error
    },
    info: {
      main: "#2196F3", // Azul para información general
    },
    warning: {
      main: "#FFC107", // Amarillo para advertencias
    },
  },
});
