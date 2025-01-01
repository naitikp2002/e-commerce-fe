import { CartRedux, CartResponse } from '@/types/cart';
import { createSlice } from '@reduxjs/toolkit'

const initialState: CartRedux = {
  cartItemList: null,
  subTotal: 0,
  tax: 0,
  total: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartItemList = action.payload?.cartItemList
      state.subTotal = action.payload?.subTotal
      state.tax = action.payload?.tax
      state.total = action.payload?.total
    }
  },
})

export const { setCart } = cartSlice.actions
export default cartSlice.reducer