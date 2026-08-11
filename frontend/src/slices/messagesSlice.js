import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addMessageRequest, getMessages } from '../services/api.js';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async () => {
    const { data } = await getMessages();
    return data;
  },
);

export const addMessage = createAsyncThunk(
  'messages/addMessage',
  async (message) => {
    const { data } = await addMessageRequest(message);
    return data;
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    loading: false,
    error: null,
    sending: false,
    sendError: null,
  },
  reducers: {
    addMessageReceived: (state, action) => {
      const message = action.payload;
      const exists = state.messages.some(({ id }) => id === message.id);
      if (!exists) {
        state.messages.push(message);
      }
    },
    clearSendError: (state) => {
      state.sendError = null;
    },
    removeMessagesByChannel: (state, action) => {
      state.messages = state.messages.filter(({ channelId }) => channelId !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'errors.loadMessages';
      })
      .addCase(addMessage.pending, (state) => {
        state.sending = true;
        state.sendError = null;
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        state.sending = false;
        const message = action.payload;
        const exists = state.messages.some(({ id }) => id === message.id);
        if (!exists) {
          state.messages.push(message);
        }
      })
      .addCase(addMessage.rejected, (state, action) => {
        state.sending = false;
        state.sendError = action.error.message ?? 'errors.sendMessage';
      });
  },
});

export const { addMessageReceived, clearSendError, removeMessagesByChannel } = messagesSlice.actions;
export default messagesSlice.reducer;
