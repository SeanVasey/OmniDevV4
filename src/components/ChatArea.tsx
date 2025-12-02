import { useState, useEffect, useRef } from 'react';
import './ChatArea.css';
import Message from './Message';

interface ChatAreaProps {
  selectedModel: string;
}

interface MessageData {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  model?: string;
  isStreaming?: boolean;
}

const ChatArea = ({ selectedModel: _selectedModel }: ChatAreaProps) => {
  const [messages] = useState<MessageData[]>([
    {
      id: '1',
      role: 'system',
      content: 'Welcome to OmniDev v4.0! I\'m your multimodal AI assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-area">
      {messages.length === 1 && (
        <div className="welcome-screen">
          <div className="welcome-content">
            <div className="welcome-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v12M6 12h12" />
              </svg>
            </div>
            <h2 className="welcome-title text-gradient">WELCOME TO OMNIDEV</h2>
            <p className="welcome-subtitle">Your multimodal AI workspace</p>
            
            <div className="quick-actions">
              <div className="quick-action-card glass">
                <div className="quick-action-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h3>START A CONVERSATION</h3>
                <p>Ask me anything or start a new project</p>
              </div>

              <div className="quick-action-card glass">
                <div className="quick-action-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                  </svg>
                </div>
                <h3>UPLOAD MEDIA</h3>
                <p>Share images, videos, or documents</p>
              </div>

              <div className="quick-action-card glass">
                <div className="quick-action-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3>SWITCH MODELS</h3>
                <p>Choose from multiple AI models</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="messages-container">
        {messages.map((message, index) => (
          <Message
            key={message.id}
            message={message}
            isLatest={index === messages.length - 1}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatArea;
