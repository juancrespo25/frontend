import { Input } from "../components/ui/input";

const SeguimientoEnvios = () => {
  return (
    <div className="p-4">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Seguimiento de Envíos
      </h2>

      <div className="flex-row mt-4 items-center justify-items-center gap-4">
        <label
          htmlFor="tracking-number"
          className="font-medium whitespace-nowrap"
        >
          Número de Seguimiento:
        </label>
        <Input
          id="tracking-number"
          type="text"
          placeholder="Ingrese su número de seguimiento"
          className="w-64"
        />
      </div>
    </div>
  );
};

export default SeguimientoEnvios;
