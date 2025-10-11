export enum Sexo {
  MASCULINO = 'MASCULINO',
  FEMENINO = 'FEMENINO'
}

export interface ClienteProps {
  id?: string;
  nombreCompleto: string;
  dpi: string;
  fechaNacimiento: Date;
  sexo: Sexo;
  paisNacimiento: string;
  activo?: boolean;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
}

export class Cliente {
  private constructor(private props: ClienteProps) {}

  static create(props: ClienteProps): Cliente {
    // Validaciones de dominio
    if (!props.nombreCompleto || props.nombreCompleto.trim().length === 0) {
      throw new Error('El nombre completo es requerido');
    }

    if (!props.dpi || props.dpi.trim().length === 0) {
      throw new Error('El DPI es requerido');
    }

    if (props.dpi.length > 20) {
      throw new Error('El DPI no puede exceder 20 caracteres');
    }

    if (!props.fechaNacimiento) {
      throw new Error('La fecha de nacimiento es requerida');
    }

    if (props.fechaNacimiento > new Date()) {
      throw new Error('La fecha de nacimiento no puede ser futura');
    }

    if (!props.paisNacimiento || props.paisNacimiento.trim().length === 0) {
      throw new Error('El país de nacimiento es requerido');
    }

    return new Cliente({
      ...props,
      activo: props.activo ?? true,
      fechaCreacion: props.fechaCreacion ?? new Date(),
      fechaActualizacion: props.fechaActualizacion ?? new Date()
    });
  }

  static fromPersistence(props: ClienteProps): Cliente {
    return new Cliente(props);
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get nombreCompleto(): string {
    return this.props.nombreCompleto;
  }

  get dpi(): string {
    return this.props.dpi;
  }

  get fechaNacimiento(): Date {
    return this.props.fechaNacimiento;
  }

  get sexo(): Sexo {
    return this.props.sexo;
  }

  get paisNacimiento(): string {
    return this.props.paisNacimiento;
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

  updateNombreCompleto(nombreCompleto: string): void {
    if (!nombreCompleto || nombreCompleto.trim().length === 0) {
      throw new Error('El nombre completo es requerido');
    }
    this.props.nombreCompleto = nombreCompleto;
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
      nombreCompleto: this.props.nombreCompleto,
      dpi: this.props.dpi,
      fechaNacimiento: this.props.fechaNacimiento,
      sexo: this.props.sexo,
      paisNacimiento: this.props.paisNacimiento,
      fechaCreacion: this.props.fechaCreacion,
      fechaActualizacion: this.props.fechaActualizacion,
      activo: this.props.activo
    };
  }
}