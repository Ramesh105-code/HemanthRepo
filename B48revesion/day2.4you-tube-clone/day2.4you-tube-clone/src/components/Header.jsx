import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Header() {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const nav = useNavigate();

  async function handleLogout() {
    await logout();
    nav("/login");
  }

  return (
    <header className="h-14 flex items-center justify-between px-4 border-b">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-2xl">▶</span>
        <span className="font-bold text-lg">YouTube</span>
      </Link>
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span className="text-sm">{user.email}</span>
            <button onClick={handleLogout} className="px-3 py-1 rounded bg-gray-900 text-white">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-3 py-1 rounded border">Login</Link>
            <Link to="/signup" className="px-3 py-1 rounded bg-gray-900 text-white">Signup</Link>
          </>
        )}
      </div>
    </header>
  );
}
