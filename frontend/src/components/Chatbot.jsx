import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaComments, FaTimes, FaPaperPlane, FaRobot, FaTrash, FaUser } from 'react-icons/fa';
import { toggleChat, addMessage, setLoading, clearMessages } from '../store/slices/chatSlice';
import { sendChatMessage } from '../api/chatAPI';

const Chatbot = () => {
  const dispatch = useDispatch();
  const { isOpen, messages, loading, sessionId } = useSelector((state) => state.chat);
  const { userInfo } = useSelector((state) => state.auth);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    dispatch(addMessage(userMessage));
    setInput('');
    dispatch(setLoading(true));

    try {
      const payload = {
        message: input,
        sessionId,
        userId: userInfo?._id, // Send userId for order tracking
      };
      
      const { data } = await sendChatMessage(payload.message, payload.sessionId, payload.userId);

      const botMessage = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString(),
      };

      dispatch(addMessage(botMessage));
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: '❌ Sorry, I encountered an error. Please try again or contact support.',
        timestamp: new Date().toISOString(),
      };
      dispatch(addMessage(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Clear all chat messages?')) {
      dispatch(clearMessages());
    }
  };

  // Enhanced quick suggestions
  const suggestions = [
    '🔍 Search for handicrafts',
    '⭐ Show bestsellers',
    '📦 Shipping info',
    '🔄 Return policy',
    '📱 Track my orders',
    '🎁 Current offers',
    '🏪 Show categories',
  ];

  const handleSuggestion = (text) => {
    // Remove emoji from text before sending
    const cleanText = text.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
    setInput(cleanText);
  };

  // Format message content with better styling
  const formatMessage = (content) => {
    // Convert **text** to bold
    const parts = content.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => dispatch(toggleChat())}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-saffron-600 to-maroon-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 animate-float"
          aria-label="Open chat"
        >
          <FaComments className="text-3xl" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border-2 border-saffron-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-saffron-600 to-maroon-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <FaRobot className="text-3xl" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-bold">Jhakaas Assistant</h3>
                <p className="text-xs opacity-90">✨ Online - Here to help!</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {messages.length > 0 && (
                <button
                  onClick={handleClearChat}
                  className="hover:bg-white/20 p-2 rounded-full transition-colors"
                  aria-label="Clear chat"
                  title="Clear chat"
                >
                  <FaTrash className="text-sm" />
                </button>
              )}
              <button
                onClick={() => dispatch(toggleChat())}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-beige-50 to-white">
            {messages.length === 0 && (
              <div className="text-center mt-8 space-y-6">
                <div className="animate-bounce">
                  <FaRobot className="text-7xl text-saffron-600 mx-auto mb-4" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-800 font-semibold text-lg">🙏 Namaste!</p>
                  <p className="text-gray-600 px-4">
                    I'm your personal shopping assistant. How can I help you today?
                  </p>
                </div>
                <div className="space-y-2 px-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestion(suggestion)}
                      className="block w-full text-left px-4 py-3 bg-white rounded-xl hover:bg-gradient-to-r hover:from-saffron-50 hover:to-maroon-50 transition-all duration-300 text-sm border border-gray-200 hover:border-saffron-300 shadow-sm hover:shadow-md"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} items-end space-x-2`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-saffron-500 to-maroon-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaRobot className="text-white text-sm" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] p-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-saffron-600 to-maroon-500 text-white rounded-br-none shadow-md'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-lg border border-gray-100'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {formatMessage(message.content)}
                  </p>
                  <p className={`text-xs mt-1 ${
                    message.role === 'user' ? 'text-white/70' : 'text-gray-400'
                  }`}>
                    {new Date(message.timestamp).toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaUser className="text-white text-sm" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex justify-start items-end space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-saffron-500 to-maroon-500 rounded-full flex items-center justify-center">
                  <FaRobot className="text-white text-sm" />
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-lg border border-gray-100">
                  <div className="flex space-x-2">
                    <div className="w-2.5 h-2.5 bg-saffron-600 rounded-full animate-bounce"></div>
                    <div className="w-2.5 h-2.5 bg-maroon-600 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2.5 h-2.5 bg-saffron-600 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t-2 border-gray-100">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 input-field text-sm py-3 px-4 rounded-xl border-2 border-gray-200 focus:border-saffron-400"
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-gradient-to-r from-saffron-600 to-maroon-500 hover:from-saffron-700 hover:to-maroon-600 text-white p-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                aria-label="Send message"
              >
                <FaPaperPlane />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              💡 Powered by AI • Press Enter to send
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
