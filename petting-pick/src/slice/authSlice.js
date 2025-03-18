import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const { VITE_API_BASE: API_BASE } = import.meta.env;

export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/admin/signin`, { username, password });
      const { token, expired } = res.data;
      document.cookie = `authToken=${token};expires=${new Date(expired)};`;
      axios.defaults.headers.common.Authorization = token;
      return { token };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const checkLogin = createAsyncThunk("auth/checkLogin", async (_, { rejectWithValue }) => {
  try {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];
    if (token === undefined) throw "Not authenticated";
    axios.defaults.headers.common.Authorization = token;
    await axios.post(`${API_BASE}/api/user/check`);
    return { token };
  } catch (err) {
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    return rejectWithValue("Not authenticated");
  }
});

export const logoutAdmin = createAsyncThunk("auth/logoutAdmin", async (_, { rejectWithValue }) => {

  try {
    const { status } = await axios.post(`${API_BASE}/logout`);
    if (status === 200) {
      document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
  } catch (err) {
    return rejectWithValue(error.response?.data || "Logout failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, status: "idle", error: null },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.status = "logged-in";
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(checkLogin.pending, (state) => {
        state.status = "checking";
      })
      .addCase(checkLogin.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.status = "logged-in";
      })
      .addCase(checkLogin.rejected, (state) => {
        state.token = null;
        state.status = "idle";
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.token = null;
        state.status = "idle";
      })
      .addCase(logoutAdmin.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
