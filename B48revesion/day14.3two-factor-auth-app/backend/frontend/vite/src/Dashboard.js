import React, { useEffect, useState } from 'react';
const API = 'http://localhost:5000/api';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMsg('Not authenticated');
      return;
    }
    fetch(`${API}/protected/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      if (data.user) setUser(data.user);
      else setMsg(data.message || 'Failed to fetch');
    }).catch(err => setMsg(err.message));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('2fa_email');
    window.location.href = '/login';
  };

  return (
    <div style={{ maxWidth: 640, margin: '40px auto' }}>
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <p>Welcome, {user.name} ({user.email})</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>{msg || 'Loading...'}</p>
      )}
    </div>
  );
}
