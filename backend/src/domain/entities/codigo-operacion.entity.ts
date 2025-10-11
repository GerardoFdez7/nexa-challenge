export enum TipoOperacion {
  CREDITO = 'CREDITO',
  DEBITO = 'DEBITO'
}

export interface CodigoOperacionProps {
  id?: string;
  codigo: string;
  descripcion: string;
  tipoOperacion: TipoOperacion;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
  activo?: boolean;
}

export class CodigoOperacion {
  private constructor(private props: CodigoOperacionProps) {}

  static create(props: CodigoOperacionProps): CodigoOperacion {
    // Validaciones de dominio
    if (!props.codigo || props.codigo.trim().length === 0) {
      throw new Error('El código de operación es requerido');
    }

    if (props.codigo.length > 10) {
      throw new Error('El código de operación no puede exceder 10 caracteres');
    }

    if (!props.descripcion || props.descripcion.trim().length === 0) {
      throw new Error('La descripción es requerida');
    }

    if (props.descripcion.length > 255) {
      throw new Error('La descripción no puede exceder 255 caracteres');
    }

    if (!Object.values(TipoOperacion).includes(props.tipoOperacion)) {
      throw new Error('Tipo de operación inválido');
    }

    return new CodigoOperacion({
      ...props,
      activo: props.activo ?? true,
      fechaCreacion: props.fechaCreacion ?? new Date(),
      fechaActualizacion: props.fechaActualizacion ?? new Date()
    });
  }

  static fromPersistence(props: CodigoOperacionProps): CodigoOperacion {
    return new CodigoOperacion(props);
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get codigo(): string {
    return this.props.codigo;
  }

  get descripcion(): string {
    return this.props.descripcion;
  }

  get tipoOperacion(): TipoOperacion {
    return this.props.tipoOperacion;
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

  isCredito(): boolean {
    return this.props.tipoOperacion === TipoOperacion.CREDITO;
  }

  isDebito(): boolean {
    return this.props.tipoOperacion === TipoOperacion.DEBITO;
  }

  updateDescripcion(nuevaDescripcion: string): void {
    if (!nuevaDescripcion || nuevaDescripcion.trim().length === 0) {
      throw new Error('La descripción es requerida');
    }

    if (nuevaDescripcion.length > 255) {
      throw new Error('La descripción no puede exceder 255 caracteres');
    }

    this.props.descripcion = nuevaDescripcion;
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
      codigo: this.props.codigo,
      descripcion: this.props.descripcion,
      tipoOperacion: this.props.tipoOperacion,
      fechaCreacion: this.props.fechaCreacion,
      fechaActualizacion: this.props.fechaActualizacion,
      activo: this.props.activo
    };
  }
}