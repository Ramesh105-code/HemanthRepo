import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
const API = 'http://localhost:5000/api/auth';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      // Backend has sent OTP to email. Navigate to verify page and persist email locally.
      localStorage.setItem('2fa_email', form.email);
      setMsg('OTP sent to your email. Redirecting to OTP verification...');
      setTimeout(() => navigate('/verify'), 800);
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required/>
        <br/>
        <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required/>
        <br/>
        <button type="submit">Login</button>
      </form>
      <p>{msg}</p>
      <p>No account? <Link to="/signup">Signup</Link></p>
    </div>
  );
}
