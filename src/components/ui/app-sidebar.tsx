import { FcHome, FcSearch, FcExport } from "react-icons/fc";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getEnvVar } from "@/utils/env";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: FcHome,
  },
  {
    title: "Seguimiento de envios",
    url: "seguimiento-envios",
    icon: FcSearch,
  },
  {
    title: "Busqueda por filtros",
    url: "busqueda-por-filtros",
    icon: FcSearch,
  },
];

export function AppSidebar() {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("provincias_cache");
    window.location.href = getEnvVar('VITE_URL_WEB');
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mt-4 mb-4 py-8 text-lg font-bold">
            Seguimiento Web
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span className="text-base">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <FcExport />
                  <span className="text-base">Cerrar Sesión</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
