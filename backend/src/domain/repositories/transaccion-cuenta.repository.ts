import { TransaccionCuenta } from '../entities/transaccion-cuenta.entity';

export interface TransaccionCuentaRepository {
  save(transaccion: TransaccionCuenta): Promise<TransaccionCuenta>;
  findById(id: string): Promise<TransaccionCuenta | null>;
  findByCuentaId(cuentaId: string): Promise<TransaccionCuenta[]>;
  findAll(): Promise<TransaccionCuenta[]>;
  
  // Métodos específicos para consultas de transacciones
  findByClienteIdAndDateRange(
    clienteId: string, 
    fechaInicio: Date, 
    fechaFin: Date
  ): Promise<any[]>;
}