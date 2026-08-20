import { Wallet } from "lucide-react";

import type { BankrollHistoryPoint } from "../../../types/dashboard";
import { formatCurrency, formatDate } from "../../../utils/formatters";

import "./BankrollHistory.css";

interface BankrollHistoryProps {
  history: BankrollHistoryPoint[];
}

export default function BankrollHistory({ history }: BankrollHistoryProps) {
  const recentPoints = [...history].reverse().slice(0, 8);

  const formatType = (type: string) => {
    if (type === "INITIAL_BANKROLL") return "Initial Bankroll";
    if (type === "TOURNAMENT") return "Tournament";
    return type
      .toLowerCase()
      .split("_")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  };

  return (
    <section className="dashboard-card">
      <h2 className="dashboard-card__title">Bankroll History</h2>

      {recentPoints.length === 0 ? (
        <p className="dashboard-card__empty">No bankroll history yet.</p>
      ) : (
        <ul className="activity-list">
          {recentPoints.map((point, index) => (
            <li key={`${point.date}-${index}`} className="activity-list__item">
              <span className="activity-list__icon activity-list__icon--positive">
                <Wallet size={16} />
              </span>

              <div className="activity-list__body">
                <strong>{formatType(point.type)}</strong>
                <span className="activity-list__date">
                  {formatDate(point.date)}
                </span>
              </div>

              <span className="activity-list__amount">
                {formatCurrency(point.balance)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}