import {injectable, inject} from "@loopback/core";
import {ClienteRepository} from "../../domain/repositories/cliente.repository";
import {CLIENTE_REPOSITORY} from "../../keys";

export interface ClienteResponse {
  id: string;
  nombreCompleto: string;
  dpi: string;
  fechaNacimiento: Date;
  sexo: string;
  paisNacimiento: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

@injectable()
export class ConsultarTodosClientesUseCase {
  constructor(@inject(CLIENTE_REPOSITORY) private clienteRepository: ClienteRepository) {}

  async execute(): Promise<ClienteResponse[]> {
    try {
      const clientes = await this.clienteRepository.findAll();

      return clientes.map(cliente => ({
        id: cliente.id || "",
        nombreCompleto: cliente.nombreCompleto,
        dpi: cliente.dpi,
        fechaNacimiento: cliente.fechaNacimiento,
        sexo: cliente.sexo,
        paisNacimiento: cliente.paisNacimiento,
        fechaCreacion: cliente.fechaCreacion || new Date(),
        fechaActualizacion: cliente.fechaActualizacion || new Date(),
      }));
    } catch (error) {
      throw new Error(
        `Error al consultar todos los clientes: ${error instanceof Error ? error.message : "Error desconocido"}`,
      );
    }
  }
}
