import { CircleDollarSign, Coins, Trophy, TrendingDown, TrendingUp } from "lucide-react";

import type { DashboardThisMonth } from "../../../types/dashboard";
import { formatCurrency } from "../../../utils/formatters";

import "./MonthlySummary.css";

interface MonthlySummaryProps {
  thisMonth: DashboardThisMonth;
}

export default function MonthlySummary({ thisMonth }: MonthlySummaryProps) {
  const isPositive = thisMonth.profit >= 0;

  return (
    <section className="dashboard-card">
      <h2 className="dashboard-card__title">This Month</h2>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-card__label">
            <Trophy size={14} />
            Tournaments
          </span>
          <span className="stat-card__value">{thisMonth.tournaments}</span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">
            <Coins size={14} />
            Buy-ins
          </span>
          <span className="stat-card__value">
            {formatCurrency(thisMonth.buyIns)}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">
            <CircleDollarSign size={14} />
            Prizes
          </span>
          <span className="stat-card__value">
            {formatCurrency(thisMonth.prizes)}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            Profit
          </span>
          <span
            className={`stat-card__value ${
              isPositive ? "text-success" : "text-danger"
            }`}
          >
            {formatCurrency(thisMonth.profit)}
          </span>
        </div>
      </div>
    </section>
  );
}