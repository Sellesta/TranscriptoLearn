import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, MessageCircle, User, Bot, Loader2, Sparkles, Lightbulb } from 'lucide-react';

const ChatBot = ({ videoId }) => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! I\'m your AI learning assistant. I can answer questions about this video and help you understand the content better. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentQuestion.trim()) return;

    const userMessage = {
      type: 'user',
      content: currentQuestion,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentQuestion('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/ask-question', {
        video_id: videoId,
        question: currentQuestion
      });

      const botMessage = {
        type: 'bot',
        content: response.data.answer,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        type: 'bot',
        content: 'Sorry, I encountered an error while processing your question. Please try again.',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const suggestedQuestions = [
    "What are the main topics covered?",
    "Can you explain the key concepts?",
    "What are the important takeaways?",
    "Are there any examples given?",
    "How does this relate to other topics?",
    "What questions should I ask myself?"
  ];

  const handleSuggestedQuestion = (question) => {
    setCurrentQuestion(question);
  };

  return (
    <div className="flex flex-col h-[600px] border border-gray-200 rounded-xl shadow-sm bg-white">
      {/* Enhanced Header */}
      <div className="flex items-center space-x-3 p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-xl">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
          <MessageCircle className="text-white" size={24} />
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-lg">AI Learning Assistant</h3>
          <p className="text-sm text-gray-600">Ask questions about this video content</p>
        </div>
        <div className="ml-auto flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500">Online</span>
        </div>
      </div>

      {/* Enhanced Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex space-x-3 max-w-xs lg:max-w-md xl:max-w-lg ${
              message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${
                message.type === 'user' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
                  : message.isError 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                    : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
              }`}>
                {message.type === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>
              
              <div className={`px-4 py-3 rounded-2xl shadow-sm ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                  : message.isError
                    ? 'bg-red-50 text-red-800 border border-red-200'
                    : 'bg-gray-50 text-gray-800 border border-gray-100'
              }`}>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-sm">
                <Bot size={18} className="text-white" />
              </div>
              <div className="bg-gray-50 px-4 py-3 rounded-2xl border border-gray-100 flex items-center space-x-3">
                <Loader2 className="animate-spin text-purple-500" size={16} />
                <span className="text-sm text-gray-600">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Suggested Questions */}
      {messages.length === 1 && (
        <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center space-x-2 mb-3">
            <Lightbulb className="text-yellow-500" size={16} />
            <p className="text-sm font-medium text-gray-700">Suggested questions:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(question)}
                className="text-xs px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-left hover:shadow-sm"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Input */}
      <form onSubmit={handleSubmit} className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
              placeholder="Ask a question about this video..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-sm"
              disabled={isLoading}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Sparkles className="text-gray-400" size={16} />
            </div>
          </div>
          <button
            type="submit"
            disabled={!currentQuestion.trim() || isLoading}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 shadow-sm hover:shadow-md"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                <Send size={18} />
                <span className="text-sm font-medium">Ask</span>
              </>
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Press Enter to send • AI-powered responses
        </p>
      </form>
    </div>
  );
};

export default ChatBot;