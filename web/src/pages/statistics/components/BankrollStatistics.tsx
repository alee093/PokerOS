import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";

import type { StatisticsBankroll } from "../../../types/statistics";
import { formatCurrency } from "../../../utils/formatters";

import "../Statistics.css";

interface BankrollStatisticsProps {
  data: StatisticsBankroll;
}

export default function BankrollStatistics({ data }: BankrollStatisticsProps) {
  return (
    <section className="dashboard-card">
      <h2 className="dashboard-card__title">Bankroll</h2>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-card__label">
            <Wallet size={14} />
            Current
          </span>
          <span className="stat-card__value">
            {formatCurrency(data.current)}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">
            <Wallet size={14} />
            Starting
          </span>
          <span className="stat-card__value">
            {formatCurrency(data.starting)}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">
            <ArrowUpCircle size={14} />
            Deposits
          </span>
          <span className="stat-card__value">
            {formatCurrency(data.deposits)}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">
            <ArrowDownCircle size={14} />
            Withdrawals
          </span>
          <span className="stat-card__value">
            {formatCurrency(data.withdrawals)}
          </span>
        </div>
      </div>
    </section>
  );
}