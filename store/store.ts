import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string; // Make avatar optional
}

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 