// hooks/useConsultaGuia.ts
import { useState } from "react";
import { toast } from "sonner";
import { obtenerGuia } from "@/services/guia.service";
import type { Guia } from "@/services/types/guia";
import type { Movimiento } from "@/services/types/movimiento";
export const useConsultaGuia = () => {
    const [numeroGuia, setNumeroGuia] = useState("");
    const [guia, setGuia] = useState<Guia | null>(null);
    const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
    const [loading, setLoading] = useState(false);

    const consultarGuia = async () => {
        if (!numeroGuia || Number(numeroGuia) === 0) {
            toast.warning("Ingrese un número de guía válido");
            return;
        }

        try {
            setLoading(true);

            const response = await obtenerGuia(Number(numeroGuia));

            if (!response.success || response.data.guia.length === 0) {
                toast.error("No se encontró la guía");
                setGuia(null);
                setMovimientos([]);
                setNumeroGuia("");
                return;
            }

            setGuia(response.data.guia[0]);
            setMovimientos(response.data.movimientos);
            toast.success("Guía encontrada");
        } catch (error) {
            toast.error("Error al consultar la guía");
            setGuia(null);
            setMovimientos([]);
            setNumeroGuia("");
        } finally {
            setLoading(false);
        }
    };

    return {
        numeroGuia,
        setNumeroGuia,
        guia,
        movimientos,
        loading,
        consultarGuia,
    };
};