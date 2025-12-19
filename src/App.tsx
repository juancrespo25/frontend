import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import SeguimientoEnvios from "./pages/SeguimientoEnvios";
import MainLayout from "./pages/layout";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index path="/" element={<div>Home Page</div>} />
            <Route path="/seguimiento-envios" element={<SeguimientoEnvios />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

