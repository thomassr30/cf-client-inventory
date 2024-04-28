import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar/Sidebar";
import { Navbar } from "./navbar/Navbar";
import { Suspense, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useAuthStore } from "@/store/auth.store";
import { Loading } from "@/shared/components/loading/Loading";

export const AppLayout = () => {
  const authStatus = useAuthStore((state) => state.status);
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);
  const [openSidebar, setopenSidebar] = useState(true);
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const [isOpen, setIsOpen] = useState<boolean>(isTab ? false : true);

  useEffect(() => {
    if (isTab) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isTab]);

  useEffect(() => {
    setopenSidebar(isOpen);
  }, [isOpen]);

  if (authStatus === "pending") {
    checkAuthStatus();
    return <div>Loading...</div>;
  }

  if (authStatus === "unauthorized") {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="flex">
      <div
        className={`w-${openSidebar ? "64" : "16"} h-screen left-0 top-0 w-`}>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div className="w-full h-screen ml-auto overflow-y-auto">
        <Navbar isTab={isTab} setIsOpen={setIsOpen} isOpen={isOpen} />
        <main className="m-10">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};
