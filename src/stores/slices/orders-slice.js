import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderList: [],
  orderDetails: null,
};

export const OrdersSlice = createSlice({
  name: "OrdersSlice",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orderList = action.payload;
    },
    setOrdersDetail: (state, action) => {
      state.orderDetails = action.payload;
    },
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
});

export const { setOrders, resetOrderDetails, setOrdersDetail } = OrdersSlice.actions;
export default OrdersSlice.reducer;