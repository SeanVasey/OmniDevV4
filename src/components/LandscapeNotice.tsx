import './LandscapeNotice.css';

const LandscapeNotice = () => {
  return (
    <div className="landscape-notice">
      <div className="landscape-notice-content">
        <div className="rotate-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8" />
            <path d="M12 17v4" />
          </svg>
          <div className="rotate-arrow">↻</div>
        </div>
        <h2>ROTATE YOUR DEVICE</h2>
        <p>Please rotate your device to landscape mode for the best experience</p>
      </div>
    </div>
  );
};

export default LandscapeNotice;
