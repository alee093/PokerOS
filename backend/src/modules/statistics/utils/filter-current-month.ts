import type { TournamentStatisticsData } from "../types/tournament-statistics-data.js";

export function filterCurrentMonth(
  tournaments: TournamentStatisticsData[]
): TournamentStatisticsData[] {

  const now = new Date();

  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return tournaments.filter((tournament) => {

    const date = tournament.startedAt;

    return (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );
  });
}