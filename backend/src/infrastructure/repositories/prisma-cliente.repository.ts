import { injectable, inject } from '@loopback/core';
import { ClienteRepository } from '../../domain/repositories/cliente.repository';
import { Cliente, Sexo } from '../../domain/entities/cliente.entity';
import { PrismaService } from '../database/prisma.service';
import { PRISMA_SERVICE } from '../../keys';

@injectable()
export class PrismaClienteRepository implements ClienteRepository {
  constructor(@inject(PRISMA_SERVICE) private prismaService: PrismaService) {}

  async save(cliente: Cliente): Promise<Cliente> {
    const data = {
      nombreCompleto: cliente.nombreCompleto,
      dpi: cliente.dpi,
      fechaNacimiento: cliente.fechaNacimiento,
      sexo: cliente.sexo,
      paisNacimiento: cliente.paisNacimiento,
      fechaCreacion: cliente.fechaCreacion,
      fechaActualizacion: cliente.fechaActualizacion
    };

    const savedCliente = await this.prismaService.client.cliente.create({
      data
    });

    return Cliente.fromPersistence({
      id: savedCliente.id,
      nombreCompleto: savedCliente.nombreCompleto,
      dpi: savedCliente.dpi,
      fechaNacimiento: savedCliente.fechaNacimiento,
      sexo: savedCliente.sexo as Sexo,
      paisNacimiento: savedCliente.paisNacimiento,
      fechaCreacion: savedCliente.fechaCreacion,
      fechaActualizacion: savedCliente.fechaActualizacion
    });
  }

  async findById(id: string): Promise<Cliente | null> {
    const cliente = await this.prismaService.client.cliente.findUnique({
      where: { id }
    });

    if (!cliente) return null;

    return Cliente.fromPersistence({
      id: cliente.id,
      nombreCompleto: cliente.nombreCompleto,
      dpi: cliente.dpi,
      fechaNacimiento: cliente.fechaNacimiento,
      sexo: cliente.sexo as Sexo,
      paisNacimiento: cliente.paisNacimiento,
      fechaCreacion: cliente.fechaCreacion,
      fechaActualizacion: cliente.fechaActualizacion
    });
  }

  async findByDpi(dpi: string): Promise<Cliente | null> {
    const cliente = await this.prismaService.client.cliente.findUnique({
      where: { dpi }
    });

    if (!cliente) return null;

    return Cliente.fromPersistence({
      id: cliente.id,
      nombreCompleto: cliente.nombreCompleto,
      dpi: cliente.dpi,
      fechaNacimiento: cliente.fechaNacimiento,
      sexo: cliente.sexo as Sexo,
      paisNacimiento: cliente.paisNacimiento,
      fechaCreacion: cliente.fechaCreacion,
      fechaActualizacion: cliente.fechaActualizacion
    });
  }

  async findAll(): Promise<Cliente[]> {
    const clientes = await this.prismaService.client.cliente.findMany();

    return clientes.map((cliente: any) => Cliente.fromPersistence({
      id: cliente.id,
      nombreCompleto: cliente.nombreCompleto,
      dpi: cliente.dpi,
      fechaNacimiento: cliente.fechaNacimiento,
      sexo: cliente.sexo as Sexo,
      paisNacimiento: cliente.paisNacimiento,
      fechaCreacion: cliente.fechaCreacion,
      fechaActualizacion: cliente.fechaActualizacion
    }));
  }

  async update(cliente: Cliente): Promise<Cliente> {
    const updatedCliente = await this.prismaService.client.cliente.update({
      where: { id: cliente.id },
      data: {
        nombreCompleto: cliente.nombreCompleto,
        dpi: cliente.dpi,
        fechaNacimiento: cliente.fechaNacimiento,
        sexo: cliente.sexo,
        paisNacimiento: cliente.paisNacimiento,
        fechaActualizacion: cliente.fechaActualizacion
      }
    });

    return Cliente.fromPersistence({
      id: updatedCliente.id,
      nombreCompleto: updatedCliente.nombreCompleto,
      dpi: updatedCliente.dpi,
      fechaNacimiento: updatedCliente.fechaNacimiento,
      sexo: updatedCliente.sexo as Sexo,
      paisNacimiento: updatedCliente.paisNacimiento,
      fechaCreacion: updatedCliente.fechaCreacion,
      fechaActualizacion: updatedCliente.fechaActualizacion
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.client.cliente.delete({
      where: { id }
    });
  }
}