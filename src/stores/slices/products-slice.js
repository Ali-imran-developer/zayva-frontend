import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  productDetails: null,
  productsBrand: [],
  productsBrandLength: 0,
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
      state.productsBrand = action.payload.data;
      state.productsBrandLength = action.payload.length;
    },
  },
});

export const { setProducts, setProductsDetail, setProductsBrand } = ProductsSlice.actions;
export default ProductsSlice.reducer;