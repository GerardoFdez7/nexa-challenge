// Utilidades de formateo

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ",
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-GT", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
}

export function formatShortDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-GT", {
    month: "short",
    day: "numeric",
  })
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleString("es-GT", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
}

export function formatPercentage(value: number | string | null | undefined): string {
  // Convertir a número y manejar valores nulos/undefined
  const numValue = Number(value);
  
  // Si no es un número válido, retornar 0%
  if (isNaN(numValue)) {
    return "0.00%";
  }
  
  return `${numValue.toFixed(2)}%`;
}

export function formatAccountNumber(accountNumber: string): string {
  // Formatea el número de cuenta en grupos de 4 dígitos
  return accountNumber.replace(/(\d{4})(?=\d)/g, "$1-")
}
