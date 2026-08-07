import { prisma } from "../../lib/prisma.js";

import { mapTournamentsToStatisticsData } from "./utils/tournament-mapper.js";

import { calculateTotals } from "./utils/calculations/calculate-totals.js";

import { getBankrollSummary } from "../bankroll/bankroll.service.js";

import {
  calculateABI,
  calculateAverageProfit,
  calculateHoursPlayed,
  calculateITM,
  calculateROI,
} from "./utils/calculations/calculate-metrics.js";

import type { StatisticsOverview } from "./types/overview.js";

import { filterCurrentMonth } from "./utils/filter-current-month.js";

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

  const currentMonthData =
    filterCurrentMonth(statisticsData);

  const currentMonthTotals =
    calculateTotals(currentMonthData);  

  const totals =
    calculateTotals(statisticsData);

  const bankroll = await getBankrollSummary(userId);

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
      tournaments: currentMonthTotals.totalTournaments,

      buyIns: currentMonthTotals.totalBuyIns,

      prizes: currentMonthTotals.totalPrize,

      profit: currentMonthTotals.totalProfit,
    },

    bankroll: {
      current: bankroll.currentBalance,

      starting: bankroll.startingBalance,

      deposits: bankroll.deposits,

      withdrawals: bankroll.withdrawals,
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