import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const API = 'http://localhost:5000/api/auth';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch(`${API}/signup`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signup failed');
      setMsg('Signup successful! Please login.');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      <h2>Signup</h2>
      <form onSubmit={submit}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required/>
        <br/>
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required/>
        <br/>
        <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required/>
        <br/>
        <button type="submit">Signup</button>
      </form>
      <p>{msg}</p>
      <p>Already have account? <Link to="/login">Login</Link></p>
    </div>
  );
}
