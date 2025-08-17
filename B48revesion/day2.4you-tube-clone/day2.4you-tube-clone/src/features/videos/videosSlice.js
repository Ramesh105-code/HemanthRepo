import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPopularVideos, fetchVideoById } from "../../services/api";

export const getPopularVideos = createAsyncThunk("videos/getPopular", async () => {
  const data = await fetchPopularVideos();
  return data.items; 
});

export const getVideoDetail = createAsyncThunk("videos/getDetail", async (id) => {
  const data = await fetchVideoById(id);
  return data.items?.[0] || null;
});

const videosSlice = createSlice({
  name: "videos",
  initialState: { list: [], current: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(getPopularVideos.pending, (s) => { s.status = "loading"; })
     .addCase(getPopularVideos.fulfilled, (s, a) => { s.status = "succeeded"; s.list = a.payload; })
     .addCase(getPopularVideos.rejected, (s, a) => { s.status = "failed"; s.error = a.error.message; })
     .addCase(getVideoDetail.pending, (s) => { s.status = "loading"; s.current = null; })
     .addCase(getVideoDetail.fulfilled, (s, a) => { s.status = "succeeded"; s.current = a.payload; })
     .addCase(getVideoDetail.rejected, (s, a) => { s.status = "failed"; s.error = a.error.message; });
  }
});

export default videosSlice.reducer;
