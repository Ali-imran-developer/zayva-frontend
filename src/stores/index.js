import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import productsReducer from "./slices/products-slice";
import cartReducer from "./slices/cart-slice";

const store = configureStore({
  reducer: {
    Auth: authReducer,
    Products: productsReducer,
    Cart: cartReducer,
  },
});

export default store;