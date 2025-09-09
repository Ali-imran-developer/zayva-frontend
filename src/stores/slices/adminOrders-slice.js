import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderList: [],
  orderDetails: null,
};

export const AdminOrdersSlice = createSlice({
  name: "AdminOrdersSlice",
  initialState,
  reducers: {
    setAdminOrders: (state, action) => {
      state.orderList = action.payload;
    },
    setAdminOrdersDetail: (state, action) => {
      state.orderDetails = action.payload;
    },
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
});

export const { setAdminOrders, resetOrderDetails, setAdminOrdersDetail } = AdminOrdersSlice.actions;
export default AdminOrdersSlice.reducer;