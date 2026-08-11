import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addChannelRequest,
  getChannels,
  removeChannelRequest,
  renameChannelRequest,
} from '../services/api.js';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const { data } = await getChannels();
    return data;
  },
);

export const addChannel = createAsyncThunk(
  'channels/addChannel',
  async (name) => {
    const { data } = await addChannelRequest({ name });
    return data;
  },
);

export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ id, name }) => {
    const { data } = await renameChannelRequest(id, { name });
    return data;
  },
);

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async (id) => {
    const { data } = await removeChannelRequest(id);
    return data;
  },
);

const getDefaultChannelId = (state) => {
  const defaultChannel = state.channels.find(({ removable }) => !removable) ?? state.channels[0];
  return defaultChannel?.id ?? null;
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: null,
    loading: false,
    error: null,
    adding: false,
    renaming: false,
    removing: false,
  },
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addChannelReceived: (state, action) => {
      const channel = action.payload;
      const exists = state.channels.some(({ id }) => id === channel.id);
      if (!exists) {
        state.channels.push(channel);
      }
    },
    renameChannelReceived: (state, action) => {
      const { id, name } = action.payload;
      const channel = state.channels.find(({ id: channelId }) => channelId === id);
      if (channel) {
        channel.name = name;
      }
    },
    removeChannelReceived: (state, action) => {
      const { id } = action.payload;
      state.channels = state.channels.filter((channel) => channel.id !== id);
      if (state.currentChannelId === id) {
        state.currentChannelId = getDefaultChannelId(state);
      }
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
      })
      .addCase(addChannel.pending, (state) => {
        state.adding = true;
      })
      .addCase(addChannel.fulfilled, (state, action) => {
        state.adding = false;
        const channel = action.payload;
        const exists = state.channels.some(({ id }) => id === channel.id);
        if (!exists) {
          state.channels.push(channel);
        }
        state.currentChannelId = channel.id;
      })
      .addCase(addChannel.rejected, (state) => {
        state.adding = false;
      })
      .addCase(renameChannel.pending, (state) => {
        state.renaming = true;
      })
      .addCase(renameChannel.fulfilled, (state, action) => {
        state.renaming = false;
        const { id, name } = action.payload;
        const channel = state.channels.find(({ id: channelId }) => channelId === id);
        if (channel) {
          channel.name = name;
        }
      })
      .addCase(renameChannel.rejected, (state) => {
        state.renaming = false;
      })
      .addCase(removeChannel.pending, (state) => {
        state.removing = true;
      })
      .addCase(removeChannel.fulfilled, (state, action) => {
        state.removing = false;
        state.channels = state.channels.filter((channel) => channel.id !== action.payload.id);
        if (state.currentChannelId === action.payload.id) {
          state.currentChannelId = getDefaultChannelId(state);
        }
      })
      .addCase(removeChannel.rejected, (state) => {
        state.removing = false;
      });
  },
});

export const {
  setCurrentChannel,
  addChannelReceived,
  renameChannelReceived,
  removeChannelReceived,
} = channelsSlice.actions;
export default channelsSlice.reducer;
