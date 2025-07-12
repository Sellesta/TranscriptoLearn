import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, Download, FileText, Sparkles, BookOpen, MessageSquare } from 'lucide-react';

const NotesDisplay = ({ content, title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${title.toLowerCase().replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getIcon = () => {
    switch (title) {
      case 'Smart Notes':
        return <Sparkles className="text-blue-500" size={20} />;
      case 'Summary':
        return <BookOpen className="text-green-500" size={20} />;
      case 'Full Transcript':
        return <FileText className="text-gray-500" size={20} />;
      default:
        return <FileText className="text-blue-500" size={20} />;
    }
  };

  const getColorClass = () => {
    switch (title) {
      case 'Smart Notes':
        return 'border-blue-200 bg-blue-50';
      case 'Summary':
        return 'border-green-200 bg-green-50';
      case 'Full Transcript':
        return 'border-gray-200 bg-gray-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  if (!content) return null;

  return (
    <div className="space-y-6">
      {/* Enhanced Header with actions */}
      <div className={`flex items-center justify-between p-4 rounded-lg border ${getColorClass()}`}>
        <div className="flex items-center space-x-3">
          {getIcon()}
          <div>
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">
              {content.split(/\s+/).length} words • {Math.ceil(content.length / 5)} characters
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 px-4 py-2 text-sm bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {copied ? (
              <>
                <Check size={16} className="text-green-500" />
                <span className="text-green-600 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} className="text-gray-500" />
                <span className="text-gray-700">Copy</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Download size={16} />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Enhanced Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="prose prose-lg max-w-none">
          {title === 'Full Transcript' ? (
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-base">
              {content}
            </div>
          ) : (
            <ReactMarkdown 
              className="markdown-content"
              components={{
                h1: ({children}) => (
                  <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">
                    {children}
                  </h1>
                ),
                h2: ({children}) => (
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {children}
                  </h2>
                ),
                h3: ({children}) => (
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6 flex items-center">
                    <div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
                    {children}
                  </h3>
                ),
                p: ({children}) => (
                  <p className="text-gray-700 mb-4 leading-relaxed text-base">
                    {children}
                  </p>
                ),
                ul: ({children}) => (
                  <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700">
                    {children}
                  </ul>
                ),
                ol: ({children}) => (
                  <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-700">
                    {children}
                  </ol>
                ),
                li: ({children}) => (
                  <li className="ml-2 leading-relaxed">
                    {children}
                  </li>
                ),
                strong: ({children}) => (
                  <strong className="font-semibold text-gray-900 bg-yellow-50 px-1 rounded">
                    {children}
                  </strong>
                ),
                em: ({children}) => (
                  <em className="italic text-gray-800">
                    {children}
                  </em>
                ),
                code: ({children}) => (
                  <code className="bg-gray-100 px-2 py-1 rounded-md text-sm font-mono text-gray-800 border">
                    {children}
                  </code>
                ),
                blockquote: ({children}) => (
                  <blockquote className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 my-6 italic text-gray-700 rounded-r-lg">
                    <div className="flex items-start">
                      <div className="text-blue-500 mr-3 mt-1">"</div>
                      <div>{children}</div>
                    </div>
                  </blockquote>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          )}
        </div>
      </div>

      {/* Enhanced Stats */}
      <div className="flex items-center justify-between text-sm text-gray-500 bg-gray-50 px-4 py-3 rounded-lg">
        <div className="flex items-center space-x-4">
          <span>📊 {content.split(/\s+/).length} words</span>
          <span>📝 {content.split('.').length} sentences</span>
          <span>⏱️ ~{Math.ceil(content.split(/\s+/).length / 200)} min read</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>AI Generated</span>
        </div>
      </div>
    </div>
  );
};

export default NotesDisplay;