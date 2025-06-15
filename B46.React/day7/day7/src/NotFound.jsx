// pages/NotFound.jsx
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>Oops! This page doesn’t exist.</p>
      <Link to="/">Go to Homepage</Link>
    </div>
  );
}

export default NotFound;
