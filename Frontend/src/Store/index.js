import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth';
import toastReducer from './toast';
import loaderReducer from './loading';
import userReducer from './user';
 

const store = configureStore({
  reducer: {  auth: authReducer, toast:toastReducer , loaderConfig:loaderReducer , 
    user:userReducer },
});

export default store;