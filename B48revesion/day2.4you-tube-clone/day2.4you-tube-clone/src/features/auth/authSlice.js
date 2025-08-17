import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

const slice = createSlice({
  name: "auth",
  initialState: { user: null, status: "idle", error: null },
  reducers: {
    setUser(state, action) { state.user = action.payload; },
    setStatus(state, action) { state.status = action.payload; },
    setError(state, action) { state.error = action.payload; }
  }
});

export const { setUser, setStatus, setError } = slice.actions;
export default slice.reducer;

// Auth helpers for components:
export function initAuthListener(dispatch) {
  onAuthStateChanged(auth, (u) => { dispatch(setUser(u ? { uid: u.uid, email: u.email } : null)); });
}
export async function login(dispatch, email, password) {
  dispatch(setStatus("loading"));
  try { await signInWithEmailAndPassword(auth, email, password); dispatch(setStatus("succeeded")); }
  catch (e) { dispatch(setError(e.message)); dispatch(setStatus("failed")); }
}
export async function signup(dispatch, email, password) {
  dispatch(setStatus("loading"));
  try { await createUserWithEmailAndPassword(auth, email, password); dispatch(setStatus("succeeded")); }
  catch (e) { dispatch(setError(e.message)); dispatch(setStatus("failed")); }
}
export async function logout() { await signOut(auth); }
