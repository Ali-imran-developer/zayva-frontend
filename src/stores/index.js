import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import ordersReducer from "./slices/orders-slice";
import blogsReducer from "./slices/blogs-slice";
import brandsReducer from "./slices/brands-slice";
import contactReducer from "./slices/contact-slice";
import customerReducer from "./slices/customer-slice";
import reviewReducer from "./slices/review-slice";
import productsReducer from "./slices/products-slice";
import cartReducer from "./slices/cart-slice";
import featureReducer from "./slices/feature-slice";
import adminProductsReducer from "./slices/adminProducts-slice";
import adminOrdersReducer from "./slices/adminOrders-slice";

const store = configureStore({
  reducer: {
    Auth: authReducer,
    Products: productsReducer,
    Orders: ordersReducer,
    Blogs: blogsReducer,
    Brands: brandsReducer,
    Contact: contactReducer,
    Customer: customerReducer,
    Review: reviewReducer,
    Cart: cartReducer,
    Features: featureReducer,
    AdminProducts: adminProductsReducer,
    AdminOrders: adminOrdersReducer,
  },
});

export default store;