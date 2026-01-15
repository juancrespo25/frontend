import type { CentroCosto } from "./centro.costo";

export interface CentroCostoResponse {
    status: number;
    success: boolean;
    data: {
        [x: string]: any;
        centrosCosto: CentroCosto[];
    };
}