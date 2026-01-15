import { useState, useCallback } from "react";
import { obtenerOrden } from "../services/orden.service";
import type { FiltrosOrden } from "../services/types/filtros-orden";

interface OrdenData {
  [key: string]: any;
}

export const useOrdenes = () => {
  const [ordenes, setOrdenes] = useState<OrdenData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buscar = useCallback(async (filtros: FiltrosOrden) => {
    setLoading(true);
    setError(null);
    try {
      const resp = await obtenerOrden(filtros);
      setOrdenes(resp);
    } catch (e: any) {
      setError(e?.message ?? "Error al buscar");
      setOrdenes(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { ordenes, loading, error, buscar };
};
