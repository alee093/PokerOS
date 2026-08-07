import { prisma } from "../../lib/prisma.js";

import { getBankrollSummary } from "../bankroll/bankroll.service.js";
import { getStatisticsOverview } from "../statistics/statistics.service.js";

import type { DashboardResponseDto } from "./dto/dashboard-response.dto.js";

export async function getDashboard(
  userId: string
): Promise<DashboardResponseDto> {

  const bankroll = await getBankrollSummary(userId);

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

  /*
   * BANKROLL HISTORY
   */

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

  type BankrollEvent = {
    date: Date;
    amount: number;
  };

  const events: BankrollEvent[] = [];

  /*
   * Tournament profits
   */

  for (const tournament of tournaments) {
    events.push({
      date: tournament.startedAt,
      amount: Number(tournament.profit),
    });
  }

  /*
   * Deposits / withdrawals
   */

  for (const transaction of transactions) {
    const amount = Number(transaction.amount);

    if (transaction.type === "DEPOSIT") {
      events.push({
        date: transaction.createdAt,
        amount,
      });
    }

    if (transaction.type === "WITHDRAWAL") {
      events.push({
        date: transaction.createdAt,
        amount: -amount,
      });
    }
  }

  /*
   * Sort all bankroll events
   */

  events.sort(
    (a, b) =>
      a.date.getTime() -
      b.date.getTime()
  );

  /*
   * Build bankroll history
   */

  let balance = bankroll.startingBalance;

  const bankrollHistory = events.map(
    (event) => {

      balance += event.amount;

      return {
        date: event.date,
        balance,
      };
    }
  );

  return {
    bankroll: {
      current: bankroll.currentBalance,
      starting: bankroll.startingBalance,
      deposits: bankroll.deposits,
      withdrawals: bankroll.withdrawals,
    },

    thisMonth: statistics.thisMonth,

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
  };
}