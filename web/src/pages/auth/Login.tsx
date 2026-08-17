import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Lock, Mail } from "lucide-react";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import { GoogleIcon, DiscordIcon } from "../../components/auth/BrandIcons";

import { useAuth } from "../../context/AuthContext";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

import "./Login.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    try {
      setLoading(true);

      await login({ email, password });

      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError(getApiErrorMessage(error, "Could not log in"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <h1 className="auth-form__title">Welcome Back</h1>
      <p className="auth-form__subtitle">
        Log in to keep tracking your results.
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <AuthInput
          icon={Mail}
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <AuthInput
          icon={Lock}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error && <p className="auth-form__error">{error}</p>}

        <button
          type="submit"
          className="btn btn-primary auth-form__submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
          {!loading && <ArrowRight size={18} />}
        </button>
      </form>

      <div className="auth-form__divider">
        <span>OR</span>
      </div>

      <div className="auth-form__social">
        <button
          type="button"
          className="auth-form__social-btn"
          aria-label="Continue with Google"
        >
          <GoogleIcon />
        </button>

        <button
          type="button"
          className="auth-form__social-btn"
          aria-label="Continue with Discord"
        >
          <DiscordIcon />
        </button>
      </div>
    </AuthLayout>
  );
}