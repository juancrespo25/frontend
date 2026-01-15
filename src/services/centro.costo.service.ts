import api from "./api";
import type { CentroCostoResponse } from "./types/centro.costo.response";

export const obtenerCentrosCosto = async (customerId: number) => {
    const token = localStorage.getItem("authToken");
    const response = await api.get<CentroCostoResponse[]>(`/customer/costcenter/${customerId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}