import {
  BarChart3,
  CircleDollarSign,
  LayoutDashboard,
  LogOut,
  Spade,
  Trophy,
  Settings,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Sidebar.css";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/tournaments", label: "Tournaments", icon: Trophy },
  { to: "/bankroll", label: "Bankroll", icon: CircleDollarSign },
  { to: "/statistics", label: "Statistics", icon: BarChart3 },
  // { to: "/profile", label: "Profile", icon: UserRound },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();

    navigate("/auth/login", { replace: true });
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <Spade size={26} className="sidebar__logo-icon" />
        <span className="sidebar__logo-text">
          Poker<strong>OS</strong>
        </span>
      </div>

      <nav className="sidebar__nav">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar__link${isActive ? " sidebar__link--active" : ""}`
            }
          >
            <Icon size={18} />
            <span className="sidebar__link-label">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__user">
          <div className="sidebar__avatar">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.username}
              />
            ) : (
              user?.username?.[0]?.toUpperCase() ??
              "?"
            )}
          </div>
          <span>Welcome, {user?.username ?? "Player"}</span>
        </div>

        <button
          type="button"
          className="sidebar__logout"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          <span className="sidebar__logo-text">Logout</span>
        </button>
      </div>
    </aside>
  );
}