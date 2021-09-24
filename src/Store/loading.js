import { createSlice } from '@reduxjs/toolkit';

const initialLoadingState = {
  loader:{isLoading:false}
};

const loaderSlice = createSlice({
  name: 'loadingConfig',
  initialState: initialLoadingState,
  reducers: {
    showLoading(state , action) {
      state.loader = { isLoading:action.payload }
    },
  },
});

export const loaderActions = loaderSlice.actions;

export default loaderSlice.reducer;