import React from 'react';
import { Brain, BookOpen, Sparkles, Youtube } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
      {/* Animated Icons */}
      <div className="flex items-center justify-center space-x-6 mb-8">
        <div className="relative">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-full">
            <Youtube className="text-white" size={32} />
          </div>
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
        
        <div className="relative">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full">
            <Brain className="text-white" size={32} />
          </div>
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
        </div>
        
        <div className="relative">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-full">
            <BookOpen className="text-white" size={32} />
          </div>
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
      
      <h3 className="text-3xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Processing Your Video
      </h3>
      
      <p className="text-lg text-gray-600 mb-8">
        AI is analyzing and transforming your content...
      </p>
      
      {/* Enhanced Progress Steps */}
      <div className="space-y-4 text-sm text-gray-600 mb-8">
        <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">1</span>
          </div>
          <span>🎬 Extracting transcript from YouTube</span>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">2</span>
          </div>
          <span>🧠 Analyzing content with AI</span>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">3</span>
          </div>
          <span>📝 Generating smart notes and summary</span>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">4</span>
          </div>
          <span>💡 Preparing Q&A capabilities</span>
        </div>
      </div>

      {/* Enhanced Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 h-3 rounded-full animate-pulse" style={{width: '85%'}}></div>
      </div>

      <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
        <Sparkles className="text-yellow-500" size={16} />
        <span>This may take 30-60 seconds depending on video length...</span>
        <Sparkles className="text-yellow-500" size={16} />
      </div>
    </div>
  );
};

export default LoadingSpinner;