import {injectable, inject} from "@loopback/core";
import {TransaccionCuentaRepository} from "../../domain/repositories/transaccion-cuenta.repository";
import {TRANSACCION_CUENTA_REPOSITORY} from "../../keys";

export interface ConsultarTransaccionesClienteRequest {
  clienteId: string;
  fechaInicio: Date;
  fechaFin: Date;
}

export interface TransaccionClienteResponse {
  idTransaccion: string;
  numeroCuenta: string;
  fechaTransaccion: Date;
  monto: number;
  tipoOperacion: string;
  descripcionOperacion: string;
}

@injectable()
export class ConsultarTransaccionesClienteUseCase {
  constructor(
    @inject(TRANSACCION_CUENTA_REPOSITORY)
    private transaccionRepository: TransaccionCuentaRepository,
  ) {}

  async execute(
    request: ConsultarTransaccionesClienteRequest,
  ): Promise<TransaccionClienteResponse[]> {
    try {
      // Validar fechas
      if (request.fechaInicio > request.fechaFin) {
        throw new Error("La fecha de inicio no puede ser mayor a la fecha de fin");
      }

      const transacciones = await this.transaccionRepository.findByClienteIdAndDateRange(
        request.clienteId,
        request.fechaInicio,
        request.fechaFin,
      );

      return transacciones.map(transaccion => ({
        idTransaccion: transaccion.id,
        numeroCuenta: transaccion.cuenta.numeroCuenta,
        fechaTransaccion: transaccion.fechaTransaccion,
        monto: transaccion.monto,
        tipoOperacion: transaccion.codigoOperacion.tipoOperacion,
        descripcionOperacion: transaccion.codigoOperacion.descripcion,
      }));
    } catch (error) {
      throw new Error(
        `Error al consultar transacciones del cliente: ${error instanceof Error ? error.message : "Error desconocido"}`,
      );
    }
  }
}
