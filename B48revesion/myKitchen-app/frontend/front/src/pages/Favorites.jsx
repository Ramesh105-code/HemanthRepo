
import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { token } = useAuth();

  const loadFavorites = async () => {
    try {
      const res = await API.get('/favorites', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorites(res.data);
    } catch (err) {
      console.error('Load favorites error', err);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const removeFavorite = async (mealId) => {
    try {
      const res = await API.post('/favorites/remove', { mealId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorites(res.data);
    } catch (err) {
      console.error('Remove error', err);
    }
  };

  return (
    <div>
      <h1>Your Favorites</h1>
      <div className="meal-grid">
        {favorites.map((meal) => (
          <div key={meal.mealId} className="meal-card">
            <img src={meal.thumbnail} alt={meal.name} />
            <h2>{meal.name}</h2>
            <button onClick={() => removeFavorite(meal.mealId)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;