import api from "./api";
import type { ProvinciaResponse } from "./types/provincia-response";

export const obtenerProvincias = async () => {
    const token = localStorage.getItem("authToken");
    const response = await api.get<ProvinciaResponse>(`/province`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}