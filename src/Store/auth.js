import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  token:'',
  isAuthenticated: localStorage.getItem('userToken') || null,
  errorMessage:null,
  userDetails: null,
  isUserRegistered: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state , action) {      
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userDetails = action.payload.user;
 
    },

    signUp(state , action) {
      state.isUserRegistered = action.payload;
    },

    logout(state , action) {
      state.isAuthenticated = action.payload;
      localStorage.removeItem('user')
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;