import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  totalProducts: 0,
};

export const AdminProductsSlice = createSlice({
  name: "AdminProductsSlice",
  initialState,
  reducers: {
    setAdminProducts: (state, action) => {
      state.productList = action.payload.data;
      state.totalProducts = action.payload.length;
    },
  },
});

export const { setAdminProducts } = AdminProductsSlice.actions;
export default AdminProductsSlice.reducer;