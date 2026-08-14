import type { RecentTournament } from "../../../types/dashboard";

import {
  formatCurrency,
  formatDate,
} from "../../../utils/formatters";

interface RecentTournamentsProps {
  tournaments: RecentTournament[];
}

export default function RecentTournaments({
  tournaments,
}: RecentTournamentsProps) {
  return (
    <section>
      <h2>Recent Tournaments</h2>

      {tournaments.length === 0 ? (
        <p>No tournaments yet.</p>
      ) : (
        <ul>
          {tournaments.map((tournament) => (
            <li key={tournament.id}>
              <strong>{tournament.name}</strong>

              <span>
                {" "}
                — {formatCurrency(tournament.profit)}
              </span>

              <span>
                {" "}
                — {formatDate(tournament.startedAt)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}