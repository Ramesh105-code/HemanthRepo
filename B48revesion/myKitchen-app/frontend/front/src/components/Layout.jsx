
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { token, logoutUser } = useAuth();
  const nav = useNavigate();

  const doLogout = () => {
    logoutUser();
    nav('/');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <Link to="/">Home</Link> |{' '}
        {token && <Link to="/favorites">Favorites</Link>} |{' '}
        {token ? <button onClick={doLogout}>Logout</button> : <Link to="/login">Login</Link>}
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;