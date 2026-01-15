import { useState, useEffect } from "react";
import type { CentroCosto } from "../services/types/centro.costo";
import { obtenerCentrosCosto } from "../services/centro.costo.service";

export const useCentrosCosto = (customerId?: number) => {
  const [centrosCosto, setCentrosCosto] = useState<CentroCosto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCentrosCosto = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await obtenerCentrosCosto(id);
      
      const dataArray =
        Array.isArray(response)
          ? response
          : Array.isArray((response as any)?.data)
          ? (response as any).data
          : [];

      if (!dataArray.length) {
        setCentrosCosto([]);
        return;
      }

      const mappedCentrosCosto: CentroCosto[] = dataArray.map((item: any) => ({
        id_ccosto: item.id_ccosto ?? item.cost_center_id,
        descripcion_ccosto: item.descripcion_ccosto ?? item.cost_center_name,
      }));

      setCentrosCosto(mappedCentrosCosto);
    } catch (err: any) {
      setError(err?.message ?? "Error al cargar centros de costo");
      setCentrosCosto([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (customerId !== undefined) {
      fetchCentrosCosto(customerId);
    }
  }, [customerId]);

  return { centrosCosto, loading, error, fetchCentrosCosto };
};