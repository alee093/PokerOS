import { Clock, CircleDollarSign, Percent, Target, Trophy, Wallet } from "lucide-react";

import type { DashboardLifetime } from "../../../types/dashboard";
import {
  formatCurrency,
  formatHours,
  formatPercentage,
} from "../../../utils/formatters";

import "./LifetimeStats.css";

interface LifetimeStatsProps {
  lifetime: DashboardLifetime;
}

export default function LifetimeStats({ lifetime }: LifetimeStatsProps) {
  const isPositive = lifetime.totalProfit >= 0;

  return (
    <section className="dashboard-card">
      <h2 className="dashboard-card__title">Lifetime</h2>

      <div className="stat-grid stat-grid--3col">
        <div className="stat-card">
          <span className="stat-card__label">
            <Trophy size={14} />
            Tournaments
          </span>
          <span className="stat-card__value">
            {lifetime.totalTournaments}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">
            <CircleDollarSign size={14} />
            Profit
          </span>
          <span
            className={`stat-card__value ${
              isPositive ? "text-success" : "text-danger"
            }`}
          >
            {formatCurrency(lifetime.totalProfit)}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">
            <Percent size={14} />
            ROI
          </span>
          <span className="stat-card__value">
            {formatPercentage(lifetime.roi)}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">
            <Wallet size={14} />
            ABI
          </span>
          <span className="stat-card__value">
            {formatCurrency(lifetime.abi)}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">
            <Target size={14} />
            ITM
          </span>
          <span className="stat-card__value">
            {formatPercentage(lifetime.itm)}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">
            <Clock size={14} />
            Hours Played
          </span>
          <span className="stat-card__value">
            {formatHours(lifetime.hoursPlayed)}
          </span>
        </div>
      </div>
    </section>
  );
}