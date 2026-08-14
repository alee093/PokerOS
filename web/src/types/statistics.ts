export interface StatisticsThisMonth {
  tournaments: number;
  buyIns: number;
  prizes: number;
  profit: number;
}

export interface StatisticsBankroll {
  current: number;
  starting: number;
  deposits: number;
  withdrawals: number;
}

export interface StatisticsLifetime {
  totalTournaments: number;
  totalBuyIns: number;
  totalFees: number;
  totalCost: number;
  totalPrize: number;
  totalProfit: number;
  averageProfit: number;
  roi: number;
  abi: number;
  itm: number;
  hoursPlayed: number;
}

export interface StatisticsOverview {
  thisMonth: StatisticsThisMonth;
  bankroll: StatisticsBankroll;
  lifetime: StatisticsLifetime;
}