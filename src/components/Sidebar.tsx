import { useState } from 'react';
import './Sidebar.css';
import { triggerHaptic } from '../utils/haptics';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  incognitoMode: boolean;
  onIncognitoToggle: () => void;
}

interface Chat {
  id: string;
  title: string;
  timestamp: Date;
  folder?: string;
}

const Sidebar = ({ isOpen, onToggle, incognitoMode, onIncognitoToggle }: SidebarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chats] = useState<Chat[]>([
    { id: '1', title: 'Welcome to OmniDev', timestamp: new Date(), folder: 'General' },
    { id: '2', title: 'Design System Discussion', timestamp: new Date(Date.now() - 86400000), folder: 'Design' },
    { id: '3', title: 'API Integration', timestamp: new Date(Date.now() - 172800000), folder: 'Development' },
  ]);

  const handleItemClick = () => {
    triggerHaptic('light');
  };

  const handleToggleClick = () => {
    triggerHaptic('medium');
    onToggle();
  };

  const handleIncognitoClick = () => {
    triggerHaptic('medium');
    onIncognitoToggle();
  };

  const filteredChats = chats.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header glass">
          <div className="logo-container">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
                <path d="M16 8v16M8 16h16" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h1 className="logo-text text-gradient">OMNIDEV</h1>
          </div>
          
          <button 
            className="icon-button"
            onClick={handleToggleClick}
            aria-label="Toggle sidebar"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>

        <div className="sidebar-content">
          <button className="new-chat-button glass glow" onClick={handleItemClick}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>NEW CHAT</span>
          </button>

          <div className="search-container">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              className="search-input glass"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="sidebar-controls">
            <button 
              className={`control-button glass ${incognitoMode ? 'active' : ''}`}
              onClick={handleIncognitoClick}
              title="Incognito Mode"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>

          <div className="chat-list">
            <div className="chat-section">
              <h3 className="section-title">RECENT CHATS</h3>
              {filteredChats.map((chat) => (
                <div key={chat.id} className="chat-item glass" onClick={handleItemClick}>
                  <div className="chat-item-content">
                    <div className="chat-title">{chat.title}</div>
                    <div className="chat-meta">
                      {chat.folder && <span className="chat-folder">{chat.folder}</span>}
                      <span className="chat-time">{formatTime(chat.timestamp)}</span>
                    </div>
                  </div>
                  <button className="chat-menu-button" onClick={(e) => {
                    e.stopPropagation();
                    handleItemClick();
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sidebar-footer glass">
          <button className="user-profile" onClick={handleItemClick}>
            <div className="user-avatar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="user-info">
              <div className="user-name">User</div>
              <div className="user-status">Online</div>
            </div>
          </button>
        </div>
      </aside>

      {isOpen && (
        <div className="sidebar-overlay" onClick={handleToggleClick} />
      )}
    </>
  );
};

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / 3600000);
  
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

export default Sidebar;
