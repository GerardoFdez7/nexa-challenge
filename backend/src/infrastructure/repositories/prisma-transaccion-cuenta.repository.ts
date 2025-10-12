import { injectable, inject } from '@loopback/core';
import { TransaccionCuentaRepository } from '../../domain/repositories/transaccion-cuenta.repository';
import { TransaccionCuenta } from '../../domain/entities/transaccion-cuenta.entity';
import { PrismaService } from '../database/prisma.service';
import { PRISMA_SERVICE } from '../../keys';

@injectable()
export class PrismaTransaccionCuentaRepository implements TransaccionCuentaRepository {
  constructor(@inject(PRISMA_SERVICE) private prismaService: PrismaService) {}

  async save(transaccion: TransaccionCuenta): Promise<TransaccionCuenta> {
    const data = {
      cuentaId: transaccion.cuentaId,
      codigoOperacionId: transaccion.codigoOperacionId,
      monto: transaccion.monto,
      fechaTransaccion: transaccion.fechaTransaccion,
      fechaCreacion: transaccion.fechaCreacion
    };

    const savedTransaccion = await this.prismaService.client.transaccionCuenta.create({
      data
    });

    return TransaccionCuenta.fromPersistence({
      id: savedTransaccion.id,
      cuentaId: savedTransaccion.cuentaId,
      codigoOperacionId: savedTransaccion.codigoOperacionId,
      monto: Number(savedTransaccion.monto),
      fechaTransaccion: savedTransaccion.fechaTransaccion,
      fechaCreacion: savedTransaccion.fechaCreacion
    });
  }

  async findById(id: string): Promise<TransaccionCuenta | null> {
    const transaccion = await this.prismaService.client.transaccionCuenta.findUnique({
      where: { id }
    });

    if (!transaccion) return null;

    return TransaccionCuenta.fromPersistence({
      id: transaccion.id,
      cuentaId: transaccion.cuentaId,
      codigoOperacionId: transaccion.codigoOperacionId,
      monto: Number(transaccion.monto),
      fechaTransaccion: transaccion.fechaTransaccion,
      fechaCreacion: transaccion.fechaCreacion
    });
  }

  async findByCuentaId(cuentaId: string): Promise<TransaccionCuenta[]> {
    const transacciones = await this.prismaService.client.transaccionCuenta.findMany({
      where: { cuentaId }
    });

    return transacciones.map((transaccion: any) => TransaccionCuenta.fromPersistence({
      id: transaccion.id,
      cuentaId: transaccion.cuentaId,
      codigoOperacionId: transaccion.codigoOperacionId,
      monto: Number(transaccion.monto),
      fechaTransaccion: transaccion.fechaTransaccion,
      fechaCreacion: transaccion.fechaCreacion
    }));
  }

  async findAll(): Promise<TransaccionCuenta[]> {
    const transacciones = await this.prismaService.client.transaccionCuenta.findMany({
      include: {
        cuenta: {
          include: {
            cliente: true
          }
        },
        codigoOperacion: true
      },
      orderBy: {
        fechaTransaccion: 'desc'
      }
    });

    return transacciones.map((transaccion: any) => TransaccionCuenta.fromPersistence({
      id: transaccion.id,
      cuentaId: transaccion.cuentaId,
      codigoOperacionId: transaccion.codigoOperacionId,
      monto: Number(transaccion.monto),
      fechaTransaccion: transaccion.fechaTransaccion,
      fechaCreacion: transaccion.fechaCreacion
    }));
  }

  async findByClienteIdAndDateRange(
    clienteId: string,
    fechaInicio: Date,
    fechaFin: Date
  ): Promise<any[]> {
    const whereClause: any = {
      fechaTransaccion: {
        gte: fechaInicio,
        lte: fechaFin
      }
    };

    // Solo agregar filtro de cliente si se proporciona un clienteId
    if (clienteId && clienteId.trim() !== "") {
      whereClause.cuenta = {
        clienteId: clienteId
      };
    }

    return await this.prismaService.client.transaccionCuenta.findMany({
      where: whereClause,
      include: {
        cuenta: {
          include: {
            cliente: true
          }
        },
        codigoOperacion: true
      },
      orderBy: {
        fechaTransaccion: 'desc'
      }
    });
  }
}