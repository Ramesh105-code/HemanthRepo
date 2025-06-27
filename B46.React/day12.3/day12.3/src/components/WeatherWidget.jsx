 import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeather } from '../features/weather/weatherSlice';

const WeatherWidget = () => {
  const dispatch = useDispatch();
  const { weather, loading, error } = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);

  if (loading) return <p>Loading weather data...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!weather) return null;

  return (
    <div>
      <h2>Current Weather</h2>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Windspeed: {weather.windspeed} km/h</p>
    </div>
  );
};

export default WeatherWidget;
