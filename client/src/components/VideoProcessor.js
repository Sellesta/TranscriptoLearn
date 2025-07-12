import React, { useState } from 'react';
import axios from 'axios';
import { Youtube, Send, AlertCircle, Sparkles, PlayCircle } from 'lucide-react';

const VideoProcessor = ({ onVideoProcessed, onError, onLoading }) => {
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const validateYouTubeUrl = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubeRegex.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!url.trim()) {
      onError('Please enter a YouTube URL');
      return;
    }

    if (!validateYouTubeUrl(url)) {
      onError('Please enter a valid YouTube URL');
      return;
    }

    setIsProcessing(true);
    onLoading(true);
    onError('');

    try {
      const response = await axios.post('http://localhost:5000/api/process-video', {
        url: url.trim()
      });

      if (response.data.success) {
        onVideoProcessed(response.data);
        setUrl(''); // Clear the input after successful processing
      } else {
        onError('Failed to process video');
      }
    } catch (error) {
      if (error.response) {
        onError(error.response.data.error || 'Server error occurred');
      } else if (error.request) {
        onError('Unable to connect to server. Please make sure the backend is running.');
      } else {
        onError('An unexpected error occurred');
      }
    } finally {
      setIsProcessing(false);
      onLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-3 rounded-full">
            <Youtube className="text-white" size={32} />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Transform YouTube Videos into Smart Notes
        </h1>
        <p className="text-gray-600 text-lg">
          Extract transcripts, generate summaries, and chat with AI about any lecture video
        </p>
      </div>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="video-url" className="block text-sm font-semibold text-gray-700 mb-3">
            YouTube Video URL
          </label>
          <div className="relative">
            <input
              id="video-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-lg"
              disabled={isProcessing}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Youtube className="text-gray-400" size={24} />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isProcessing || !url.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span>Processing Video...</span>
            </>
          ) : (
            <>
              <Sparkles size={24} />
              <span>Generate Smart Notes & Summary</span>
            </>
          )}
        </button>
      </form>

      {/* Info Section */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-500 p-2 rounded-lg">
            <AlertCircle className="text-white" size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <PlayCircle className="mr-2 text-blue-500" size={18} />
              How it works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="flex items-start space-x-2">
                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">
                  1
                </div>
                <span>Paste any YouTube lecture video URL</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">
                  2
                </div>
                <span>AI extracts and processes the transcript</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">
                  3
                </div>
                <span>Get structured notes, summary, and interactive Q&A</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">
                  4
                </div>
                <span>Ask questions about the video content</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Example URLs */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-2 font-medium">Try these example videos:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => setUrl('https://youtu.be/dcXqhMqhZUo?si=pZRpmWLvf5O6vr4v')}
            className="text-left p-2 hover:bg-gray-100 rounded transition-colors"
          >
            <span className="text-blue-600 font-medium">CSS Tutorial for Beginners</span>
          </button>
          <button
            onClick={() => setUrl('https://youtu.be/pzo13OPXZS4?si=H3PW2wIZJk8RwG5Q')}
            className="text-left p-2 hover:bg-gray-100 rounded transition-colors"
          >
            <span className="text-blue-600 font-medium">JavaScript Fundamentals</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoProcessor;