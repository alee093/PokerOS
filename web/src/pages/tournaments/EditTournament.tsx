import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import {
  getTournamentById,
  updateTournament,
} from "../../services/tournament.service";
import type { CreateTournamentInput, Tournament } from "../../types/tournament";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

import TournamentForm from "./components/TournamentForm";

import "./Tournaments.css";

export default function EditTournament() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  async function handleSubmit(data: CreateTournamentInput) {
    if (!id) {
      return;
    }

    try {
      setSaving(true);
      setError(null);

      await updateTournament(id, data);

      navigate(`/tournaments/${id}`, { replace: true });
    } catch (error) {
      setError(getApiErrorMessage(error, "Could not update tournament"));
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="dashboard-card__empty">Loading tournament...</p>;
  }

  if (error && !tournament) {
    return <p className="dashboard-card__empty">{error}</p>;
  }

  if (!tournament) {
    return null;
  }

  const initialValues: CreateTournamentInput = {
    siteId: tournament.siteId,
    name: tournament.name,
    format: tournament.format,
    gameType: tournament.gameType,
    speed: tournament.speed,
    currency: tournament.currency,
    entries: tournament.entries,
    buyIn: Number(tournament.buyIn),
    fee: Number(tournament.fee),
    isBounty: tournament.isBounty,
    bountyCollected: Number(tournament.bountyCollected),
    prize: Number(tournament.prize),
    ...(tournament.position !== null && { position: tournament.position }),
    ...(tournament.playersCount !== null && {
      playersCount: tournament.playersCount,
    }),
    startedAt: tournament.startedAt,
    ...(tournament.finishedAt && { finishedAt: tournament.finishedAt }),
    ...(tournament.notes && { notes: tournament.notes }),
  };

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1 className="dashboard__title">Edit Tournament</h1>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate(`/tournaments/${tournament.id}`)}
        >
          <ArrowLeft size={16} />
          Cancel
        </button>
      </header>

      <section className="dashboard-card">
        {error && <p className="auth-form__error">{error}</p>}

        <TournamentForm
          initialValues={initialValues}
          submitLabel="Save changes"
          loading={saving}
          onSubmit={handleSubmit}
        />
      </section>
    </div>
  );
}