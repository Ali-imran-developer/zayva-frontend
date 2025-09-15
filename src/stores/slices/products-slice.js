import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  productDetails: null,
  productsBrand: [],
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
    setProductsBrand: (state, action) => {
      state.productsBrand = action.payload;
    },
  },
});

export const { setProducts, setProductsDetail, setProductsBrand } = ProductsSlice.actions;
export default ProductsSlice.reducer;