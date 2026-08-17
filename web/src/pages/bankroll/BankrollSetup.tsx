import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Wallet } from "lucide-react";

import { createBankroll } from "../../services/bankroll.service";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

import "./BankrollSetup.css";

export default function BankrollSetup() {
  const navigate = useNavigate();

  const [startingBalance, setStartingBalance] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const amount = Number(startingBalance);

    if (Number.isNaN(amount) || amount <= 0) {
      setError("Starting balance must be greater than zero");
      return;
    }

    try {
      setLoading(true);

      await createBankroll({ startingBalance: amount });

      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError(getApiErrorMessage(error, "Could not configure bankroll"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bankroll-setup">
      <section className="bankroll-setup__card">
        <div className="bankroll-setup__icon">
          <Wallet size={28} />
        </div>

        <h1 className="bankroll-setup__title">Set Up Your Bankroll</h1>
        <p className="bankroll-setup__subtitle">
          Enter the amount you're starting PokerOS with.
        </p>

        <form className="bankroll-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="startingBalance">Starting balance</label>
            <input
              id="startingBalance"
              type="number"
              min="0"
              step="0.01"
              value={startingBalance}
              onChange={(event) => setStartingBalance(event.target.value)}
              placeholder="0.00"
              required
            />
          </div>

          {error && <p className="auth-form__error">{error}</p>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Setting up..." : "Set up bankroll"}
          </button>
        </form>
      </section>
    </div>
  );
}