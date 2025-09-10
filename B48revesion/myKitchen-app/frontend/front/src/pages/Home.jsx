
import React, { useState } from 'react';
import API from '../services/api';
import MealCard from '../components/MealCard';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState([]);
  const { token } = useAuth();

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await res.json();
      setMeals(data.meals || []);
    } catch (err) {
      console.error('Search error', err);
    }
  };

  return (
    <div>
      <h1>Search Meals</h1>
      <input
        type="text"
        placeholder="e.g., chicken"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div className="meal-grid">
        {meals.map((meal) => (
          <MealCard key={meal.idMeal} meal={meal} token={token} />
        ))}
      </div>
    </div>
  );
};

export default Home;