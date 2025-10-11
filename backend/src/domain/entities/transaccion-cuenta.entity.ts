export interface TransaccionCuentaProps {
  id?: string;
  cuentaId: string;
  codigoOperacionId: string;
  monto: number;
  fechaTransaccion: Date;
  fechaCreacion?: Date;
}

export class TransaccionCuenta {
  private constructor(private props: TransaccionCuentaProps) {}

  static create(props: TransaccionCuentaProps): TransaccionCuenta {
    // Validaciones de dominio
    if (!props.cuentaId || props.cuentaId.trim().length === 0) {
      throw new Error('El ID de la cuenta es requerido');
    }

    if (!props.codigoOperacionId || props.codigoOperacionId.trim().length === 0) {
      throw new Error('El código de operación es requerido');
    }

    if (props.monto <= 0) {
      throw new Error('El monto debe ser mayor a cero');
    }

    if (!props.fechaTransaccion) {
      throw new Error('La fecha de transacción es requerida');
    }

    if (props.fechaTransaccion > new Date()) {
      throw new Error('La fecha de transacción no puede ser futura');
    }

    return new TransaccionCuenta({
      ...props,
      fechaCreacion: props.fechaCreacion ?? new Date()
    });
  }

  static fromPersistence(props: TransaccionCuentaProps): TransaccionCuenta {
    return new TransaccionCuenta(props);
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get cuentaId(): string {
    return this.props.cuentaId;
  }

  get codigoOperacionId(): string {
    return this.props.codigoOperacionId;
  }

  get monto(): number {
    return this.props.monto;
  }

  get fechaTransaccion(): Date {
    return this.props.fechaTransaccion;
  }

  get fechaCreacion(): Date | undefined {
    return this.props.fechaCreacion;
  }

  toJSON() {
    return {
      id: this.props.id,
      cuentaId: this.props.cuentaId,
      codigoOperacionId: this.props.codigoOperacionId,
      monto: this.props.monto,
      fechaTransaccion: this.props.fechaTransaccion,
      fechaCreacion: this.props.fechaCreacion
    };
  }
}