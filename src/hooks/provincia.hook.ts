import { useEffect, useState } from "react";
import { obtenerProvincias } from "../services/provincias.service";
import type { Provincias } from "../services/types/provincias";

const mapProvincia = (item: any): Provincias => ({
  id_prov: item.id_prov ?? item.province_id ?? item.id,
  descripcion_prov: item.descripcion_prov ?? item.province_name ?? item.nombre,
});

export const useProvincias = () => {
  const [provincias, setProvincias] = useState<Provincias[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProvincias = async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await obtenerProvincias();
      
      const data: any[] = Array.isArray(resp)
        ? resp
        : Array.isArray((resp as any)?.data)
        ? (resp as any).data
        : [];
      
      
      const mapped = data.map(mapProvincia);
      
      setProvincias(mapped);
    } catch (e: any) {
      setError(e?.message ?? "Error al cargar provincias");
      setProvincias([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProvincias();
  }, []);

  return { provincias, loading, error, fetchProvincias };
};