import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

import type { BankrollTransaction } from "../../../services/bankroll.service";
import { formatCurrency, formatDate } from "../../../utils/formatters";

import "./TransactionHistory.css";

interface TransactionHistoryProps {
  transactions: BankrollTransaction[];
}

export default function TransactionHistory({
  transactions,
}: TransactionHistoryProps) {
  return (
    <section className="dashboard-card">
      <h2 className="dashboard-card__title">Transaction History</h2>

      {transactions.length === 0 ? (
        <p className="dashboard-card__empty">No transactions yet.</p>
      ) : (
        <ul className="activity-list">
          {transactions.map((transaction) => {
            const amount = Number(transaction.amount);
            const isDeposit = transaction.type === "DEPOSIT";
            const signedAmount = isDeposit ? amount : -amount;

            return (
              <li key={transaction.id} className="activity-list__item">
                <span
                  className={`activity-list__icon ${
                    isDeposit
                      ? "activity-list__icon--positive"
                      : "activity-list__icon--negative"
                  }`}
                >
                  {isDeposit ? (
                    <ArrowUpCircle size={16} />
                  ) : (
                    <ArrowDownCircle size={16} />
                  )}
                </span>

                <div className="activity-list__body">
                  <strong>
                    {isDeposit ? "Deposit" : "Withdrawal"}
                    {transaction.description
                      ? ` — ${transaction.description}`
                      : ""}
                  </strong>
                  <span className="activity-list__date">
                    {formatDate(transaction.createdAt)}
                  </span>
                </div>

                <span
                  className={
                    isDeposit
                      ? "activity-list__amount text-success"
                      : "activity-list__amount text-danger"
                  }
                >
                  {isDeposit ? "+" : ""}
                  {formatCurrency(signedAmount)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}