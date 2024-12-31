import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import filterReducer from './features/filterSlice'
import cartReducer from './features/cartSlice'
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
    filter: filterReducer,
    cart: cartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 