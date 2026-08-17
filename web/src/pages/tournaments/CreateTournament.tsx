import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { createTournament } from "../../services/tournament.service";
import type { CreateTournamentInput } from "../../types/tournament";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

import TournamentForm from "./components/TournamentForm";

import "./Tournaments.css";

export default function CreateTournament() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(data: CreateTournamentInput) {
    try {
      setLoading(true);
      setError(null);

      await createTournament(data);

      navigate("/tournaments", { replace: true });
    } catch (error) {
      setError(getApiErrorMessage(error, "Could not create tournament"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1 className="dashboard__title">Add Tournament</h1>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/tournaments")}
        >
          <ArrowLeft size={16} />
          Cancel
        </button>
      </header>

      <section className="dashboard-card">
        {error && <p className="auth-form__error">{error}</p>}

        <TournamentForm
          submitLabel="Create tournament"
          loading={loading}
          onSubmit={handleSubmit}
        />
      </section>
    </div>
  );
}