import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false ,loginID:null},
  reducers: {
    login: (state,action) => {
        state.isLoggedIn = true;
        state.loginID = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.loginID=null;
    },
    
  },
});

export const { login, logout} = authSlice.actions;
export default authSlice.reducer;
