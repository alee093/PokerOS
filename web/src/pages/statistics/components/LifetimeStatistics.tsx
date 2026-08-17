import {
  Clock,
  CircleDollarSign,
  Coins,
  Percent,
  Receipt,
  Target,
  Trophy,
  Wallet,
  TrendingUp,
} from "lucide-react";

import type { StatisticsLifetime } from "../../../types/statistics";
import {
  formatCurrency,
  formatHours,
  formatPercentage,
} from "../../../utils/formatters";

import "../Statistics.css";

interface LifetimeStatisticsProps {
  data: StatisticsLifetime;
}

export default function LifetimeStatistics({
  data,
}: LifetimeStatisticsProps) {
  const isPositive = data.totalProfit >= 0;

  return (
    <section className="dashboard-card">
      <h2 className="dashboard-card__title">Lifetime</h2>

      <div className="stat-grid stat-grid--3col">
        <div className="stat-card">
          <span className="stat-card__label">
            <Trophy size={14} />
            Tournaments
          </span>
          <span className="stat-card__value">{data.totalTournaments}</span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">
            <Coins size={14} />
            Total Buy-ins
          </span>
          <span className="stat-card__value">
            {formatCurrency(data.totalBuyIns)}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">
            <Receipt size={14} />
            Total Fees
          </span>
          <span className="stat-card__value">
            {formatCurrency(data.totalFees)}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">
            <Wallet size={14} />
            Total Cost
          </span>
          <span className="stat-card__value">
            {formatCurrency(data.totalCost)}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">
            <CircleDollarSign size={14} />
            Total Prizes
          </span>
          <span className="stat-card__value">
            {formatCurrency(data.totalPrize)}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">
            <CircleDollarSign size={14} />
            Total Profit
          </span>
          <span
            className={`stat-card__value ${
              isPositive ? "text-success" : "text-danger"
            }`}
          >
            {formatCurrency(data.totalProfit)}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">
            <TrendingUp size={14} />
            Average Profit
          </span>
          <span className="stat-card__value">
            {formatCurrency(data.averageProfit)}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">
            <Percent size={14} />
            ROI
          </span>
          <span className="stat-card__value">
            {formatPercentage(data.roi)}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">
            <Wallet size={14} />
            ABI
          </span>
          <span className="stat-card__value">
            {formatCurrency(data.abi)}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">
            <Target size={14} />
            ITM
          </span>
          <span className="stat-card__value">
            {formatPercentage(data.itm)}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">
            <Clock size={14} />
            Hours Played
          </span>
          <span className="stat-card__value">
            {formatHours(data.hoursPlayed)}
          </span>
        </div>
      </div>
    </section>
  );
}