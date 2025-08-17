import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useLocation, useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { status, error } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const loc = useLocation();

  async function handleSubmit(e) {
    e.preventDefault();
    await login(dispatch, email, password);
    if (!error) nav(loc.state?.from?.pathname || "/");
  }

  return (
    <div className="max-w-sm mx-auto mt-16">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="w-full border rounded px-3 py-2" placeholder="Email"
               value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full border rounded px-3 py-2" placeholder="Password" type="password"
               value={password} onChange={(e) => setPassword(e.target.value)} />
        {status === "failed" && <div className="text-red-600 text-sm">{error}</div>}
        <button className="w-full bg-gray-900 text-white rounded py-2">
          {status === "loading" ? "Signing in..." : "Login"}
        </button>
      </form>
      <div className="text-sm mt-3">
        New here? <Link className="text-blue-600" to="/signup">Create an account</Link>
      </div>
    </div>
  );
}
