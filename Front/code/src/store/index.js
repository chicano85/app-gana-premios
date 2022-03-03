import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import messageReducer from './reducers/messageSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    notification: messageReducer
  }
});
