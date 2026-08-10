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
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = action.payload;
        if (state.currentChannelId === null) {
          const [firstChannel] = action.payload;
          state.currentChannelId = firstChannel?.id ?? null;
        }
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка загрузки каналов';
      });
  },
});

export const { setCurrentChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
