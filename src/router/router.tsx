import { Navigate, createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { Root } from "../Root";
import { AuthLayout } from "@/layouts/AuthLayout";
import { hasAccess } from "@/utils/authorization";
import { lazy } from "react";
import { ScannerQrView } from "@/views/scanner";

const DashboardView = lazy(() =>
  import("@/views/dashboard").then((module) => ({
    default: module.DashboardView,
  }))
);
const UsersView = lazy(() =>
  import("@/views/users").then((module) => ({ default: module.UsersView }))
);

const LocationView = lazy(() => import("@/views/locations").then((module) => ({default: module.LocationView})));

const SectionView = lazy(() => import("@/views/sections").then((module) => ({default: module.SectionView})));

const ItemView = lazy(() => import("@/views/items").then((module) => ({default: module.ItemView})))

//const ScannerQrView = lazy(() => import("@/views/scanner").then((module) => ({default: module.ScannerQrView})))

const ScannerListView = lazy(() => import("@/views/scannerList").then((module) => ({default: module.ScannerListView})))

const LoginView = lazy(() =>
  import("@/views/auth/login").then((module) => ({
    default: module.LoginView,
  }))
);
const RegisterView = lazy(() =>
  import("@/views/auth/register").then((module) => ({
    default: module.RegisterView,
  }))
);

export const router = (userRole: string) =>
  createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "dashboard",
          element: <AppLayout />,
          children: [
            {
              path: "inicio",
              element: <DashboardView />,
            },
            {
              path: "voluntarios",
              element: hasAccess(userRole, [
                "ADMIN",
              ]) ? (
                <UsersView />
              ) : (
                <Navigate to="/dashboard/inicio" />
              ),
            },
            {
              path: "locacion",
              element: hasAccess(userRole, [
                "ADMIN", "OFICIAL",
              ]) ? (
                <LocationView />
              ) : (
                <Navigate to="/dashboard/inicio" />
              ),
            },
            {
              path: "secciones",
              element: hasAccess(userRole, [
                "ADMIN", "OFICIAL",
              ]) ? (
                <SectionView />
              ) : (
                <Navigate to="/dashboard/inicio" />
              ),
            },
            {
              path: "items",
              element: hasAccess(userRole, [
                "ADMIN",
              ]) ? (
                <ItemView />
              ) : (
                <Navigate to="/dashboard/inicio" />
              ),
            },
            {
              path: "*",
              element: <Navigate to="/dashboard/inicio" />,
            },
          ],
        },
        {
          path: "auth",
          element: <AuthLayout />,
          children: [
            {
              path: "login",
              element: <LoginView />,
            },
            {
              path: "register",
              element: <RegisterView />,
            },
          ],
        },
        {
          path: 'lector-qr',
          element: <ScannerQrView />
        },
        {
          path: "seccion/:id",
          element: <ScannerListView />
        }
      ],
    },
  ]);
