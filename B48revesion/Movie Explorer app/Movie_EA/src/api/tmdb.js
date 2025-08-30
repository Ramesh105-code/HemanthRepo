const OMDB_API_KEY = "e00deeb";
const OMDB_BASE = "https://www.omdbapi.com/";

export async function searchMovies({ query, page = 1 }) {
  const url = `${OMDB_BASE}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}&page=${page}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.Response === "False") throw new Error(data.Error);
  return data; // { Search: [...], totalResults, Response }
}

export async function getMovieByTitle(title,page=1) {
    const res = await fetch(`${OMDB_BASE}?apikey=${OMDB_API_KEY}&s=${title}&page=${page}`);
  const data = await res.json();
  if (data.Response === "True") {
    return data.Search;
  } else {
    return [];
  }
}
