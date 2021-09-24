import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  user:{}
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
    },
    updateUser(state, action) {
      if (action.payload.updatedUser) {
        state.user = action.payload.updatedUser
      }
    }
  
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
