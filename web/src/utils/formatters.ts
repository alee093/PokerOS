export function formatCurrency(
  value: number,
  currency = "USD"
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercentage(
  value: number
): string {
  return `${value.toFixed(2)}%`;
}

export function formatDate(
  value: string | Date
): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

export function formatHours(
  value: number
): string {
  if (value === 1) {
    return "1 hour";
  }

  return `${value.toFixed(1)} hours`;
}