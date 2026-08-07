import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => ({
  token: localStorage.getItem('token'),
  username: localStorage.getItem('username'),
});

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, username } = action.payload;
      state.token = token;
      state.username = username;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
