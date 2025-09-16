import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brandsList: [],
};

export const BrandSlice = createSlice({
  name: "BrandSlice",
  initialState,
  reducers: {
    setBrands: (state, action) => {
      state.brandsList = action.payload;
    }
  },
});

export const { setBrands } = BrandSlice.actions;
export default BrandSlice.reducer;