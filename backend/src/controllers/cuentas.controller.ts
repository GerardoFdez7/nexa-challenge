import {param, get, response} from "@loopback/rest";
import {inject} from "@loopback/core";
import {ConsultarSaldosCuentasUseCase} from "../application/queries/saldos-cuentas.query";
import {CONSULTAR_SALDOS_CUENTAS_USE_CASE} from "../keys";

export class CuentasController {
  constructor(
    @inject(CONSULTAR_SALDOS_CUENTAS_USE_CASE)
    private consultarSaldosCuentasUseCase: ConsultarSaldosCuentasUseCase,
  ) {}

  @get("/cuentas/saldos")
  @response(200, {
    description: "Lista de saldos de todas las cuentas",
    content: {
      "application/json": {
        schema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              numeroCuenta: {type: "string", description: "Número de cuenta"},
              nombreCliente: {
                type: "string",
                description: "Nombre del cliente al que pertenece la cuenta",
              },
              tipoProducto: {type: "string", description: "Tipo de cuenta (Monetario o Ahorro)"},
              tasaInteres: {type: "number", description: "Tasa de interés de la cuenta"},
              saldo: {type: "number", description: "Saldo de la cuenta"},
              estatus: {type: "string", description: "Estatus de la cuenta"},
            },
          },
        },
      },
    },
  })
  @response(500, {
    description: "Error interno del servidor",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            error: {type: "string"},
          },
        },
      },
    },
  })
  async consultarSaldos(): Promise<any> {
    try {
      const saldos = await this.consultarSaldosCuentasUseCase.execute();
      return saldos;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  @get("/cuentas/{numeroCuenta}/saldo")
  @response(200, {
    description: "Saldo de una cuenta específica",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            numeroCuenta: {type: "string", description: "Número de cuenta"},
            nombreCliente: {
              type: "string",
              description: "Nombre del cliente al que pertenece la cuenta",
            },
            tipoProducto: {type: "string", description: "Tipo de cuenta (Monetario o Ahorro)"},
            tasaInteres: {type: "number", description: "Tasa de interés de la cuenta"},
            saldo: {type: "number", description: "Saldo de la cuenta"},
            estatus: {type: "string", description: "Estatus de la cuenta"},
          },
        },
      },
    },
  })
  @response(404, {
    description: "Cuenta no encontrada",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            error: {type: "string"},
          },
        },
      },
    },
  })
  async consultarSaldoPorCuenta(
    @param.path.string("numeroCuenta") numeroCuenta: string,
  ): Promise<any> {
    try {
      const saldos = await this.consultarSaldosCuentasUseCase.execute();
      const cuenta = saldos.find(s => s.numeroCuenta === numeroCuenta);

      if (!cuenta) {
        return {
          error: `No se encontró la cuenta con número: ${numeroCuenta}`,
        };
      }

      return cuenta;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }
}
