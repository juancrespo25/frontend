export const updateStatus = (estado: string): string => {
  const mapeoEstados: Record<string, string> = {
    'ENTREGA EFECTIVA': 'ENTREGADO',
    MOTIVADO: 'MOTIVADO',
    'MOTIVADO CONFIRMADO': 'MOTIVADO',
    PENDIENTE: 'RECOGIDO',
    'ENTREGA CONFIRMADA': 'ENTREGADO',
    'EN RUTA': 'EN_TRANSITO',
    DIGITAILIZADO: 'IMAGEN_1',
    'DEVOLUCION A CLIENTE': 'DEVUELTO_AL_CLIENTE',
    'DESPACHADO': 'ENVIADO_A_PROVINCIA',
    'DIGITAILIZADO SEGUNDA IMAGEN': 'IMAGEN_2'

    // Agrega aquí otros mapeos si existen
    // "OTRO_ESTADO": "ESTADO_MOSTRADO",
  };
  return mapeoEstados[estado] || estado;
};
