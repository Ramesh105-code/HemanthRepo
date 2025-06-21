import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMatches, toggleFavorite } from '../redux/matchesSlice';

const MatchList = () => {
  const dispatch = useDispatch();
  const { footballMatches, isLoading, isError, favorites } = useSelector(state => state.matches);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    dispatch(fetchMatches());
  }, [dispatch]);

  const filteredMatches = footballMatches.filter(match =>
    (match.team1.toLowerCase().includes(search.toLowerCase()) ||
    match.team2.toLowerCase().includes(search.toLowerCase())) &&
    (!filter || match.match_outcome === filter)
  );

  if (isLoading) return <p>Loading matches...</p>;
  if (isError) return <p>Failed to load matches.</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search by team"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="">All Outcomes</option>
        <option value="win">Win</option>
        <option value="loss">Loss</option>
        <option value="draw">Draw</option>
      </select>

      {filteredMatches.map(match => (
        <div key={`${match.team1}-${match.team2}-${match.date}`} style={{ border: '1px solid #ccc', padding: 10, margin: 5 }}>
          <h4>{match.team1} vs {match.team2}</h4>
          <p>Date: {match.date}</p>
          <p>Venue: {match.venue}</p>
          <p>Outcome: {match.match_outcome || 'N/A'}</p>
          <button onClick={() => dispatch(toggleFavorite(match.team1 + match.team2 + match.date))}>
            {favorites.includes(match.team1 + match.team2 + match.date) ? 'Unfavorite' : 'Favorite'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default MatchList;
