import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const { VITE_API_BASE: API_BASE, VITE_API_PATH: API_PATH } = import.meta.env;

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: {
          data: { carts, final_total },
        },
      } = await axios(`${API_BASE}/api/${API_PATH}/cart`);
      return { carts, final_total };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Get cart failed");
    }
  }
);

export const removeCartItem = createAsyncThunk("cart/removeCartItem", async (id = null, { rejectWithValue, dispatch }) => {
  try {
    await axios.delete(
      `${API_BASE}/api/${API_PATH}/cart${id === null ? "s" : `/${id}`}`
    );
    dispatch(getCart());
  } catch (err) {
    return rejectWithValue("Cart item removed failed");
  }
});

export const updateCartItem = createAsyncThunk("cart/updateCartItem", async ({ product_id, qty }, { rejectWithValue, dispatch }) => {
  try {
    const url = `${API_BASE}/api/${API_PATH}/cart/${product_id}`;
    qty > 0
      ? await axios.put(url, { data: { product_id, qty } })
      : await axios.delete(url);
    dispatch(getCart());
  } catch (err) {
    return rejectWithValue("Cart item updated failed");
  }
});

export const addCartItem = createAsyncThunk("cart/addCartItem", async ( product_id, { rejectWithValue, dispatch }) => {
  try {
    await axios.post(`${API_BASE}/api/${API_PATH}/cart`, {
      data: { product_id, qty: 1 },
    });
    dispatch(getCart());
  } catch (err) {
    return rejectWithValue("Cart item updated failed");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: [], cartTotal: 0 },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.fulfilled, (state, { payload }) => {
        state.cart = payload.carts;
        state.cartTotal = payload.final_total;
      })
  },
});

export default cartSlice.reducer;
