import API from './axios';

export const sendChatMessage = (message, sessionId, userId = null) =>
  API.post('/chat', { message, sessionId, userId });

export const getChatHistory = (sessionId) => API.get(`/chat/${sessionId}`);
