import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    image?: string;
  } | null;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    logout: (state) => {
      state.user = null
      state.token = null
    },
  },
})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer 