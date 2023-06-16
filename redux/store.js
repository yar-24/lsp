import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import madingReducer from './mading/madingSlice';
import commentReducer from './comment/commentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    mading: madingReducer,
    comment: commentReducer,
  },
});

export default store;
