import { Loading } from "@/shared/components/loading/Loading";
import { useAuthStore } from "@/store/auth.store";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import bgZapadores from "@/assets/zapadores.webp";

export const AuthLayout = () => {
  const authStatus = useAuthStore((state) => state.status);
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  if (authStatus === "pending") {
    checkAuthStatus();
    return <div>Loading...</div>;
  }

  if (authStatus === "authorized") {
    return <Navigate to="/dashboard/inicio" />;
  }

  return (
    <div className="h-screen flex">
      <div
        className="hidden lg:flex w-full lg:w-1/2 login_img_section
          justify-around items-center"
      >
        <img src={bgZapadores} className="w-1/2 h-auto" />
      </div>
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};
