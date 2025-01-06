import { CartRedux, CartResponse } from '@/types/cart';
import { createSlice } from '@reduxjs/toolkit'

const initialState: CartRedux = {
  cartItemList: null,
  subTotal: 0,
  tax: 0,
  total: 0,
  selectedAddress: null,
  selectedAddressDetails: null,
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
    },
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload
    },
    setSelectedAddressDetails: (state, action) => {
      state.selectedAddressDetails = action.payload
    }
  },
})

export const { setCart, setSelectedAddress, setSelectedAddressDetails } = cartSlice.actions
export default cartSlice.reducer