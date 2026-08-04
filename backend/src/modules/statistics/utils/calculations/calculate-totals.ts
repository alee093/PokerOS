import type { TournamentStatisticsData } from "../../types/tournament-statistics-data.js";
import type { TotalsStatistics } from "../../types/totals.js";

export function calculateTotals(
  tournaments: TournamentStatisticsData[]
): TotalsStatistics {

  let totalBuyIns = 0;
  let totalFees = 0;
  let totalCost = 0;
  let totalPrize = 0;
  let totalProfit = 0;

  for (const tournament of tournaments) {

    totalBuyIns += tournament.buyIn * tournament.entries;

    totalFees += tournament.fee * tournament.entries;

    totalCost += tournament.totalCost;

    totalPrize +=
      tournament.prize +
      tournament.bountyCollected;

    totalProfit += tournament.profit;
  }

  return {
    totalTournaments: tournaments.length,

    totalBuyIns,

    totalFees,

    totalCost,

    totalPrize,

    totalProfit,
  };
}