import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSuggestions } from "../../services/api";

export const getSuggestions = createAsyncThunk("suggestions/get", async (id) => {
  const data = await fetchSuggestions(id);
  return data.items || [];
});

const slice = createSlice({
  name: "suggestions",
  initialState: { list: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(getSuggestions.pending, (s) => { s.status = "loading"; })
     .addCase(getSuggestions.fulfilled, (s, a) => { s.status = "succeeded"; s.list = a.payload; })
     .addCase(getSuggestions.rejected, (s, a) => { s.status = "failed"; s.error = a.error.message; });
  }
});
export default slice.reducer;
