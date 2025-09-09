import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
};

export const AdminProductsSlice = createSlice({
  name: "AdminProductsSlice",
  initialState,
  reducers: {
    setAdminProducts: (state, action) => {
      state.productList = action.payload;
    },
  },
});

export const { setAdminProducts } = AdminProductsSlice.actions;
export default AdminProductsSlice.reducer;