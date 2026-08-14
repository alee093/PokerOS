import type { BankrollHistoryPoint } from "../../../types/dashboard";

import {
  formatCurrency,
  formatDate,
} from "../../../utils/formatters";

interface BankrollHistoryProps {
  history: BankrollHistoryPoint[];
}

export default function BankrollHistory({
  history,
}: BankrollHistoryProps) {
  return (
    <section>
      <h2>Bankroll History</h2>

      {history.length === 0 ? (
        <p>No bankroll history yet.</p>
      ) : (
        <ul>
          {history.map((point, index) => (
            <li key={`${point.date}-${index}`}>
              {formatDate(point.date)} —{" "}
              {formatCurrency(point.balance)}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}