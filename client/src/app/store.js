import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/Auth/authSlice";
import productReducer from "../Features/Product/productSlice";
import cartReducer from "../Features/Cart/cartSlice";
import creditReducer from "../Features/Credit/creditSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    credit: creditReducer,
  },
});
