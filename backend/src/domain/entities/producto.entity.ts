export enum TipoProducto {
  AHORROS = 'AHORROS',
  MONETARIO = 'MONETARIO'
}

export enum CalculoInteres {
  DIARIO = 'DIARIO',
  MENSUAL = 'MENSUAL'
}

export interface ProductoProps {
  id?: string;
  nombre: string;
  tasaInteres: number;
  tipoProducto: TipoProducto;
  calculoInteres: CalculoInteres;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
  activo?: boolean;
}

export class Producto {
  private constructor(private props: ProductoProps) {}

  static create(props: ProductoProps): Producto {
    // Validaciones de dominio
    if (!props.nombre || props.nombre.trim().length === 0) {
      throw new Error('El nombre del producto es requerido');
    }

    if (props.nombre.length > 100) {
      throw new Error('El nombre del producto no puede exceder 100 caracteres');
    }

    if (props.tasaInteres < 0) {
      throw new Error('La tasa de interés no puede ser negativa');
    }

    if (props.tasaInteres > 1) {
      throw new Error('La tasa de interés no puede ser mayor al 100%');
    }

    if (!Object.values(TipoProducto).includes(props.tipoProducto)) {
      throw new Error('Tipo de producto inválido');
    }

    if (!Object.values(CalculoInteres).includes(props.calculoInteres)) {
      throw new Error('Tipo de cálculo de interés inválido');
    }

    return new Producto({
      ...props,
      activo: props.activo ?? true,
      fechaCreacion: props.fechaCreacion ?? new Date(),
      fechaActualizacion: props.fechaActualizacion ?? new Date()
    });
  }

  static fromPersistence(props: ProductoProps): Producto {
    return new Producto(props);
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get nombre(): string {
    return this.props.nombre;
  }

  get tasaInteres(): number {
    return this.props.tasaInteres;
  }

  get tipoProducto(): TipoProducto {
    return this.props.tipoProducto;
  }

  get calculoInteres(): CalculoInteres {
    return this.props.calculoInteres;
  }

  get fechaCreacion(): Date | undefined {
    return this.props.fechaCreacion;
  }

  get fechaActualizacion(): Date | undefined {
    return this.props.fechaActualizacion;
  }

  get activo(): boolean {
    return this.props.activo ?? true;
  }

  updateTasaInteres(nuevaTasa: number): void {
    if (nuevaTasa < 0) {
      throw new Error('La tasa de interés no puede ser negativa');
    }

    if (nuevaTasa > 1) {
      throw new Error('La tasa de interés no puede ser mayor al 100%');
    }

    this.props.tasaInteres = nuevaTasa;
    this.props.fechaActualizacion = new Date();
  }

  desactivar(): void {
    this.props.activo = false;
    this.props.fechaActualizacion = new Date();
  }

  activar(): void {
    this.props.activo = true;
    this.props.fechaActualizacion = new Date();
  }

  toJSON() {
    return {
      id: this.props.id,
      nombre: this.props.nombre,
      tasaInteres: this.props.tasaInteres,
      tipoProducto: this.props.tipoProducto,
      calculoInteres: this.props.calculoInteres,
      fechaCreacion: this.props.fechaCreacion,
      fechaActualizacion: this.props.fechaActualizacion,
      activo: this.props.activo
    };
  }
}