import { useState } from 'react';
import './ModelSelector.css';
import { triggerHaptic } from '../utils/haptics';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  capabilities: string[];
  icon: string;
}

const models: AIModel[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'OpenAI',
    description: 'Most capable model for complex tasks',
    capabilities: ['Text', 'Code', 'Analysis'],
    icon: 'O',
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    description: 'Faster responses with extended context',
    capabilities: ['Text', 'Code', 'Vision'],
    icon: 'O',
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    description: 'Powerful model for nuanced tasks',
    capabilities: ['Text', 'Code', 'Analysis'],
    icon: 'A',
  },
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    provider: 'Anthropic',
    description: 'Balanced performance and speed',
    capabilities: ['Text', 'Code'],
    icon: 'A',
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'Google',
    description: 'Multimodal AI with broad capabilities',
    capabilities: ['Text', 'Code', 'Vision', 'Audio'],
    icon: 'G',
  },
  {
    id: 'llama-3',
    name: 'Llama 3',
    provider: 'Meta',
    description: 'Open-source powerhouse',
    capabilities: ['Text', 'Code'],
    icon: 'M',
  },
];

const ModelSelector = ({ selectedModel, onModelChange }: ModelSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModelSelect = (modelId: string) => {
    onModelChange(modelId);
    setIsOpen(false);
    triggerHaptic('medium');
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    triggerHaptic('light');
  };

  const currentModel = models.find(m => m.id === selectedModel) || models[0];

  return (
    <>
      <button 
        className="model-selector-trigger glass"
        onClick={handleToggle}
        aria-label="Select AI model"
      >
        <div className="model-icon">{currentModel.icon}</div>
        <div className="model-info">
          <div className="model-name">{currentModel.name}</div>
          <div className="model-provider">{currentModel.provider}</div>
        </div>
        <svg 
          className={`chevron ${isOpen ? 'open' : ''}`}
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="model-selector-overlay" onClick={handleToggle} />
          <div className="model-selector-panel glass-elevated">
            <div className="model-selector-header">
              <h3>SELECT MODEL</h3>
              <button className="close-button" onClick={handleToggle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="models-grid">
              {models.map((model) => (
                <button
                  key={model.id}
                  className={`model-card glass ${selectedModel === model.id ? 'selected' : ''}`}
                  onClick={() => handleModelSelect(model.id)}
                >
                  <div className="model-card-header">
                    <div className="model-card-icon">{model.icon}</div>
                    <div className="model-card-info">
                      <div className="model-card-name">{model.name}</div>
                      <div className="model-card-provider">{model.provider}</div>
                    </div>
                    {selectedModel === model.id && (
                      <div className="selected-indicator">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <p className="model-card-description">{model.description}</p>

                  <div className="model-capabilities">
                    {model.capabilities.map((cap) => (
                      <span key={cap} className="capability-badge">
                        {cap}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ModelSelector;
