import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import React, { createContext, useContext } from "react";
import SeguimientoEnvios from "./pages/SeguimientoEnvios";
import MainLayout from "./pages/layout";
import BusquedaPorFiltros from "./pages/BusquedaPorFiltros";
import LoginPage from "./pages/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useToken } from "./hooks/use-token";
import { ProvinciasProvider } from "./contexts/ProvinciasContext";

const queryClient = new QueryClient();

interface DecodedToken {
  first_name: string;
  last_name: string;
  company_id: number;
  company_description: string;
  ccosto_id: number;
  iat: number;
  exp: number;
}

interface AuthContextType {
  token: string | null;
  decodedToken: DecodedToken | null;
  error: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Componente que proporciona el contexto de autenticación
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { token, decodedToken, error, isLoading } = useToken();

  return (
    <AuthContext.Provider value={{ token, decodedToken, error, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto en cualquier componente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ProvinciasProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                element={<MainLayout />}
              >
                <Route index path="/" element={<ProtectedRoute><div>Home Page</div></ProtectedRoute>} />
                <Route path="/home" element={<div>Home Page</div>} />
                <Route path="/seguimiento-envios" element={<ProtectedRoute><SeguimientoEnvios /></ProtectedRoute>} />
                <Route path="/busqueda-por-filtros" element={<ProtectedRoute><BusquedaPorFiltros /></ProtectedRoute>} />
              </Route>
            </Routes>
          </ProvinciasProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

