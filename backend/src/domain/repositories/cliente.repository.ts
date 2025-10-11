import { Cliente } from '../entities/cliente.entity';

export interface ClienteRepository {
  save(cliente: Cliente): Promise<Cliente>;
  findById(id: string): Promise<Cliente | null>;
  findByDpi(dpi: string): Promise<Cliente | null>;
  findAll(): Promise<Cliente[]>;
  update(cliente: Cliente): Promise<Cliente>;
  delete(id: string): Promise<void>;
}