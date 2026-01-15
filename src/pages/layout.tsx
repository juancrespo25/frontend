import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../components/ui/app-sidebar";
import { User } from "lucide-react";
import logo from "../assets/logo-jessval.png";
import { useAuth } from "../App";

const MainLayout = () => {
  const { decodedToken } = useAuth();

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full min-h-screen">
        <div className="flex items-center justify-between p-4">
          <img
            src={logo}
            alt="Logo"
            width={257}
            height={87}
          />
          <header className="flex flex-col items-center gap-1">
            <User />
            <div>
              {decodedToken?.first_name && decodedToken?.last_name
                ? `${decodedToken.first_name} ${decodedToken.last_name}`
                : "Usuario"}
            </div>
            <div className="text-sm text-gray-600">
              {decodedToken?.company_description || ""}
            </div>
          </header>
        </div>

        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
