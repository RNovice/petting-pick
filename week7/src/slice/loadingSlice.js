import { createSlice } from "@reduxjs/toolkit";
const initialStyle = { type: "spinningBubbles", bgColor: "#4444", color: "#fff", width: "5rem", height: "5rem", fontSize: "1.25rem", text: null }
const loadingSlice = createSlice({
  name: "loading",
  initialState: { value: false, style: initialStyle },
  reducers: {
    startLoading: (state, { payload = initialStyle }) => {
      state.value = true;
      state.style = { ...initialStyle, ...payload }
    },
    stopLoading: (state) => { state.value = false; },
    toggleLoading: (state) => { state.value = !state.value; },
  },
});

export const { startLoading, stopLoading, toggleLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
