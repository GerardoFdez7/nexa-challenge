import {injectable, inject} from "@loopback/core";
import {TransaccionCuentaRepository} from "../../domain/repositories/transaccion-cuenta.repository";
import {TRANSACCION_CUENTA_REPOSITORY} from "../../keys";

export interface TodasTransaccionesResponse {
  idTransaccion: string;
  numeroCuenta: string;
  nombreCliente: string;
  fechaTransaccion: Date;
  monto: number;
  tipoOperacion: string;
  descripcionOperacion: string;
  codigoOperacion: string;
}

@injectable()
export class ConsultarTodasTransaccionesUseCase {
  constructor(
    @inject(TRANSACCION_CUENTA_REPOSITORY)
    private transaccionRepository: TransaccionCuentaRepository,
  ) {}

  async execute(): Promise<TodasTransaccionesResponse[]> {
    try {
      const transacciones = await this.transaccionRepository.findAll();

      // Como findAll ahora retorna datos con includes, necesitamos acceder a los datos de manera diferente
      const transaccionesConDetalles = await this.transaccionRepository.findByClienteIdAndDateRange(
        "", // clienteId vacío para obtener todas
        new Date('1900-01-01'), // fecha muy antigua
        new Date('2100-12-31')  // fecha muy futura
      );

      return transaccionesConDetalles.map(transaccion => ({
        idTransaccion: transaccion.id || "",
        numeroCuenta: transaccion.cuenta?.numeroCuenta || "",
        nombreCliente: transaccion.cuenta?.cliente?.nombreCompleto || "",
        fechaTransaccion: transaccion.fechaTransaccion,
        monto: transaccion.monto,
        tipoOperacion: transaccion.codigoOperacion?.tipoOperacion || "",
        descripcionOperacion: transaccion.codigoOperacion?.descripcion || "",
        codigoOperacion: transaccion.codigoOperacion?.codigo || "",
      }));
    } catch (error) {
      throw new Error(
        `Error al consultar todas las transacciones: ${error instanceof Error ? error.message : "Error desconocido"}`,
      );
    }
  }
}