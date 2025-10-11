import {injectable, inject} from "@loopback/core";
import {CuentaRepository} from "../../domain/repositories/cuenta.repository";
import {CodigoOperacionRepository} from "../../domain/repositories/codigo-operacion.repository";
import {TransaccionCuentaRepository} from "../../domain/repositories/transaccion-cuenta.repository";
import {TransaccionCuenta} from "../../domain/entities/transaccion-cuenta.entity";
import {TipoOperacion} from "../../domain/entities/codigo-operacion.entity";
import {
  CUENTA_REPOSITORY,
  CODIGO_OPERACION_REPOSITORY,
  TRANSACCION_CUENTA_REPOSITORY,
} from "../../keys";

export interface RegistrarTransaccionRequest {
  numeroCuenta: string;
  fechaTransaccion: Date;
  monto: number;
  codigoOperacion: string;
}

export interface RegistrarTransaccionResponse {
  codigoRespuesta: number;
  descripcionRespuesta: string;
  idTransaccion?: string;
}

@injectable()
export class RegistrarTransaccionUseCase {
  constructor(
    @inject(CUENTA_REPOSITORY) private cuentaRepository: CuentaRepository,
    @inject(CODIGO_OPERACION_REPOSITORY)
    private codigoOperacionRepository: CodigoOperacionRepository,
    @inject(TRANSACCION_CUENTA_REPOSITORY)
    private transaccionRepository: TransaccionCuentaRepository,
  ) {}

  async execute(request: RegistrarTransaccionRequest): Promise<RegistrarTransaccionResponse> {
    try {
      // 1. Validar que la cuenta existe
      const cuenta = await this.cuentaRepository.findByNumeroCuenta(request.numeroCuenta);
      if (!cuenta) {
        return {
          codigoRespuesta: 1,
          descripcionRespuesta: "Cuenta no encontrada",
        };
      }

      // 2. Validar que la cuenta está activa
      if (!cuenta.isActiva()) {
        return {
          codigoRespuesta: 2,
          descripcionRespuesta: "La cuenta no está activa",
        };
      }

      // 3. Validar que el código de operación existe
      const codigoOperacion = await this.codigoOperacionRepository.findByCodigo(
        request.codigoOperacion,
      );
      if (!codigoOperacion) {
        return {
          codigoRespuesta: 3,
          descripcionRespuesta: "Código de operación no válido",
        };
      }

      // 4. Validar que el código de operación está activo
      if (!codigoOperacion.activo) {
        return {
          codigoRespuesta: 4,
          descripcionRespuesta: "Código de operación inactivo",
        };
      }

      // 5. Para transacciones de débito, validar fondos suficientes
      if (codigoOperacion.tipoOperacion === TipoOperacion.DEBITO) {
        if (!cuenta.tieneFondosSuficientes(request.monto)) {
          return {
            codigoRespuesta: 5,
            descripcionRespuesta: "Fondos insuficientes",
          };
        }
      }

      // 6. Procesar la transacción
      if (codigoOperacion.tipoOperacion === TipoOperacion.DEBITO) {
        cuenta.debitar(request.monto);
      } else {
        cuenta.acreditar(request.monto);
      }

      // 7. Actualizar el saldo de la cuenta
      await this.cuentaRepository.update(cuenta);

      // 8. Registrar la transacción
      const transaccion = TransaccionCuenta.create({
        cuentaId: cuenta.id!,
        codigoOperacionId: codigoOperacion.id!,
        monto: request.monto,
        fechaTransaccion: request.fechaTransaccion,
      });

      const transaccionGuardada = await this.transaccionRepository.save(transaccion);

      return {
        codigoRespuesta: 0,
        descripcionRespuesta: "OK",
        idTransaccion: transaccionGuardada.id,
      };
    } catch (error) {
      return {
        codigoRespuesta: 99,
        descripcionRespuesta: error instanceof Error ? error.message : "Error interno del servidor",
      };
    }
  }
}
