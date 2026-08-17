import { Trophy } from "lucide-react";

import type { RecentTournament } from "../../../types/dashboard";
import { formatCurrency, formatDate } from "../../../utils/formatters";

import "./RecentTournaments.css";

interface RecentTournamentsProps {
  tournaments: RecentTournament[];
}

export default function RecentTournaments({
  tournaments,
}: RecentTournamentsProps) {
  return (
    <section className="dashboard-card">
      <h2 className="dashboard-card__title">Recent Tournaments</h2>

      {tournaments.length === 0 ? (
        <p className="dashboard-card__empty">No tournaments yet.</p>
      ) : (
        <ul className="activity-list">
          {tournaments.map((tournament) => {
            const isPositive = tournament.profit >= 0;

            return (
              <li key={tournament.id} className="activity-list__item">
                <span
                  className={`activity-list__icon ${
                    isPositive
                      ? "activity-list__icon--positive"
                      : "activity-list__icon--negative"
                  }`}
                >
                  <Trophy size={16} />
                </span>

                <div className="activity-list__body">
                  <strong>{tournament.name}</strong>
                  <span className="activity-list__date">
                    {formatDate(tournament.startedAt)}
                  </span>
                </div>

                <span
                  className={
                    isPositive
                      ? "activity-list__amount text-success"
                      : "activity-list__amount text-danger"
                  }
                >
                  {isPositive ? "+" : ""}
                  {formatCurrency(tournament.profit)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}