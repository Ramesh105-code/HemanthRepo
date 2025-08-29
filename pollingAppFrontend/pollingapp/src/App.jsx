import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { UserProvider, UserContext } from "./context/UserContext";
import HomePage from "./pages/HomePage";
import PollDetail from "./pages/PollDetail";
import CreatePoll from "./pages/CreatePoll";
import { useContext } from "react";

function Navbar() {
  const { isAuthenticated, login } = useContext(UserContext);
  return (
    <nav className="p-4 flex gap-4 bg-gray-200">
      <Link to="/">Home</Link>
      {isAuthenticated ? (
        <Link to="/create">Create Poll</Link>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </nav>
  );
}

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/poll/:id" element={<PollDetail />} />
          <Route path="/create" element={<CreatePoll />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}