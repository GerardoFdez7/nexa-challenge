import {post, get, requestBody, response} from "@loopback/rest";
import {inject} from "@loopback/core";
import {RegistrarTransaccionUseCase} from "../application/commands/registrar-transaccion.create";
import {ConsultarTodasTransaccionesUseCase} from "../application/queries/todas-transacciones.query";
import {REGISTRAR_TRANSACCION_USE_CASE, CONSULTAR_TODAS_TRANSACCIONES_USE_CASE} from "../keys";

export class TransaccionesController {
  constructor(
    @inject(REGISTRAR_TRANSACCION_USE_CASE)
    private registrarTransaccionUseCase: RegistrarTransaccionUseCase,
    @inject(CONSULTAR_TODAS_TRANSACCIONES_USE_CASE)
    private consultarTodasTransaccionesUseCase: ConsultarTodasTransaccionesUseCase,
  ) {}

  @post("/transacciones")
  @response(200, {
    description: "Transacción registrada exitosamente",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            codigo_respuesta: {
              type: "number",
              description: "0 si todo estuvo bien, caso contrario un código de error",
            },
            descripcion_respuesta: {
              type: "string",
              description: "OK si todo estuvo bien, caso contrario descripción del error",
            },
            id_transaccion: {
              type: "string",
              description: "El ID único de la transacción generada si es que no hubo error",
            },
          },
        },
      },
    },
  })
  @response(400, {
    description: "Error en la validación de datos",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            codigo_respuesta: {type: "number"},
            descripcion_respuesta: {type: "string"},
            id_transaccion: {type: "string", nullable: true},
          },
        },
      },
    },
  })
  @response(404, {
    description: "Cuenta o código de operación no encontrado",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            codigo_respuesta: {type: "number"},
            descripcion_respuesta: {type: "string"},
            id_transaccion: {type: "string", nullable: true},
          },
        },
      },
    },
  })
  async registrarTransaccion(
    @requestBody({
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["numeroCuenta", "codigoOperacion", "monto"],
            properties: {
              numeroCuenta: {
                type: "string",
                description: "Número de cuenta para la transacción",
              },
              codigoOperacion: {
                type: "string",
                description: "Código de operación (ej: DEP001, RET001)",
              },
              monto: {
                type: "number",
                minimum: 0.01,
                description: "Monto de la transacción",
              },
            },
          },
        },
      },
    })
    transaccionData: {
      numeroCuenta: string;
      codigoOperacion: string;
      monto: number;
    },
  ): Promise<any> {
    try {
      const resultado = await this.registrarTransaccionUseCase.execute({
        numeroCuenta: transaccionData.numeroCuenta,
        fechaTransaccion: new Date(),
        monto: transaccionData.monto,
        codigoOperacion: transaccionData.codigoOperacion,
      });

      return {
        codigo_respuesta: resultado.codigoRespuesta,
        descripcion_respuesta: resultado.descripcionRespuesta,
        id_transaccion: resultado.idTransaccion || null,
      };
    } catch (error: any) {
      return {
        codigo_respuesta: 99,
        descripcion_respuesta: error.message || "Error interno del servidor",
        id_transaccion: null,
      };
    }
  }

  @get("/transacciones")
  @response(200, {
    description: "Lista de todas las transacciones",
    content: {
      "application/json": {
        schema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              idTransaccion: {type: "string", description: "ID de la transacción"},
              numeroCuenta: {type: "string", description: "Número de cuenta"},
              nombreCliente: {type: "string", description: "Nombre del cliente"},
              fechaTransaccion: {
                type: "string",
                format: "date-time",
                description: "Fecha y hora de la transacción",
              },
              monto: {type: "number", description: "Monto de la transacción"},
              tipoOperacion: {type: "string", description: "Tipo de operación (Débito o Crédito)"},
              descripcionOperacion: {type: "string", description: "Descripción de la operación"},
              codigoOperacion: {type: "string", description: "Código de operación"},
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
  async obtenerTodasTransacciones(): Promise<any> {
    try {
      const transacciones = await this.consultarTodasTransaccionesUseCase.execute();
      return transacciones;
    } catch (error: any) {
      return {
        error: error.message || "Error interno del servidor",
      };
    }
  }

  private getStatusCodeFromError(errorMessage: string): number {
    if (errorMessage.includes("no encontrada") || errorMessage.includes("no existe")) {
      return 404;
    }
    if (
      errorMessage.includes("inactiva") ||
      errorMessage.includes("fondos insuficientes") ||
      errorMessage.includes("inválido") ||
      errorMessage.includes("debe ser mayor")
    ) {
      return 400;
    }
    return 500;
  }
}
