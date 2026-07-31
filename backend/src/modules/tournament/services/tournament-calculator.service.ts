export function calculateTotalCost(
  buyIn: number,
  fee: number,
  entries: number
): number {
  return (buyIn + fee) * entries;
}

export function calculateProfit(
  prize: number,
  totalCost: number,
  bountyCollected: number
): number {
  return prize + bountyCollected - totalCost;
}

export function calculateITM(
  prize: number,
  bountyCollected: number
): boolean {
  return prize > 0 || bountyCollected > 0;
}

export function calculateDuration(
  startedAt: Date,
  finishedAt?: Date
): number | null {

  if (!finishedAt) {
    return null;
  }

  const milliseconds =
    finishedAt.getTime() - startedAt.getTime();

  return Math.floor(milliseconds / 1000);
}