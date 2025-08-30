import { useState } from "react";
import { getMovieByTitle } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Leader";
import { useEffect } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!title.trim()) return;
    setLoading(true);
    setError("");
    try {
      const result = await getMovieByTitle(title);
      setMovie(result);
    } catch (err) {
      setError(err.message);
      setMovie(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div >
      <div style={{display:"flex",justifyContent:"center",gap:"15px",maxHeight:"30px"}}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter movie title..."
        />
        <button onClick={handleSearch} style={{fontSize:"15px"}} >
          Search
        </button>
      </div>
      {loading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}
      {movie?.length>0 && 
      <div style={{display:"flex", marginTop:"25px",gap:"20px",flexWrap:"wrap",justifyContent:"center"}}>
        {movie?.map((mov)=>{
          return <MovieCard movie={mov} />
        })}
        </div>}
    </div>
  );
}
