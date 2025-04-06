import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails';

function App() {
  return (
    <div>
      <nav style={{ padding: '1rem', background: '#eee' }}>
        <Link to="/users">Users</Link>
      </nav>

      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId" element={<UserDetails />} />
      </Routes>
    </div>
  );
}

export default App;
