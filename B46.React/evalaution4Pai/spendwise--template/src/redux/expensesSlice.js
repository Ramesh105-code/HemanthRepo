import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: [],
  reducers: {
    addExpense: (state, action) => {
      state.push(action.payload);
    },
    setExpenses: (state, action) => {
      return action.payload;
    },
    deleteExpense: (state, action) =>
      state.filter(exp => exp.id !== action.payload),
  },
});

export const { addExpense, setExpenses, deleteExpense } = expensesSlice.actions;
export default expensesSlice.reducer;