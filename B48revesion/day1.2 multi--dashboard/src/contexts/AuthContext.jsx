import React, { createContext, useState, useCallback, useMemo, useContext } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async ({ email, password, role, userId }) => {
    setLoading(true);
    try {
      const res = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();
      setToken(data.token);
      setRole(role);

      if (userId) {
        const ures = await fetch(`https://reqres.in/api/users/${userId}`);
        const udata = await ures.json();
        setProfile(udata.data);
      } else {
        setProfile({ id: 0, email, first_name: "Guest", last_name: role === "admin" ? "Admin" : "User", avatar: "https://i.pravatar.cc/150?u=guest" });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setRole(null);
    setProfile(null);
  }, []);

  const value = useMemo(() => ({ token, role, profile, login, logout, loading }), [token, role, profile, login, logout, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
