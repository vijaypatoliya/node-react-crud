import { createSlice } from '@reduxjs/toolkit';

const initialToastState = {
  notification:{status:null , message:null}
};

const toastSlice = createSlice({
  name: 'toastConfig',
  initialState: initialToastState,
  reducers: {
    showNotification(state, action) {      
      if (action.payload.message) {
        state.notification = {
           status:action.payload.status,
           message:action.payload.message
        }
      }
    },
  },
});

export const toastActions = toastSlice.actions;

export default toastSlice.reducer;