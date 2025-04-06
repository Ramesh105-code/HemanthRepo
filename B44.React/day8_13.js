import { Routes, Route, Link } from "react-router-dom";
import Movies from "./pages/Movies";
import AddMovie from "./pages/AddMovie";

function App() {
  return (
    <>
      <nav>
        <Link to="/movies">Movies</Link> | <Link to="/add-movie">Add Movie</Link>
      </nav>
      <Routes>
        <Route path="/movies" element={<Movies />} />
        <Route path="/add-movie" element={<AddMovie />} />
      </Routes>
    </>
  );
}

export default App;
