
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MealCard = ({ meal, onFavorite, isLoggedIn }) => {
  const navigate = useNavigate();

  return (
    <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        style={{ width: '100%', cursor: 'pointer' }}
        onClick={() => navigate(`/meal/${meal.idMeal}`)}
      />
      <h3>{meal.strMeal}</h3>
      <p>{meal.strCategory}</p>
      {isLoggedIn && <button onClick={() => onFavorite(meal.idMeal)}>Favorite</button>}
    </div>
  );
};

export default MealCard;