import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./slice/loadingSlice";
import productReducer from "./slice/productSlice";
import authReducer from "./slice/authSlice";

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    products: productReducer,
    auth: authReducer,
  },
});

export default store;
