import {param, get, response} from "@loopback/rest";
import {inject} from "@loopback/core";
import {ConsultarTransaccionesClienteUseCase} from "../application/queries/transacciones-cliente.query";
import {ConsultarTodosClientesUseCase} from "../application/queries/todos-clientes.query";
import {CONSULTAR_TRANSACCIONES_CLIENTE_USE_CASE, CONSULTAR_TODOS_CLIENTES_USE_CASE} from "../keys";

export class ClientesController {
  constructor(
    @inject(CONSULTAR_TRANSACCIONES_CLIENTE_USE_CASE)
    private consultarTransaccionesClienteUseCase: ConsultarTransaccionesClienteUseCase,
    @inject(CONSULTAR_TODOS_CLIENTES_USE_CASE)
    private consultarTodosClientesUseCase: ConsultarTodosClientesUseCase,
  ) {}

  @get("/clientes")
  @response(200, {
    description: "Lista de todos los clientes",
    content: {
      "application/json": {
        schema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {type: "string", description: "ID único del cliente"},
              nombreCompleto: {type: "string", description: "Nombre completo del cliente"},
              dpi: {type: "string", description: "Documento de identificación personal"},
              fechaNacimiento: {
                type: "string",
                format: "date",
                description: "Fecha de nacimiento del cliente",
              },
              sexo: {type: "string", description: "Sexo del cliente"},
              paisNacimiento: {type: "string", description: "País de nacimiento del cliente"},
              fechaCreacion: {
                type: "string",
                format: "date-time",
                description: "Fecha de creación del registro",
              },
              fechaActualizacion: {
                type: "string",
                format: "date-time",
                description: "Fecha de última actualización del registro",
              },
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
  async obtenerTodosLosClientes(): Promise<any> {
    try {
      const clientes = await this.consultarTodosClientesUseCase.execute();
      return clientes;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  @get("/clientes/{clienteId}/transacciones")
  @response(200, {
    description: "Lista de transacciones del cliente en el rango de fechas especificado",
    content: {
      "application/json": {
        schema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              transaccionId: {type: "string", description: "ID de la transacción"},
              numeroCuenta: {
                type: "string",
                description: "Número de cuenta asociada a la transacción",
              },
              nombreCliente: {
                type: "string",
                description: "Nombre del cliente al que pertenece la cuenta",
              },
              fechaTransaccion: {
                type: "string",
                format: "date-time",
                description: "Fecha y hora de la transacción",
              },
              monto: {type: "number", description: "Monto"},
              codigoOperacion: {type: "string", description: "Código de operación"},
              descripcionOperacion: {type: "string", description: "Descripción de la transacción"},
              tipoOperacion: {type: "string", description: "Tipo de operación (Débito o Crédito)"},
            },
          },
        },
      },
    },
  })
  @response(400, {
    description: "Error en los parámetros de consulta",
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
  @response(404, {
    description: "Cliente no encontrado",
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
  async consultarTransaccionesCliente(
    @param.path.string("clienteId") clienteId: string,
    @param.query.string("fechaInicio") fechaInicio: string,
    @param.query.string("fechaFin") fechaFin: string,
  ): Promise<any> {
    try {
      // Validar que las fechas estén presentes
      if (!fechaInicio || !fechaFin) {
        return {
          error: "Los parámetros fechaInicio y fechaFin son obligatorios",
        };
      }

      // Convertir strings a Date
      const fechaInicioDate = new Date(fechaInicio);
      const fechaFinDate = new Date(fechaFin);

      // Validar que las fechas sean válidas
      if (isNaN(fechaInicioDate.getTime()) || isNaN(fechaFinDate.getTime())) {
        return {
          error: "Las fechas deben tener un formato válido (YYYY-MM-DD)",
        };
      }

      const transacciones = await this.consultarTransaccionesClienteUseCase.execute({
        clienteId,
        fechaInicio: fechaInicioDate,
        fechaFin: fechaFinDate,
      });

      return transacciones;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  private getStatusCodeFromError(errorMessage: string): number {
    if (errorMessage.includes("no encontrado") || errorMessage.includes("no existe")) {
      return 404;
    }
    if (errorMessage.includes("inválido") || errorMessage.includes("debe ser")) {
      return 400;
    }
    return 500;
  }
}
