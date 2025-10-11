import {injectable, inject} from "@loopback/core";
import {CuentaRepository} from "../../domain/repositories/cuenta.repository";
import {CUENTA_REPOSITORY} from "../../keys";

export interface SaldoCuentaResponse {
  numeroCuenta: string;
  nombreCliente: string;
  tipoCuenta: string;
  tasaInteres: number;
  saldoCuenta: number;
  estatusCuenta: string;
}

@injectable()
export class ConsultarSaldosCuentasUseCase {
  constructor(@inject(CUENTA_REPOSITORY) private cuentaRepository: CuentaRepository) {}

  async execute(): Promise<SaldoCuentaResponse[]> {
    try {
      const cuentasConDetalles = await this.cuentaRepository.findAllWithClienteAndProducto();

      return cuentasConDetalles.map(cuenta => ({
        numeroCuenta: cuenta.numeroCuenta,
        nombreCliente: cuenta.cliente.nombreCompleto,
        tipoCuenta: cuenta.producto.tipoProducto,
        tasaInteres: cuenta.producto.tasaInteres,
        saldoCuenta: cuenta.saldo,
        estatusCuenta: cuenta.estatus,
      }));
    } catch (error) {
      throw new Error(
        `Error al consultar saldos de cuentas: ${error instanceof Error ? error.message : "Error desconocido"}`,
      );
    }
  }
}
