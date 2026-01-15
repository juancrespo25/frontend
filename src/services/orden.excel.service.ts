import api from "./api";
import type { FiltrosOrden } from "./types/filtros-orden";
import { getEnvVar } from "@/utils/env";

export const downloadOrdenExcel = async (filtros: FiltrosOrden) => {
  const {
    customer_id,
    centro_costo,
    orden,
    estado,
    guia_remision,
    origen,
    destino,
    fecha_inicial,
    fecha_final,
  } = filtros;

  console.log(estado);
  // Formato de fechas para la API (DDMMYY)
  const formatearFecha = (fecha: string | undefined): string => {
    if (!fecha) return "00";
    return fecha;
  };

  const fechaInicialFormato = formatearFecha(fecha_inicial);
  const fechaFinalFormato = formatearFecha(fecha_final);

  const response = await api.get(`${getEnvVar('VITE_URL_REPORT')}/orden/excel/${customer_id}/${centro_costo}/${orden}/${estado}/${guia_remision}/${origen}/${destino}/${fechaInicialFormato}/${fechaFinalFormato}`, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(response.data);
  const a = document.createElement("a");

  a.href = url;
  a.download = "reporte_ordenes.xlsx";
  a.click();

  window.URL.revokeObjectURL(url);
};
