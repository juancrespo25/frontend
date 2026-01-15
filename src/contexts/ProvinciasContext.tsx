import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { obtenerProvincias } from '../services/provincias.service';

interface Provincia {
  id_prov: number;
  descripcion_prov: string;
}

interface ProvinciasContextType {
  provincias: Provincia[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const ProvinciasContext = createContext<ProvinciasContextType | undefined>(undefined);

const mapProvincia = (item: any): Provincia => ({
  id_prov: item.id_prov ?? item.province_id ?? item.id,
  descripcion_prov: item.descripcion_prov ?? item.province_name ?? item.nombre,
});

export const ProvinciasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFetched, setIsFetched] = useState(false);

  const fetchProvincias = async () => {
    if (isFetched) {
      console.log("📦 Usando provincias en caché");
      return;
    }
    
    console.log("🔄 Cargando provincias por primera vez...");
    setLoading(true);
    setError(null);
    try {
      const resp = await obtenerProvincias();
      console.log("✅ Respuesta provincias:", resp);
      
      const data: any[] = Array.isArray(resp)
        ? resp
        : Array.isArray((resp as any)?.data)
        ? (resp as any).data
        : [];
      
      const mapped = data.map(mapProvincia);
      console.log("🗺️ Provincias mapeadas:", mapped);
      
      setProvincias(mapped);
      setIsFetched(true);
      
      localStorage.setItem('provincias_cache', JSON.stringify(mapped));
    } catch (e: any) {
      console.error("❌ Error al cargar provincias:", e);
      setError(e?.message ?? "Error al cargar provincias");
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    console.log("🔄 Forzando recarga de provincias...");
    setIsFetched(false);
    localStorage.removeItem('provincias_cache');
    await fetchProvincias();
  };

  useEffect(() => {
    const cached = localStorage.getItem('provincias_cache');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        console.log("📦 Cargando provincias desde localStorage");
        setProvincias(parsed);
        setIsFetched(true);
        return;
      } catch (e) {
        console.warn("⚠️ Error al parsear caché, recargando...");
      }
    }
    
    fetchProvincias();
  }, []);

  return (
    <ProvinciasContext.Provider value={{ provincias, loading, error, refetch }}>
      {children}
    </ProvinciasContext.Provider>
  );
};

export const useProvincias = () => {
  const context = useContext(ProvinciasContext);
  if (!context) {
    throw new Error('useProvincias debe usarse dentro de ProvinciasProvider');
  }
  return context;
};