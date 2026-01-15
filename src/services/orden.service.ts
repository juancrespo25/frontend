import api from "./api";
import type { OrdenResponse } from "./types/orden-response";
import type { FiltrosOrden } from "./types/filtros-orden";

export const obtenerOrden = async (filtros: FiltrosOrden) => {
  const token = localStorage.getItem("authToken");
  const { customer_id, centro_costo, orden, estado, guia_remision, origen, destino, fecha_inicial, fecha_final } = filtros;

  console.log(estado)
  // Formato de fechas para la API (DDMMYY)
  const formatearFecha = (fecha: string | undefined): string => {
    if (!fecha) return "00";
    return fecha;
  };

  const fechaInicialFormato = formatearFecha(fecha_inicial);
  const fechaFinalFormato = formatearFecha(fecha_final);

  const response = await api.get<OrdenResponse>(
    `/reports/orden/${customer_id}/${centro_costo}/${orden}/${estado}/${guia_remision}/${origen}/${destino}/${fechaInicialFormato}/${fechaFinalFormato}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response.data)
  return response.data;
};
