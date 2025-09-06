import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const API = 'http://localhost:5000/api/auth';

export default function VerifyOTP() {
  const email = localStorage.getItem('2fa_email') || '';
  const [digits, setDigits] = useState(['', '', '', '']);
  const [msg, setMsg] = useState('');
  const inputsRef = [useRef(), useRef(), useRef(), useRef()];
  const navigate = useNavigate();


  const onChange = (i, e) => {
    const v = e.target.value;
    if (!/^\d?$/.test(v)) return; // only single digit
    const arr = [...digits];
    arr[i] = v;
    setDigits(arr);
    if (v && i < 3) {
      inputsRef[i+1].current.focus();
    }
  };

  
  const onKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      inputsRef[i-1].current.focus();
    }
  };

  
  const onPaste = (e) => {
    const paste = (e.clipboardData || window.clipboardData).getData('text');
    if (/^\d{4}$/.test(paste)) {
      const arr = paste.split('');
      setDigits(arr);
      
      inputsRef[3].current.focus();
    }
    e.preventDefault();
  };

  const submitOtp = async () => {
    const otp = digits.join('');
    if (otp.length !== 4) { setMsg('Enter 4 digits'); return; }
    try {
      const res = await fetch(`${API}/verify-otp`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Verification failed');
     
      localStorage.setItem('token', data.token);
      setMsg('Verified! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 800);
    } catch (err) {
      setMsg(err.message);
    }
  };

  const resendOtp = async () => {
    if (!email) return setMsg('No email to send to');
    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ email, password: '' }) // note: hitting login requires password; in prod you'd have a resend OTP endpoint
      });
      const data = await res.json();
      setMsg(data.message || 'OTP resent (if credentials were valid)');
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      <h2>OTP Verification</h2>
      <p>Enter the 4-digit code sent to <b>{email}</b></p>

      <div onPaste={onPaste} style={{ display: 'flex', gap: 8 }}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={inputsRef[i]}
            value={d}
            onChange={(e) => onChange(i, e)}
            onKeyDown={(e) => onKeyDown(i, e)}
            maxLength={1}
            style={{ width: 50, height: 50, fontSize: 24, textAlign: 'center' }}
          />
        ))}
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={submitOtp}>Verify OTP</button>
        <button onClick={() => { setDigits(['','','','']); inputsRef[0].current.focus(); }} style={{ marginLeft: 8 }}>Clear</button>
      </div>

      <p style={{ marginTop: 10 }}>{msg}</p>
    </div>
  );
}
