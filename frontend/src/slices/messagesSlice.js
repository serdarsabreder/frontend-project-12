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
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export default messagesSlice.reducer;
