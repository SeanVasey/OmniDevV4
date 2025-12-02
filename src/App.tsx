import { useState, useEffect } from 'react';
import './styles/design-system.css';
import './App.css';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import Composer from './components/Composer';
import ModelSelector from './components/ModelSelector';
import LandscapeNotice from './components/LandscapeNotice';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [incognitoMode, setIncognitoMode] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [isLandscape, setIsLandscape] = useState(true);

  // Check orientation on mount and resize
  useEffect(() => {
    const checkOrientation = () => {
      const landscape = window.matchMedia('(orientation: landscape)').matches;
      setIsLandscape(landscape);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // Apply incognito mode to body
  useEffect(() => {
    if (incognitoMode) {
      document.body.setAttribute('data-mode', 'incognito');
    } else {
      document.body.removeAttribute('data-mode');
    }
  }, [incognitoMode]);

  // Show landscape notice on mobile
  if (!isLandscape && window.innerWidth < 768) {
    return <LandscapeNotice />;
  }

  return (
    <div className="app-container">
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        incognitoMode={incognitoMode}
        onIncognitoToggle={() => setIncognitoMode(!incognitoMode)}
      />
      
      <main className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        <div className="chat-container">
          <ChatArea selectedModel={selectedModel} />
          <Composer 
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
        </div>
      </main>

      <ModelSelector 
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
      />
    </div>
  );
}

export default App;
