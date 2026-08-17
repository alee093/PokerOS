import { prisma } from "../../lib/prisma.js";

import { getBankrollSummary } from "../bankroll/bankroll.service.js";
import { getStatisticsOverview } from "../statistics/statistics.service.js";

import type { DashboardResponseDto } from "./dto/dashboard-response.dto.js";

export async function getDashboard(
  userId: string
): Promise<DashboardResponseDto> {
  const bankrollConfig = await prisma.bankroll.findUnique({
    where: {
      userId,
    },
  });

  const statistics = await getStatisticsOverview(userId);

  const recentTournaments =
    await prisma.tournament.findMany({
      where: {
        userId,
      },

      orderBy: {
        startedAt: "desc",
      },

      take: 5,

      select: {
        id: true,
        name: true,
        profit: true,
        startedAt: true,
      },
    });

  const tournaments =
    await prisma.tournament.findMany({
      where: {
        userId,
      },

      orderBy: {
        startedAt: "asc",
      },

      select: {
        profit: true,
        startedAt: true,
      },
    });

  let cumulativeProfit = 0;

  const profitHistory =
    tournaments.map((tournament) => {
      const profit = Number(
        tournament.profit
      );

      cumulativeProfit += profit;

      return {
        date: tournament.startedAt,
        profit,
        cumulativeProfit,
      };
    });

  if (!bankrollConfig) {
    return {
      bankroll: null,

      thisMonth:
        statistics.thisMonth,

      lifetime: {
        totalTournaments:
          statistics.lifetime.totalTournaments,

        totalProfit:
          statistics.lifetime.totalProfit,

        roi:
          statistics.lifetime.roi,

        abi:
          statistics.lifetime.abi,

        itm:
          statistics.lifetime.itm,

        hoursPlayed:
          statistics.lifetime.hoursPlayed,
      },

      recentTournaments:
        recentTournaments.map(
          (tournament) => ({
            id: tournament.id,

            name: tournament.name,

            profit:
              Number(tournament.profit),

            startedAt:
              tournament.startedAt,
          })
        ),

      bankrollHistory: [],

      profitHistory,
    };
  }

  const bankroll =
    await getBankrollSummary(userId);

  const transactions =
    await prisma.bankrollTransaction.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: "asc",
      },

      select: {
        type: true,
        amount: true,
        createdAt: true,
      },
    });

  type BankrollEvent = {
    date: Date;
    amount: number;
    type: string;
  };

  const events: BankrollEvent[] = [];

  events.push({
    date: bankrollConfig.createdAt,
    amount: 0,
    type: "INITIAL_BANKROLL",
  });

  for (const tournament of tournaments) {
    events.push({
      date: tournament.startedAt,
      amount: Number(tournament.profit),
      type: "TOURNAMENT",
    });
  }

  for (const transaction of transactions) {
    const amount =
      Number(transaction.amount);

    if (transaction.type === "DEPOSIT") {
      events.push({
        date: transaction.createdAt,
        amount,
        type: transaction.type,
      });
    }

    if (
      transaction.type === "WITHDRAWAL"
    ) {
      events.push({
        date: transaction.createdAt,
        amount: -amount,
        type: transaction.type,
      });
    }
  }

  events.sort(
    (a, b) =>
      a.date.getTime() -
      b.date.getTime()
  );

  let balance =
    bankroll.startingBalance;

  const bankrollHistory =
    events.map((event) => {
      balance += event.amount;

      return {
        date: event.date,
        balance,
        type: event.type,
      };
    });

  return {
    bankroll: {
      current:
        bankroll.currentBalance,

      starting:
        bankroll.startingBalance,

      deposits:
        bankroll.deposits,

      withdrawals:
        bankroll.withdrawals,
    },

    thisMonth:
      statistics.thisMonth,

    lifetime: {
      totalTournaments:
        statistics.lifetime.totalTournaments,

      totalProfit:
        statistics.lifetime.totalProfit,

      roi:
        statistics.lifetime.roi,

      abi:
        statistics.lifetime.abi,

      itm:
        statistics.lifetime.itm,

      hoursPlayed:
        statistics.lifetime.hoursPlayed,
    },

    recentTournaments:
      recentTournaments.map(
        (tournament) => ({
          id: tournament.id,

          name: tournament.name,

          profit:
            Number(tournament.profit),

          startedAt:
            tournament.startedAt,
        })
      ),

    bankrollHistory,

    profitHistory,
  };
}