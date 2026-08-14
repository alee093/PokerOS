import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createTournament } from "../../services/tournament.service";

import type { CreateTournamentInput } from "../../types/tournament";

import TournamentForm from "./components/TournamentForm";

export default function CreateTournament() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function handleSubmit(
    data: CreateTournamentInput
  ) {
    try {
      setLoading(true);
      setError(null);

      await createTournament(data);

      navigate("/tournaments", {
        replace: true,
      });
    } catch (error: any) {
      setError(
        error.response?.data?.message ??
          "Could not create tournament"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <header>
        <h1>Add Tournament</h1>

        <button
          type="button"
          onClick={() =>
            navigate("/tournaments")
          }
        >
          Cancel
        </button>
      </header>

      {error && <p>{error}</p>}

      <TournamentForm
        submitLabel="Create tournament"
        loading={loading}
        onSubmit={handleSubmit}
      />
    </main>
  );
}