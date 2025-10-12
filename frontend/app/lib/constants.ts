// Constantes de la aplicación

// Environment-based API configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

// Additional configuration for different environments
export const APP_CONFIG = {
  apiUrl: API_BASE_URL,
  environment: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
}

export const CODIGOS_OPERACION: Array<{
  codigo: string
  descripcion: string
  tipo: "Débito" | "Crédito"
}> = [
  { codigo: "DEP001", descripcion: "Depósito en efectivo", tipo: "Crédito" },
  { codigo: "RET001", descripcion: "Retiro en efectivo", tipo: "Débito" },
  { codigo: "TRF001", descripcion: "Transferencia saliente", tipo: "Débito" },
  { codigo: "TRF002", descripcion: "Transferencia entrante", tipo: "Crédito" },
  { codigo: "PAG001", descripcion: "Pago de servicios", tipo: "Débito" },
  { codigo: "INT001", descripcion: "Intereses ganados", tipo: "Crédito" },
  { codigo: "COM001", descripcion: "Comisión bancaria", tipo: "Débito" },
]

export const TIPOS_PRODUCTO = ["Monetario", "Ahorro"] as const

export const ESTADOS_CUENTA = ["Activa", "Inactiva"] as const
