// Utilidades de validación

export function isValidAccountNumber(accountNumber: string): boolean {
  // Valida que el número de cuenta tenga el formato correcto
  // Asumiendo que debe ser numérico y tener entre 10-16 dígitos
  const regex = /^\d{10,16}$/
  return regex.test(accountNumber.replace(/-/g, ""))
}

export function isValidAmount(amount: number): boolean {
  return amount > 0 && Number.isFinite(amount)
}

export function isValidDPI(dpi: string): boolean {
  // DPI guatemalteco tiene 13 dígitos
  const regex = /^\d{13}$/
  return regex.test(dpi.replace(/\s/g, ""))
}

export function isValidDateRange(fechaInicio: string, fechaFin: string): boolean {
  const inicio = new Date(fechaInicio)
  const fin = new Date(fechaFin)
  return inicio <= fin
}
