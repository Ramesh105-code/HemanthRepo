
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const RecipeDetail = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get(`/meals/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMeal(res.data);
      } catch (err) {
        console.error('Fetch meal detail error', err);
      }
    })();
  }, [id]);

  if (!meal) return <div>Loading...</div>;

  return (
    <div>
      <h1>{meal.name}</h1>
      <img src={meal.thumbnail} alt={meal.name} />
      <h2>Instructions</h2>
      <p>{meal.instructions}</p>
      <h2>Ingredients</h2>
      <ul>
        {meal.ingredients.map((ing, idx) => (
          <li key={idx}>{ing.ingredient}: {ing.measure}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeDetail;