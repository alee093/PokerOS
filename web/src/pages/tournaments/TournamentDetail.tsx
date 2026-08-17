import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";

import {
  deleteTournament,
  getTournamentById,
} from "../../services/tournament.service";
import type { Tournament } from "../../types/tournament";
import {
  formatCurrency,
  formatDate,
  formatHours,
} from "../../utils/formatters";

import "./Tournaments.css";

export default function TournamentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function loadTournament() {
      if (!id) {
        setError("Invalid tournament");
        setLoading(false);
        return;
      }

      try {
        const data = await getTournamentById(id);
        setTournament(data);
      } catch {
        setError("Could not load tournament");
      } finally {
        setLoading(false);
      }
    }

    loadTournament();
  }, [id]);

  async function handleDelete() {
    if (!id) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this tournament?"
    );
    if (!confirmed) return;

    try {
      setDeleting(true);
      await deleteTournament(id);
      navigate("/tournaments", { replace: true });
    } catch {
      setError("Could not delete tournament");
      setDeleting(false);
    }
  }

  if (loading) {
    return <p className="dashboard-card__empty">Loading tournament...</p>;
  }

  if (error) {
    return <p className="dashboard-card__empty">{error}</p>;
  }

  if (!tournament) {
    return null;
  }

  const profit = Number(tournament.profit);
  const isPositive = profit >= 0;

  const DETAILS: Array<[string, string]> = [
    ["Site", tournament.site?.name ?? "Unknown"],
    ["Format", tournament.format.replace("_", " ")],
    ["Game", tournament.gameType],
    ["Speed", tournament.speed],
    ["Entries", String(tournament.entries)],
    ["Buy-in", formatCurrency(Number(tournament.buyIn))],
    ["Fee", formatCurrency(Number(tournament.fee))],
    ["Total cost", formatCurrency(Number(tournament.totalCost))],
    ["Prize", formatCurrency(Number(tournament.prize))],
    ["Position", tournament.position ? String(tournament.position) : "—"],
    [
      "Players",
      tournament.playersCount ? String(tournament.playersCount) : "—",
    ],
    ["Started", formatDate(tournament.startedAt)],
    [
      "Duration",
      tournament.duration ? formatHours(tournament.duration / 3600) : "—",
    ],
  ];

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1 className="dashboard__title">{tournament.name}</h1>

        <div className="dashboard__header-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/tournaments")}
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(`/tournaments/${tournament.id}/edit`)}
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            type="button"
            className="btn btn-secondary tournament-detail__delete"
            disabled={deleting}
            onClick={handleDelete}
          >
            <Trash2 size={16} />
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </header>

      <section className="dashboard-card">
        <div className="tournament-detail__profit">
          <span className="stat-card__label">Profit</span>
          <span
            className={`tournament-detail__profit-value ${
              isPositive ? "text-success" : "text-danger"
            }`}
          >
            {isPositive ? "+" : ""}
            {formatCurrency(profit)}
          </span>
        </div>

        <dl className="tournament-detail__grid">
          {DETAILS.map(([label, value]) => (
            <div key={label} className="tournament-detail__row">
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        {tournament.notes && (
          <div className="tournament-detail__notes">
            <span className="stat-card__label">Notes</span>
            <p>{tournament.notes}</p>
          </div>
        )}
      </section>
    </div>
  );
}