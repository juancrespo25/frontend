import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState, useRef, useEffect } from "react";

import { Toaster } from "sonner";
import { useConsultaGuia } from "@/hooks/guia.hook";
import { getEstadoImagen, getEstadoColor } from "@/utils/estadoIconos";
import { updateStatus } from "@/lib/updateStatus";

const SeguimientoEnvios = () => {
  const [imagenesMovimiento, setImagenesMovimiento] = useState<{ path?: string; path2?: string } | null>(null);
  const inputGuiaRef = useRef<HTMLInputElement>(null);

  const {
    numeroGuia,
    setNumeroGuia,
    guia,
    movimientos,
    loading,
    consultarGuia,
  } = useConsultaGuia();

  useEffect(() => {
    if (inputGuiaRef.current) {
      inputGuiaRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      consultarGuia();
    }
  };

  const movimientosUnicos = movimientos.filter((mov, index, self) =>
    index === self.findIndex((m) => updateStatus(m.descripcion_movguia) === updateStatus(mov.descripcion_movguia))
  );

  return (
    <div className="p-4">
      <Toaster richColors />
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="scroll-m-10 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
              Seguimiento de Envíos
            </h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex-row mt-4 items-center justify-items-center">
            <label
              htmlFor="guia"
              className="font-semibold text-lg whitespace-nowrap mr-4 "
            >
              Numero de orden + correlativo:
            </label>
            <Input
              ref={inputGuiaRef}
              id="guia"
              type="text"
              value={numeroGuia}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setNumeroGuia(value);
                }
              }}
              onKeyDown={handleKeyDown}
              disabled={loading}
              className="w-64 mr-10 h-8 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div className="flex grid-cols-4 gap-2 mt-6 items-end">
            <div>
              <label
                htmlFor="destinatario"
                className="font-semibold text-base whitespace-nowrap mr-4"
              >
                Destinatario:
              </label>
              <Input
                id="destinatario"
                type="text"
                value={guia?.destinatario || ""}
                readOnly
                className="w-64 mr-10 h-7"
              />
            </div>
            <div>
              <label
                htmlFor="origen"
                className="font-semibold text-base whitespace-nowrap mr-4"
              >
                Origen:
              </label>
              <Input
                id="origen"
                type="text"
                value={guia?.origen || ""}
                readOnly
                className="w-64 mr-10 h-7"
              />
            </div>
            <div>
              <label
                htmlFor="destino"
                className="font-semibold text-base whitespace-nowrap mr-4"
              >
                Destino:
              </label>
              <Input
                id="destino"
                type="text"
                value={guia?.destino || ""}
                readOnly
                className="w-64 mr-10 h-7"
              />
            </div>
          </div>
          <div className="flex grid-cols-4 gap-2 mt-2 items-end">
            <div className="col-span-2">
              <label
                htmlFor="direccion"
                className="font-semibold text-base whitespace-nowrap mr-9 "
              >
                Direccion:
              </label>
              <Input
                id="direccion"
                type="text"
                value={guia?.direccion || ""}
                readOnly
                className="w-156 mr-10 h-7"
              />
            </div>
            <div>
              <label
                htmlFor="unidades"
                className="font-semibold text-base whitespace-nowrap mr-2"
              >
                Unidades:
              </label>
              <Input
                id="unidades"
                type="text"
                value={guia?.totunidades || ""}
                readOnly
                className="w-64 mr-10 h-7"
              />
            </div>
          </div>
          <div className="flex grid-cols-4 gap-2 mt-2 items-end">
            <div className="col-span-2">
              <label
                htmlFor="observacion"
                className="font-semibold text-base whitespace-nowrap mr-4"
              >
                Observacion:
              </label>
              <Input
                id="observacion"
                type="text"
                value={guia?.glosa || ""}
                readOnly
                className="w-155 mr-11 h-7"
              />
            </div>
            <div>
              {guia && (
                <div >
                  <div className="flex items-center gap-4">
                    <div>
                      <label className="font-semibold text-base whitespace-nowrap mr-1 ml-5"
                      >Estado: </label>
                      <label className={`text-sm  font-bold ${guia.estado === "ENTREGADO" ? "text-blue-600" :
                        guia.estado === "PENDIENTE" ? "text-black" :
                          guia.estado === "MOTIVADO" ? "text-red-600" : ""
                        }`}>{guia.estado}</label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div id="line" className="mt-4 border-t border-gray-300"></div>
          {guia?.estado === "ENTREGADO" && (
            <div className="mt-5">
              <div className="flex grid-cols-4 gap-2 mt-2 items-end">
                <label
                  className="font-medium whitespace-nowrap mr-9"
                >
                  Datos de Entrega
                </label>
              </div>
              <div className="flex grid-cols-4 gap-2 mt-6 items-end">
                <div>
                  <label
                    htmlFor="recibido"
                    className="font-semibold text-base whitespace-nowrap mr-4"
                  >
                    Recibido:
                  </label>
                  <Input
                    id="recibido"
                    type="text"
                    value={guia?.recibido || ""}
                    readOnly
                    className="w-64 mr-10 h-7"
                  />
                </div>
                <div>
                  <label
                    htmlFor="parentesco"
                    className="font-semibold text-base whitespace-nowrap mr-4"
                  >
                    Parentesco:
                  </label>
                  <Input
                    id="parentesco"
                    type="text"
                    value={guia?.parentesco || ""}
                    readOnly
                    className="w-64 mr-10 h-7"
                  />
                </div>
                <div>
                  <label
                    htmlFor="documento"
                    className="font-semibold text-base whitespace-nowrap mr-4"
                  >
                    Documento:
                  </label>
                  <Input
                    id="documento"
                    type="text"
                    value={guia?.documento || ""}
                    readOnly
                    className="w-64 mr-10 h-7"
                  />
                </div>
              </div>
            </div>
          )}
          {guia?.estado === "MOTIVADO" && (
            <div className="mt-5">
              <div className="flex grid-cols-4 gap-2 mt-2 items-end">
                <label
                  className="font-medium whitespace-nowrap mr-9"
                >
                  Datos de Motivado
                </label>
              </div>
              <div className="flex grid-cols-4 gap-2 mt-6 items-end">
                <div>
                  <label
                    htmlFor="recibido"
                    className="font-semibold text-base whitespace-nowrap mr-4"
                  >
                    Motivo:
                  </label>
                  <Input
                    id="recibido"
                    type="text"
                    value={guia?.recibido || ""}
                    readOnly
                    className="w-64 mr-10 h-7"
                  />
                </div>
                <div>
                  <label
                    htmlFor="parentesco"
                    className="font-semibold text-base whitespace-nowrap mr-4"
                  >
                    Parentesco:
                  </label>
                  <Input
                    id="parentesco"
                    type="text"
                    value={guia?.parentesco || ""}
                    readOnly
                    className="w-64 mr-10 h-7"
                  />
                </div>
                <div>
                  <label
                    htmlFor="documento"
                    className="font-semibold text-base whitespace-nowrap mr-4"
                  >
                    Documento:
                  </label>
                  <Input
                    id="documento"
                    type="text"
                    value={guia?.documento || ""}
                    readOnly
                    className="w-64 mr-10 h-7"
                  />
                </div>
              </div>
            </div>
          )}
          <div className="mt-5">
            <div className="flex grid-cols-4 gap-2 mt-2 items-end">
              <label
                className="font-medium whitespace-nowrap mr-9"
              >
                Movimientos
              </label>
            </div>
            <div className="mt-6">
              <ul className="flex flex-wrap gap-4 overflow-x-auto pb-2">
                {movimientosUnicos.map((mov, index) => {
                  const imagenEstado = getEstadoImagen(updateStatus(mov.descripcion_movguia));
                  const imagenPermitida = updateStatus(mov.descripcion_movguia);
                  const esClickeable = imagenPermitida === 'IMAGEN_1' || imagenPermitida === 'IMAGEN_2';

                  return (
                    <li key={index} className={`shrink-0 p-1 rounded border ${getEstadoColor(updateStatus(mov.descripcion_movguia))} flex flex-col items-center justify-center min-w-max w-32`}>
                      <img
                        src={imagenEstado}
                        alt={updateStatus(mov.descripcion_movguia)}
                        className={`w-15 h-20 mb-2 object-contain ${esClickeable ? 'cursor-pointer hover:scale-110' : ''}`}
                        onClick={() => {
                          if (esClickeable) {
                            const imagenes: { path?: string; path2?: string } = {};

                            if (imagenPermitida === 'IMAGEN_1') {
                              if (guia?.path && guia.path.length > 0) {
                                imagenes.path = guia.path;
                              }
                            } else if (imagenPermitida === 'IMAGEN_2') {
                              if (guia?.path2 && guia.path2.length > 0) {
                                imagenes.path2 = guia.path2;
                              }
                            }

                            if (Object.keys(imagenes).length > 0) {
                              setImagenesMovimiento(imagenes);
                            }
                          }
                        }}
                      />
                      <strong className="text-sm text-center">{updateStatus(mov.descripcion_movguia)}</strong>
                      <span className="text-xs text-gray-600 mt-2">{mov.fecha_movguia}</span>
                      <span className="text-xs text-gray-600">{mov.hora_movguia}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div id="line" className="mt-4 border-t border-gray-300"></div>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
      <Dialog open={!!imagenesMovimiento} onOpenChange={() => setImagenesMovimiento(null)}>
        <DialogContent className="max-w-2xl">
          <DialogTitle>Imagen de Cargo de Entrega</DialogTitle>
          <DialogDescription>------------------------------------------</DialogDescription>
          <div className="flex flex-col gap-4">
            {imagenesMovimiento?.path && (
              <div>
                <p className="text-sm font-semibold mb-2">Imagen 1</p>
                <img
                  src={'http://161.132.37.75:8080/tmp/imagenes/' + imagenesMovimiento.path}
                  alt="Imagen Path"
                  className="w-full"
                />
              </div>
            )}
            {imagenesMovimiento?.path2 && (
              <div>
                <p className="text-sm font-semibold mb-2">Imagen 2</p>
                <img
                  src={'http://161.132.37.75:8080/tmp/imagenes/' + imagenesMovimiento.path2}
                  alt="Imagen Path2"
                  className="w-full"
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SeguimientoEnvios;
