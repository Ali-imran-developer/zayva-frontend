import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  productDetails: null,
};

export const ProductsSlice = createSlice({
  name: "ProductsSlice",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.productList = action.payload;
    },
    setProductsDetail: (state, action) => {
      state.productDetails = action.payload;
    },
  },
});

export const { setProducts, setProductsDetail } = ProductsSlice.actions;
export default ProductsSlice.reducer;