import type { GuiaResponse } from "./types/guia-response";
import api from "./api";

export const obtenerGuia = async (numeroGuia: number) => {
  const token = localStorage.getItem("authToken");
  const response = await api.get<GuiaResponse>(`/reports/guia/${numeroGuia}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
