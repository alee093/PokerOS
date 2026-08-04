import type { TournamentStatisticsData } from "../../types/tournament-statistics-data.js";

export function calculateROI(
  totalProfit: number,
  totalCost: number
): number {
  if (totalCost === 0) {
    return 0;
  }

  return (totalProfit / totalCost) * 100;
}

export function calculateABI(
  totalCost: number,
  totalTournaments: number
): number {
  if (totalTournaments === 0) {
    return 0;
  }

  return totalCost / totalTournaments;
}

export function calculateAverageProfit(
  totalProfit: number,
  totalTournaments: number
): number {
  if (totalTournaments === 0) {
    return 0;
  }

  return totalProfit / totalTournaments;
}

export function calculateITM(
  tournaments: TournamentStatisticsData[]
): number {

  if (tournaments.length === 0) {
    return 0;
  }

  const itmTournaments =
    tournaments.filter(
      tournament => tournament.isITM
    ).length;

  return (itmTournaments / tournaments.length) * 100;
}

export function calculateHoursPlayed(
  tournaments: TournamentStatisticsData[]
): number {

  let totalSeconds = 0;

  for (const tournament of tournaments) {
    totalSeconds += tournament.duration ?? 0;
  }

  return totalSeconds / 3600;
}