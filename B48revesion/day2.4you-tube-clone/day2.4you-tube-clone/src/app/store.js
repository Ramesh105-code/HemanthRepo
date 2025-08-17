import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import videosReducer from "../features/videos/videosSlice";
import suggestionsReducer from "../features/suggestions/suggestionsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    videos: videosReducer,
    suggestions: suggestionsReducer
  }
});
