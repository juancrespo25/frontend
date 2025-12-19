import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../components/ui/app-sidebar";
import { User } from "lucide-react";

const MainLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full min-h-screen">
        <div className="flex items-center justify-between p-4">
          <SidebarTrigger />
          <header className="flex flex-col items-center gap-2">
            <User />
            <div>Juan Crespo</div>
          </header>
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
