import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  deleteTournament,
  getTournamentById,
} from "../../services/tournament.service";

import type {
  Tournament,
} from "../../types/tournament";

import {
  formatCurrency,
  formatDate,
  formatHours,
} from "../../utils/formatters";

export default function TournamentDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [tournament, setTournament] =
    useState<Tournament | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [deleting, setDeleting] =
    useState(false);

  useEffect(() => {
    async function loadTournament() {
      if (!id) {
        setError("Invalid tournament");
        setLoading(false);
        return;
      }

      try {
        const data =
          await getTournamentById(id);

        setTournament(data);
      } catch {
        setError(
          "Could not load tournament"
        );
      } finally {
        setLoading(false);
      }
    }

    loadTournament();
  }, [id]);

  async function handleDelete() {
    if (!id) {
      return;
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this tournament?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      await deleteTournament(id);

      navigate(
        "/tournaments",
        {
          replace: true,
        }
      );
    } catch {
      setError(
        "Could not delete tournament"
      );

      setDeleting(false);
    }
  }

  if (loading) {
    return <p>Loading tournament...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!tournament) {
    return null;
  }

  return (
    <main>
      <header>
        <h1>{tournament.name}</h1>

        <div>
          <button
            type="button"
            onClick={() =>
              navigate(
                "/tournaments"
              )
            }
          >
            Back
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(
                `/tournaments/${tournament.id}/edit`
              )
            }
          >
            Edit
          </button>

          <button
            type="button"
            disabled={deleting}
            onClick={handleDelete}
          >
            {deleting
              ? "Deleting..."
              : "Delete"}
          </button>
        </div>
      </header>

      <section>
        <p>
          Site:{" "}
          {tournament.site?.name ??
            "Unknown"}
        </p>

        <p>
          Format: {tournament.format}
        </p>

        <p>
          Game: {tournament.gameType}
        </p>

        <p>
          Speed: {tournament.speed}
        </p>

        <p>
          Entries: {tournament.entries}
        </p>

        <p>
          Buy-in:{" "}
          {formatCurrency(
            Number(tournament.buyIn)
          )}
        </p>

        <p>
          Fee:{" "}
          {formatCurrency(
            Number(tournament.fee)
          )}
        </p>

        <p>
          Total cost:{" "}
          {formatCurrency(
            Number(
              tournament.totalCost
            )
          )}
        </p>

        <p>
          Prize:{" "}
          {formatCurrency(
            Number(tournament.prize)
          )}
        </p>

        <p>
          Profit:{" "}
          {formatCurrency(
            Number(tournament.profit)
          )}
        </p>

        <p>
          Position:{" "}
          {tournament.position ??
            "—"}
        </p>

        <p>
          Players:{" "}
          {tournament.playersCount ??
            "—"}
        </p>

        <p>
          Started:{" "}
          {formatDate(
            tournament.startedAt
          )}
        </p>

        <p>
          Duration:{" "}
          {tournament.duration
            ? formatHours(
                tournament.duration /
                  3600
              )
            : "—"}
        </p>

        <p>
          Notes:{" "}
          {tournament.notes ??
            "No notes"}
        </p>
      </section>
    </main>
  );
}