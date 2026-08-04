import type { BankrollStatistics } from "./bankroll.js";
import type { LifetimeStatistics } from "./lifetime.js";
import type { ThisMonthStatistics } from "./this-month.js";

export interface StatisticsOverview {
  thisMonth: ThisMonthStatistics;
  bankroll: BankrollStatistics;
  lifetime: LifetimeStatistics;
}