// Tipos de datos para la aplicación Nexa Bank

export interface Cliente {
  id: string
  nombreCompleto: string
  dpi: string
  fechaNacimiento: string
  sexo: string
  paisNacimiento: string
  fechaCreacion: string
  fechaActualizacion: string
}

export interface CuentaSaldo {
  numeroCuenta: string
  nombreCliente: string
  tipoProducto: "Monetario" | "Ahorro"
  tasaInteres: number
  saldo: number
  estatus: string
}

export interface NuevaTransaccion {
  numeroCuenta: string
  codigoOperacion: string
  monto: number
}

export interface RespuestaTransaccion {
  codigo_respuesta: number
  descripcion_respuesta: string
  id_transaccion: string | null
}

export interface Transaccion {
  transaccionId: string
  numeroCuenta: string
  nombreCliente: string
  fechaTransaccion: string
  monto: number
  codigoOperacion: string
  descripcionOperacion: string
  tipoOperacion: "Débito" | "Crédito"
}

export interface DashboardMetrics {
  totalClientes: number
  totalCuentas: number
  transaccionesDelDia: number
  saldoTotal: number
}

export interface CodigoOperacion {
  codigo: string
  descripcion: string
  tipo: "Débito" | "Crédito"
}
