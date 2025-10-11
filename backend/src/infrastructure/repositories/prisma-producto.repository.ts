import { injectable } from '@loopback/core';
import { ProductoRepository } from '../../domain/repositories/producto.repository';
import { Producto, TipoProducto, CalculoInteres } from '../../domain/entities/producto.entity';
import { PrismaService } from '../database/prisma.service';

@injectable()
export class PrismaProductoRepository implements ProductoRepository {
  constructor(private prismaService: PrismaService) {}

  async save(producto: Producto): Promise<Producto> {
    const data = {
      nombre: producto.nombre,
      tasaInteres: producto.tasaInteres,
      tipoProducto: producto.tipoProducto,
      calculoInteres: producto.calculoInteres,
      fechaCreacion: producto.fechaCreacion,
      fechaActualizacion: producto.fechaActualizacion,
      activo: producto.activo
    };

    const savedProducto = await this.prismaService.client.producto.create({
      data
    });

    return Producto.fromPersistence({
      id: savedProducto.id,
      nombre: savedProducto.nombre,
      tasaInteres: Number(savedProducto.tasaInteres),
      tipoProducto: savedProducto.tipoProducto as TipoProducto,
      calculoInteres: savedProducto.calculoInteres as CalculoInteres,
      fechaCreacion: savedProducto.fechaCreacion,
      fechaActualizacion: savedProducto.fechaActualizacion,
      activo: savedProducto.activo
    });
  }

  async findById(id: string): Promise<Producto | null> {
    const producto = await this.prismaService.client.producto.findUnique({
      where: { id }
    });

    if (!producto) return null;

    return Producto.fromPersistence({
      id: producto.id,
      nombre: producto.nombre,
      tasaInteres: Number(producto.tasaInteres),
      tipoProducto: producto.tipoProducto as TipoProducto,
      calculoInteres: producto.calculoInteres as CalculoInteres,
      fechaCreacion: producto.fechaCreacion,
      fechaActualizacion: producto.fechaActualizacion,
      activo: producto.activo
    });
  }

  async findAll(): Promise<Producto[]> {
    const productos = await this.prismaService.client.producto.findMany();

    return productos.map((producto: any) => Producto.fromPersistence({
      id: producto.id,
      nombre: producto.nombre,
      tasaInteres: Number(producto.tasaInteres),
      tipoProducto: producto.tipoProducto as TipoProducto,
      calculoInteres: producto.calculoInteres as CalculoInteres,
      fechaCreacion: producto.fechaCreacion,
      fechaActualizacion: producto.fechaActualizacion,
      activo: producto.activo
    }));
  }

  async update(producto: Producto): Promise<Producto> {
    const updatedProducto = await this.prismaService.client.producto.update({
      where: { id: producto.id },
      data: {
        nombre: producto.nombre,
        tasaInteres: producto.tasaInteres,
        tipoProducto: producto.tipoProducto,
        calculoInteres: producto.calculoInteres,
        fechaActualizacion: producto.fechaActualizacion,
        activo: producto.activo
      }
    });

    return Producto.fromPersistence({
      id: updatedProducto.id,
      nombre: updatedProducto.nombre,
      tasaInteres: Number(updatedProducto.tasaInteres),
      tipoProducto: updatedProducto.tipoProducto as TipoProducto,
      calculoInteres: updatedProducto.calculoInteres as CalculoInteres,
      fechaCreacion: updatedProducto.fechaCreacion,
      fechaActualizacion: updatedProducto.fechaActualizacion,
      activo: updatedProducto.activo
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.client.producto.delete({
      where: { id }
    });
  }
}