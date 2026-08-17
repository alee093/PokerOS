import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { Spade } from "lucide-react";

import "./AuthLayout.css";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="auth-layout">
      <section className="auth-layout__hero">
        <div className="auth-layout__hero-overlay" />

        <div className="auth-layout__hero-content">
          <div className="auth-layout__logo">
            <Spade size={58} className="auth-layout__logo-icon" />
            <span>
              Poker<strong>OS</strong>
            </span>
          </div>

          <p className="auth-layout__tagline">Elevate Your Game.</p>
        </div>
      </section>

      <section className="auth-layout__panel">
        <div className="auth-layout__panel-inner">
          <div className="auth-layout__tabs">
            <NavLink
              to="/auth/register"
              className={({ isActive }) =>
                `auth-layout__tab${
                  isActive ? " auth-layout__tab--active" : ""
                }`
              }
            >
              Register
            </NavLink>

            <NavLink
              to="/auth/login"
              className={({ isActive }) =>
                `auth-layout__tab${
                  isActive ? " auth-layout__tab--active" : ""
                }`
              }
            >
              Log In
            </NavLink>
          </div>

          {children}
        </div>
      </section>
    </div>
  );
}