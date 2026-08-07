import { prisma } from "../../lib/prisma.js";
import { Prisma } from "@prisma/client";

import type { CreateBankrollInput, CreateTransactionInput } from "./bankroll.schema.js";

import type { BankrollSummaryDto } from "./dto/bankroll-summary.dto.js";

import { ConflictError } from "../../errors/ConflictError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";

export async function createBankroll(
  userId: string,
  data: CreateBankrollInput
) {
  const existingBankroll = await prisma.bankroll.findUnique({
    where: {
      userId,
    },
  });

  if (existingBankroll) {
    throw new ConflictError("Bankroll already configured");
  }

  return prisma.bankroll.create({
    data: {
      userId,

      startingBalance: data.startingBalance,
    },
  });
}

export async function getBankrollSummary(
  userId: string
): Promise<BankrollSummaryDto> {
  const bankroll = await prisma.bankroll.findUnique({
    where: {
      userId,
    },
  });

  if (!bankroll) {
    throw new NotFoundError("Bankroll not configured");
  }

  const transactions = await prisma.bankrollTransaction.findMany({
    where: {
      userId,
    },
  });

  const profitResult = await prisma.tournament.aggregate({
    where: {
      userId,
    },
    _sum: {
      profit: true,
    },
  });

  const tournamentProfit = Number(
    profitResult._sum.profit ?? new Prisma.Decimal(0)
  );

  const { deposits, withdrawals } = transactions.reduce(
    (acc, transaction) => {
      const amount = Number(transaction.amount);

      if (transaction.type === "DEPOSIT") {
        acc.deposits += amount;
      } else if (transaction.type === "WITHDRAWAL") {
        acc.withdrawals += amount;
      }

      return acc;
    },
    {
      deposits: 0,
      withdrawals: 0,
    }
  );

  const startingBalance = Number(bankroll.startingBalance);

  const currentBalance =
    startingBalance +
    deposits -
    withdrawals +
    tournamentProfit;

  return {
    startingBalance,
    deposits,
    withdrawals,
    tournamentProfit,
    currentBalance,
  };
}

export async function createTransaction(
  userId: string,
  data: CreateTransactionInput
) {
  const bankroll = await prisma.bankroll.findUnique({
    where: {
      userId,
    },
  });

  if (!bankroll) {
    throw new NotFoundError("Bankroll not configured");
  }

  return prisma.bankrollTransaction.create({
    data: {
      userId,

      type: data.type,

      amount: data.amount,

      ...(data.description !== undefined && {
        description: data.description,
      }),
    },
  });
}