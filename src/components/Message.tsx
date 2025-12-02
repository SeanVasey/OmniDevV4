import { useState } from 'react';
import './Message.css';
import { triggerHaptic } from '../utils/haptics';

interface MessageProps {
  message: {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
    model?: string;
    isStreaming?: boolean;
  };
  isLatest: boolean;
}

const Message = ({ message, isLatest }: MessageProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      triggerHaptic('success');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      triggerHaptic('error');
    }
  };

  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  if (isSystem) {
    return (
      <div className="message system-message">
        <div className="system-message-content glass">
          <div className="system-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </div>
          <span>{message.content}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`message ${isUser ? 'user-message' : 'assistant-message'} ${isLatest ? 'latest' : ''}`}>
      <div className="message-container">
        {!isUser && (
          <div className="message-avatar glass">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v12M6 12h12" />
            </svg>
          </div>
        )}

        <div className="message-content-wrapper">
          {!isUser && message.model && (
            <div className="message-header">
              <span className="model-badge">{message.model}</span>
              <span className="message-time">{formatTime(message.timestamp)}</span>
            </div>
          )}

          <div className={`message-content ${isUser ? 'glass-elevated' : ''}`}>
            {message.isStreaming && (
              <div className="streaming-indicator">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
            <div className="message-text">{message.content}</div>
          </div>

          {!isUser && (
            <div className="message-actions">
              <button 
                className="action-button" 
                onClick={handleCopy}
                title="Copy message"
              >
                {copied ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </button>

              <button className="action-button" title="Regenerate">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                </svg>
              </button>
            </div>
          )}

          {isUser && (
            <div className="message-time user-time">{formatTime(message.timestamp)}</div>
          )}
        </div>

        {isUser && (
          <div className="message-avatar user-avatar glass">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export default Message;
