import {injectable, inject} from "@loopback/core";
import {CuentaRepository} from "../../domain/repositories/cuenta.repository";
import {Cuenta, EstatusCuenta} from "../../domain/entities/cuenta.entity";
import {PrismaService} from "../database/prisma.service";
import {PRISMA_SERVICE} from "../../keys";

@injectable()
export class PrismaCuentaRepository implements CuentaRepository {
  constructor(@inject(PRISMA_SERVICE) private prismaService: PrismaService) {}

  async save(cuenta: Cuenta): Promise<Cuenta> {
    const data = {
      numeroCuenta: cuenta.numeroCuenta,
      clienteId: cuenta.clienteId,
      productoId: cuenta.productoId,
      estatus: cuenta.estatus,
      saldo: cuenta.saldo,
      fechaCreacion: cuenta.fechaCreacion,
      fechaActualizacion: cuenta.fechaActualizacion,
    };

    const savedCuenta = await this.prismaService.client.cuenta.create({
      data,
    });

    return Cuenta.fromPersistence({
      id: savedCuenta.id,
      numeroCuenta: savedCuenta.numeroCuenta,
      clienteId: savedCuenta.clienteId,
      productoId: savedCuenta.productoId,
      estatus: savedCuenta.estatus as EstatusCuenta,
      saldo: Number(savedCuenta.saldo),
      fechaCreacion: savedCuenta.fechaCreacion,
      fechaActualizacion: savedCuenta.fechaActualizacion,
    });
  }

  async findById(id: string): Promise<Cuenta | null> {
    const cuenta = await this.prismaService.client.cuenta.findUnique({
      where: {id},
    });

    if (!cuenta) return null;

    return Cuenta.fromPersistence({
      id: cuenta.id,
      numeroCuenta: cuenta.numeroCuenta,
      clienteId: cuenta.clienteId,
      productoId: cuenta.productoId,
      estatus: cuenta.estatus as EstatusCuenta,
      saldo: Number(cuenta.saldo),
      fechaCreacion: cuenta.fechaCreacion,
      fechaActualizacion: cuenta.fechaActualizacion,
    });
  }

  async findByNumeroCuenta(numeroCuenta: string): Promise<Cuenta | null> {
    const cuenta = await this.prismaService.client.cuenta.findUnique({
      where: {numeroCuenta},
    });

    if (!cuenta) return null;

    return Cuenta.fromPersistence({
      id: cuenta.id,
      numeroCuenta: cuenta.numeroCuenta,
      clienteId: cuenta.clienteId,
      productoId: cuenta.productoId,
      estatus: cuenta.estatus as EstatusCuenta,
      saldo: Number(cuenta.saldo),
      fechaCreacion: cuenta.fechaCreacion,
      fechaActualizacion: cuenta.fechaActualizacion,
    });
  }

  async findByClienteId(clienteId: string): Promise<Cuenta[]> {
    const cuentas = await this.prismaService.client.cuenta.findMany({
      where: {clienteId},
    });

    return cuentas.map((cuenta: any) =>
      Cuenta.fromPersistence({
        id: cuenta.id,
        numeroCuenta: cuenta.numeroCuenta,
        clienteId: cuenta.clienteId,
        productoId: cuenta.productoId,
        estatus: cuenta.estatus as EstatusCuenta,
        saldo: Number(cuenta.saldo),
        fechaCreacion: cuenta.fechaCreacion,
        fechaActualizacion: cuenta.fechaActualizacion,
      }),
    );
  }

  async findAll(): Promise<Cuenta[]> {
    const cuentas = await this.prismaService.client.cuenta.findMany();

    return cuentas.map((cuenta: any) =>
      Cuenta.fromPersistence({
        id: cuenta.id,
        numeroCuenta: cuenta.numeroCuenta,
        clienteId: cuenta.clienteId,
        productoId: cuenta.productoId,
        estatus: cuenta.estatus as EstatusCuenta,
        saldo: Number(cuenta.saldo),
        fechaCreacion: cuenta.fechaCreacion,
        fechaActualizacion: cuenta.fechaActualizacion,
      }),
    );
  }

  async update(cuenta: Cuenta): Promise<Cuenta> {
    const updatedCuenta = await this.prismaService.client.cuenta.update({
      where: {id: cuenta.id},
      data: {
        numeroCuenta: cuenta.numeroCuenta,
        clienteId: cuenta.clienteId,
        productoId: cuenta.productoId,
        estatus: cuenta.estatus,
        saldo: cuenta.saldo,
        fechaActualizacion: cuenta.fechaActualizacion,
      },
    });

    return Cuenta.fromPersistence({
      id: updatedCuenta.id,
      numeroCuenta: updatedCuenta.numeroCuenta,
      clienteId: updatedCuenta.clienteId,
      productoId: updatedCuenta.productoId,
      estatus: updatedCuenta.estatus as EstatusCuenta,
      saldo: Number(updatedCuenta.saldo),
      fechaCreacion: updatedCuenta.fechaCreacion,
      fechaActualizacion: updatedCuenta.fechaActualizacion,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.client.cuenta.delete({
      where: {id},
    });
  }

  async findAllWithClienteAndProducto(): Promise<any[]> {
    return await this.prismaService.client.cuenta.findMany({
      include: {
        cliente: true,
        producto: true,
      },
    });
  }
}