import type { Guia} from "./guia";
import type { Movimiento } from "./movimiento";

export interface GuiaResponse {
  status: number;
  success: boolean;
  data: {
    guia: Guia[];
    movimientos: Movimiento[];
  };
}