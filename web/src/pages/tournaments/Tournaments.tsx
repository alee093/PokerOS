import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  getTournaments,
} from "../../services/tournament.service";

import type {
  Tournament,
} from "../../types/tournament";

import {
  formatCurrency,
  formatDate,
} from "../../utils/formatters";

export default function Tournaments() {
  const navigate = useNavigate();

  const [tournaments, setTournaments] =
    useState<Tournament[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadTournaments() {
      try {
        const data = await getTournaments();

        setTournaments(data);
      } catch {
        setError(
          "Could not load tournaments"
        );
      } finally {
        setLoading(false);
      }
    }

    loadTournaments();
  }, []);

  if (loading) {
    return <p>Loading tournaments...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <header>
        <h1>Tournaments</h1>

        <div>
          <button
            type="button"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            Back to dashboard
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/tournaments/new"
              )
            }
          >
            Add tournament
          </button>
        </div>
      </header>

      {tournaments.length === 0 ? (
        <section>
          <p>
            You haven't added any tournaments yet.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/tournaments/new"
              )
            }
          >
            Add your first tournament
          </button>
        </section>
      ) : (
        <section>
          <ul>
            {tournaments.map(
              (tournament) => (
                <li key={tournament.id}>
                  <h2>
                    {tournament.name}
                  </h2>

                  <p>
                    Site:{" "}
                    {tournament.site?.name ??
                      "Unknown"}
                  </p>

                  <p>
                    Format:{" "}
                    {tournament.format}
                  </p>

                  <p>
                    Buy-in:{" "}
                    {formatCurrency(
                      Number(
                        tournament.totalCost
                      )
                    )}
                  </p>

                  <p>
                    Profit:{" "}
                    {formatCurrency(
                      Number(
                        tournament.profit
                      )
                    )}
                  </p>

                  <p>
                    Date:{" "}
                    {formatDate(
                      tournament.startedAt
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/tournaments/${tournament.id}`
                      )
                    }
                  >
                    View details
                  </button>
                </li>
              )
            )}
          </ul>
        </section>
      )}
    </main>
  );
}