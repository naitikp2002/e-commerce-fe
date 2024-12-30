import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  brands: number[];
  categorries: number[];
  priceRange: [number, number];
  ratings: number;
}

const initialState: UserState = {
  brands: [],
  categorries: [],
  priceRange: [0, 500],
  ratings: 4,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setBrands: (state, action) => {
      state.brands = action.payload.brands;
    },
    setCategories: (state, action) => {
      state.categorries = action.payload.categories;
    },
    setPricerange: (state, action) => {
      state.priceRange = action.payload.priceRange;
    },
    setRatings: (state, action) => {
      state.ratings = action.payload.ratings;
    },
    setFilter: (state, action) => {
      state.brands = action.payload.brands;
      state.categorries = action.payload.categories;
      state.priceRange = action.payload.priceRange;
      state.ratings = action.payload.rattings;
    },
    clearFilter: (state, action) => {
      state.brands = initialState.brands;
      state.categorries = initialState.categorries;
      state.priceRange = initialState.priceRange;
      state.ratings = initialState.ratings;
    },
  },
});

export const {
  setFilter,
  setPricerange,
  setBrands,
  setCategories,
  setRatings,
  clearFilter,
} = filterSlice.actions;
export default filterSlice.reducer;
