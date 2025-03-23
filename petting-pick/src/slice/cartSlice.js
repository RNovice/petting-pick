import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

const CART_API = "cart";
const fixNum = (num) => Math.round(num * 1000) / 1000

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: {
          data: { carts, total, final_total },
        },
      } = await api(CART_API);
      return { carts, total, final_total };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Get cart failed");
    }
  }
);

export const removeCartItem = createAsyncThunk("cart/removeCartItem", async (id = null, { rejectWithValue, dispatch }) => {
  try {
    await api.delete(
      `${CART_API}${id === null ? "s" : `/${id}`}`
    );
    dispatch(getCart());
  } catch (err) {
    console.error(err)
    return rejectWithValue("Cart item removed failed");
  }
});

export const updateCartItem = createAsyncThunk("cart/updateCartItem", async ({ product_id, qty }, { rejectWithValue, dispatch }) => {
  try {
    const url = `${CART_API}/${product_id}`;
    qty > 0
      ? await api.put(url, { data: { product_id, qty } })
      : await api.delete(url);
    dispatch(getCart());
  } catch (err) {
    console.error(err)
    return rejectWithValue("Cart item updated failed");
  }
});

export const addCartItem = createAsyncThunk("cart/addCartItem", async (product_id, { rejectWithValue, dispatch }) => {
  try {
    await api.post(CART_API, {
      data: { product_id, qty: 1 },
    });
    dispatch(getCart());
  } catch (err) {
    console.error(err)
    return rejectWithValue("Cart item updated failed");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: [], cartTotal: 0, cartOrigin: 0 },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.fulfilled, (state, { payload }) => {
        state.cart = payload.carts.map(item => ({ ...item, final_total: fixNum(item.final_total) }));
        state.cartTotal = fixNum(payload.final_total);
        state.cartOrigin = fixNum(payload.total);
      })
  },
});

export default cartSlice.reducer;
