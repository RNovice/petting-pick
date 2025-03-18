import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const notify = createAsyncThunk('notification/notify', async (payload, { dispatch, requestId }) => {
  dispatch(notificationSlice.actions.add({ ...payload, id: requestId }));
  setTimeout(() => dispatch(notificationSlice.actions.remove(requestId)), 2000);
});

const notificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    add: (state, { payload }) => { state.push(payload); },
    remove: (state, { payload }) => state.filter(n => n.id !== payload),
  },
});

export default notificationSlice.reducer;
