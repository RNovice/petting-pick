import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    pagination: { current_page: 1, total_pages: 1, }
  },
  reducers: {
    updateProduct: (state, { payload }) => {
      state.data = payload.data;
      state.pagination = payload.pagination;
    }
  }
})

export const { updateProduct } = productSlice.actions;
export default productSlice.reducer;