import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authenticationService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  isLoggedIn: !!user,
  user: user ? { ...user } : null,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user');
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.error = action.error.message;
      });
  }
});

export const login = createAsyncThunk('auth/login', async (values) => {
  const { remember, email, password } = values;
  const userCredentials = { email, password };
  console.log(userCredentials);
  const response = await authService.login(userCredentials);
  console.log(response);

  // eslint-disable-next-line no-prototype-builtins
  if (response.hasOwnProperty('token')) {
    if (remember) {
      localStorage.setItem('user', JSON.stringify(response));
    }
    return response;
  }
  return Promise.reject(response);
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

// Selector functions

export const selectUser = (state) => state.user;
