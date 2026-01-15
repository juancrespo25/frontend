import type { Orden } from "./orden";

export interface OrdenResponse {
  status: number;
  success: boolean;
  data: {
    orden: Orden[];
  };
}