import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createBankroll } from "../../services/bankroll.service";

export default function BankrollSetup() {
  const navigate = useNavigate();

  const [startingBalance, setStartingBalance] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError(null);

    const amount = Number(startingBalance);

    if (
      Number.isNaN(amount) ||
      amount <= 0
    ) {
      setError(
        "Starting balance must be greater than zero"
      );

      return;
    }

    try {
      setLoading(true);

      await createBankroll({
        startingBalance: amount,
      });

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error: any) {
      setError(
        error.response?.data?.message ??
          "Could not configure bankroll"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Set up your bankroll</h1>

      <p>
        Enter the amount you're starting
        PokerOS with.
      </p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="startingBalance">
            Starting balance
          </label>

          <input
            id="startingBalance"
            type="number"
            min="0"
            step="0.01"
            value={startingBalance}
            onChange={(event) =>
              setStartingBalance(
                event.target.value
              )
            }
            required
          />
        </div>

        {error && <p>{error}</p>}

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Setting up..."
            : "Set up bankroll"}
        </button>
      </form>
    </main>
  );
}