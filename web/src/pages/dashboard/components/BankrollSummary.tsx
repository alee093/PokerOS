import { useNavigate } from "react-router-dom";
import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";

import type { DashboardBankroll } from "../../../types/dashboard";
import { formatCurrency } from "../../../utils/formatters";

import "./BankrollSummary.css";

interface BankrollSummaryProps {
  bankroll: DashboardBankroll | null;
}

export default function BankrollSummary({ bankroll }: BankrollSummaryProps) {
  const navigate = useNavigate();

  if (!bankroll) {
    return (
      <section className="dashboard-card">
        <h2 className="dashboard-card__title">Bankroll</h2>

        <p className="dashboard-card__empty">
          You haven't configured your bankroll yet.
        </p>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/bankroll/setup")}
        >
          Set up bankroll
        </button>
      </section>
    );
  }

  return (
    <section className="dashboard-card">
      <div className="bankroll-summary__header">
        <h2 className="dashboard-card__title">Bankroll</h2>

        <button
          type="button"
          className="btn btn-ghost bankroll-summary__manage"
          onClick={() => navigate("/bankroll")}
        >
          Manage
        </button>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-card__label">
            <Wallet size={14} />
            Current
          </span>
          <span className="stat-card__value">
            {formatCurrency(bankroll.current)}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">
            <Wallet size={14} />
            Starting
          </span>
          <span className="stat-card__value">
            {formatCurrency(bankroll.starting)}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">
            <ArrowUpCircle size={14} />
            Deposits
          </span>
          <span className="stat-card__value">
            {formatCurrency(bankroll.deposits)}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">
            <ArrowDownCircle size={14} />
            Withdrawals
          </span>
          <span className="stat-card__value">
            {formatCurrency(bankroll.withdrawals)}
          </span>
        </div>
      </div>
    </section>
  );
}