import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expensesSlice";
import filtersReducer from "./filtersSlice";

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    filters: filtersReducer,
  },
});