import { CircleDollarSign, Coins, Trophy, TrendingUp } from "lucide-react";

import type { StatisticsThisMonth } from "../../../types/statistics";
import { formatCurrency } from "../../../utils/formatters";

import "../Statistics.css";

interface MonthlyStatisticsProps {
  data: StatisticsThisMonth;
}

export default function MonthlyStatistics({ data }: MonthlyStatisticsProps) {
  const isPositive = data.profit >= 0;

  return (
    <section className="dashboard-card">
      <h2 className="dashboard-card__title">This Month</h2>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-card__label">
            <Trophy size={14} />
            Tournaments
          </span>
          <span className="stat-card__value">{data.tournaments}</span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">
            <Coins size={14} />
            Buy-ins
          </span>
          <span className="stat-card__value">
            {formatCurrency(data.buyIns)}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">
            <CircleDollarSign size={14} />
            Prizes
          </span>
          <span className="stat-card__value">
            {formatCurrency(data.prizes)}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">
            <TrendingUp size={14} />
            Profit
          </span>
          <span
            className={`stat-card__value ${
              isPositive ? "text-success" : "text-danger"
            }`}
          >
            {formatCurrency(data.profit)}
          </span>
        </div>
      </div>
    </section>
  );
}