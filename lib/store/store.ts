import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import journalReducer from './features/journalSlice';
import chatReducer from './features/chatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    journal: journalReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;