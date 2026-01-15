import { useState, useCallback } from "react";
import { downloadOrdenExcel } from "../services/orden.excel.service";
import type { FiltrosOrden } from "../services/types/filtros-orden";

export const useOrdenExcel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportar = useCallback(async (filtros: FiltrosOrden) => {
    setLoading(true);
    setError(null);
    try {
      await downloadOrdenExcel(filtros);
    } catch (e: any) {
      setError(e?.message ?? "Error al exportar");
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, exportar };
};
