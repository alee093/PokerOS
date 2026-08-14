import type {
  BankrollTransaction,
} from "../../../services/bankroll.service";

import {
  formatCurrency,
  formatDate,
} from "../../../utils/formatters";

interface TransactionHistoryProps {
  transactions: BankrollTransaction[];
}

export default function TransactionHistory({
  transactions,
}: TransactionHistoryProps) {
  if (transactions.length === 0) {
    return (
      <section>
        <h2>Transaction History</h2>

        <p>
          No transactions yet.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h2>Transaction History</h2>

      <ul>
        {transactions.map(
          (transaction) => {
            const amount =
              Number(
                transaction.amount
              );

            const signedAmount =
              transaction.type ===
              "DEPOSIT"
                ? amount
                : -amount;

            return (
              <li
                key={
                  transaction.id
                }
              >
                <strong>
                  {
                    transaction.type
                  }
                </strong>

                {" — "}

                {formatCurrency(
                  signedAmount
                )}

                {" — "}

                {formatDate(
                  transaction.createdAt
                )}

                {transaction.description && (
                  <>
                    {" — "}
                    {
                      transaction.description
                    }
                  </>
                )}
              </li>
            );
          }
        )}
      </ul>
    </section>
  );
}