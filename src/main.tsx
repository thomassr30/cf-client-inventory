import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useAuthStore } from "./store/auth.store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme";

const Main = () => {
  const userRole = useAuthStore((state) => state.role);

  const authorizedRouter = router(userRole!);

  return <RouterProvider router={authorizedRouter} />;
};

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  </QueryClientProvider>
);
