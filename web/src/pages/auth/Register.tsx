// src/pages/auth/Register.tsx
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Check, Lock, Mail, User, X } from "lucide-react";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import { GoogleIcon, DiscordIcon } from "../../components/auth/BrandIcons";

import { api } from "../../services/api";

import "./Register.css";

function getPasswordRequirements(password: string) {
  return {
    minLength: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
}

const REQUIREMENT_LABELS: Record<keyof ReturnType<typeof getPasswordRequirements>, string> = {
  minLength: "At least 8 characters",
  lowercase: "At least one lowercase letter",
  uppercase: "At least one uppercase letter",
  number: "At least one number",
  special: "At least one special character",
};

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const passwordRequirements = getPasswordRequirements(password);
  const isPasswordValid = Object.values(passwordRequirements).every(Boolean);
  const passwordsMatch = password === confirmPassword;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!isEmailValid) {
      setError("Enter a valid email address");
      return;
    }

    if (!isPasswordValid) {
      setError("Password does not meet the requirements");
      return;
    }

    if (!passwordsMatch) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        username,
        email,
        password,
      });

      navigate("/auth/login");
    } catch (error: any) {
      const response = error.response?.data;

      if (Array.isArray(response?.errors)) {
        setError(
          response.errors
            .map((item: { message: string }) => item.message)
            .join(". ")
        );
      } else {
        setError(response?.message ?? "Could not create account");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <h1 className="auth-form__title">Create Your PokerOS Account</h1>
      <p className="auth-form__subtitle">
        Join thousands of players optimizing their results.
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <AuthInput
          icon={User}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />

        <AuthInput
          icon={Mail}
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={Boolean(email) && !isEmailValid}
          required
        />

        <div>
          <AuthInput
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            required
          />

          {passwordFocused && !isPasswordValid && (
            <ul className="auth-form__requirements">
              {(
                Object.keys(
                  passwordRequirements
                ) as Array<keyof typeof passwordRequirements>
              ).map((key) => (
                <li
                  key={key}
                  className={
                    passwordRequirements[key]
                      ? "auth-form__requirement auth-form__requirement--met"
                      : "auth-form__requirement"
                  }
                >
                  {passwordRequirements[key] ? (
                    <Check size={14} />
                  ) : (
                    <X size={14} />
                  )}
                  {REQUIREMENT_LABELS[key]}
                </li>
              ))}
            </ul>
          )}
        </div>

        <AuthInput
          icon={Lock}
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          error={Boolean(confirmPassword) && !passwordsMatch}
          required
        />

        {error && <p className="auth-form__error">{error}</p>}

        <button
          type="submit"
          className="btn btn-primary auth-form__submit"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Get Started for Free"}
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