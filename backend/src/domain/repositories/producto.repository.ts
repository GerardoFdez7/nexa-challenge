import { Producto } from '../entities/producto.entity';

export interface ProductoRepository {
  save(producto: Producto): Promise<Producto>;
  findById(id: string): Promise<Producto | null>;
  findAll(): Promise<Producto[]>;
  update(producto: Producto): Promise<Producto>;
  delete(id: string): Promise<void>;
}