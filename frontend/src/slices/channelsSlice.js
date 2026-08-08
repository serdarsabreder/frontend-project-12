import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getChannels } from '../services/api.js';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const { data } = await getChannels();
    return data;
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, action) => {
      state.channels = action.payload;
      if (state.currentChannelId === null) {
        const [firstChannel] = action.payload;
        state.currentChannelId = firstChannel?.id ?? null;
      }
    });
  },
});

export const { setCurrentChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
