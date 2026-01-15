export interface Orden {
    guia: number;
    orden: number;
    item: number;
    idcliente: number;
    descripcion: string;
    id_ccosto: number;
    ccosto: string;
    id_origen: string;
    id_destino: string;
    origen: string;
    destino: string;
    destinatario: string;
    fecha: Date;
    estado: string;
    imagen: string;
    digitalizado: string;
    path: string;
    guiaremision: string;
}