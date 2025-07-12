import React from 'react';
import { Sparkles, Brain, Zap } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white shadow-xl">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <Sparkles size={32} className="text-white" />
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <Brain size={32} className="text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                TranscriptoLearn
              </h1>
              <p className="text-blue-100 text-lg font-medium">
                AI Learning Assistant
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Zap className="text-yellow-300" size={20} />
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Powered by Groq & LLaMA 3</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature highlights */}
        <div className="mt-6 flex items-center justify-center space-x-8 text-sm text-blue-100">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
            <span>Smart Note Generation</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-200 rounded-full"></div>
            <span>AI-Powered Q&A</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-200 rounded-full"></div>
            <span>Instant Summaries</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;