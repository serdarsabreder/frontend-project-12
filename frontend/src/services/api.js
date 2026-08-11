import axios from 'axios';
import routes from './routes.js';

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export const getChannels = () => axios.get(routes.channelsPath(), { headers: getAuthHeaders() });

export const addChannelRequest = (channel) => axios.post(routes.channelsPath(), channel, { headers: getAuthHeaders() });

export const renameChannelRequest = (id, data) => axios.patch(routes.channelPath(id), data, { headers: getAuthHeaders() });

export const removeChannelRequest = (id) => axios.delete(routes.channelPath(id), { headers: getAuthHeaders() });

export const getMessages = () => axios.get(routes.messagesPath(), { headers: getAuthHeaders() });

export const addMessageRequest = (message) => axios.post(routes.messagesPath(), message, { headers: getAuthHeaders() });
