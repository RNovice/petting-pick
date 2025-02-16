import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./slice/loadingSlice";
import productReducer from "./slice/productSlice";
import authReducer from "./slice/authSlice";
import cartReducer from "./slice/cartSlice";
import notificationReducer from "./slice/notificationSlice";

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    notification: notificationReducer,
  },
});

export default store;
