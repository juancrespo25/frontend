// Mapeo de estados a imágenes
export const estadoIconos: Record<string, string> = {
  PENDIENTE: "📦",
  IMAGEN_1: "📄",
  ENTREGADO: "✓",
  MOTIVADO: "⚠️",
  EN_TRANSITO: "🚚",
};

// Si prefieres usar imágenes reales, usa rutas:
export const estadoImagenes: Record<string, string> = {
  RECOGIDO: "/images/Pendiente.png",
  IMAGEN_1: "/images/Imagen.png",
  IMAGEN_2: "/images/Imagen.png",
  ENTREGADO: "/images/Entregado.png",
  MOTIVADO: "/images/motivado.png",
  EN_RUTA: "/EnRuta.png",
  EN_TRANSITO: "/images/EnRuta.png",
  DEVUELTO_AL_CLIENTE: "/images/devuelto_al_cliente.png",
  ENVIADO_A_PROVINCIA: "/images/EnRuta.png",
};

// Colores por estado - tipos de Tailwind CSS
export const estadoColores: Record<string, string> = {
  PENDIENTE: "bg-yellow-100 border-yellow-300",
  DIGITALIZADO: "bg-blue-100 border-blue-300",
  ENTREGADO: "bg-green-100 border-green-300",
  MOTIVADO: "bg-orange-100 border-orange-300",
  EN_TRANSITO: "bg-blue-100 border-blue-300",
  ENVIADO_A_PROVINCIA: "bg-blue-100 border-blue-300",
} as const;

export const getEstadoIcono = (estado: string): string => {
  return estadoIconos[estado] || "📦";
};

export const getEstadoImagen = (estado: string): string => {
  return estadoImagenes[estado] || "/images/default.svg";
};

export const getEstadoColor = (estado: string): string => {
  return estadoColores[estado] || "bg-gray-100 border-gray-300";
};
