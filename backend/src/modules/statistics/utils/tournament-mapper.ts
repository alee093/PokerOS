import type { Tournament } from "@prisma/client";
import type { TournamentStatisticsData } from "../types/tournament-statistics-data.js";

export function mapTournamentToStatisticsData(
  tournament: Tournament
): TournamentStatisticsData {
  return {
    buyIn: tournament.buyIn.toNumber(),

    fee: tournament.fee.toNumber(),

    totalCost: tournament.totalCost.toNumber(),

    prize: tournament.prize.toNumber(),

    bountyCollected: tournament.bountyCollected.toNumber(),

    profit: tournament.profit.toNumber(),

    entries: tournament.entries,

    duration: tournament.duration,

    isITM: tournament.isITM,

    startedAt: tournament.startedAt,
  };
}
export function mapTournamentsToStatisticsData(
  tournaments: Tournament[]
): TournamentStatisticsData[] {
  return tournaments.map(mapTournamentToStatisticsData);
}