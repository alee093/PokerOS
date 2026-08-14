import { api } from "./api";

export interface CreateBankrollInput {
  startingBalance: number;
}

export interface CreateBankrollTransactionInput {
  type: "DEPOSIT" | "WITHDRAWAL";
  amount: number;
  description?: string;
}

export interface BankrollSummary {
  startingBalance: number;
  deposits: number;
  withdrawals: number;
  tournamentProfit: number;
  currentBalance: number;
}

export async function createBankroll(
  data: CreateBankrollInput
) {
  const response = await api.post(
    "/bankroll",
    data
  );

  return response.data;
}

export async function getBankroll(): Promise<BankrollSummary> {
  const response = await api.get<BankrollSummary>(
    "/bankroll"
  );

  return response.data;
}

export async function createBankrollTransaction(
  data: CreateBankrollTransactionInput
) {
  const response = await api.post(
    "/bankroll/transactions",
    data
  );

  return response.data;
}