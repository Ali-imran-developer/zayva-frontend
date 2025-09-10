import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
};

export const CustomerSlice = createSlice({
  name: "CustomerSlice",
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      state.customers = action.payload;
    },
  },
});

export const { setCustomer } = CustomerSlice.actions;
export default CustomerSlice.reducer;