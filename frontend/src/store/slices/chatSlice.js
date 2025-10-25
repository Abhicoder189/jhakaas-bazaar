import { createSlice } from '@reduxjs/toolkit';

const chatHistoryFromStorage = localStorage.getItem('chatHistory')
  ? JSON.parse(localStorage.getItem('chatHistory'))
  : [];

const initialState = {
  messages: chatHistoryFromStorage,
  isOpen: false,
  loading: false,
  sessionId: localStorage.getItem('chatSessionId') || `session_${Date.now()}`,
};

// Save session ID to localStorage if not exists
if (!localStorage.getItem('chatSessionId')) {
  localStorage.setItem('chatSessionId', initialState.sessionId);
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleChat: (state) => {
      state.isOpen = !state.isOpen;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
      localStorage.setItem('chatHistory', JSON.stringify(state.messages));
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
      localStorage.removeItem('chatHistory');
    },
  },
});

export const { toggleChat, addMessage, setLoading, clearMessages } = chatSlice.actions;

export default chatSlice.reducer;
