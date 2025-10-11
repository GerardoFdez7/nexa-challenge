import { Cuenta } from '../entities/cuenta.entity';

export interface CuentaRepository {
  save(cuenta: Cuenta): Promise<Cuenta>;
  findById(id: string): Promise<Cuenta | null>;
  findByNumeroCuenta(numeroCuenta: string): Promise<Cuenta | null>;
  findByClienteId(clienteId: string): Promise<Cuenta[]>;
  findAll(): Promise<Cuenta[]>;
  update(cuenta: Cuenta): Promise<Cuenta>;
  delete(id: string): Promise<void>;
  
  // Métodos específicos para consultas de saldos
  findAllWithClienteAndProducto(): Promise<any[]>;
}