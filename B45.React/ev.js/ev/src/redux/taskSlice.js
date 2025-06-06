import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get('https://dummyjson.com/todos');
  return response.data.todos;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: 'idle',
    error: null,
    highlightedTaskId: null,
  },
  reducers: {
    updateTask(state, action) {
      const { id, changes } = action.payload;
      const existingTask = state.tasks.find((task) => task.id === id);
      if (existingTask) {
        Object.assign(existingTask, changes);
        state.highlightedTaskId = id;
      }
    },
    clearHighlight(state) {
      state.highlightedTaskId = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { updateTask, clearHighlight } = tasksSlice.actions;

export default tasksSlice.reducer;