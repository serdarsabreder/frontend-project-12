import axios from 'axios';
import routes from './routes.js';

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export const getChannels = () => axios.get(routes.channelsPath(), { headers: getAuthHeaders() });

export const getMessages = () => axios.get(routes.messagesPath(), { headers: getAuthHeaders() });

export const addMessageRequest = (message) => axios.post(routes.messagesPath(), message, { headers: getAuthHeaders() });
