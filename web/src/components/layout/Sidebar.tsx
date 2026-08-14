import {
  BarChart3,
  CircleDollarSign,
  LayoutDashboard,
  LogOut,
  Trophy,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();

    navigate("/auth/login", {
      replace: true,
    });
  }

  return (
    <aside>
      <header>
        <h1>PokerOS</h1>
      </header>

      <nav>
        <NavLink to="/dashboard">
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/tournaments">
          <Trophy size={18} />
          Tournaments
        </NavLink>

        <NavLink to="/bankroll">
          <CircleDollarSign size={18} />
          Bankroll
        </NavLink>

        <NavLink to="/statistics">
          <BarChart3 size={18} />
          Statistics
        </NavLink>
      </nav>

      <button
        type="button"
        onClick={handleLogout}
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}