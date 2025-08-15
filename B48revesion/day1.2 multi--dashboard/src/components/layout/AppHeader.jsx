import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { Bell } from "../ui/Bell";

export function AppHeader() {
  const { theme, toggleTheme } = useTheme();
  const { profile, role, logout } = useAuth();

  return (
    <header className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Link to="/" className="font-bold">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          {role === "admin" && <Link to="/users">Users</Link>}
        </div>
        <div className="flex gap-2 items-center">
          <button onClick={toggleTheme} className="bg-white/20 px-3 py-1 rounded-xl">{theme === "dark" ? "Light" : "Dark"} Mode</button>
          <Bell />
          {profile && (
            <div className="flex items-center gap-2 bg-white/10 rounded-xl px-2 py-1">
              <img src={profile.avatar} alt="me" className="w-8 h-8 rounded-full" />
              <div>
                <div className="text-sm font-semibold">{profile.first_name}</div>
                <div className="text-xs capitalize">{role}</div>
              </div>
              <button onClick={logout} className="text-xs underline">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
