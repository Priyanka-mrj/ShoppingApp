import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  user: any;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    signOut(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, signOut } = authSlice.actions;
export default authSlice.reducer;
