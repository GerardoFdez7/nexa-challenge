import { CodigoOperacion } from '../entities/codigo-operacion.entity';

export interface CodigoOperacionRepository {
  save(codigoOperacion: CodigoOperacion): Promise<CodigoOperacion>;
  findById(id: string): Promise<CodigoOperacion | null>;
  findByCodigo(codigo: string): Promise<CodigoOperacion | null>;
  findAll(): Promise<CodigoOperacion[]>;
  update(codigoOperacion: CodigoOperacion): Promise<CodigoOperacion>;
  delete(id: string): Promise<void>;
}