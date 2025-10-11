import {injectable, inject} from "@loopback/core";
import {CodigoOperacionRepository} from "../../domain/repositories/codigo-operacion.repository";
import {CodigoOperacion, TipoOperacion} from "../../domain/entities/codigo-operacion.entity";
import {PrismaService} from "../database/prisma.service";
import {PRISMA_SERVICE} from "../../keys";

@injectable()
export class PrismaCodigoOperacionRepository implements CodigoOperacionRepository {
  constructor(@inject(PRISMA_SERVICE) private prismaService: PrismaService) {}

  async save(codigoOperacion: CodigoOperacion): Promise<CodigoOperacion> {
    const data = {
      codigo: codigoOperacion.codigo,
      descripcion: codigoOperacion.descripcion,
      tipoOperacion: codigoOperacion.tipoOperacion,
      fechaCreacion: codigoOperacion.fechaCreacion,
      fechaActualizacion: codigoOperacion.fechaActualizacion,
      activo: codigoOperacion.activo,
    };

    const savedCodigoOperacion = await this.prismaService.client.codigoOperacion.create({
      data,
    });

    return CodigoOperacion.fromPersistence({
      id: savedCodigoOperacion.id,
      codigo: savedCodigoOperacion.codigo,
      descripcion: savedCodigoOperacion.descripcion,
      tipoOperacion: savedCodigoOperacion.tipoOperacion as TipoOperacion,
      fechaCreacion: savedCodigoOperacion.fechaCreacion,
      fechaActualizacion: savedCodigoOperacion.fechaActualizacion,
      activo: savedCodigoOperacion.activo,
    });
  }

  async findById(id: string): Promise<CodigoOperacion | null> {
    const codigoOperacion = await this.prismaService.client.codigoOperacion.findUnique({
      where: {id},
    });

    if (!codigoOperacion) return null;

    return CodigoOperacion.fromPersistence({
      id: codigoOperacion.id,
      codigo: codigoOperacion.codigo,
      descripcion: codigoOperacion.descripcion,
      tipoOperacion: codigoOperacion.tipoOperacion as TipoOperacion,
      fechaCreacion: codigoOperacion.fechaCreacion,
      fechaActualizacion: codigoOperacion.fechaActualizacion,
      activo: codigoOperacion.activo,
    });
  }

  async findByCodigo(codigo: string): Promise<CodigoOperacion | null> {
    const codigoOperacion = await this.prismaService.client.codigoOperacion.findUnique({
      where: {codigo},
    });

    if (!codigoOperacion) return null;

    return CodigoOperacion.fromPersistence({
      id: codigoOperacion.id,
      codigo: codigoOperacion.codigo,
      descripcion: codigoOperacion.descripcion,
      tipoOperacion: codigoOperacion.tipoOperacion as TipoOperacion,
      fechaCreacion: codigoOperacion.fechaCreacion,
      fechaActualizacion: codigoOperacion.fechaActualizacion,
      activo: codigoOperacion.activo,
    });
  }

  async findAll(): Promise<CodigoOperacion[]> {
    const codigosOperacion = await this.prismaService.client.codigoOperacion.findMany();

    return codigosOperacion.map((codigoOperacion: any) =>
      CodigoOperacion.fromPersistence({
        id: codigoOperacion.id,
        codigo: codigoOperacion.codigo,
        descripcion: codigoOperacion.descripcion,
        tipoOperacion: codigoOperacion.tipoOperacion as TipoOperacion,
        fechaCreacion: codigoOperacion.fechaCreacion,
        fechaActualizacion: codigoOperacion.fechaActualizacion,
        activo: codigoOperacion.activo,
      }),
    );
  }

  async update(codigoOperacion: CodigoOperacion): Promise<CodigoOperacion> {
    const updatedCodigoOperacion = await this.prismaService.client.codigoOperacion.update({
      where: {id: codigoOperacion.id},
      data: {
        codigo: codigoOperacion.codigo,
        descripcion: codigoOperacion.descripcion,
        tipoOperacion: codigoOperacion.tipoOperacion,
        fechaActualizacion: codigoOperacion.fechaActualizacion,
        activo: codigoOperacion.activo,
      },
    });

    return CodigoOperacion.fromPersistence({
      id: updatedCodigoOperacion.id,
      codigo: updatedCodigoOperacion.codigo,
      descripcion: updatedCodigoOperacion.descripcion,
      tipoOperacion: updatedCodigoOperacion.tipoOperacion as TipoOperacion,
      fechaCreacion: updatedCodigoOperacion.fechaCreacion,
      fechaActualizacion: updatedCodigoOperacion.fechaActualizacion,
      activo: updatedCodigoOperacion.activo,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.client.codigoOperacion.delete({
      where: {id},
    });
  }
}