import { prisma } from "../../lib/prisma.js";

import { mapTournamentsToStatisticsData } from "./utils/tournament-mapper.js";

import { calculateTotals } from "./utils/calculations/calculate-totals.js";

import {
  calculateABI,
  calculateAverageProfit,
  calculateHoursPlayed,
  calculateITM,
  calculateROI,
} from "./utils/calculations/calculate-metrics.js";

import type { StatisticsOverview } from "./types/overview.js";

export async function getStatisticsOverview(
  userId: string
): Promise<StatisticsOverview> {
  const tournaments = await prisma.tournament.findMany({
    where: {
      userId,
    },
  });

  const statisticsData =
    mapTournamentsToStatisticsData(tournaments);

  const totals =
    calculateTotals(statisticsData);

  const roi = calculateROI(
    totals.totalProfit,
    totals.totalCost
  );

  const abi = calculateABI(
    totals.totalCost,
    totals.totalTournaments
  );

  const itm = calculateITM(
    statisticsData
  );

  const averageProfit =
    calculateAverageProfit(
      totals.totalProfit,
      totals.totalTournaments
    );

  const hoursPlayed =
    calculateHoursPlayed(
      statisticsData
    );

  return {
    thisMonth: {
      tournaments: 0,
      buyIns: 0,
      prizes: 0,
      profit: 0,
    },

    bankroll: {
      current: 0,
      starting: 0,
      deposits: 0,
      withdrawals: 0,
    },

    lifetime: {
      totalTournaments: totals.totalTournaments,

      totalBuyIns: totals.totalBuyIns,

      totalFees: totals.totalFees,

      totalCost: totals.totalCost,

      totalPrize: totals.totalPrize,

      totalProfit: totals.totalProfit,

      averageProfit,

      roi,

      abi,

      itm,

      hoursPlayed,
    },
  };
}