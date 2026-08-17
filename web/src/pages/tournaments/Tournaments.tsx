import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trophy } from "lucide-react";

import { getTournaments } from "../../services/tournament.service";
import type { Tournament } from "../../types/tournament";
import { formatCurrency, formatDate } from "../../utils/formatters";

import "./Tournaments.css";

export default function Tournaments() {
  const navigate = useNavigate();

  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTournaments() {
      try {
        const data = await getTournaments();
        setTournaments(data);
      } catch {
        setError("Could not load tournaments");
      } finally {
        setLoading(false);
      }
    }

    loadTournaments();
  }, []);

  if (loading) {
    return <p className="dashboard-card__empty">Loading tournaments...</p>;
  }

  if (error) {
    return <p className="dashboard-card__empty">{error}</p>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1 className="dashboard__title">Tournaments</h1>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/tournaments/new")}
        >
          <Plus size={16} />
          Add Tournament
        </button>
      </header>

      {tournaments.length === 0 ? (
        <section className="dashboard-card tournaments-empty">
          <Trophy size={32} className="tournaments-empty__icon" />
          <p className="dashboard-card__empty">
            You haven't added any tournaments yet.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/tournaments/new")}
          >
            Add your first tournament
          </button>
        </section>
      ) : (
        <div className="tournaments-grid">
          {tournaments.map((tournament) => {
            const profit = Number(tournament.profit);
            const isPositive = profit >= 0;

            return (
              <button
                key={tournament.id}
                type="button"
                className="tournament-card"
                onClick={() => navigate(`/tournaments/${tournament.id}`)}
              >
                <div className="tournament-card__header">
                  <h2>{tournament.name}</h2>
                  <span
                    className={
                      isPositive
                        ? "tournament-card__profit text-success"
                        : "tournament-card__profit text-danger"
                    }
                  >
                    {isPositive ? "+" : ""}
                    {formatCurrency(profit)}
                  </span>
                </div>

                <div className="tournament-card__meta">
                  <span>{tournament.site?.name ?? "Unknown site"}</span>
                  <span>•</span>
                  <span>{tournament.format.replace("_", " ")}</span>
                </div>

                <div className="tournament-card__footer">
                  <span>
                    Buy-in {formatCurrency(Number(tournament.totalCost))}
                  </span>
                  <span>{formatDate(tournament.startedAt)}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}