import * as React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Search, Download } from "lucide-react";

import { useOrdenes } from "../hooks/useOrdenes";
import { useCentrosCosto } from "../hooks/centro.costo-hook";
import { useAuth } from "../App";
import { useState } from "react";
import { useProvincias } from '../contexts/ProvinciasContext';
import { useOrdenExcel } from "../hooks/useOrdenExcel";

const BusquedaPorFiltros = () => {
  const [orden, setOrden] = React.useState("")
  const [centroCosto, setCentroCosto] = React.useState("")
  const [guia_remision, setGuia_remision] = React.useState("")
  const [finicial, setFinicial] = React.useState("")
  const [ffinal, setFfinal] = React.useState("")
  const [imagenSeleccionada, setImagenSeleccionada] = useState<string | null>(null);
  const [origen, setOrigen] = React.useState("");
  const [destino, setDestino] = React.useState("");
  const [estado, setEstado] = React.useState(""); // Agregar estado

  const { decodedToken } = useAuth();
  const { ordenes, loading, error, buscar } = useOrdenes();
  const { centrosCosto, loading: loadingCentros, error: errorCentros } = useCentrosCosto(decodedToken?.company_id);
  const { provincias, loading: loadingProvincias, error: errorProvincias } = useProvincias();
  const { loading: loadingExcel, error: errorExcel, exportar } = useOrdenExcel();

  // Establecer centro de costo por defecto si está disponible en el token
  React.useEffect(() => {
    if (decodedToken?.ccosto_id && decodedToken.ccosto_id !== null && decodedToken.ccosto_id !== 0 && decodedToken.ccosto_id !== undefined) {
      setCentroCosto(decodedToken.ccosto_id.toString());
    }
  }, [decodedToken?.ccosto_id, setCentroCosto]);

  const handleBuscar = () => {
    // Validar que se haya ingresado al menos un filtro
    const hasFiltros = orden !== "" || 
                       guia_remision !== "" || 
                       (centroCosto !== "" && centroCosto !== "0") ||
                       (origen !== "" && origen !== "0") ||
                       (destino !== "" && destino !== "0") ||
                       (estado !== "" && estado !== "0") ||
                       finicial !== "" ||
                       ffinal !== "";

    if (!hasFiltros) {
      alert("Debe ingresar al menos un filtro para realizar la búsqueda");
      return;
    }

    // Validar que si hay fecha inicial, también haya fecha final y viceversa
    if ((finicial !== "" && ffinal === "") || (finicial === "" && ffinal !== "")) {
      alert("Debe seleccionar tanto la fecha inicial como la fecha final");
      return;
    }

    buscar({
      customer_id: decodedToken?.company_id,
      centro_costo: centroCosto || "0",
      orden: orden || "0",
      guia_remision: guia_remision || "0",
      origen: origen || "0",
      destino: destino || "0",
      estado: estado || "0", // Agregar estado
      fecha_inicial: finicial || undefined,
      fecha_final: ffinal || undefined,
    });
  };

  const handleGuiaRemisionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuia_remision(e.target.value);
  };

  const handleCentroCostoChange = (value: string) => {
    setCentroCosto(value);
  };

  const handleFinicialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFinicial(e.target.value);
  };

  const handleFfinalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFfinal(e.target.value);
  };

  const handleOrigenChange = (value: string) => {
    setOrigen(value);
  };
  
  const handleDestinoChange = (value: string) => {
    setDestino(value);
  };

  const handleEstadoChange = (value: string) => {
    setEstado(value);
  };

  const handleExportar = () => {
    exportar({
      customer_id: decodedToken?.company_id,
      centro_costo: centroCosto || "0",
      orden: orden || "0",
      guia_remision: guia_remision || "0",
      origen: origen || "0",
      destino: destino || "0",
      estado: estado || "0",
      fecha_inicial: finicial || undefined,
      fecha_final: ffinal || undefined,
    });
  };

  return (
    <div className="p-3">
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="scroll-m-20 pb-2 text-lg font-semibold tracking-tight first:mt-0">
              Filtros de Búsqueda
            </h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex grid-cols-4 gap-2 mt-4 items-end">
            <div className="flex items-center gap-2">
              <label
                htmlFor="orden"
                className="text-sm font-semibold whitespace-nowrap mr-7"
              >
                Nª de Orden:
              </label>
              <Input
                id="orden"
                type="text"
                value={orden}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setOrden(value);
                  }
                }}
                className="w-30 mr-10 h-7"
              />
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="estado"
                className="text-sm font-semibold whitespace-nowrap mr-1 ml-15"
              >
                Estado:
              </label>
              <Select value={estado} onValueChange={handleEstadoChange}>
                <SelectTrigger className="w-[180px] h-7" id='estado'>
                  <SelectValue placeholder="Seleccionar Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Seleccione el Estado</SelectLabel>
                    <SelectItem value="0">[TODOS]</SelectItem>
                    <SelectItem value="PD">PENDIENTE</SelectItem>
                    <SelectItem value="EF">ENTREGADO</SelectItem>
                    <SelectItem value="MT">MOTIVADO</SelectItem>
                    <SelectItem value="DV">DEVUELTO</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="origen" className="text-sm font-semibold whitespace-nowrap mr-1 ml-8">
                Origen:
              </label>
              <Select value={origen} onValueChange={handleOrigenChange}>
                <SelectTrigger id="origen" className="w-[180px] h-7">
                  <SelectValue placeholder="Seleccionar Origen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      {loadingProvincias ? "Cargando..." : errorProvincias ? "Error al cargar" : "Seleccione Origen"}
                    </SelectLabel>
                    <SelectItem value="0">[TODOS]</SelectItem>
                    {!loadingProvincias && provincias.length === 0 && (
                      <SelectItem value="no-data" disabled>No hay provincias disponibles</SelectItem>
                    )}
                    {provincias.map((p) => (
                      <SelectItem key={p.id_prov} value={p.id_prov.toString()}>
                        {p.descripcion_prov}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="finicial"
                className="text-sm font-semibold whitespace-nowrap mr-1 ml-10"
              >
                Fecha Inicial:
              </label>
              <Input
                id="finicial"
                type="date"
                value={finicial}
                onChange={handleFinicialChange}
                className="w-40 mr-10 h-7"
              />
            </div>
          </div>
          <div className="flex grid-cols-4 gap-2 mt-4 items-end">
            <div>
              <label
                htmlFor="guiaremision"
                className="text-sm font-semibold whitespace-nowrap mr-2"
              >
                Guia de Remision:
              </label>
              <Input
                id="guiaremision"
                type="text"
                value={guia_remision}
                onChange={handleGuiaRemisionChange}
                className="w-30 mr-10 h-7"
              />
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="centrocosto"
                className="text-sm font-semibold whitespace-nowrap mr-1"
              >
                Centro de Costo:
              </label>
              <Select value={centroCosto} onValueChange={handleCentroCostoChange}>
                <SelectTrigger 
                  id='centrocosto' 
                  className="w-[180px]"
                  disabled={centroCosto !== "" && centroCosto === decodedToken?.ccosto_id?.toString()}
                >
                  <SelectValue placeholder="Seleccionar Centro de Costo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      {loadingCentros ? "Cargando..." : errorCentros ? "Error al cargar" : "Seleccione el Centro de Costo"}
                    </SelectLabel>
                    <SelectItem value="0">[TODOS]</SelectItem>
                    {!loadingCentros && centrosCosto.length === 0 && (
                      <SelectItem value="no-data" disabled>No hay centros de costo disponibles</SelectItem>
                    )}
                    {centrosCosto.map((centro) => (
                      <SelectItem key={centro.id_ccosto} value={centro.id_ccosto.toString()}>
                        {centro.descripcion_ccosto}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="destino" className="text-sm font-semibold whitespace-nowrap mr-1 ml-8">
                Destino:
              </label>
              <Select value={destino} onValueChange={handleDestinoChange}>
                <SelectTrigger id="destino" className="w-[180px] h-7">
                  <SelectValue placeholder="Seleccionar Destino" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      {loadingProvincias ? "Cargando..." : errorProvincias ? "Error al cargar" : "Seleccione Destino"}
                    </SelectLabel>
                    <SelectItem value="0">[TODOS]</SelectItem>
                    {!loadingProvincias && provincias.length === 0 && (
                      <SelectItem value="no-data" disabled>No hay provincias disponibles</SelectItem>
                    )}
                    {provincias.map((p) => (
                      <SelectItem key={p.id_prov} value={p.id_prov.toString()}>
                        {p.descripcion_prov}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="ffinal"
                className="text-sm font-semibold whitespace-nowrap mr-2 ml-10"
              >
                Fecha Final:
              </label>
              <Input
                id="ffinal"
                type="date"
                value={ffinal}
                onChange={handleFfinalChange}
                className="w-40 mr-10 h-7"
              />
            </div>
          </div>
          <div className="flex gap-4 mt-6 mr-35 items-end justify-end">
            <Button variant="destructive" onClick={handleBuscar} disabled={loading} className="cursor-pointer">
              <Search className="w-4 h-4 mr-2" />
              {loading ? "Buscando..." : "Buscar"}
            </Button>
            <Button variant="default" className="cursor-pointer" id='exportar' onClick={handleExportar} disabled={loadingExcel}>
              <Download className="w-4 h-4 mr-2" />
              {loadingExcel ? "Exportando..." : "Exportar"}
            </Button>
          </div>
          {error && <div className="text-red-500 mt-4">No se encontraron Ordenes</div>}
          {errorExcel && <div className="text-red-500 mt-4">No se pudo exportar: {errorExcel}</div>}
          {ordenes && <div className="mt-4 text-green-500">Búsqueda realizada exitosamente se encontraron {ordenes.count} envios </div>}
          <div id="line" className="mt-4 border-t border-gray-300"></div>
          <div id="tabla">
            {ordenes && ordenes.data && ordenes.data.length > 0 ? (
              <div className="mt-6 overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-red-700 text-white">
                    <tr>
                      <th className="border border-gray-300 p-2 text-center text-sm">ORDEN</th>
                      <th className="border border-gray-300 p-2 text-center text-sm">ITEM</th>
                      <th className="border border-gray-300 p-2 text-center text-sm">C.COSTO</th>
                      <th className="border border-gray-300 p-2 text-center text-sm">DESTINATARIO</th>
                      <th className="border border-gray-300 p-2 text-center text-sm">GLOSA</th>
                      <th className="border border-gray-300 p-2 text-center text-sm">ORIGEN</th>
                      <th className="border border-gray-300 p-2 text-center text-sm">DESTINO</th>
                      <th className="border border-gray-300 p-2 text-center text-sm">F.ENVIO</th>
                      <th className="border border-gray-300 p-2 text-center text-sm">ESTADO</th>
                      <th className="border border-gray-300 p-2 text-center text-sm">IMAGEN</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordenes.data.map((item: any, index: number) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-2 text-sm">{item.orden}</td>
                        <td className="border border-gray-300 p-2 text-sm">{item.item}</td>
                        <td className="border border-gray-300 p-2 text-sm">{item.ccosto}</td>
                        <td className="border border-gray-300 p-2 text-sm">{item.destinatario}</td>
                        <td className="border border-gray-300 p-2 text-sm">{item.glosa}</td>
                        <td className="border border-gray-300 p-2 text-sm">{item.origen}</td>
                        <td className="border border-gray-300 p-2 text-sm">{item.destino}</td>
                        <td className="border border-gray-300 p-2 text-sm">{item.fecha.split('T')[0]}</td>
                        <td className="border border-gray-300 p-2 text-sm">{item.estado}</td>
                        <td className="border border-gray-300 p-2 text-sm">
                          {item.imagen !== null && item.imagen!=='0' ? (
                            <img
                              src={"http://161.132.37.75:8080/tmp/imagenes/" + item.path}
                              alt="Orden"
                              className="h-20 w-30 object-cover rounded cursor-pointer"
                              onClick={() => setImagenSeleccionada("http://161.132.37.75:8080/tmp/imagenes/" + item.path)}
                            />
                          ) : (
                            <span className="text-gray-500">Sin Imagen</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
      <Dialog open={!!imagenSeleccionada} onOpenChange={() => setImagenSeleccionada(null)}>
        <DialogContent className="max-w-3xl">
          <DialogTitle>Visualización de Imagen</DialogTitle>
          <DialogDescription>Imagen completa del resultado</DialogDescription>
          <img src={imagenSeleccionada || ""} alt="Imagen grande" className="w-full" />
        </DialogContent>
      </Dialog>
    </div>

  );
};

export default BusquedaPorFiltros;
