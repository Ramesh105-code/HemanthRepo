import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const URL = 'https://api.open-meteo.com/v1/forecast?latitude=35&longitude=139&current_weather=true';

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async () => {
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  const data = await response.json();
  return data.current_weather;
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weather: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
