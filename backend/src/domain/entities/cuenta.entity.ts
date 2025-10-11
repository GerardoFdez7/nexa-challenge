export enum EstatusCuenta {
  ACTIVA = 'ACTIVA',
  INACTIVA = 'INACTIVA'
}

export interface CuentaProps {
  id?: string;
  numeroCuenta: string;
  clienteId: string;
  productoId: string;
  estatus: EstatusCuenta;
  saldo: number;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
}

export class Cuenta {
  private constructor(private props: CuentaProps) {}

  static create(props: CuentaProps): Cuenta {
    // Validaciones de dominio
    if (!props.numeroCuenta || props.numeroCuenta.trim().length === 0) {
      throw new Error('El número de cuenta es requerido');
    }

    if (props.numeroCuenta.length > 20) {
      throw new Error('El número de cuenta no puede exceder 20 caracteres');
    }

    if (!props.clienteId || props.clienteId.trim().length === 0) {
      throw new Error('El ID del cliente es requerido');
    }

    if (!props.productoId || props.productoId.trim().length === 0) {
      throw new Error('El ID del producto es requerido');
    }

    if (props.saldo < 0) {
      throw new Error('El saldo no puede ser negativo');
    }

    if (!Object.values(EstatusCuenta).includes(props.estatus)) {
      throw new Error('Estatus de cuenta inválido');
    }

    return new Cuenta({
      ...props,
      saldo: props.saldo ?? 0,
      fechaCreacion: props.fechaCreacion ?? new Date(),
      fechaActualizacion: props.fechaActualizacion ?? new Date()
    });
  }

  static fromPersistence(props: CuentaProps): Cuenta {
    return new Cuenta(props);
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get numeroCuenta(): string {
    return this.props.numeroCuenta;
  }

  get clienteId(): string {
    return this.props.clienteId;
  }

  get productoId(): string {
    return this.props.productoId;
  }

  get estatus(): EstatusCuenta {
    return this.props.estatus;
  }

  get saldo(): number {
    return this.props.saldo;
  }

  get fechaCreacion(): Date | undefined {
    return this.props.fechaCreacion;
  }

  get fechaActualizacion(): Date | undefined {
    return this.props.fechaActualizacion;
  }

  isActiva(): boolean {
    return this.props.estatus === EstatusCuenta.ACTIVA;
  }

  tieneFondosSuficientes(monto: number): boolean {
    return this.props.saldo >= monto;
  }

  debitar(monto: number): void {
    if (monto <= 0) {
      throw new Error('El monto a debitar debe ser mayor a cero');
    }

    if (!this.isActiva()) {
      throw new Error('No se puede debitar de una cuenta inactiva');
    }

    if (!this.tieneFondosSuficientes(monto)) {
      throw new Error('Fondos insuficientes para realizar la transacción');
    }

    this.props.saldo -= monto;
    this.props.fechaActualizacion = new Date();
  }

  acreditar(monto: number): void {
    if (monto <= 0) {
      throw new Error('El monto a acreditar debe ser mayor a cero');
    }

    if (!this.isActiva()) {
      throw new Error('No se puede acreditar a una cuenta inactiva');
    }

    this.props.saldo += monto;
    this.props.fechaActualizacion = new Date();
  }

  activar(): void {
    this.props.estatus = EstatusCuenta.ACTIVA;
    this.props.fechaActualizacion = new Date();
  }

  desactivar(): void {
    this.props.estatus = EstatusCuenta.INACTIVA;
    this.props.fechaActualizacion = new Date();
  }

  toJSON() {
    return {
      id: this.props.id,
      numeroCuenta: this.props.numeroCuenta,
      clienteId: this.props.clienteId,
      productoId: this.props.productoId,
      estatus: this.props.estatus,
      saldo: this.props.saldo,
      fechaCreacion: this.props.fechaCreacion,
      fechaActualizacion: this.props.fechaActualizacion
    };
  }
}