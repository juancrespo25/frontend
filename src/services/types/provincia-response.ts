import type { Provincias } from "./provincias";

export interface ProvinciaResponse {
    status: number;
    success: boolean;
    data: {
        provincias: Provincias[];
    };
}