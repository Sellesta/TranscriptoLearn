import React, { useState } from 'react';
import VideoProcessor from './components/VideoProcessor';
import NotesDisplay from './components/NotesDisplay';
import ChatBot from './components/ChatBot';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import { ExternalLink, Sparkles, BookOpen, MessageSquare, FileText } from 'lucide-react';
import './App.css';

function App() {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('notes');

  const handleVideoProcessed = (data) => {
    setVideoData(data);
    setError('');
    setActiveTab('notes');
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setVideoData(null);
  };

  const handleLoading = (isLoading) => {
    setLoading(isLoading);
  };

  const formatTime = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const tabs = [
    { key: 'notes', label: 'Smart Notes', icon: <Sparkles size={18} />, color: 'blue' },
    { key: 'summary', label: 'Summary', icon: <BookOpen size={18} />, color: 'green' },
    { key: 'chat', label: 'Q&A Chat', icon: <MessageSquare size={18} />, color: 'purple' },
    { key: 'transcript', label: 'Transcript', icon: <FileText size={18} />, color: 'gray' }
  ];

  return (
    <div className="App min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <VideoProcessor 
          onVideoProcessed={handleVideoProcessed}
          onError={handleError}
          onLoading={handleLoading}
        />

        {loading && <LoadingSpinner />}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-6 py-4 rounded-r-lg mb-6 fade-in shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Error: {error}</p>
              </div>
            </div>
          </div>
        )}

        {videoData && (
          <div className="mt-8 fade-in">
            {/* Video Info Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {videoData.video_info?.title || 'Video Title'}
                  </h2>
                  <div className="flex items-center text-gray-600 text-sm space-x-6">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      {formatTime(videoData.video_info?.duration)}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                      </svg>
                      {videoData.video_info?.uploader || 'Unknown'}
                    </span>
                  </div>
                </div>
                {videoData.source_url && (
                  <a
                    href={videoData.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <ExternalLink size={18} className="mr-2" />
                    Watch Original
                  </a>
                )}
              </div>
            </div>

            {/* Enhanced Tab Navigation */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="flex bg-gray-50">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                      activeTab === tab.key 
                        ? `bg-white text-${tab.color}-600 border-b-2 border-${tab.color}-500 shadow-sm` 
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="p-8">
                <div className="tab-content">
                  {activeTab === 'notes' && (
                    <NotesDisplay content={videoData.notes} title="Smart Notes" />
                  )}
                  {activeTab === 'summary' && (
                    <NotesDisplay content={videoData.summary} title="Summary" />
                  )}
                  {activeTab === 'chat' && (
                    <ChatBot videoId={videoData.video_id} />
                  )}
                  {activeTab === 'transcript' && (
                    <NotesDisplay content={videoData.transcript} title="Full Transcript" />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Sparkles className="text-blue-400" size={20} />
            <p className="text-lg font-semibold">TranscriptoLearn</p>
          </div>
          <p className="text-sm text-gray-300">
            Powered by <span className="text-blue-400 font-medium">Groq API</span> & <span className="text-purple-400 font-medium">LLaMA 3</span>
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Transform your learning experience with AI-powered video analysis
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;